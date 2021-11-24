import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Departamento, DepartamentoRelations, Ciudad, Surculsal, Vehiculo} from '../models';
import {CiudadRepository} from './ciudad.repository';
import {SurculsalRepository} from './surculsal.repository';
import {VehiculoRepository} from './vehiculo.repository';

export class DepartamentoRepository extends DefaultCrudRepository<
  Departamento,
  typeof Departamento.prototype.id,
  DepartamentoRelations
> {

  public readonly ciudads: HasManyRepositoryFactory<Ciudad, typeof Departamento.prototype.id>;

  public readonly surculsals: HasManyRepositoryFactory<Surculsal, typeof Departamento.prototype.id>;

  public readonly u: HasManyRepositoryFactory<Vehiculo, typeof Departamento.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('SurculsalRepository') protected surculsalRepositoryGetter: Getter<SurculsalRepository>, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>,
  ) {
    super(Departamento, dataSource);
    this.u = this.createHasManyRepositoryFactoryFor('u', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('u', this.u.inclusionResolver);
    this.surculsals = this.createHasManyRepositoryFactoryFor('surculsals', surculsalRepositoryGetter,);
    this.registerInclusionResolver('surculsals', this.surculsals.inclusionResolver);
    this.ciudads = this.createHasManyRepositoryFactoryFor('ciudads', ciudadRepositoryGetter,);
    this.registerInclusionResolver('ciudads', this.ciudads.inclusionResolver);
  }
}
