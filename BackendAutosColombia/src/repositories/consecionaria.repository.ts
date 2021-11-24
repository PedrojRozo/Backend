import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Consecionaria, ConsecionariaRelations, TipoVehiculo, Surculsal} from '../models';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';
import {SurculsalRepository} from './surculsal.repository';

export class ConsecionariaRepository extends DefaultCrudRepository<
  Consecionaria,
  typeof Consecionaria.prototype.id,
  ConsecionariaRelations
> {

  public readonly tipoVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Consecionaria.prototype.id>;

  public readonly surculsals: HasManyRepositoryFactory<Surculsal, typeof Consecionaria.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>, @repository.getter('SurculsalRepository') protected surculsalRepositoryGetter: Getter<SurculsalRepository>,
  ) {
    super(Consecionaria, dataSource);
    this.surculsals = this.createHasManyRepositoryFactoryFor('surculsals', surculsalRepositoryGetter,);
    this.registerInclusionResolver('surculsals', this.surculsals.inclusionResolver);
    this.tipoVehiculos = this.createHasManyRepositoryFactoryFor('tipoVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculos', this.tipoVehiculos.inclusionResolver);
  }
}
