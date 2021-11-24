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
import {Consecionaria} from '../models';
import {ConsecionariaRepository} from '../repositories';

export class ConsecionariaController {
  constructor(
    @repository(ConsecionariaRepository)
    public consecionariaRepository : ConsecionariaRepository,
  ) {}

  @post('/consecionarias')
  @response(200, {
    description: 'Consecionaria model instance',
    content: {'application/json': {schema: getModelSchemaRef(Consecionaria)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consecionaria, {
            title: 'NewConsecionaria',
            exclude: ['id'],
          }),
        },
      },
    })
    consecionaria: Omit<Consecionaria, 'id'>,
  ): Promise<Consecionaria> {
    return this.consecionariaRepository.create(consecionaria);
  }

  @get('/consecionarias/count')
  @response(200, {
    description: 'Consecionaria model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Consecionaria) where?: Where<Consecionaria>,
  ): Promise<Count> {
    return this.consecionariaRepository.count(where);
  }

  @get('/consecionarias')
  @response(200, {
    description: 'Array of Consecionaria model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Consecionaria, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Consecionaria) filter?: Filter<Consecionaria>,
  ): Promise<Consecionaria[]> {
    return this.consecionariaRepository.find(filter);
  }

  @patch('/consecionarias')
  @response(200, {
    description: 'Consecionaria PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consecionaria, {partial: true}),
        },
      },
    })
    consecionaria: Consecionaria,
    @param.where(Consecionaria) where?: Where<Consecionaria>,
  ): Promise<Count> {
    return this.consecionariaRepository.updateAll(consecionaria, where);
  }

  @get('/consecionarias/{id}')
  @response(200, {
    description: 'Consecionaria model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Consecionaria, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Consecionaria, {exclude: 'where'}) filter?: FilterExcludingWhere<Consecionaria>
  ): Promise<Consecionaria> {
    return this.consecionariaRepository.findById(id, filter);
  }

  @patch('/consecionarias/{id}')
  @response(204, {
    description: 'Consecionaria PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Consecionaria, {partial: true}),
        },
      },
    })
    consecionaria: Consecionaria,
  ): Promise<void> {
    await this.consecionariaRepository.updateById(id, consecionaria);
  }

  @put('/consecionarias/{id}')
  @response(204, {
    description: 'Consecionaria PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() consecionaria: Consecionaria,
  ): Promise<void> {
    await this.consecionariaRepository.replaceById(id, consecionaria);
  }

  @del('/consecionarias/{id}')
  @response(204, {
    description: 'Consecionaria DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.consecionariaRepository.deleteById(id);
  }
}
