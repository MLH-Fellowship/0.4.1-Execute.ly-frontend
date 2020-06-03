import React from "react";
import styled from "styled-components";
import { Row, Col, Button, Icon, Select } from "antd";
import { Subscribe } from "unstated";
import { Redirect } from "react-router-dom";

import MainLayout from "../../components/MainLayout";
import Editor from "./components/Editor";
import OCRContainer from "./OCRContainer";
import ImagePlaceholder from "../../assets/image-placeholder.png";
import {
  languageList,
  themeList,
  fontSizeList,
  breakPoints
} from "../../utils/constants";

const { Option } = Select;

const StyledPage = styled.div`
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
      padding: 1rem 1.5rem 1rem 0;

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
      padding: 1rem 0;
    }

    @media (max-width: ${breakPoints.lg}) {
      margin-top: 1rem;
    }
  }
`;

const LanguageSelectList = props => (
  <Select
    value={props.value}
    onChange={props.handleChange}
    loading={props.isDetectingLanguage}
  >
    {languageList.map(lang => (
      <Option key={lang.value} value={lang.value}>
        {lang.label}
      </Option>
    ))}
  </Select>
);

const ThemeSelectList = props => (
  <Select defaultValue="Select Theme" onChange={props.handleChange}>
    {themeList.map(theme => (
      <Option key={theme.value} value={theme.value}>
        {theme.label}
      </Option>
    ))}
  </Select>
);

const FontSizeSelectList = props => (
  <Select defaultValue="Change Font Size" onChange={props.handleChange}>
    {fontSizeList.map(size => (
      <Option key={size.value} value={size.value}>
        {size.label}
      </Option>
    ))}
  </Select>
);

const EditorPage = () => {
  return (
    <Subscribe to={[OCRContainer]}>
      {OCR => {
        if (!OCR.state.imageURL) return <Redirect to="/upload" />;

        return (
          <MainLayout>
            <StyledPage>
              <Row type="flex" gutter={[10, 10]}>
                <Col xs={24} lg={10} className="image">
                  <img
                    src={OCR.state.imageURL || ImagePlaceholder}
                    alt="Placeholder"
                  />
                </Col>
                <Col xs={24} lg={14}>
                  <div className="editor-container">
                    <Row className="editor__toolbar-top">
                      <LanguageSelectList
                        handleChange={OCR.setLanguage}
                        value={OCR.state.languageSelectValue}
                        isDetectingLanguage={OCR.state.isDetectingLanguage}
                      />
                      <ThemeSelectList handleChange={OCR.setTheme} />
                      <FontSizeSelectList handleChange={OCR.setFontSize} />
                    </Row>
                    <Editor
                      code={OCR.state.code}
                      syntaxCode={OCR.state.lang_syntaxCode}
                      onValueChange={OCR.setCode}
                      theme={OCR.state.editor_theme}
                      fontSize={OCR.state.editor_fontSize}
                    />
                    <Row className="editor__toolbar-bottom">
                      <Button
                        type="primary"
                        size="large"
                        disabled={!OCR.state.code}
                        loading={OCR.state.loading}
                        onClick={OCR.getOutputFromCode}
                        block
                      >
                        Run Code
                          <Icon type="play-square" />
                      </Button>
                    </Row>
                  </div>
                </Col>
              </Row>
            </StyledPage>
          </MainLayout>
        );
      }}
    </Subscribe>
  );
}

export default EditorPage;
