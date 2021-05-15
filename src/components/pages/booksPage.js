import React, { Component } from "react";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails/ItemDetails";
import gotService from "../../sevrices/gotService";
import RowBlock from "../rowBlock";

export default class BooksPage extends Component {
  gotService = new gotService();

  state = {
    selectedItem: null,
    error: false,
  };

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
    });
  };

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

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
        renderItem={(item) => item.name}
      />
    );

    const itemDetail = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getBook}
      >
        <Field label="Number of pages" field="numberOfPages" />
        <Field label="Publisher" field="publisher" />
        <Field label="Released" field="released" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetail} />;
  }
}
