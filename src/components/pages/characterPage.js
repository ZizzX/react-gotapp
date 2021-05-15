import React, { Component } from "react";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails/ItemDetails";
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
          `${item.name} - "${item.gender}"`
        }
      />
    );

    const itemDetail = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getCharacter}>
        <Field label="Name" field="name"/>
        <Field label="Gender" field="gender"/>
        <Field label="Born" field="born"/>
        <Field label="Died" field="died"/>
        <Field label="Culture" field="culture"/>
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetail} />;
  }
}
