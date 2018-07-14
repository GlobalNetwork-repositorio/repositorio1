import { Sucursal } from "../sucursales/sucursal.model";
import { Area } from "../areas/area.model";

export class Usuario {
    constructor(
        public idUsuario: number = null,
        public contrasena: string = null,
        public direccion: string = null,    
        public fechaIngreso: string = null,
        public fechaNacimiento: string = null,
        public nombreApellido: string = null,
        public sexo: string = null,
        public telefono: string = null,
        public usuario: string = null,
        public sucursal: Sucursal = null,
        public area: Area = null
    ) {        
    }
  
}

  