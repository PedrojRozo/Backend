import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';

// Importar Url base para consumir servicios
import { Llaves } from '../config/llaves';

import {Cliente} from '../models';
import { Credenciales } from '../models/credenciales.model';
import {ClienteRepository} from '../repositories';

// Importar los servicios creados
import { AutenticacionService } from '../services';

// Importar para consumir url
const fetch = require('node-fetch');
@authenticate("cliente")
export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,

    /*Para usar un servicio en especifico en el modelo*/
    @service(AutenticacionService)
    public servicoAutenticacion : AutenticacionService
  ) {}

  // Para identificar el cliente
  @post("/identificarCliente", {
    responses:{
      '200':{
        description: "Identificación de cliente"
      }
    }
  })
  async identificarCliente(
    @requestBody() credenciales: Credenciales
  ){
    let c = await this.servicoAutenticacion.IdentifcarCliente(credenciales.usuario, credenciales.clave);
    if (c) {
      let token = this.servicoAutenticacion.GenerarTokenJWT(c);
      return {
        datos:{
          nombre: c.nombre,
          correo: c.correo,
          id: c.id
        },
        tk: token
      }
    } else {
      // Mensaje de error a cliente no autorizado
      throw new HttpErrors[401]("datos Invalidos");
    }
  }


  @post('/clientes')
  @response(200, {
    description: 'Cliente model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {

    // Usar el servicio
    let clave = this.servicoAutenticacion.GenerarClave();
    let claveCifrada = this.servicoAutenticacion.CifrarClave(clave);
    cliente.contrasena = claveCifrada;
    let c = await this.clienteRepository.create(cliente);

    // Notificar al cliente por correo
    let destino = cliente.correo;
    let asunto = 'Registro del cliente en la plataforma';
    let mensaje = `Hola ${cliente.nombre}, su nombre de usuario es: ${cliente.correo} y su clave es ${clave}`;

    // Url del servicio
    // Metodo get
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?correo_destino=${destino}&subject=${asunto}&messages=${mensaje}`)
    .then((data: any) => {
      console.log(data);
    });
    return c;
  }

  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
