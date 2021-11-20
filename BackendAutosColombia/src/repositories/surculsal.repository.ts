import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Surculsal, SurculsalRelations} from '../models';

export class SurculsalRepository extends DefaultCrudRepository<
  Surculsal,
  typeof Surculsal.prototype.id,
  SurculsalRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Surculsal, dataSource);
  }
}
