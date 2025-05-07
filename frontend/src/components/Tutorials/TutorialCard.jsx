import React from 'react';
import { Link } from 'react-router-dom';
import { FaPlay, FaClock, FaUser } from 'react-icons/fa';
import mangoImage from '../../assets/images/mango.jpg';

function TutorialCard({ tutorial }) {
  // Function to get video thumbnail from YouTube URL
  const getThumbnailUrl = (videoUrl) => {
    if (!videoUrl) return mangoImage;
    
    // Handle YouTube URLs
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtube.com')
        ? videoUrl.split('v=')[1]?.split('&')[0]
        : videoUrl.split('be/')[1];
      return `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`;
    }
    
    // Handle Vimeo URLs
    if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1];
      return `https://vumbnail.com/${videoId}.jpg`;
    }
    
    return mangoImage;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative">
        <img
          src={getThumbnailUrl(tutorial.videoUrl)}
          alt={tutorial.title}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = mangoImage;
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
          <FaPlay className="text-white text-4xl" />
        </div>
      </div>
      
      <div className="p-4">
        <Link to={`/tutorials/${tutorial.id}`} className="block">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 hover:text-blue-600 transition-colors duration-200">
            {tutorial.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {tutorial.description}
        </p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <FaUser className="mr-1" />
            <span>{tutorial.author || 'Unknown Author'}</span>
          </div>
          <div className="flex items-center">
            <FaClock className="mr-1" />
            <span>{tutorial.duration || 'N/A'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialCard;
