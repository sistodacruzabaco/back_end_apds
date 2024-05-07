const bcrypt = require('bcrypt');
const prisma = require('../infrastructure/db');
const {authSchema} = require('../utils/validation');

module.exports.get_users = async (req, res) => {
    try {
        // console.log("user")
        return await res.status(200).json(await prisma.user.findMany());

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.add_user = async (req, res) => {
    try {
        
        userValidated = await authSchema.validateAsync(req.body);
        // const { email, password, role } = userValidated;

        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(userValidated.password, salt);

        const isEmailUnique = await prisma.user.findUnique({
            where: {
                email: userValidated.email
            }
        });

        if (isEmailUnique) {
            return await res.status(422).json({ message: "Ja existe utilizador com o USERNAME de: " 
                + userValidated.email + ", insira outro por favor!" });
        }

        const data = {
            email: userValidated.email,
            hashed_password,
            role: userValidated.role
        }

        // console.log(data);
        
        const newUser = await prisma.user.create({
            data: data,
        })

        return await res.status(201).json(newUser);

    } catch (error) {

        if (error.isJoi === true) return await res.status(422).json(error); // caso haja problemas com o lado cliente (ex.: dados errados)

        return await res.status(500).json(error); //caso haja problemas com o lado servidor
    }
};

module.exports.update_user = async (req, res) => {
    const { id } = req.params;

    try {
        const {
            // email, 
            password,
            role
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashed_password = await bcrypt.hash(password, salt);

        const isUserExists = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!isUserExists) {
            return await res.status(404).json({ message: "O utilizador que pretende actualizar nao existe!" });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id
            },

            data: {
                // email: email,
                hashed_password: hashed_password,
                role: role,
            }
        })
        return await res.status(200).json(updatedUser);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.delete_user = async (req, res) => {
    const { id } = req.params;

    try {
        const isUserExists = await prisma.user.findUnique({
            where: {
                id
            }
        });

        if (!isUserExists) {
            return await res.status(404).json({ message: "O utilizador que pretende apagar nao existe!" });
        }

        const deletedUser = await prisma.user.delete({
            where: {
                id
            }
        })
        // return await res.status(200).json({success:true});
        return await res.status(200).json({ deletedUser });

    } catch (error) {
        return await res.status(500).json(error);
    }
};