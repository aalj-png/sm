import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Alert from '../components/Alert';
import { studentService } from '../services/api';

const FILIERES = [
  'Informatique',
  'Génie Civil',
  'Génie Mécanique',
  'Génie Électrique',
  'Mathématiques',
  'Physique',
  'Chimie',
];

const NIVEAUX = ['L1', 'L2', 'L3', 'M1', 'M2'];

export default function StudentForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    matricule: '',
    prenom: '',
    nom: '',
    email: '',
    dateNaissance: '',
    filiere: '',
    niveau: '',
    telephone: '',
    adresse: '',
  });

  const [loading, setLoading] = useState(isEdit);
  const [submitting, setSubmitting] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchStudent();
    }
  }, [id]);

  const fetchStudent = async () => {
    try {
      const response = await studentService.getStudent(id);
      const student = response.data.data;
      setFormData({
        ...student,
        dateNaissance: new Date(student.dateNaissance).toISOString().split('T')[0],
      });
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to load student',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const requiredFields = ['matricule', 'prenom', 'nom', 'email', 'dateNaissance', 'filiere', 'niveau'];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setAlert({
          type: 'error',
          message: `${field} is required`,
        });
        return;
      }
    }

    setSubmitting(true);

    try {
      if (isEdit) {
        await studentService.updateStudent(id, formData);
        setAlert({
          type: 'success',
          message: 'Student updated successfully',
        });
      } else {
        await studentService.createStudent(formData);
        setAlert({
          type: 'success',
          message: 'Student added successfully',
        });
      }
      setTimeout(() => navigate('/students'), 1500);
    } catch (error) {
      setAlert({
        type: 'error',
        message: error.response?.data?.message || 'Failed to save student',
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-100 overflow-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">
            {isEdit ? 'Edit Student' : 'Add New Student'}
          </h1>

          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : (
            <div className="bg-white rounded-lg shadow p-8 max-w-2xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Matricule *
                    </label>
                    <input
                      type="text"
                      name="matricule"
                      value={formData.matricule}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Prénom *
                    </label>
                    <input
                      type="text"
                      name="prenom"
                      value={formData.prenom}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom *
                    </label>
                    <input
                      type="text"
                      name="nom"
                      value={formData.nom}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateNaissance"
                      value={formData.dateNaissance}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Filière *
                    </label>
                    <select
                      name="filiere"
                      value={formData.filiere}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select...</option>
                      {FILIERES.map((f) => (
                        <option key={f} value={f}>
                          {f}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Niveau *
                    </label>
                    <select
                      name="niveau"
                      value={formData.niveau}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select...</option>
                      {NIVEAUX.map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone
                    </label>
                    <input
                      type="tel"
                      name="telephone"
                      value={formData.telephone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Adresse
                  </label>
                  <textarea
                    name="adresse"
                    value={formData.adresse}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="flex gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 font-medium"
                  >
                    {submitting
                      ? 'Saving...'
                      : isEdit
                      ? 'Update Student'
                      : 'Add Student'}
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/students')}
                    className="bg-gray-300 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-400 font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
