import React, { Component } from "react";
import PropTypes from "prop-types";
import AceEditor from "react-ace";
import styled from "styled-components";
import "brace/mode/c_cpp";
import "brace/mode/python";
import "brace/mode/javascript";
import "brace/theme/monokai";
import "brace/theme/github";
import "brace/theme/solarized_dark";
import "brace/theme/dracula";
import "brace/theme/cobalt";

const StyledEditor = styled.div``;

class MyEditor extends Component {
  onLoad = editor => {
    editor.textInput.focus();
  };

  render() {
    return (
      <StyledEditor className="editor">
        <AceEditor
          mode={this.props.syntaxCode}
          theme={this.props.theme}
          name="editor"
          width="100%"
          height="300px"
          onLoad={this.onLoad}
          onChange={this.props.onValueChange}
          value={this.props.code}
          fontSize={this.props.fontSize}
          showPrintMargin={false}
          showGutter={true}
          highlightActiveLine={true}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showLineNumbers: true,
            tabSize: 2
          }}
        />
      </StyledEditor>
    );
  }
}

export default MyEditor;

MyEditor.propTypes = {
  syntaxCode: PropTypes.string.isRequired,
  code: PropTypes.string,
  fontSize: PropTypes.number,
  onValueChange: PropTypes.func.isRequired,
  theme: PropTypes.string
};

MyEditor.defaultProps = {
  fontSize: 14
};
