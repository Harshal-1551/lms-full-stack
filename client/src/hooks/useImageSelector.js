import { useRef, useState } from "react";

export const useImageSelector = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef(null);

  const openPicker = () => {
    inputRef.current?.click();
  };

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return {
    image,
    preview,
    inputRef,
    openPicker,
    handleChange,
    reset,
  };
};
