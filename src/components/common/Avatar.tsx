import React from "react";
import Image from "next/image";


interface AvatarProps {
  src: string;
  alt?: string;
  size?: string; // Tailwind CSS のクラスを渡す
}

const Avatar: React.FC<AvatarProps> = ({ src, alt = "Avatar" }) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={50} // サイズを指定
      height={50}
      className={`rounded-full border border-gray-200`}
    />

  );
};

export default Avatar;
