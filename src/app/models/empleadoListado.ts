export interface IEmpleadosListado {
    id: number;
    codigo: string;
    nombre: string;
    rfc: string;
    curp: string;
    imss: string;
    correo: string;
    sueldo: number;
    sdi: number;
    alta: Date;
    altaTxt: string | undefined;
    baja: Date | undefined;
    bajaTxt: string | undefined;
    idDepartamento: number;
    departamento: string;
    idHorario: string;
    horario: string;
    datosValidosCFDI40: string;
    valorValidosCFDI40: number;
}