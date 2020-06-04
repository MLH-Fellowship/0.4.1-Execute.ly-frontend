import React from "react";
import { Row, Col, Button, Icon, Select, Card, Input } from "antd";
import { Subscribe } from "unstated";
import { Redirect } from "react-router-dom";

import MainLayout from "../../components/MainLayout";
import Editor from "./components/Editor";
import OCRContainer from "./OCRContainer";
import ImagePlaceholder from "../../assets/image-placeholder.webp";
import { languageList, themeList, fontSizeList } from "../../utils/constants";
import { StyledEditorPage } from './styledComponents';

const { Option } = Select;

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

const Error = ({ error }) => {
  if (!error) return null;

  return (
    <Row>
      <Card>
        <strong style={{ color: 'red' }}>Output</strong>: {error}
      </Card>
    </Row>
  )
}

const Output = ({ output }) => {
  if (!output) return null;

  return (
    <Row>
      <Card>
        <strong>Output</strong>: {output}
      </Card>
    </Row>
  )
}

const StandardInput = ({ value, onChange }) => {
  return <Row>
    <div className="editor__standard-input">
      <label> Standard Input: </label>
      <Input value={value} onChange={onChange} />
    </div>
  </Row>
}

const EditorPage = () => {
  return (
    <Subscribe to={[OCRContainer]}>
      {OCR => {
        if (!OCR.state.imageURL) return <Redirect to="/upload" />;

        return (
          <MainLayout>
            <StyledEditorPage>
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
                    <StandardInput value={OCR.state.stdin} onChange={e => OCR.setStdInput(e.target.value)} />
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
                    <Output output={OCR.state.output} />
                    <Error error={OCR.state.error} />
                  </div>
                </Col>
              </Row>
            </StyledEditorPage>
          </MainLayout>
        );
      }}
    </Subscribe>
  );
}

export default EditorPage;
