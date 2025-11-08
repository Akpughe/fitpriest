import Image from "next/image";

interface Avatar {
  src: string;
  alt: string;
}

interface AvatarGroupProps {
  avatars: Avatar[];
  max?: number;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

export function AvatarGroup({ avatars, max = 4, size = "md" }: AvatarGroupProps) {
  const displayAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className="flex items-center -space-x-2">
      {displayAvatars.map((avatar, index) => (
        <div
          key={index}
          className={`${sizeClasses[size]} rounded-full border-2 border-white overflow-hidden
                      shadow-md hover:scale-110 transition-transform duration-200 relative z-10
                      hover:z-20`}
          style={{ zIndex: displayAvatars.length - index }}
        >
          <Image
            src={avatar.src}
            alt={avatar.alt}
            fill
            className="object-cover"
          />
        </div>
      ))}
      {remainingCount > 0 && (
        <div
          className={`${sizeClasses[size]} rounded-full border-2 border-white bg-brand-orange-500
                      flex items-center justify-center shadow-md hover:scale-110 transition-transform
                      duration-200 relative z-10`}
        >
          <span className="text-white text-xs font-semibold">
            +{remainingCount}
          </span>
        </div>
      )}
    </div>
  );
}
