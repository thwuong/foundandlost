import React, { useEffect, useState } from "react";

function PreviewImage(props) {
  const { files, handleRemove } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    let images = [];
    const fileReaders = [];
    let isCancel = false;
    if (files && [...files].length) {
      [...files].forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push(result);
          }
          if (images.length === files.length && !isCancel) {
            setImages(images);
          }
        };
        fileReader.readAsDataURL(file);
      });

      return () => {
        isCancel = true;
        fileReaders.forEach((fileReader) => {
          if (fileReader.readyState === 1) {
            fileReader.abort();
          }
        });
      };
    }
    if (files.length < 1) {
      images = [];
    }
  }, [files]);

  const onRemove = (index) => {
    handleRemove(index);
    images.pop(index);
  };
  return (
    <div className="flex gap-5 flex-wrap">
      {images && images.length > 0
        ? images.map((image, index) => {
            return (
              <div key={index} className="w-[15%] h-40 relative">
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                ></img>
                <p
                  onClick={() => {
                    onRemove(index);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex justify-center items-center cursor-pointer bg-gray-400 hover:bg-gray-500"
                >
                  <box-icon name="x" color="white"></box-icon>
                </p>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default PreviewImage;
