import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Alert from '../components/Alert';
import { studentService } from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function StudentsList() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [sortBy, setSortBy] = useState('nom');
  const [sortOrder, setSortOrder] = useState('asc');
  const [pagination, setPagination] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchStudents();
  }, [page, search, sortBy, sortOrder, pageSize]);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await studentService.getStudents({
        page,
        limit: pageSize,
        search,
        sortBy,
        sortOrder,
      });
      setStudents(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to load students',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await studentService.deleteStudent(id);
      setAlert({
        type: 'success',
        message: 'Student deleted successfully',
      });
      setDeleteConfirm(null);
      fetchStudents();
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to delete student',
      });
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
    setPage(1);
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-100 overflow-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Students</h1>
            {user?.role === 'admin' && (
              <Link
                to="/students/add"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                ➕ Add Student
              </Link>
            )}
          </div>

          {alert && (
            <Alert
              message={alert.message}
              type={alert.type}
              onClose={() => setAlert(null)}
            />
          )}

          {deleteConfirm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-lg p-6 max-w-sm">
                <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                <p className="text-gray-600 mb-6">
                  Are you sure you want to delete this student?
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={() => handleDelete(deleteConfirm)}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 py-2 rounded-lg font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                placeholder="Search by name, email or matricule..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(parseInt(e.target.value));
                  setPage(1);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 per page</option>
                <option value={10}>10 per page</option>
                <option value={20}>20 per page</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : students.length === 0 ? (
            <div className="text-center text-gray-600 bg-white rounded-lg p-6">
              No students found
            </div>
          ) : (
            <>
              <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-200 border-b">
                    <tr>
                      <th
                        className="px-6 py-3 text-left font-medium text-gray-900 cursor-pointer hover:bg-gray-300"
                        onClick={() => handleSort('matricule')}
                      >
                        Matricule {sortBy === 'matricule' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th
                        className="px-6 py-3 text-left font-medium text-gray-900 cursor-pointer hover:bg-gray-300"
                        onClick={() => handleSort('nom')}
                      >
                        Name {sortBy === 'nom' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-900">
                        Email
                      </th>
                      <th
                        className="px-6 py-3 text-left font-medium text-gray-900 cursor-pointer hover:bg-gray-300"
                        onClick={() => handleSort('niveau')}
                      >
                        Level {sortBy === 'niveau' && (sortOrder === 'asc' ? '↑' : '↓')}
                      </th>
                      <th className="px-6 py-3 text-left font-medium text-gray-900">
                        Filière
                      </th>
                      {user?.role === 'admin' && (
                        <th className="px-6 py-3 text-left font-medium text-gray-900">
                          Actions
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {students.map((student) => (
                      <tr key={student._id} className="hover:bg-gray-50">
                        <td className="px-6 py-3 text-gray-900">{student.matricule}</td>
                        <td className="px-6 py-3 text-gray-900">
                          {student.prenom} {student.nom}
                        </td>
                        <td className="px-6 py-3 text-gray-600">{student.email}</td>
                        <td className="px-6 py-3 text-gray-900">{student.niveau}</td>
                        <td className="px-6 py-3 text-gray-600">{student.filiere}</td>
                        {user?.role === 'admin' && (
                          <td className="px-6 py-3 flex gap-2">
                            <Link
                              to={`/students/edit/${student._id}`}
                              className="text-blue-600 hover:underline text-sm font-medium"
                            >
                              Edit
                            </Link>
                            <button
                              onClick={() => setDeleteConfirm(student._id)}
                              className="text-red-600 hover:underline text-sm font-medium"
                            >
                              Delete
                            </button>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination && (
                <div className="mt-6 flex justify-between items-center bg-white rounded-lg shadow p-4">
                  <div className="text-sm text-gray-600">
                    Showing page {pagination.page} of {pagination.pages} (
                    {pagination.total} total)
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setPage(Math.max(1, page - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                      disabled={page === pagination.pages}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:bg-gray-200 disabled:text-gray-400"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
