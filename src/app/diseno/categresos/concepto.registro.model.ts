import { Concepto } from "./concepto.model";

export class ConceptoRegistro {
    constructor(
        public idConceptoRegistro: number = null,
        public descripcion: string = null,
        public concepto: Concepto = null
    ) { }
}