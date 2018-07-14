export class Proveedor {
    constructor(
        public idProveedor: number = null,
        public razonSocial: string = null,
        public ruc: string = null,
        public rubroServicio: string = null,
        public direccion: string = null,
        public telefono: string = null,
        public correo: string = null 
    ) {

    }
}