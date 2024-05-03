const prisma = require('../infrastructure/db')

module.exports.get_activities = async (req, res) => {
    try {

        return await res.status(200).json(await prisma.activity.findMany());

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.add_activity = async (req, res) => {
    try {
        const { description_activity, local_activity, purpose_activity, activity_information, responsible, 
            participants, date_start, date_end, activity_status, project_id, employee_id } = req.body;

        const data = { description_activity, local_activity, purpose_activity, activity_information, responsible, 
           imagem : req.file.filename, participants, date_start, date_end, activity_status, project_id, employee_id};

        // console.log(data);

        const newActivity = await prisma.activity.create({
            data: data
        })
        return await res.status(201).json(newActivity);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.update_activity = async (req, res) => {
    const { id } = req.params;
    try {

        const isActivityExists = await prisma.activity.findUnique({
            where: {
                id
            }
        });

        if (!isActivityExists) {
            return await res.status(404).json({ message: "A actividade que pretende actualizar nao existe!" });
        }

        const { description_activity, local_activity, purpose_activity, activity_information, responsible, 
            imagem, participants, date_start, date_end, activity_status, project_id, employee_id } = req.body;
  
          const data = { description_activity, local_activity, purpose_activity, activity_information, responsible, 
             imagem, participants, date_start, date_end, activity_status, project_id, employee_id};

        const updatedActivity = await prisma.activity.update({
            where: {
                id
            },

            data: data

        })
        return await res.status(200).json(updatedActivity);

    } catch (error) {
        return await res.status(500).json(error);
    }
};

module.exports.delete_donation = async (req, res) => {
    const { id } = req.params;
    try {
        const isActivityExists = await prisma.activity.findUnique({
            where: {
                id
            }
        });

        if (!isActivityExists) {
            return await res.status(404).json({ message: "A actividade que pretende apagar nao existe!" });
        }

        const deletedActivity = await prisma.activity.delete({
            where: {
                id
            }
        })
        // return await res.status(200).json({success:true});
        return await res.status(200).json({ deletedActivity });

    } catch (error) {
        return await res.status(500).json(error);
    }
};