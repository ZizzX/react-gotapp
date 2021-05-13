import React, { Component } from "react";
import gotService from "../../sevrices/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

// import "./charDetails.css";
import styled from "styled-components";

const CharDetailsItem = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
  h4 {
    margin-bottom: 20px;
    text-align: center;
  }
`;

const SelectError = styled.div`
  color: #111111;
  text-align: center;
  font-size: 2rem;
  background-color: #ffffff;
  padding: 25px;
  width: 100%;
`;

export default class ItemDetails extends Component {
  gotService = new gotService();

  state = {
    item: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) {
      this.updateItem();
    }
  }

  onItemDetailsLoaded = (item) => {
    this.setState({
      item,
      loading: false,
    })
  }

  updateItem() {
    const { itemId, getData } = this.props;

    if (!itemId) {
      return;
    }

    this.setState({
      loading: true,
    })

    getData(itemId)
      .then( this.onItemDetailsLoaded )
      .catch( () => this.onError())
  }

    onError() {
      this.setState({
        item: null,
        error: true
      })
    }

  render() {

    const { item, loading, error } = this.state;

    if (!item) {
      return <SelectError>Please select a character</SelectError>;
    }

    if(loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorMessage/>
    }

    const { name, born, gender, died, culture } = this.state.item;


    return (

      <CharDetailsItem className="char-details rounded">

        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Born</span>
            <span>{born}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Died</span>
            <span>{died}</span>
          </li>
          <li className="list-group-item d-flex justify-content-between">
            <span className="term">Culture</span>
            <span>{culture}</span>
          </li>
        </ul>

      </CharDetailsItem>

    );
  }
}
