import { useState, useEffect } from "react";

const useImageLoad = (src) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => setIsLoaded(true);
  }, [src]);

  return isLoaded;
};

export default useImageLoad;