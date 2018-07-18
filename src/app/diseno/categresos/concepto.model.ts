import { Rubro } from "./rubro.model";

export class Concepto {
    constructor(
        public idConcepto: number = null,        
        public descripcion: string = null,
        public rubro: Rubro = null
    ) { }
}
