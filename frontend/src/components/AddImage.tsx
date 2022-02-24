import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from "../http-common";
import { AddImage, ADD_ACTION } from "../Redux/reducer/add";
import { useDispatch } from "react-redux";

type FormFields = {
  name: string | string;
  img: File | string;
};
const AddCardImage = () => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState<FormFields>({
    name: "",
    img: "",
  });
  const [error, setError] = useState({
    errorName: "",
    errorImg: ""
  });

  const onFieldChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFields({
      ...fields,
      [e.target.name]: e.target.value,
    });
  };
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const image = e.currentTarget.files?.[0];
    if (!image || !image?.name.toLocaleLowerCase().match(/\.(jpg|jpeg|png|gif)$/)) {
      setError({
        ...error,
        errorImg: "Upload valid image"
      })
    } else {
      setError({
        ...error,
        errorImg: ""
      })
      setFields({
        ...fields,
        [e.target.name]: e.currentTarget.files?.[0],
      });
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", fields.name);
    formData.append("files", fields.img);
    axios
      .post(`/auth/image_upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        const resultData: AddImage = {
          name: res?.data?.name,
          img: res?.data?.img,
        };
        dispatch({
          type: ADD_ACTION,
          data: resultData,
        });
      });
    setFields({
      name: "",
      img: "",
    });
  };
  return (
    <div className="AddImageContainer" style={{ marginTop: "20px" }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                type="text"
                placeholder="Name"
                name="name"
                onChange={onFieldChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Control
                type="file"
                name="img"
                accept="image/png, image/gif, image/jpeg"
                onChange={onFileChange}
              />
              {(error.errorImg) && <span style={{ color: "red" }}>Upload Valid image</span>}

            </Form.Group>
          </Col>
          <Col>
            <Button
              variant="primary"
              type="submit"
              className="submit-btn"
              disabled={!fields.name || !fields.img || ((error.errorImg) ? true : false)}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddCardImage;
