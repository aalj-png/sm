import Student from '../models/Student.js';

// Add student
export const addStudent = async (req, res) => {
  try {
    const { matricule, prenom, nom, email, dateNaissance, filiere, niveau, telephone, adresse } =
      req.body;

    // Validation
    if (!matricule || !prenom || !nom || !email || !dateNaissance || !filiere || !niveau) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    // Check if matricule already exists
    const existingStudent = await Student.findOne({ matricule });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this matricule already exists',
      });
    }

    const student = new Student({
      matricule,
      prenom,
      nom,
      email,
      dateNaissance,
      filiere,
      niveau,
      telephone,
      adresse,
    });

    await student.save();

    res.status(201).json({
      success: true,
      message: 'Student added successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all students
export const getStudents = async (req, res) => {
  try {
    const { page = 1, limit = 10, search, sortBy = 'nom', sortOrder = 'asc' } = req.query;

    let query = {};

    // Search functionality
    if (search) {
      query = {
        $or: [
          { nom: { $regex: search, $options: 'i' } },
          { prenom: { $regex: search, $options: 'i' } },
          { matricule: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } },
        ],
      };
    }

    // Sorting
    const sortObj = {};
    sortObj[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Pagination
    const skip = (page - 1) * limit;

    const students = await Student.find(query)
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(query);

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get single student
export const getStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Update student
export const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const { matricule, prenom, nom, email, dateNaissance, filiere, niveau, telephone, adresse } =
      req.body;

    // Validation
    if (!matricule || !prenom || !nom || !email || !dateNaissance || !filiere || !niveau) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided',
      });
    }

    const student = await Student.findById(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    // Check if matricule is being changed and if new matricule already exists
    if (matricule !== student.matricule) {
      const existingStudent = await Student.findOne({ matricule });

      if (existingStudent) {
        return res.status(400).json({
          success: false,
          message: 'Student with this matricule already exists',
        });
      }
    }

    // Update student
    student.matricule = matricule;
    student.prenom = prenom;
    student.nom = nom;
    student.email = email;
    student.dateNaissance = dateNaissance;
    student.filiere = filiere;
    student.niveau = niveau;
    student.telephone = telephone;
    student.adresse = adresse;

    await student.save();

    res.status(200).json({
      success: true,
      message: 'Student updated successfully',
      data: student,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Student deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get statistics
export const getStatistics = async (req, res) => {
  try {
    const total = await Student.countDocuments();

    const byLevel = await Student.aggregate([
      {
        $group: {
          _id: '$niveau',
          count: { $sum: 1 },
        },
      },
    ]);

    const byFiliere = await Student.aggregate([
      {
        $group: {
          _id: '$filiere',
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalStudents: total,
        byLevel,
        byFiliere,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
