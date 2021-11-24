import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administrador, AdministradorRelations, Asesor, TipoVehiculo} from '../models';
import {AsesorRepository} from './asesor.repository';
import {TipoVehiculoRepository} from './tipo-vehiculo.repository';

export class AdministradorRepository extends DefaultCrudRepository<
  Administrador,
  typeof Administrador.prototype.id,
  AdministradorRelations
> {

  public readonly asesors: HasManyRepositoryFactory<Asesor, typeof Administrador.prototype.id>;

  public readonly tipoVehiculos: HasManyRepositoryFactory<TipoVehiculo, typeof Administrador.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('AsesorRepository') protected asesorRepositoryGetter: Getter<AsesorRepository>, @repository.getter('TipoVehiculoRepository') protected tipoVehiculoRepositoryGetter: Getter<TipoVehiculoRepository>,
  ) {
    super(Administrador, dataSource);
    this.tipoVehiculos = this.createHasManyRepositoryFactoryFor('tipoVehiculos', tipoVehiculoRepositoryGetter,);
    this.registerInclusionResolver('tipoVehiculos', this.tipoVehiculos.inclusionResolver);
    this.asesors = this.createHasManyRepositoryFactoryFor('asesors', asesorRepositoryGetter,);
    this.registerInclusionResolver('asesors', this.asesors.inclusionResolver);
  }
}
