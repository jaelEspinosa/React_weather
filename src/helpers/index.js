
export const formatearFecha = fecha =>{
    const nuevaFecha = new Date(fecha.split(' ')[0].split('-'))    
    const opciones = {
        weekday : 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',   
    }
    return nuevaFecha.toLocaleDateString('es-ES', opciones)
}

export const nuevaHora = fecha =>{
  
    const nuevaHora =(fecha.split(' ')[1].split(':')[0])
    const nuevoMinuto=(fecha.split(' ')[1].split(':')[1])
    const horario = nuevaHora+':'+nuevoMinuto
   return horario
}