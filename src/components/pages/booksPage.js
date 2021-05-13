import React, { Component } from "react";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import ItemDetails from "../charDetails";
import gotService from "../../sevrices/gotService";
import RowBlock from "../rowBlock";


export default class BooksPage extends Component {
  gotService = new gotService();

  state = {
    selectedItem: null,
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  onItemSelected = (id) => {
    this.setState({
      selectedItem: id,
    });
  };

  render() {
    const { error } = this.state;

    if (error) {
      return <ErrorMessage />;
    }

    const itemList = (
      <ItemList
        onItemSelected={this.onItemSelected}
        getData={this.gotService.getAllBooks}
      />
    );

    const itemDetail = (
      <ItemDetails 
        itemId={this.state.selectedItem} 
        getData={this.gotService.getBook}/>
    );

    return <RowBlock left={itemList} right={itemDetail} />;
  }
}
