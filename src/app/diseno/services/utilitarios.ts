import { FormGroup } from "@angular/forms";
import { isArray } from "util";

export class Utilitarios {

    // suma las columnas especificadas de un conjunto de datos
    sumarColumdaData(data: any[], columnas:string[]): any {
        let rpt: any = [];
        let suma: number = 0;        
        columnas.map(x => {
            data.map(z => {               
                return suma += z[x];
            });
            rpt.push({'header': x, 'suma': suma});
        })
        return rpt;
    }


    // devuelve un array {campo, valor} de los controles que fueron modifcados del formulario.
    soloControlesModificados(model: any, form: FormGroup): any {
        let ArrayControlDirty: any = []
        if (form.dirty) {
            Object.keys(form.controls).map(x => {
                const control = form.controls[x];
                if (control.dirty) {
                    ArrayControlDirty.push({ "campo": x, "valor": this.arraySinNull(model[x]) });
                }
            });
        }
        return ArrayControlDirty.length === 0 ? null : ArrayControlDirty;
    }

    // filtra los valores exitentes y devuelve un string separado por comas
    arraySinNull(_array: any): string{        
        if (typeof _array !== 'object') { return _array;}
        return Object.values(_array).filter(x => x).join(',');
    }
}