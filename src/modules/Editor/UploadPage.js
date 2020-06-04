import React, { useState } from "react";
import { Layout, Row, Card, Button, Icon, Alert, Input, message } from "antd";
import { useDropzone } from 'react-dropzone'
import { Subscribe } from "unstated";

import MainLayout from "../../components/MainLayout";
import ImagePlaceholder from "../../assets/image-placeholder.webp";
import OCRContainer from "./OCRContainer";
import { StyledUploadPage, StyledDropzone } from './styledComponents';

const { Content } = Layout;

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: 'image/jpeg, image/png',
    onDrop: async (files) => {
      const file = files[0];
      const base64 = await toBase64(file);

      // save the base64 image in local storage
      localStorage.setItem('image', base64);

      setFile(file);
      setFilePreview(base64);
    }
  })

  const handleImageLoadFromUrl = async () => {
    try {
      const file = await fetch(imageUrl).then(res => res.blob());

      const base64 = await toBase64(file);
      localStorage.setItem('image', base64);

      setFile(file);
      setFilePreview(base64);

    } catch (error) {
      message.error(error.message || 'Invalid Image URL', 10);
    }
  }



  return (
    <Subscribe to={[OCRContainer]}>
      {OCR => (
        <MainLayout>
          <Content>
            <Alert
              message="You can upload images of both handwritten or printed code. Currently, we support C, C++, JavaScript and Python."
              type="info"
              closable
            />
            <StyledUploadPage>
              <Row className="content">
                <Card>
                  {/*  Dropzone  */}
                  <StyledDropzone {...getRootProps({ refKey: 'innerRef' })}>
                    <input {...getInputProps()} />
                    <p>Drag 'n' drop an image here, or click to select image</p>
                  </StyledDropzone>

                  <div>OR Enter Image URL</div>

                  {/* Image Url Input */}
                  <Row>
                    <div className="image-url-input">
                      <Input placeholder="Image URL" value={imageUrl} onChange={e => setImageUrl(e.target.value)} />
                      <Button type="primary" onClick={handleImageLoadFromUrl} disabled={!imageUrl}>Load</Button>
                    </div>
                  </Row>

                  {/* Image Preview */}
                  <Card className="image-preview">
                    <img
                      src={filePreview || ImagePlaceholder}
                      alt="Placeholder"
                    />
                  </Card>


                  <Row className="next-btn">
                    <Button
                      type="primary"
                      disabled={!file}
                      loading={OCR.state.loading}
                      onClick={() => OCR.getTextFromImage(file, filePreview)}
                    >
                      <Icon type="file-search" />
                        Read Text
                      </Button>
                  </Row>

                </Card>
              </Row>
            </StyledUploadPage>
          </Content>
        </MainLayout>
      )}
    </Subscribe>
  );
}

export default UploadImage;
