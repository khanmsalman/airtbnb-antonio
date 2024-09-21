"use client";
import Image from 'next/image';
import React from 'react';

interface AvatarProps {
  src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
  src
}) => {
  return (
    <Image className="rounded-full" width="30" height="30" src={ src || "/avatar.png"} alt="avatar" />
  )
}

export default Avatar