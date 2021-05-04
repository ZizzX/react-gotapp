import React, { Component } from "react";
import { Col, Row } from "reactstrap";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import CharDetails from "../charDetails";

export default class CharacterPage extends Component {
  state = {
    selectedChar: null,
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  onCharSelected = (id) => {
    this.setState({
      selectedChar: id,
    });
  };

  render() {

    const { error } = this.state;

    if (error) {
        return <ErrorMessage/>
    }

    return (
      <Row className="mb-5 mt-1">
        <Col md="6">
          <ItemList onCharSelected={this.onCharSelected} />
        </Col>
        <Col md="6">
          <CharDetails charId={this.state.selectedChar} />
        </Col>
      </Row>
    );
  }
}
