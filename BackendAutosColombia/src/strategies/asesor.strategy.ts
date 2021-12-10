import { AuthenticationStrategy } from "@loopback/authentication";
import { service } from "@loopback/core";
import { HttpErrors, Request } from "@loopback/rest";
import { UserProfile } from "@loopback/security";
import  parseBearerToken  from 'parse-bearer-token';
import { AutenticacionService } from '../services';
export class EstragiaAsesor implements AuthenticationStrategy{
    name: string = 'asesor';

    // Se crea un constructor para inyectar algunas funciones
    constructor(
        //Para usar los servicios de autenticacion
        @service(AutenticacionService)
        public servicioAutenticacion: AutenticacionService
    ) {
        
    }

    async authenticate(request: Request): Promise<UserProfile | undefined>{
        let token = parseBearerToken(request);
        if (token) {
            let datos = await this.servicioAutenticacion.ValidarTokenJWT(token);
            if (datos) {
                let perfil: UserProfile = Object.assign({
                    nombre: datos.data.nombre
                });
                return perfil;
                //para usar roles
                /* if (datos.data.roles)*/
            } else {
                throw new HttpErrors[401]("Token no valido.");   
            }
        } else {
            throw new HttpErrors[401]("No se ha incluido en token en la solicitud.");
        }
    }
}