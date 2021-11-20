import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Consecionaria, ConsecionariaRelations} from '../models';

export class ConsecionariaRepository extends DefaultCrudRepository<
  Consecionaria,
  typeof Consecionaria.prototype.id,
  ConsecionariaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Consecionaria, dataSource);
  }
}
