import React, { Component } from "react";
import { Col, Row, Container, Button } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class App extends Component {
  state = {
    toggleChar: false,
  };

  toggleRandomChar = () => {
    this.setState(({ toggleChar }) => ({
      toggleChar: !toggleChar,
    }));
  };
  render() {
    const { toggleChar } = this.state;
    const toggleBlock = !toggleChar ? <RandomChar /> : null;
    return (
      <>
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
          <Row>
            <Col md="6">
              <ItemList />
            </Col>
            <Col md="6">
              <CharDetails />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
