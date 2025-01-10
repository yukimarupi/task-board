import React from "react";
import Image from "next/image";

interface ProfileCardProps {
  name: string;
  role: string;
  image: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, role, image }) => {
  return (
    <div className="flex items-center mb-8">
      <Image
        src={image}
        alt="Profile"
        width={40}
        height={40}
        className="rounded-full"
      />
      <div className="ml-4">
        <h3 className="text-sm font-bold">{name}</h3>
        <p className="text-xs text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default ProfileCard;
