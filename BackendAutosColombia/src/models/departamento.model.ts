import {Entity, model, property, hasMany} from '@loopback/repository';
import {Ciudad} from './ciudad.model';
import {Surculsal} from './surculsal.model';
import {Vehiculo} from './vehiculo.model';

@model()
export class Departamento extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @hasMany(() => Ciudad)
  ciudads: Ciudad[];

  @hasMany(() => Surculsal)
  surculsals: Surculsal[];

  @hasMany(() => Vehiculo)
  u: Vehiculo[];

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
