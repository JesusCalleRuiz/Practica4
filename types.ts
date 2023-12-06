export enum Estados {
    TODO,
    INPROGRESS,
    INTEST,
    CLOSED
}

export type Tarea = {
    id : string;
    trabajador : Trabajador;
    empresa : Empresa;
    estado : Estados
}

export type Empresa = {
    id : string;
    trabajadores : Trabajador[];
    nombre : string;
    codPostal : number
}

export type Trabajador = {
    id : string;
    dni : string;
    empresa : Empresa;
    tareas : Tarea[];
    nombre : string;
    apellidos : string;
    email : string;
    telefono : number
}


