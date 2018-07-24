import * as moment from 'moment';

export class UtilitariosFecha {
   
    
    preparar_fecha_enviar_servicio(fecha: Date | string) {
        return fecha instanceof Date ? 
            this.convertir_fecha_enviar_servicio(fecha) : 
            this.deStringToDateFormat(fecha, 'dd/mm/yyyy');        
    }

    // verifica si es una fecha y lo alista para enviarlo al back end
    convertir_fecha_enviar_servicio(fecha: Date) {
        moment.locale();
        return moment(fecha).format("DD/MM/YYYY");
    }

    // convierte fecha en formato que acepta el input type date
    convertir_fecha_mostrar_input(fecha: Date) {        
        return moment(fecha).format("YYYY-MM-DD");
    }

    // posiciona la fecha que viene en string, dd/mm/yyy yyyy-mm-dd
    deStringToDateFormat(fecha: string, format?: string): string {
    let rpt: string;    
    if (format === "dd/mm/yyyy") { 
      rpt = fecha.replace(/(\d+)[-/](\d{2})[-/](\d{2})/, "$3/$2/$1");
    } else {
      rpt = fecha.replace(/(\d{2})[-/](\d{2})[-/](\d+)/, "$3-$2-$1"); 
    }    
    return rpt;   
  }

}