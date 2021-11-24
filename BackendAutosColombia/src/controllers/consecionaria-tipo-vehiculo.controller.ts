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
  Consecionaria,
  TipoVehiculo,
} from '../models';
import {ConsecionariaRepository} from '../repositories';

export class ConsecionariaTipoVehiculoController {
  constructor(
    @repository(ConsecionariaRepository) protected consecionariaRepository: ConsecionariaRepository,
  ) { }

  @get('/consecionarias/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Array of Consecionaria has many TipoVehiculo',
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
    return this.consecionariaRepository.tipoVehiculos(id).find(filter);
  }

  @post('/consecionarias/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Consecionaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoVehiculo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Consecionaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoVehiculo, {
            title: 'NewTipoVehiculoInConsecionaria',
            exclude: ['id'],
            optional: ['consecionariaId']
          }),
        },
      },
    }) tipoVehiculo: Omit<TipoVehiculo, 'id'>,
  ): Promise<TipoVehiculo> {
    return this.consecionariaRepository.tipoVehiculos(id).create(tipoVehiculo);
  }

  @patch('/consecionarias/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Consecionaria.TipoVehiculo PATCH success count',
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
    return this.consecionariaRepository.tipoVehiculos(id).patch(tipoVehiculo, where);
  }

  @del('/consecionarias/{id}/tipo-vehiculos', {
    responses: {
      '200': {
        description: 'Consecionaria.TipoVehiculo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoVehiculo)) where?: Where<TipoVehiculo>,
  ): Promise<Count> {
    return this.consecionariaRepository.tipoVehiculos(id).delete(where);
  }
}
