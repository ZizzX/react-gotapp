import React, { Component } from "react";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import gotService from "../../sevrices/gotService";
import { withRouter } from 'react-router-dom';

class BooksPage extends Component {
  gotService = new gotService();

  state = {
    selectedBook: null,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedBook: id
    })
  }

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    return (
      <ItemList
        onItemSelected={(itemId) => {
          this.props.history.push(`${itemId}`)
        }}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );
  }
}

export default withRouter(BooksPage);