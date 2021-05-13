import React, { Component } from "react";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import ItemDetails from "../charDetails";
import gotService from "../../sevrices/gotService";
import RowBlock from "../rowBlock";

export default class CharacterPage extends Component {
  gotService = new gotService();

  state = {
    selectedItem: null,
    error: false,
  };

  componentDidMount() {
    let id = Math.floor(10 + Math.random() * (140 + 1 - 10));

    this.setState({ selectedItem: id });
  }

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
        getData={this.gotService.getAllCharacters}
        renderItem={(item) =>
          `${item.name} - "${item.gender}" - "${item.culture}"`
        }
      />
    );

    const itemDetail = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getCharacter}
      />
    );

    return <RowBlock left={itemList} right={itemDetail} />;
  }
}
