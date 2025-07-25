"use client";

import { User } from 'lucide-react';

interface UserAvatarProps {
  src?: string;
  alt?: string;
}

export function UserAvatar({ src, alt = "User" }: UserAvatarProps) {
  return (
    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-gray-800">
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center bg-gray-700">
          <User className="w-6 h-6 text-gray-400" />
        </div>
      )}
    </div>
  );
}