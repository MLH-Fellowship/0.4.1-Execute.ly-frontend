import styled from 'styled-components';

export const StyledPage = styled.div`
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