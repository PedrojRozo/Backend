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

import {Administrador} from '../models';
import { Credenciales } from '../models/credenciales.model';
import {AdministradorRepository} from '../repositories';

// Importar los servicios creados
import { AutenticacionService } from '../services';

// Importar para consumir url
const fetch = require('node-fetch');
export class AdministradorController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository,

    /*Para usar un servicio en especifico en el modelo*/
    @service(AutenticacionService)
    public servicoAutenticacion : AutenticacionService

  ) {}

  // Para identificar el administrador
  @post("/identificarAdministrador", {
    responses:{
      '200':{
        description: "Identificación de administrador"
      }
    }
  })
  async identificarAdministrador(
    @requestBody() credenciales: Credenciales
  ){
    let ad = await this.servicoAutenticacion.IdentifcarAdministrador(credenciales.usuario, credenciales.clave);
    if (ad) {
      let token = this.servicoAutenticacion.GenerarTokenJWTAdministrador(ad);
      return {
        datos:{
          nombre: ad.nombre,
          correo: ad.correo,
          id: ad.id
        },
        tk: token
      }
    } else {
      // Mensaje de error a administrador no autorizado
      throw new HttpErrors[401]("datos Invalidos");
    }
  }

  @post('/administradors')
  @response(200, {
    description: 'Administrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministrador',
            exclude: ['id'],
          }),
        },
      },
    })
    administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {

    // Usar el servicio
    let clave = this.servicoAutenticacion.GenerarClave();
    let claveCifrada = this.servicoAutenticacion.CifrarClave(clave);
    administrador.contrasena = claveCifrada;
    let c = await this.administradorRepository.create(administrador);

    // Notificar al administrador por correo
    let destino = administrador.correo;
    let asunto = 'Registro del administrador en la plataforma';
    let mensaje = `Hola ${administrador.nombre}, su nombre de usuario es: ${administrador.correo} y su clave es ${clave}`;

    // Url del servicio
    // Metodo get
    fetch(`${Llaves.urlServicioNotificaciones}/envio-correo?email=${destino}&subject=${asunto}&messages=${mensaje}`)
    .then((data: any) => {
      console.log(data);
    });
    return c;
  }

  @get('/administradors/count')
  @response(200, {
    description: 'Administrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradors')
  @response(200, {
    description: 'Array of Administrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradors')
  @response(200, {
    description: 'Administrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradors/{id}')
  @response(200, {
    description: 'Administrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'}) filter?: FilterExcludingWhere<Administrador>
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @patch('/administradors/{id}')
  @response(204, {
    description: 'Administrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradors/{id}')
  @response(204, {
    description: 'Administrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradors/{id}')
  @response(204, {
    description: 'Administrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }
}
