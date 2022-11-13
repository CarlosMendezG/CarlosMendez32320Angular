export interface Usuario {
    id: string,
    nombre: string,
    correo: string,
    tipoUsuario: TipoUsuario,
    logIn: string,
    logInDate: Date
}

export enum TipoUsuario {
    usuario = 0,
    soporte = 1,
    supervisor = 2,
    administrador = 3,
    top = 4
}

export const $tipoUsuario: { [key: number]: string } = {
    0: "Usuario",
    1: "Soporte",
    2: "Supervisor",
    3: "Administración",
    4: "Top",
    99: "Sin Registrar"
}