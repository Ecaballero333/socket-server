import { Socket } from 'socket.io';
import SocketIO  from 'socket.io';
import { UsuariosLista } from '../classes/usuarios-lista';
import { Usuario } from '../classes/usuario';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = (cliente: Socket) => {
    const usuario = new Usuario(cliente.id);
    usuariosConectados.agregarUsuario(usuario);
}

export const desconectar = (cliente: Socket)=>{
    cliente.on('disconnect',()=>{
        console.log('Cliente desconectado');
        const usuBorrado = usuariosConectados.borrarUsaurio(cliente.id);
        console.log(`Usuario borrado ${usuBorrado?.id}`);
    })
}

//Escuchar mensajes
export const mensaje = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('mensaje', (payload: {de:String, cuerpo: string})=>{

        console.log('Mensaje recibido', payload);

        io.emit('mensaje-nuevo', payload);

    });
}

//Configurar usuario
export const configurarUsuario = (cliente: Socket, io: SocketIO.Server) => {
    cliente.on('configurar-usuario', (payload: {nombre:string}, callback: Function, c2: Function)=>{

        usuariosConectados.actualizarNombre(cliente.id,payload.nombre);

        callback(
        {            
            ok:true,
            mensaje: `Usuario ${payload.nombre}, configurado`
        }, console.log('ppp'));

    });
}