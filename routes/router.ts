import {Router, Request, Response} from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/sockets';

const router = Router();

router.get('/mensajes', (req:Request, res: Response)=>{
    res.json({
        ok: true,
        mensaje: 'todo está bien!'
    });
});

router.post('/mensajes', (req:Request, res: Response)=>{
    const cuerpo = req.body.cuerpo;
    const de     = req.body.de;

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.emit('mensaje-nuevo', payload);

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req:Request, res: Response)=>{
    const cue = req.body.cue;
    const de     = req.body.de;
    const id     = req.params.id

    const server = Server.instance;

    const payload = {
        de,
        cue
    }

    server.io.in(id).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        cue,
        de,
        id
    });
});

//Servicio para obtener todos los IDs de los usuarios

router.get('/usuarios',(req: Request, res: Response)=>{
    const server = Server.instance;
    server.io.clients((err: any, clientes:string[])=>{
        if(err){
            return res.json({
              ok: false,
              err  
            });
        }
        res.json({
            ok: true,
            clientes: clientes
        });

    });
});


//Obtener usuarios y sus nombres

router.get('/usuarios/detalle',(req: Request, res: Response)=>{
    
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
});

export default router;