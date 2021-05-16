import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { CharacterPage, BooksPage, HousesPage } from "../pages";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";

export default class App extends Component {
  state = {
    toggleChar: true,
    error: false,
  };

  componentDidCatch() {
    console.log(this.state.error);
    this.setState({
      error: true,
    });
  }

  toggleRandomChar = () => {
    this.setState((state) => {
      return {
        toggleChar: !state.toggleChar,
      };
    });
  };

  render() {
    const { toggleChar, error } = this.state;
    const toggleBlock = toggleChar ? <RandomChar /> : null;
    if (error) {
      return <ErrorMessage />;
    }
    return (
      <Router>
        <div>
        <Container>
          <Header />
        </Container>
        <Container>
          <Row>
            <Col lg="5">
              {toggleBlock}
              <Button
                size="lg"
                color="secondary"
                className="mb-5"
                onClick={() => this.toggleRandomChar()}
              >
                Toogle random character
              </Button>
            </Col>
          </Row>
          <Switch>
            <Route path="/character" component={CharacterPage}/>
            <Route path="/houses" component={BooksPage}/>
            <Route path="/books" component={HousesPage}/>
            {/* <Route path="/houses/:id" component={} ></Route> */}
          </Switch>
          
        </Container>
      </div>
      </Router>
    );
  }
}
