import React, { forwardRef } from "react";

const ThumbnailUpload = forwardRef(
  ({ preview, onSelect, openPicker }, ref) => {
    return (
      <div className="flex flex-col items-center gap-4">
        <div
          onClick={openPicker}
          className="flex flex-col items-center justify-center w-10/12 h-48 border-2 border-dashed border-gray-400 rounded-xl cursor-pointer hover:bg-gray-100 transition"
        >
          {preview ? (
            <img
              src={preview}
              alt="Thumbnail Preview"
              className="w-full h-full object-cover rounded-xl"
            />
          ) : (
            <p className="text-gray-500 text-center px-3">Click to upload image</p>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          ref={ref}
          onChange={onSelect}
          className="hidden"
        />
      </div>
    );
  }
);

export default ThumbnailUpload;
