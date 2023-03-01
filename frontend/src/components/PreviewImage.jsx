import React, { useEffect, useState } from "react";

function PreviewImage(props) {
  const { files } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images = [];
    const fileReaders = [];
    let isCancel = false;
    if ([...files].length) {
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
  }, [files]);
  return (
    <div className="flex gap-5 flex-wrap">
      {images.length > 0
        ? images.map((image, index) => {
            return (
              <img
                src={image}
                alt=""
                key={index}
                className="w-[25%] hover:scale-150"
              ></img>
            );
          })
        : null}
    </div>
  );
}

export default PreviewImage;
