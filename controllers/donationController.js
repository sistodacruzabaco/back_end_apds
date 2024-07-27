const prisma = require('../infrastructure/db');
const {validateDonation} = require('../utils/validation');

module.exports.get_donations = async (req, res) => {
    try {

        return await res.status(200).json(await prisma.donation.findMany());

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.add_donation = async (req, res) => {
    try {
        const dataValidated = await validateDonation.validateAsync(req.body);
        
        // const { email, first_name, last_name, address, phone_number, donor_status, project_id } = dataValidated;
        // const data = { email, first_name, last_name, address, phone_number, donor_status, project_id}

        const newDonation = await prisma.donation.create ({
            data: dataValidated
        })

        return await res.status(201).json(newDonation);

    } catch (error) {

        if (error.isJoi === true) return await res.status(422).json(error);

        return await res.status(500).json(error);
    }
};

module.exports.update_donation = async (req, res) => {
    const { id } = req.params;
    try {

        const isDonationExists = await prisma.donation.findUnique({
            where: {
                id
            }
        });

        if (!isDonationExists) {
            return await res.status(404).json({ message: "A doacao que pretende actualizar nao existe!" });
        }

        const { email, first_name, last_name, address, phone_number, donor_status, project_id } = req.body;

        const data = { email, first_name, last_name, address, phone_number, donor_status, project_id }

        const updatedDonation = await prisma.donation.update({
            where: {
                id
            },

            data: data

        })
        return await res.status(200).json(updatedDonation);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.delete_donation = async (req, res) => {
    const { id } = req.params;
    try {
        const isDonationExists = await prisma.donation.findUnique({
            where: {
                id
            }
        });

        if (!isDonationExists) {
            return await res.status(404).json({ message: "A doacao que pretende apagar nao existe!" });
        }

        const deletedDonation = await prisma.donation.delete({
            where: {
                id
            }
        })
        // return await res.status(200).json({success:true});
        return await res.status(200).json({ deletedDonation });

    } catch (error) {
        return await res.status(500).json(error);
    }
};