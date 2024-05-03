const prisma = require('../infrastructure/db')

// GET /employees
module.exports.get_employees = async (req, res) => {
  try {

    return await res.status(200).json(await prisma.employee.findMany());

  } catch (error) {
    return await res.status(500).json(error);
  }
};

// POST /employee
module.exports.add_employee = async (req, res) => {
  try {
    const { first_name, last_name, gender, address, phone_number, provenance,
      date_birth, date_start, date_end, civil_status, user_id, project_id } = req.body;

    const data = {
      first_name,
      last_name,
      gender,
      address,
      phone_number,
      provenance,
      date_birth,
      date_start,
      date_end,
      civil_status,
      user_id,
      project_id
    }

    // console.log(data);

    const newEmployee = await prisma.employee.create({
      data: data
    })
    return await res.status(201).json(newEmployee);

  } catch (error) {
    return await res.status(500).json(error);
  }
};

//Update employee
module.exports.update_employee = async (req, res) => {
  const { id } = req.params;

  try {
    const isEmployeeExists = await prisma.employee.findUnique({
      where: {
        id
      }
    });

    if (!isEmployeeExists) {
      return await res.status(404).json({ message: "O funcionario que pretende actualizar nao existe!" });
    }

    const { first_name, last_name, gender, address, phone_number, provenance,
      date_birth, date_start, date_end, civil_status, user_id, project_id } = req.body;

    // console.log(req.body)

    const data = {
      first_name,
      last_name,
      gender,
      address,
      phone_number,
      provenance,
      date_birth,
      date_start,
      date_end,
      civil_status,
      user_id,
      project_id
    }

    const updatedEmployee = await prisma.employee.update({
      where: {
        id
      },

      data: data

    })
    return await res.status(200).json(updatedEmployee);

  } catch (error) {
    return await res.status(500).json(error);
  }
};

// DELETE/employee
module.exports.delete_employee = async (req, res) => {
  const { id } = req.params;

  try {
    const isEmployeeExists = await prisma.employee.findUnique({
      where: {
        id
      }
    });

    if (!isEmployeeExists) {
      return await res.status(404).json({ message: "O funcionario que pretende apagar nao existe!" });
    }

    const deletedEmployee = await prisma.employee.delete({
      where: {
        id
      }
    })
    // return await res.status(200).json({success:true});
    return await res.status(200).json({ deletedEmployee });

  } catch (error) {
    return await res.status(500).json(error);
  }
};