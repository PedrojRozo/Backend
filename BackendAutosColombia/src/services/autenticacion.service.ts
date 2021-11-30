import {injectable, /* inject, */ BindingScope} from '@loopback/core';

// Paquete para generar claves aletoreas
const generador = require("password-generator");
const cryptoJS = require("crypto-js");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */


  GenerarClave(){
    
    // Definir cantidad, intesidad contraseña
    let clave = generador(8, false);
    return clave;
  }

  CifrarClave(clave: string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }
}
