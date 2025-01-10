// src/components/Profile/ProfileDetails.tsx
import React from 'react';

const ProfileDetails = ({ name, email }: { name: string; email: string }) => {
  return (
    <div className="border p-4 rounded-md shadow">
      <h2 className="text-xl font-semibold">{name}</h2>
      <p>{email}</p>
    </div>
  );
};

export default ProfileDetails;
