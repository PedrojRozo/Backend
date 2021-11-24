import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Asesor} from './asesor.model';

@model()
export class Vehiculo extends Entity {
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
  foto: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  valor: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @property({
    type: 'string',
  })
  video?: string;

  @property({
    type: 'string',
  })
  solicitudId?: string;

  @property({
    type: 'string',
  })
  tipoVehiculoId?: string;

  @belongsTo(() => Asesor)
  asesorId: string;

  @property({
    type: 'string',
  })
  departamentoId?: string;

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
