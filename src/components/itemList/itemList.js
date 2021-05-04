import React, { Component } from "react";
import styled from "styled-components";
import gotService from "../../sevrices/gotService";
import ErrorMessage from "../errorMessage";
import Spinner from "../spinner";

const ListItem = styled.li`
  cursor: pointer;
`;

export default class ItemList extends Component {
  state = {
    charList: null,
    error: false,
  };

  gotService = new gotService();

  componentDidMount() {
    this.gotService
      .getAllCharacters()
      .then((charList) =>
        this.setState({
          charList,
          error: false,
        })
      )
      .catch(() => {
        this.onError();
      });
  }

  componentDidCatch() {
    this.setState({
      charList: null,
      error: true,
    });
  }

  onError(status) {
    this.setState({
      charList: null,
      error: true,
    });
  }

  renderItems(arr) {
    return arr.map((item) => {
      const { url, name } = item;
      const id = url.match(/\/([0-9]*$)/ig);
      return (
        <ListItem
          key={id}
          className="list-group-item"
          onClick={() => this.props.onCharSelected(id)}
        >
          {name}
        </ListItem>
      );
    });
  }

  render() {
    const { charList, error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    if (!charList) {
      return <Spinner />;
    }

    const items = this.renderItems(charList);

    return <ul className="item-list list-group">{items}</ul>;
  }
}
