import React, { useState } from "react";

const Uploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="p-4 bg-white rounded-md shadow-md">
      <label
        htmlFor="htmlFile"
        className="block mb-4 text-lg font-bold text-gray-800"
      >
        Upload an HTML File
      </label>
      <label htmlFor="htmlFile" className="relative cursor-pointer">
        <span className="inline-block py-2 px-4 bg-blue-500 text-white rounded-md shadow-md">
          Select File
        </span>
        <input
          id="htmlFile"
          type="file"
          accept=".html"
          onChange={handleFileChange}
          className="opacity-0 absolute top-0 left-0 w-full h-full cursor-pointer"
        />
      </label>
      <div className="flex flex-col items-center justify-center h-[10rem] sm:h-[16rem] border-2 border-dashed border-gray-400 rounded-md cursor-pointer">
        {selectedFile ? (
          <div>
            <p className="mb-2 text-gray-800">{selectedFile.name}</p>
            <p className="text-sm text-gray-600">
              Size: {(selectedFile.size / 1024).toFixed(2)} KB
            </p>
          </div>
        ) : (
          <div>
            <svg
              className="w-12 h-12 text-gray-400 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M12 2C6.48 2 2 6.48 2 12c0 5.52 4.48 10 10 10s10-4.48 10-10c0-5.52-4.48-10-10-10zm0 18c-4.41 0-8-3.59-8-8 0-4.41 3.59-8 8-8 4.41 0 8 3.59 8 8 0 4.41-3.59 8-8 8zm-2-9h4v3h2v-5h-6v2zm6-8H9c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 12H9v-2h6v2zm0-4H9V7h6v4z" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">
              Drag and drop or click to upload a file
            </p>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Accepted file format: HTML (.html)
      </p>
    </div>
  );
};

export default Uploader;
