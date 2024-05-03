const prisma = require('../infrastructure/db');
const bcrypt = require('bcrypt');
const {validateAuth} = require('../utils/validation');
const jwt = require('jsonwebtoken');


module.exports.get_login = async (req, res) => {
    console.log("get login");
    return ;
}

module.exports.post_login = async (req, res) => {
    try {
        const validatedAuth = await validateAuth.validateAsync(req.body);

        const isUser = await prisma.user.findUnique({
            where: {
                email: validatedAuth.email
            }
        });

        if(isUser){
            const isPassword = await bcrypt.compare(validatedAuth.password, isUser.hashed_password);
            if(isPassword){

                const token = createToken(isUser.id);
                res.cookie('jwt', token, {httpOnly: true, maxAge: 8*60*60*1000});

                return await res.status(200).json(isUser.id);
            }
            return await res.status(400).json({message: "password incorrecta"});
        }

        return await res.status(400).json({message: "username/e-mail incorrecto"});

    } catch (error) {

        if (error.isJoi === true) return await res.status(422).json(error); // caso haja problemas com o lado cliente (ex.: dados errados)

        return await res.status(400).json({}); //caso haja problemas com o lado servidor
    }
}

const createToken = (id) =>{
    return jwt.sign({id}, 'Secret APDSCD', {
        expiresIn: 8*60*60*1000
    });
}

module.exports.get_logout = async (req, res) => {
    res.cookie('jwt', '', {maxAge: 1});
    
    return await res.status(500).json({message: "sessao encerrada!"});
}