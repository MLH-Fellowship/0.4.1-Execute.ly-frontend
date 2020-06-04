// Returns width and height of after resizing the image.
// It maintains the aspect ratio
export const getResizedImageDimensions = ({ width, height, maxWidth, maxHeight }) => {
  let ratio = 0;
  let resizedWidth = null;
  let resizedHeight = null;

  if (height <= maxHeight && width <= maxWidth) {
    resizedWidth = width;
    resizedHeight = height;
  } else if (width > maxWidth && width >= height) {
    ratio = width / height;
    if (maxWidth / ratio > maxHeight) {
      ratio = height / width;
      resizedWidth = maxHeight / ratio;
      resizedHeight = maxHeight;
    } else {
      resizedHeight = maxWidth / ratio;
      resizedWidth = maxWidth;
    }
  } else if (height > maxHeight && height > width) {
    ratio = height / width;
    if (maxHeight / ratio > maxWidth) {
      ratio = width / height;
      resizedHeight = maxWidth / ratio;
      resizedWidth = maxWidth;
    } else {
      resizedWidth = maxHeight / ratio;
      resizedHeight = maxHeight;
    }
  } else {
    // eslint-disable-next-line no-lonely-if
    if (height > maxHeight && width < maxWidth) {
      ratio = height / width;
      resizedWidth = maxHeight * ratio;
      resizedHeight = maxHeight;
    } else {
      ratio = height / width;
      resizedWidth = width;
      resizedHeight = height * ratio;
    }
  }

  return {
    resizedWidth,
    resizedHeight,
  };
};


export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});