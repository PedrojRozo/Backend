import {Entity, model, property} from '@loopback/repository';

@model()
export class Surculsal extends Entity {
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


  constructor(data?: Partial<Surculsal>) {
    super(data);
  }
}

export interface SurculsalRelations {
  // describe navigational properties here
}

export type SurculsalWithRelations = Surculsal & SurculsalRelations;
