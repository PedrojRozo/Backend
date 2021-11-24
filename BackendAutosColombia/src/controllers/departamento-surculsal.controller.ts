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
  Departamento,
  Surculsal,
} from '../models';
import {DepartamentoRepository} from '../repositories';

export class DepartamentoSurculsalController {
  constructor(
    @repository(DepartamentoRepository) protected departamentoRepository: DepartamentoRepository,
  ) { }

  @get('/departamentos/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Array of Departamento has many Surculsal',
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
    return this.departamentoRepository.surculsals(id).find(filter);
  }

  @post('/departamentos/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Departamento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Surculsal)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Departamento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Surculsal, {
            title: 'NewSurculsalInDepartamento',
            exclude: ['id'],
            optional: ['departamentoId']
          }),
        },
      },
    }) surculsal: Omit<Surculsal, 'id'>,
  ): Promise<Surculsal> {
    return this.departamentoRepository.surculsals(id).create(surculsal);
  }

  @patch('/departamentos/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Departamento.Surculsal PATCH success count',
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
    return this.departamentoRepository.surculsals(id).patch(surculsal, where);
  }

  @del('/departamentos/{id}/surculsals', {
    responses: {
      '200': {
        description: 'Departamento.Surculsal DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Surculsal)) where?: Where<Surculsal>,
  ): Promise<Count> {
    return this.departamentoRepository.surculsals(id).delete(where);
  }
}
