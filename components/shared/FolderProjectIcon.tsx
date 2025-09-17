import React from "react";

type FolderProjectIconProps = {
  className?: string;
  title?: string;
};

// Ikon folder "advanced" monokrom adaptif menggunakan currentColor
// - Menggunakan layer tutup (flap) dan body dengan detail garis
// - Semua fill/stroke mengikuti currentColor agar adaptif light/dark
export function FolderProjectIcon({ className, title = "Project Folder" }: FolderProjectIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Body shadow outline */}
      <path
        d="M3.5 7.75c0-1.105.895-2 2-2h3.1c.53 0 1.04.211 1.415.586l.828.828c.375.375.885.586 1.415.586H18.5c1.105 0 2 .895 2 2v7.9c0 1.105-.895 2-2 2h-13c-1.105 0-2-.895-2-2v-8.9z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.3"
      />
      {/* Flap */}
      <path
        d="M3.5 9.25c0-.966.784-1.75 1.75-1.75H9c.46 0 .902.183 1.227.508l.59.59c.325.325.767.508 1.227.508h5.706c.966 0 1.75.784 1.75 1.75v.7H3.5v-1.306z"
        fill="currentColor"
        opacity="0.18"
      />
      {/* Front body */}
      <rect x="3.5" y="9.95" width="17" height="8.3" rx="1.4" ry="1.4" fill="currentColor" opacity="0.08" />
      {/* Detail lines */}
      <path d="M6.2 13h7.2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      <path d="M6.2 15.6h11.6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export default FolderProjectIcon;
