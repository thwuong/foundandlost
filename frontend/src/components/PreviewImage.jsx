import React, { useEffect, useState } from "react";
import { Badge } from "@chakra-ui/react";
function PreviewImage(props) {
  const { files, handleRemove } = props;
  const [images, setImages] = useState([]);

  useEffect(() => {
    let images = [];
    const fileReaders = [];
    let isCancel = false;
    if (files && [...files].length > 0) {
      [...files].forEach((file) => {
        const fileReader = new FileReader();
        fileReaders.push(fileReader);
        fileReader.onload = (e) => {
          const { result } = e.target;
          if (result) {
            images.push({ src: result, name: file?.name });
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
    } else {
      images = [];
    }
  }, [files]);

  const onRemove = (name) => {
    handleRemove(name);
    setImages(
      images.filter((image, i) => {
        return image.name !== name;
      })
    );
  };
  return (
    <div className="mt-5">
      {images && images.length > 0 ? (
        <h3 className="font-semibold">
          <Badge ml="1" colorScheme="green">
            New
          </Badge>
        </h3>
      ) : null}
      <div className="flex gap-5 flex-wrap mt-2">
        {images && images.length > 0
          ? images.map((image, index) => {
              return (
                <div key={index} className="xl:w-40 xl:h-40 w-20 h-20 relative">
                  <img
                    src={image.src}
                    alt=""
                    className="h-full w-full object-cover"
                  ></img>
                  <p
                    onClick={() => {
                      onRemove(image.name);
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
    </div>
  );
}

export default PreviewImage;
