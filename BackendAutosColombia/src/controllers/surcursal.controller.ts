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
} from '@loopback/rest';
import {Surculsal} from '../models';
import {SurculsalRepository} from '../repositories';

export class SurcursalController {
  constructor(
    @repository(SurculsalRepository)
    public surculsalRepository : SurculsalRepository,
  ) {}

  @post('/surculsals')
  @response(200, {
    description: 'Surculsal model instance',
    content: {'application/json': {schema: getModelSchemaRef(Surculsal)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Surculsal, {
            title: 'NewSurculsal',
            exclude: ['id'],
          }),
        },
      },
    })
    surculsal: Omit<Surculsal, 'id'>,
  ): Promise<Surculsal> {
    return this.surculsalRepository.create(surculsal);
  }

  @get('/surculsals/count')
  @response(200, {
    description: 'Surculsal model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Surculsal) where?: Where<Surculsal>,
  ): Promise<Count> {
    return this.surculsalRepository.count(where);
  }

  @get('/surculsals')
  @response(200, {
    description: 'Array of Surculsal model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Surculsal, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Surculsal) filter?: Filter<Surculsal>,
  ): Promise<Surculsal[]> {
    return this.surculsalRepository.find(filter);
  }

  @patch('/surculsals')
  @response(200, {
    description: 'Surculsal PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Surculsal, {partial: true}),
        },
      },
    })
    surculsal: Surculsal,
    @param.where(Surculsal) where?: Where<Surculsal>,
  ): Promise<Count> {
    return this.surculsalRepository.updateAll(surculsal, where);
  }

  @get('/surculsals/{id}')
  @response(200, {
    description: 'Surculsal model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Surculsal, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Surculsal, {exclude: 'where'}) filter?: FilterExcludingWhere<Surculsal>
  ): Promise<Surculsal> {
    return this.surculsalRepository.findById(id, filter);
  }

  @patch('/surculsals/{id}')
  @response(204, {
    description: 'Surculsal PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Surculsal, {partial: true}),
        },
      },
    })
    surculsal: Surculsal,
  ): Promise<void> {
    await this.surculsalRepository.updateById(id, surculsal);
  }

  @put('/surculsals/{id}')
  @response(204, {
    description: 'Surculsal PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() surculsal: Surculsal,
  ): Promise<void> {
    await this.surculsalRepository.replaceById(id, surculsal);
  }

  @del('/surculsals/{id}')
  @response(204, {
    description: 'Surculsal DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.surculsalRepository.deleteById(id);
  }
}
