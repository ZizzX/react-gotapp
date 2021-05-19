import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ErrorMessage from "../errorMessage";
import { CharacterPage, BooksPage, HousesPage, BooksItem } from "../pages";
import { BrowserRouter as Router, Route } from "react-router-dom";

import './app.css';

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
        <div className="app">
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
            <Route path="/characters" component={CharacterPage} />
            <Route path="/houses" component={HousesPage} />
            <Route exact path="/books/" component={BooksPage} />
            <Route path="/books/:id" render={({match}) => {
              const { id } = match.params;
              return <BooksItem bookId={id} />
            }} />
          </Container>
        </div>
      </Router>
    );
  }
}
