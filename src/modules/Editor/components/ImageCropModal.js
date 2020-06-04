import React, { useState, useRef } from 'react'
import styled from 'styled-components';
import { Modal, Button, Row } from 'antd';
import ReactCrop from 'react-image-crop';

import { getResizedImageDimensions, toBase64 } from '../../../utils/helpers'

import 'react-image-crop/dist/ReactCrop.css';


const StyledModal = styled.div`
  .modal__footer {
    padding-top: 1rem;
    display: flex;
    flex-direction: row-reverse;
  }
`;

// returns value in Pixels
const InPx = (value) => `${value}px`;

const getCroppedImage = (image, crop, fileName) => {
  const canvas = document.createElement('canvas');
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  canvas.width = Math.ceil(crop.width * scaleX);
  canvas.height = Math.ceil(crop.height * scaleY);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, crop.x * scaleX, crop.y * scaleY, crop.width * scaleX, crop.height * scaleY, 0, 0, crop.width * scaleX, crop.height * scaleY);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(blob);
      },
      'image/jpeg',
      1,
    );
  });
};


const ImageCropModal = ({ isVisible, closeModal, imageSrc, onCropSuccess }) => {
  const [crop, setCrop] = useState({
    unit: '%',
    width: 100,
    height: 100
  });
  const imageRef = useRef(null);

  const handleImageLoad = (image) => {
    const { naturalWidth: width, naturalHeight: height } = image;

    const img = document.querySelector('.ReactCrop__image');

    const maxWidth = 600;
    const maxHeight = 400;

    const { resizedWidth, resizedHeight } = getResizedImageDimensions({ width, height, maxWidth, maxHeight });

    img.style.width = InPx(resizedWidth);
    img.style.height = InPx(resizedHeight);

    // Save a reference to the image. Will be needed while cropping
    imageRef.current = image;
  }

  const handleImageCrop = async () => {
    const croppedImageBlob = await getCroppedImage(imageRef.current, crop, 'croppedImage.jpeg');
    const base64 = await toBase64(croppedImageBlob);
    // save the base64 image in local storage
    localStorage.setItem('image', base64);
    closeModal();
    onCropSuccess({ file: croppedImageBlob, filePreview: base64 })
  }

  return (
    <Modal
      title="Crop Image"
      centered
      width={800}
      visible={isVisible}
      footer={null}
      onCancel={closeModal}
      destroyOnClose
    >
      <StyledModal>
        <ReactCrop
          src={imageSrc}
          onImageLoaded={handleImageLoad}
          crop={crop}
          className='image-crop'
          onChange={setCrop}
        />

        <Row className="modal__footer">
          <Button type="primary" onClick={handleImageCrop}>Crop</Button>
        </Row>
      </StyledModal>
    </Modal>
  )
}

export default ImageCropModal;