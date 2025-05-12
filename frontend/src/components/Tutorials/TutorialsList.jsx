import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import tutorialService from '../../services/tutorialService';
import authService from '../../services/authService';
import TutorialCard from './TutorialCard';
import { FaThLarge, FaList, FaUser, FaClock, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';

function TutorialsList() {
  const [tutorials, setTutorials] = useState([]);
  const [filteredTutorials, setFilteredTutorials] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const user = authService.getCurrentUser();
  const navigate = useNavigate();

  const fetchTutorials = async () => {
    try {
      const response = await tutorialService.getAllTutorials();
      setTutorials(response.data);
      setFilteredTutorials(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTutorials();
  }, []);

  useEffect(() => {
    const filtered = tutorials.filter(tutorial => 
      tutorial.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tutorial.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (tutorial.author && tutorial.author.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredTutorials(filtered);
  }, [searchQuery, tutorials]);

  const handleDelete = (tutorialId) => {
    setTutorials(tutorials.filter(tutorial => tutorial.id !== tutorialId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <div className="text-red-500 mb-4">Error: {error}</div>
        <button
          onClick={() => window.location.reload()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">Tutorials</h2>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'grid' ? 'bg-white shadow' : 'hover:bg-gray-200'
              }`}
              title="Grid View"
            >
              <FaThLarge className="text-gray-600" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors duration-200 ${
                viewMode === 'list' ? 'bg-white shadow' : 'hover:bg-gray-200'
              }`}
              title="List View"
            >
              <FaList className="text-gray-600" />
            </button>
          </div>
          {user && (
            <Link
              to="/tutorials/create"
              className="bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition-colors duration-200 flex items-center"
            >
              <span className="mr-2">+</span> Create Tutorial
            </Link>
          )}
        </div>
      </div>

      {filteredTutorials.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {searchQuery ? 'No tutorials found matching your search.' : 'No tutorials available yet.'}
          </p>
          {user && !searchQuery && (
            <Link
              to="/tutorials/create"
              className="inline-block mt-4 text-blue-500 hover:text-blue-600"
            >
              Be the first to create one!
            </Link>
          )}
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTutorials.map((tutorial) => (
            <TutorialCard
              key={tutorial.id}
              tutorial={tutorial}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTutorials.map((tutorial) => (
            <div
              key={tutorial.id}
              className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Link
                    to={`/tutorials/${tutorial.id}`}
                    className="text-lg font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200"
                  >
                    {tutorial.title}
                  </Link>
                  <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                    {tutorial.description}
                  </p>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaUser className="mr-1" />
                      {tutorial.author || 'Unknown Author'}
                    </span>
                    <span className="flex items-center">
                      <FaClock className="mr-1" />
                      {tutorial.duration || 'N/A'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => navigate(`/tutorials/edit/${tutorial.id}`)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors duration-200"
                    title="Update Tutorial"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(tutorial.id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                    title="Delete Tutorial"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TutorialsList;