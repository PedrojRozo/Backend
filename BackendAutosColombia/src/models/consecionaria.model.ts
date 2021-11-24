import {Entity, model, property, hasMany} from '@loopback/repository';
import {TipoVehiculo} from './tipo-vehiculo.model';
import {Surculsal} from './surculsal.model';

@model()
export class Consecionaria extends Entity {
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

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @hasMany(() => TipoVehiculo)
  tipoVehiculos: TipoVehiculo[];

  @hasMany(() => Surculsal)
  surculsals: Surculsal[];

  constructor(data?: Partial<Consecionaria>) {
    super(data);
  }
}

export interface ConsecionariaRelations {
  // describe navigational properties here
}

export type ConsecionariaWithRelations = Consecionaria & ConsecionariaRelations;
