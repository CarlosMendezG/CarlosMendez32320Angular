export function CVFechaT(fecha: string | undefined): Date {
    if (!fecha || fecha.length < 10) return new Date(1900, 0, 1);
    let año: number = parseInt(fecha.substring(0, 4));
    let mes: number = parseInt(fecha.substring(5, 7));
    let dia: number = parseInt(fecha.substring(8, 10));
    if (fecha.length < 12) return new Date(año, mes - 1, dia);

    let hora: number = parseInt(fecha.substring(11, 13));
    let minutos: number = parseInt(fecha.substring(14, 16));
    let segundos: number = parseInt(fecha.substring(17, 18));
    return new Date(año, mes - 1, dia, hora, minutos, segundos);
}