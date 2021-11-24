import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Administrador,
  TipoVehiculo,
} from '../models';
import {AdministradorRepository} from '../repositories';

export class AdministradorTipoVehiculoController {
  constructor(
    @repository(AdministradorRepository) protected administradorRepository: AdministradorRepository,
  ) { }

  @get('/administradors/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Administrador has many TipoVehiculo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(TipoVehiculo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoVehiculo>,
  ): Promise<TipoVehiculo[]> {
    return this.administradorRepository.tipoVehiculos(id).find(filter);
  }

  @post('/administradors/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Administrador model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administrador.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {
            title: 'NewTipoVehiculoInAdministrador',
            exclude: ['id'],
            optional: ['administradorId']
          }),
        },
      },
    }) tipoVehiculo: Omit<TipoVehiculo, 'id'>,
  ): Promise<TipoVehiculo> {
    return this.administradorRepository.tipoVehiculos(id).create(tipoVehiculo);
  }

  @patch('/administradors/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Administrador.TipoVehiculo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {partial: true}),
        },
      },
    })
    tipoVehiculo: Partial<TipoVehiculo>,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.administradorRepository.tipoVehiculos(id).patch(tipoVehiculo, where);
  }

  @del('/administradors/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Administrador.TipoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.administradorRepository.tipoVehiculos(id).delete(where);
  }
}
