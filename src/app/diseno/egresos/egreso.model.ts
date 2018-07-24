import { Cuenta } from "../cuentabancaria/cuenta.model";
import { MedioPago } from "../tipopago/medio.pago.model";
import { Sucursal } from "../sucursales/sucursal.model";
import { Usuario } from "../usuarios/usuario.model";
import { ConceptoRegistro } from "../categresos/concepto.registro.model";

export class Egreso {
    constructor(
        public idEgreso: number = null,
        public detalles: string = null,
        public fecha: Date = null,
        public hora: string = null,
        public imagen: string = null,
        public monto: number = null,
        public conceptoRegistro: ConceptoRegistro = null,
        public cuenta: Cuenta = null,
        public medioPago: MedioPago = null,
        public sucursal: Sucursal = null,
        public usuario: Usuario = null
    ) {

    }
}

