
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ImageList from "./components/ImageList";
import AddImage from "./components/AddImage";
import { Container } from "react-bootstrap";

import { store } from "./Redux/Store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <Container>
            <AddImage />
            <ImageList />
          </Container>
        </header>
      </div>
    </Provider>
  );
}

export default App;
