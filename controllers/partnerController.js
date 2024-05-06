const prisma = require('../infrastructure/db')

module.exports.get_partners = async (req, res) => {
    try {

        return await res.status(200).json(await prisma.partner.findMany());

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.add_partner = async (req, res) => {
    try {
        const { partner_name, email, nuit, address, project_id } = req.body;

        const data = { partner_name, email, nuit, address, logotipo : req.file.buffer, project_id }

        // console.log(data);

        const newPartner = await prisma.partner.create({
            data: data
        })
        return await res.status(201).json(newPartner);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.update_partner = async (req, res) => {
    const { id } = req.params;
    try {

        const isPartnerExists = await prisma.partner.findUnique({
            where: {
                id
            }
        });

        if (!isPartnerExists) {
            return await res.status(404).json({ message: "O parceiro que pretende actualizar nao existe!" });
        }

        const { partner_name, email, nuit, address, logotipo, project_id } = req.body;

        const data = { partner_name, email, nuit, address, logotipo, project_id }

        const updatedPartner = await prisma.partner.update({
            where: {
                id
            },

            data: data

        })
        return await res.status(200).json(updatedPartner);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.delete_partner = async (req, res) => {
    const { id } = req.params;
    try {
        const isPartnerExists = await prisma.partner.findUnique({
            where: {
                id
            }
        });

        if (!isPartnerExists) {
            return await res.status(404).json({ message: "A doacao que pretende apagar nao existe!" });
        }

        const deletedPartner = await prisma.partner.delete({
            where: {
                id
            }
        })
        // return await res.status(200).json({success:true});
        return await res.status(200).json({ deletedPartner });

    } catch (error) {
        return await res.status(500).json(error);
    }
};