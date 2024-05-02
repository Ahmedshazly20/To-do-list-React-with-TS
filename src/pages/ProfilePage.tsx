import React from 'react';

const ProfilePage = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <div className="text-center mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h2 className="text-xl font-bold mt-2">John Doe</h2>
          <p className="text-gray-600">Software Developer</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p>Email: john.doe@example.com</p>
            <p>Phone: +123456789</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p>City: New York</p>
            <p>Country: USA</p>
          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
