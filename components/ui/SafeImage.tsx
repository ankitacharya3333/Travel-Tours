"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Mountain } from "lucide-react";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

const DEFAULT_FALLBACK = "/images/fallback-himalaya.jpg";

export function SafeImage({
  src,
  alt,
  fallbackSrc = DEFAULT_FALLBACK,
  className,
  ...rest
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setCurrentSrc(fallbackSrc);
    }
  };

  if (!src) {
    return (
      <div className={`relative flex items-center justify-center bg-[#efece5] text-[#82998c] ${className || ""}`}>
        <Mountain className="w-8 h-8 opacity-40" />
      </div>
    );
  }

  return (
    <Image
      {...rest}
      src={currentSrc}
      alt={alt}
      className={className}
      onError={handleError}
    />
  );
}
