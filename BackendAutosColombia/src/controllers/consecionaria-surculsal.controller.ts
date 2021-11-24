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
  Surculsal,
} from '../models';
import {ConsecionariaRepository} from '../repositories';

export class ConsecionariaSurculsalController {
  constructor(
    @repository(ConsecionariaRepository) protected consecionariaRepository: ConsecionariaRepository,
  ) { }

  @get('/consecionarias/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Array of Consecionaria has many Surculsal',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Surculsal)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Surculsal>,
  ): Promise<Surculsal[]> {
    return this.consecionariaRepository.surculsals(id).find(filter);
  }

  @post('/consecionarias/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Consecionaria model instance',
        content: {'application/json': {schema: getModelSchemaRef(Surculsal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Consecionaria.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Surculsal, {
            title: 'NewSurculsalInConsecionaria',
            exclude: ['id'],
            optional: ['consecionariaId']
          }),
        },
      },
    }) surculsal: Omit<Surculsal, 'id'>,
  ): Promise<Surculsal> {
    return this.consecionariaRepository.surculsals(id).create(surculsal);
  }

  @patch('/consecionarias/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Consecionaria.Surculsal PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Surculsal, {partial: true}),
        },
      },
    })
    surculsal: Partial<Surculsal>,
    @param.query.object('where', getWhereSchemaFor(Surculsal)) where?: Where<Surculsal>,
  ): Promise<Count> {
    return this.consecionariaRepository.surculsals(id).patch(surculsal, where);
  }

  @del('/consecionarias/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Consecionaria.Surculsal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Surculsal)) where?: Where<Surculsal>,
  ): Promise<Count> {
    return this.consecionariaRepository.surculsals(id).delete(where);
  }
}
