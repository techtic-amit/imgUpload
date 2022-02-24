import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import axios from "../http-common";
import { ADD_ACTION, AddImage } from "../Redux/reducer/add";
import { useDispatch, useSelector } from "react-redux";

const ImageList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`/auth/getAllData`).then((res) => {
      const result: AddImage[] = res.data.map((imageItem: any) => {
        return {
          name: imageItem.name,
          img: imageItem.img,
        };
      });
      dispatch({ type: ADD_ACTION, data: result });
    });
  }, []);

  const storeState: AddImage[] = useSelector((state) => state as AddImage[]);
  return (
      <Row style={{ marginTop: "30px" }}>
        {storeState && storeState.length ? (
          storeState.map((imageItem: AddImage) => (
            <Col key={imageItem.name} md={3}>
              <div className="card-list p-3">
                <div
                  className="card-image"
                  style={{ width: "200px", height: "200px", margin: "auto" }}
                >
                  <img src={imageItem.img} style={{width: "100%", height: "100%"}} />
                </div>
                <div className="card-title">
                  <span>{imageItem.name}</span>
                </div>
              </div>
            </Col>
          ))
        ) : (
          <div>No Data Found.</div>
        )}
      </Row>
  );
};

export default ImageList;
