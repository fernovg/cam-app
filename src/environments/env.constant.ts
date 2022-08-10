export class Environments{ 
    //pasar a true si se va a operar desde forma local
    //false para operar ya directo desde un movil 
    public static islocal = true;
    public static local = "http://localhost/phpCAM";
    //public static production = "http://192.168.0.109/phpCAM";
    public static production = "http://cam.enformobile.com.mx";
    //public static production = "phpcam.fvega.com.mx";

    public static ENDPOINT = Environments.islocal
    ? Environments.local
    : Environments.production;    

    public static API_ENDPOINT = `${Environments.ENDPOINT}/php`;
} 