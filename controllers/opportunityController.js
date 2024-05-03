const prisma = require('../infrastructure/db')

module.exports.get_opportunities = async (req, res) => {
    try {

        return await res.status(200).json(await prisma.opportunity.findMany());

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.add_opportunity = async (req, res) => {
    try {
        const { description_opportunity, details, date_start, date_end, responsible, published_by, project_id,
            employee_id } = req.body;

        const data = {
            description_opportunity, details, date_start, date_end, responsible, published_by, project_id, 
            employee_id };

        // console.log(data);

        const newOpportunity = await prisma.opportunity.create({
            data: data
        })
        return await res.status(201).json(newOpportunity);

    } catch (error) {
        // console.log("error oportunity create");
        return await res.status(500).json(error);
    }
};

module.exports.update_opportunity = async (req, res) => {
    const { id } = req.params;
    try {

        const isOpportunityExists = await prisma.opportunity.findUnique({
            where: {
                id
            }
        });

        if (!isOpportunityExists) {
            return await res.status(404).json({ message: "A opportunidade que pretende actualizar nao existe!" });
        }

        const { description, details, date_start, date_end, responsible, published_by, project_id,
            employee_id } = req.body;

        const data = {
            description, details, date_start, date_end, responsible, published_by, project_id,
            employee_id
        };

        const updatedOpportunity = await prisma.opportunity.update({
            where: {
                id
            },

            data: data

        })
        return await res.status(200).json(updatedOpportunity);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.delete_opportunity = async (req, res) => {
    const { id } = req.params;
    try {
        const isOpportunityExists = await prisma.opportunity.findUnique({
            where: {
                id
            }
        });

        if (!isOpportunityExists) {
            return await res.status(404).json({ message: "A oportunidade que pretende apagar nao existe!" });
        }

        const deletedOpportunity = await prisma.opportunity.delete({
            where: {
                id
            }
        })
        // return await res.status(200).json({success:true});
        return await res.status(200).json({ deletedOpportunity });

    } catch (error) {
        return await res.status(500).json(error);
    }
};