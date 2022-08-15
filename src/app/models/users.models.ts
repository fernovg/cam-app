export class userInfo{
    id?: number;
    nombre?: string;
    tipoId?: string;
    tipo?: string;
    intMatricula?: string;
    message?: string;
    result?: boolean;
}

export class userReg{
    message?: string;
    result?: boolean;
}

export class horarios{
    message?: string;
    result?: boolean;
}

export class agArea{
    message?: string;
    result?: boolean;
}
//mostrar las citas de los usuarios
export interface respuestaCitas{
    citas: userCita[];
}

export interface userCita{
    Num_Cita?: string;
    Foto?: string;
    Nombre?: string;
    Telefono?: string;
    Tutor?: string;
    Docente?: string;
    Nombre_Area?: string;
    Aula?: string;
    Fecha_Cita?: string;
    Hora?: string;
    Estado_Cita?: string;
}

export interface respuestaCitasD{
    citasD: userCitaD[];
}

export interface userCitaD{
    Num_Cita?: string;
    Foto?: string;
    Nombre?: string;
    Telefono?: string;
    Tutor?: string;
    Docente?: string;
    Nombre_Area?: string;
    Aula?: string;
    Fecha_Cita?: string;
    Hora?: string;
    Estado_Cita?: string;
}


//array para campos de agendar citas

export interface respuestaDocA{
    encar: encar_Area[];
}

export interface encar_Area{
    Matricula?: string;
    Docente?: string;
}

export interface resDocA{
    area: enArea[];
}

export interface enArea{
    idArea?: string;
    Nombre_Area?: string;
    Aula?: string;
}

export interface respuestaHora{
    hora: horario[];
}

export interface horario{
    Duracion?: string;
    HoraAten?: string;
}

export interface verHoraD{
    hora: vhorario[];
}

export interface vhorario{
    Duracion?: string;
    HoraAten?: string;
}

export interface respuestaHorario{
    hora: detalle[];
}

export interface detalle{
    ID?: string;
    Duracion?: string;
    Hora?: string;
}

export interface respuestaAreas{
    areas: listArea[];
}

export interface listArea{
    ID?: number;
    Area?: string;
    Aula?: string;
}

export interface respuestaDis{
    hora: horas[];
}

export interface horas{
    Horas?: string;
    HoraC?: string;
}

export interface respuestaDocentes{
    listDocen: Docen[];
}

export interface Docen{
    Matricula?: number;
    Nombre?: string;
}

export interface respuestaAlumno{
    alum: listAlum[];
}

export interface listAlum{
    Matricula?: number;
    Nombre?: string;
}

//agendar citas docente

export class citasRegD{
    message?: string;
    result?: boolean;
}

export class citasSoliA{
    message?: string;
    result?: boolean;
}

//aprobar citas 

export class aprobarCita{
    message?: string;
    result?: boolean;
}

export class rechazarCita{
    message?: string;
    result?: boolean;
}

//reagendar citas 

export class reagenCita{
    message?: string;
    result?: boolean;
}


export class borrarHorario{
    message?: string;
    result?: boolean;
}