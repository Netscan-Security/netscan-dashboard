import React, { useState } from "react";

// Local import
import { Button } from "./button";

interface ImageUploaderProps {
  error?: string;
  onImageUpload: (imageUrl: string) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  error,
  onImageUpload,
}) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const validateImage = (file: File) => {
    const allowedTypes = ["image/jpeg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG and PNG files are allowed");
      return false;
    }
    return true;
  };

  const handleImageDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    file && validateImage(file) && setSelectedImage(file);
  };

  const handleImageImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    file && validateImage(file) && setSelectedImage(file);
  };

  const handleImageUpload = () => {
    if (selectedImage) {
      // Perform any necessary validation or confirmation here before uploading

      // Simulating image upload to a server
      setTimeout(() => {
        const imageUrl = "https://example.com/uploads/image.jpg";
        onImageUpload(imageUrl);
      }, 2000);
    }
  };

  return selectedImage ? (
    <>
      <div className="flex items-center justify-between w-full h-40 space-x-2">
        <div className="w-full h-full">
          <img
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            className={`object-cover w-full h-full ${
              error && "border-2 border-red-500"
            }`}
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
        <div className="flex flex-col space-y-4">
          <Button size="sm" type="button" onClick={handleImageUpload}>
            Upload Image
          </Button>
          <Button
            size="sm"
            type="button"
            variant="destructive"
            onClick={() => setSelectedImage(null)}
          >
            Remove
          </Button>
        </div>
      </div>
    </>
  ) : (
    <label
      htmlFor="image-input"
      className={`flex items-center justify-center p-1 border-2 border-gray-300 border-dashed cursor-pointer min-h-20 ${
        error && "border-red-500"
      }`}
      onDrop={handleImageDrop}
      onDragOver={(event) => event.preventDefault()}
    >
      <input
        type="file"
        accept="jpg, jpeg, png"
        onChange={handleImageImport}
        className="hidden"
        id="image-input"
      />
      <span className={`text-gray-500 ${error && "text-red-500"}`}>
        {error ? error : "Drop or import your profile picture"}
      </span>
    </label>
  );
};

export default ImageUploader;
