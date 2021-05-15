import React, { Component } from "react";
import ErrorMessage from "../errorMessage";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails/ItemDetails";
import gotService from "../../sevrices/gotService";
import RowBlock from "../rowBlock";

export default class HousesPage extends Component {
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
        getData={this.gotService.getAllHouses}
        renderItem={(item) => item.name}
      />
    );

    const itemDetail = (
      <ItemDetails
        itemId={this.state.selectedItem}
        getData={this.gotService.getHouse}
      >
        <Field label="Region" field="region" />
        <Field label="Words" field="words" />
        <Field label="Titles" field="titles" />
        <Field label="Ancestral Weapons" field="ancestralWeapons" />
      </ItemDetails>
    );

    return <RowBlock left={itemList} right={itemDetail} />;
  }
}
