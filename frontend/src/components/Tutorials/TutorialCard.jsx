import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaPlay, FaClock, FaUser, FaEdit, FaTrash } from 'react-icons/fa';
import mangoImage from '../../assets/images/mango.jpg';
import tutorialService from '../../services/tutorialService';
import { toast } from 'react-toastify';

function TutorialCard({ tutorial, onDelete }) {
  const navigate = useNavigate();
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef(null);

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

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Autoplay prevented:', error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (window.confirm('Are you sure you want to delete this tutorial?')) {
      try {
        await tutorialService.deleteTutorial(tutorial.id);
        toast.success('Tutorial deleted successfully');
        if (onDelete) {
          onDelete(tutorial.id);
        }
      } catch (error) {
        toast.error('Failed to delete tutorial');
        console.error('Delete error:', error);
      }
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/tutorials/edit/${tutorial.id}`);
  };

  const getEmbedUrl = (videoUrl) => {
    if (!videoUrl) return null;
    
    if (videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be')) {
      const videoId = videoUrl.includes('youtube.com')
        ? videoUrl.split('v=')[1]?.split('&')[0]
        : videoUrl.split('be/')[1];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0`;
    }
    
    if (videoUrl.includes('vimeo.com')) {
      const videoId = videoUrl.split('vimeo.com/')[1];
      return `https://player.vimeo.com/video/${videoId}?autoplay=1&mute=1&controls=0&title=0&byline=0&portrait=0`;
    }
    
    return null;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div 
        className="relative h-48"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isHovering && tutorial.videoUrl ? (
          <iframe
            ref={videoRef}
            src={getEmbedUrl(tutorial.videoUrl)}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <>
            <img
              src={getThumbnailUrl(tutorial.videoUrl)}
              alt={tutorial.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = mangoImage;
              }}
            />
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
              <FaPlay className="text-white text-4xl" />
            </div>
          </>
        )}
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

        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleUpdate}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 transition-colors duration-200"
          >
            <FaEdit className="mr-2" />
            Update
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-200"
          >
            <FaTrash className="mr-2" />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default TutorialCard;
