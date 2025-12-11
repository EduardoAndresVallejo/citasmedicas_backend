import Doctores from "../models/Doctores.js";
import generarJWT from "../helpers/generarJWT.js";
import generarId from "../helpers/generarid.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

const registrar = async (req, res) =>{
    const { email, nombre } = req.body;

    //prevenir usuarios duplicados
    const existeUsario = await Doctores.findOne({where: { email }})

    if(existeUsario){
        const error = new Error("usuario ya registrado");
        return res.status(400).json({msg: error.message})
    }

    try {
        //guardar Doctores
        const doctores = new Doctores(req.body)
        const doctoresGuardados = await doctores.save();

        //enviar el email
        emailRegistro({
            email,
            nombre,
            token: doctoresGuardados.token
        })

        res.json(doctoresGuardados)
    } catch (error) {
        console.log(error)
    }
};

const perfil = (req, res) =>{

    const { doctores   } = req;
    res.json(doctores  )
}

const confirmar = async (req, res) => {
    const {token} = req.body;

    const usuarioConfirmar = await Doctores.findOne({ where: { token }});

    if(!usuarioConfirmar){
        const error = new Error("Token no valido")
        return res.status(404).json({msg: error.message})
    }
    
    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true
        await usuarioConfirmar.save()

        res.json({msg: 'Usuario confirmado correctamente'}) 
    } catch (error) {
        console.log(error)
    } 
}

const authenticar = async (req, res) => {
    const {email, password} = req.body

    const usuario = await Doctores.findOne({ where: {email}})

    if(!usuario){
        const error = new Error("El usuario no existe")
        return res.status(404).json({msg: error.message})
    }

    // comprobar si el usuario esta confirmado
    if(!usuario.confirmado){
        const error = new Error("tu cuenta no ha sido confirmada");
        return res.status(403).json({msg: error.message})
    }

    // revisar password
    if(await usuario.verificarPassword(password)){

        res.json({
            id: usuario.id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(usuario.id),
        })

    }else{
        const error = new Error("El password es incorrecto");
        return res.status(403).json({msg: error.message})
    }
}

const olvidePassword = async (req, res) => {
    const { email } = req.body

    const existeDotor = await Doctores.findOne({where: { email }})
   
    if(!existeDotor){
        const error =  new Error('El Usuario no existe')
        return res.status(400).json({msg: error.message})
    }

    try {
        existeDotor.token = generarId()
        await existeDotor.save()

        emailOlvidePassword({
            email,
            nombre: existeDotor.nombre,
            token: existeDotor.token
        })
        
        res.json({smg: "Hemos enviado un email con las instrucciones"})
    } catch (error) {
       console.log(error) 
    }
}

const comprobarToken = async (req, res) =>{
    const { token } = req.body

    const tokenValido = await Doctores.findOne({ where: {token}});

    if(tokenValido){
        res.json({msg: "Token valido y el usuario existe"})
    }else{
        const error = new Error('Token no valido');
        return res.status(400).json({msg: error.message})
    }
}

const nuevoPassword = async (req, res) => {
    const { token } = req.params
    const { password } = req.body

    const doctor = await Doctores.findOne({ where: { token }})
    
    if(!doctor){
        const error = new Error('Hubo un error')
        return res.status(400).json({msg: error.message})
    }

    try {
        doctor.token = null
        doctor.password = password
        await doctor.save();
        res.json({msg: "Password modificado correctamente"});

    } catch (error) {
        console.log(error)
    }
}

const actualizarPerfil = async(req, res) => {
    const doctores = await Doctores.findByPk(req.params.id)

    if(!doctores){
        const error = new Error("Hubo un error");
        return res.status(400).json({msg: error.message})
    }

    const { email } = req.body
    if(doctores.email !== req.body.email){
        const existeEmail = await Doctores.findOne({email})
        if(existeEmail){
            const error = new Error("Este email ya esta en uso");
            return res.status(400).json({msg: error.message})
        }
    }

    try{
        doctores.nombre = req.body.nombre 
        doctores.email = req.body.email 
        doctores.web = req.body.web
        doctores.telefono = req.body.telefono

        const doctoresActualizados = await doctores.save()
        res.json(doctoresActualizados)
    }catch{
        console.log(error)
    }
}

const actualizarPassword = async (req, res) => {
    const { id } = req.doctores
    const { pwd_actual, pwd_nuevo} = req.body

    const doctores = await Doctores.findByPk(id)
    if(!doctores){
        const error = new Error("Hubo un error");
        return res.status(400).json({msg: error.message})
    }

    if(await doctores.verificarPassword(pwd_actual)){
        doctores.password = pwd_nuevo
        await doctores.save()
        res.json({msg: 'Contraseña Almacenada Correctamente'})
    }else{
        const error = new Error("La Contraseña Actual es Inncorrecta");
        return res.status(400).json({msg: error.message})
    }
}

export{
    registrar,
    perfil,
    confirmar,
    authenticar,
    olvidePassword,
    nuevoPassword,
    comprobarToken,
    actualizarPerfil,
    actualizarPassword
}