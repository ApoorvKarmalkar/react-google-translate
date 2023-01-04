import { useState, useEffect } from "react";
import { Col, Container, Row, Form, Button } from "react-bootstrap";
import "./App.css";
import { restService } from "./services/RestService";
import { BarLoader } from "react-spinners";

function App() {
  const [languages, setLanguages] = useState([]);
  const [formValue, setFormValue] = useState({
    source: "",
    target: "hi",
    sourceTextArea: "",
    targetTextArea: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const restResponse = await restService(
        "https://google-translate1.p.rapidapi.com/language/translate/v2/languages",
        "get"
      );
      setLanguages(restResponse.data.languages);
      setIsLoading(false);
    })();
  }, []);

  const handleFormChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const restResponse = await restService(
      "https://google-translate1.p.rapidapi.com/language/translate/v2",
      "post",
      {
        q: formValue.sourceTextArea,
        target: formValue.target,
        source: formValue.source,
      },
      {
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Key":
            "0d0943144amsh1b86757da7205cap146a23jsn36e53d3288a7",
          "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
        },
      }
    );
    const targetTextArea = restResponse.data.translations[0].translatedText;
    setFormValue({ ...formValue, targetTextArea });
    setIsLoading(false);
  };

  return (
    <>
      <div id="barLoaderId">
        <BarLoader
          loading={isLoading}
          color="#0275d8"
          height={7}
          width="100%"
          speedMultiplier={1}
        />
      </div>
      <Container className="pt-3">
        <h1 className="text-center mb-5">Translator</h1>
        <Form onSubmit={handleFormSubmit}>
          <Row>
            <Row className="d-flex align-items-center mb-5">
              <Col md="12" lg="2" className="mb-3 mb-lg-0">
                <Form.Select
                  name="source"
                  value={formValue.source}
                  onChange={handleFormChange}
                >
                  <option key={0} value="">
                    Auto
                  </option>
                  {languages.map((lang, index) => (
                    <option key={index + 1} value={lang.language}>
                      {lang.language}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md="12" lg="10">
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="sourceTextArea"
                  value={formValue.sourceTextArea}
                  onChange={handleFormChange}
                />
              </Col>
            </Row>

            <Row className="d-flex align-items-center">
              <Col md="12" lg="2" className="mb-3 mb-lg-0">
                <Form.Select
                  name="target"
                  value={formValue.target}
                  onChange={handleFormChange}
                >
                  {languages.map((lang, index) => (
                    <option key={index} value={lang.language}>
                      {lang.language}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col md="12" lg="10">
                <Form.Control
                  as="textarea"
                  rows={10}
                  name="targetTextArea"
                  value={formValue.targetTextArea}
                  onChange={handleFormChange}
                  disabled
                />
              </Col>
            </Row>
          </Row>
          <Button
            variant="primary"
            type="submit"
            className="d-block mx-auto mt-5"
          >
            Translate
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default App;
