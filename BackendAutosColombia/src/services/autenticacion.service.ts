import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Llaves } from '../config/llaves';
import { Cliente } from '../models';
import { ClienteRepository } from '../repositories';

// Paquete para generar claves aletoreas
const generador = require("password-generator");

// paquete para Cifrar claves
const cryptoJS = require("crypto-js");

// paquete para generar token
const jwt = require("jsonwebtoken");
@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    /* Se llama el repositorio para acceder a este */
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository
  ){}

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

  async IdentifcarCliente(usuario: string, contrasena: string){
    try {
      let c = await this.clienteRepository.findOne({where:{correo: usuario, contrasena: contrasena}});
      if (c) {
        return c;
      }
      return false;
    } catch (error) {
      return false;
    }
  }

  GenerarTokenJWT(cliente: Cliente){

    // Datos a firmar 
    let token = jwt.sign({
      data:{
        id: cliente.id,
        correo: cliente.correo,
        nombre: cliente.nombre + " " + cliente.apellido,
      }
    },
    Llaves.claveJWT);
    return token;
  }

  ValidarTokenJWT(token: string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      return false;
    }
  }
}
