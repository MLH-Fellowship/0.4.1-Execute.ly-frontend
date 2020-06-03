import React, { useState } from "react";
import { Layout, Row, Card, Button, Icon, Alert } from "antd";
import styled from "styled-components";
import { Subscribe } from "unstated";

import MainLayout from "../../components/MainLayout";
import ImagePlaceholder from "../../assets/image-placeholder.png";
import OCRContainer from "./OCRContainer";

const { Content } = Layout;

const StyledPage = styled.div`
  padding-top: 1rem;
  min-height: 100vh;

  .image-card {
    display: flex;
    width: 80%;
    margin: 0 auto;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      padding: 1rem;
      max-height: 70vh;
      object-fit: contain;
      margin: 0 auto;
    }

    button {
      width: 100%;
    }

    .next-btn {
      margin-top: 1rem;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }

  .buttons {
    margin-top: 2rem;
  }
`;

const StyledUploadButton = styled(Button)`
  position: relative;
  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 10;
    opacity: 0;
  }
`;

const UploadButton = props => (
  <StyledUploadButton disabled={props.disabled}>
    <input type="file" multiple={false} {...props} />
    <Icon type="file-image" /> New Image
  </StyledUploadButton>
);

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});

const UploadImage = () => {
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState(null);

  const handleFileChange = async e => {
    const file = e.target.files[0];
    const base64 = await toBase64(file);

    // save the base64 image in local storage
    localStorage.setItem('image', base64);

    setFile(file);
    setFilePreview(base64);
  };

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
            <StyledPage>
              <Row className="image-card">
                <Card
                  cover={
                    <img
                      src={filePreview || ImagePlaceholder}
                      alt="Placeholder"
                    />
                  }
                >
                  <UploadButton
                    onChange={handleFileChange}
                    disabled={OCR.state.loading}
                  />
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
            </StyledPage>
          </Content>
        </MainLayout>
      )}
    </Subscribe>
  );
}

export default UploadImage;
