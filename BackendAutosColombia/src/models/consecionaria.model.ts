import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Consecionaria>) {
    super(data);
  }
}

export interface ConsecionariaRelations {
  // describe navigational properties here
}

export type ConsecionariaWithRelations = Consecionaria & ConsecionariaRelations;
