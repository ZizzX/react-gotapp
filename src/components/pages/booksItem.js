import React, { Component } from "react";
import gotService from "../../sevrices/gotService";
import ItemDetails, { Field } from "../itemDetails";

export default class BooksItem extends Component {
  gotService = new gotService();

  render() {
    return (
      <ItemDetails itemId={this.props.bookId} getData={this.gotService.getBook}>
        <Field label="Number of pages" field="numberOfPages" />
        <Field label="Publisher" field="publisher" />
        <Field label="Released" field="released" />
      </ItemDetails>
    );
  }
}
