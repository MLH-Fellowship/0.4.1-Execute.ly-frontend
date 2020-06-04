import styled from 'styled-components';

export const StyledEditorPage = styled.div`
  padding-top: 1rem;
  min-height: 100vh;

  .ant-row-flex {
    padding: 1rem 2rem;
    margin-top: 2rem;
  }

  .image {
    display: flex;
    justify-content: center;
    background: #fff;
    padding: 1rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .editor-container {
    .editor__toolbar-top {
      box-shadow: 0 6px 16px 0 var(--shadow-light);
      display: flex;
      flex-wrap: wrap;
      background: #fff;
      padding: 1rem 1.5rem 1rem 1rem;

      .ant-select {
        margin-bottom: 0.8rem;
      }
      .ant-select:not(:last-child) {
        margin-right: 0.8rem;
      }
    }

    .editor__toolbar-bottom {
      box-shadow: 0 6px 16px 0 var(--shadow-light);
      display: flex;
      flex-wrap: wrap;
      justify-content: flex-end;
      background: #fff;
      padding: 1rem;
    }

    .editor__standard-input {
      display: flex;
      background: #fff;
      padding: 1rem 1rem 0 1rem;
      label {
        font-weight: bold;
        width: 20%;
      }
    }

    @media (max-width: ${props => props.theme.breakPoints.lg}) {
      margin-top: 1rem;
    }
  }
`;


export const StyledUploadPage = styled.div`
  padding-top: 1rem;
  min-height: 100vh;

  .content {
    max-width: 60rem;
    margin: 0 auto;
  }

  .image-url-input {
    display: flex;
    margin-bottom: 2rem;
    input {
      margin-right: 1rem;
    }
  }

  .image-preview {
    width: 100%;
    height: 25rem;

    .ant-card-body {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  .next-btn {
    margin-top: 1rem;
    width: 100%;
    display: flex;
    justify-content: center;

    button {
      width: 100%;
    }
  }
`;


export const StyledDropzone = styled.div`
  width: 100%;
  height: 10rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
  border: 1px grey dashed;
`;