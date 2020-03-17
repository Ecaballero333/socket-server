import { Usuario } from "./usuario";

export class UsuariosLista{
    //logica de todos los usuarios
    private lista: Usuario[] = [];

    constructor(){

    }


    public agregarUsuario(unUsuario: Usuario){
        this.lista.push(unUsuario);
        console.log(this.lista);
        return Usuario;
    }  

    public actualizarNombre(id:string, nombre: string){
        for(let usu of this.lista){
            if(usu.id === id){
                usu.nombre = nombre;
                break;
            }
        }

        console.log('======Actualizando usuario======');
        console.log(this.lista);
    }  

    public getLista(){
        return this.lista;
    }

    public getUsuario(id: string){
        return this.lista.find(usu => usu.id === id);
    }

    //Obtener usuarios en una sale en particular
    public getUsuariosEnSala(sala: string){
        return this.lista.filter(usu => usu.sala === sala);
    }

    //Borrar un usuario
    public borrarUsaurio(id: string){
        const tempUser = this.getUsuario(id);
        this.lista = this.lista.filter(usu => usu.id !== id);        
        console.log(this.lista);
        return tempUser;
    }
}