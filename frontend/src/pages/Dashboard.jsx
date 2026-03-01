import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Alert from '../components/Alert';
import { studentService } from '../services/api';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    fetchStatistics();
  }, []);

  const fetchStatistics = async () => {
    try {
      const response = await studentService.getStatistics();
      setStats(response.data.data);
    } catch (error) {
      setAlert({
        type: 'error',
        message: 'Failed to load statistics',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-8 bg-gray-100 overflow-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Dashboard</h1>

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm font-medium">
                  Total Students
                </div>
                <div className="text-4xl font-bold text-blue-600 mt-2">
                  {stats?.totalStudents || 0}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm font-medium">
                  By Level
                </div>
                <div className="mt-4 space-y-2">
                  {stats?.byLevel?.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <span className="text-gray-600">{item._id}</span>
                      <span className="font-bold text-blue-600">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="text-gray-500 text-sm font-medium">
                  By Filière
                </div>
                <div className="mt-4 space-y-2 max-h-48 overflow-y-auto">
                  {stats?.byFiliere?.map((item) => (
                    <div key={item._id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item._id}</span>
                      <span className="font-bold text-blue-600">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
