import { useState } from "react";

const useBackgroundImage = (imageUrl) => {
  const [backgroundImageUrl, setBackgroundImageUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/miniblog-9fed5.appspot.com/o/123.png?alt=media&token=45bd3cef-3f3e-44d6-a212-1f74e13b7163"
  );

  return backgroundImageUrl;
};

export default useBackgroundImage;
