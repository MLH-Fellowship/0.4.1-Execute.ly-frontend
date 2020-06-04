import { Container } from "unstated";
import { message } from "antd";
import axios from "axios";
import constants from "../../utils/constants";
import history from "../../routes/history";

const { SERVER_URL, SERVER_URL_PYTHON } = constants;

const showErrorMessage = error => {
  // hide all the other messages
  message.destroy();

  const errorData = error.response && error.response.data;
  const errorMsg =
    errorData && errorData.message
      ? errorData.message
      : "Something went wrong.";

  message.error(errorMsg, 2);
};

class OCRContainer extends Container {
  state = {
    code: "",
    stdin: "",
    lang_code: "",
    lang_ver: "",
    lang_syntaxCode: "c_cpp", // used for syntax highlighting
    editor_theme: "github",
    editor_fontSize: 14,
    imageURL: null,
    loading: false,
    output: "",
    isDetectingLanguage: false,
    languageSelectValue: "Select Language"
  };

  setCode = code => this.setState({ code });

  setStdInput = stdin => this.setState({ stdin });

  setImageURL = imageURL => this.setState({ imageURL });

  // Shape of val => "cpp 2 c_cpp"
  setLanguage = val => {
    const [code, version, syntaxCode] = val.split(" ");
    this.setState({
      lang_ver: version,
      lang_code: code,
      lang_syntaxCode: syntaxCode,
      languageSelectValue: val
    });
  };

  setTheme = val => this.setState({ editor_theme: val });

  setFontSize = val => this.setState({ editor_fontSize: parseInt(val) });

  getTextFromImage = async (file, base64) => {
    try {
      this.setState({ loading: true, imageURL: base64 });
      const hideLoadingMsg = message.loading("Reading text...", 0);

      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${SERVER_URL}/getText`, formData);
      const { text } = res.data;
      this.setState({ code: text, loading: false }, () => {
        hideLoadingMsg();
        history.push("/editor");
      });
      this.detectLanguageFromCode(text);
    } catch (error) {
      this.setState({ loading: false });
      showErrorMessage(error);
    }
  };

  getOutputFromCode = async () => {
    try {
      const { code, lang_code, lang_ver, stdin } = this.state;

      // Validations
      if (!lang_ver || !lang_code) {
        return message.error("Please select a language", 1);
      }

      // Set Loading and reset errors
      this.setState({ loading: true, error: "" });
      const hideLoadingMsg = message.loading("Executing code...", 0);

      const data = { code, lang_code, lang_ver, stdin};
      console.log("data", data)
      const res = await axios.post(`${SERVER_URL}/getOutput`, data);

      // hide loading Message
      hideLoadingMsg();

      const { output, memory, cpuTime } = res.data.output;

      if (!memory || !cpuTime) {
        this.setState({ error: output, loading: false });
      } else {
        this.setState({ output, loading: false });
      }
    } catch (error) {
      this.setState({ loading: false });
      showErrorMessage(error);
    }
  };

  detectLanguageFromCode = async code => {
    try {
      if (!code) return;

      // Set Loading and reset errors
      this.setState({ isDetectingLanguage: true });

      const data = { code };
      const res = await axios.post(`${SERVER_URL_PYTHON}/detect`, data);
      const { language } = res.data;

      this.setState({ isDetectingLanguage: false });
      this.setLanguage(language);
    } catch (error) {
      console.error("error", error);
      this.setState({ isDetectingLanguage: false });
    }
  };
}

export default OCRContainer;
