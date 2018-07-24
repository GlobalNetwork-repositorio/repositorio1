export const URL_SERVICIOS = 'http://localhost:8080/sigo';

export const MSJ_SUCCESS: any = { 
    position: 'top-end',
    type: 'success', 
    title: 'Se guardo correctamente.', 
    showConfirmButton: false, 
    timer: 1000 };

export const MSJ_ALERT_BORRAR: any = {
    title: 'Esta seguro?',
    text: "Borrar registro seleccionado",
    type: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Si Borrar!'
};
