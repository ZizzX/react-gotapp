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

export default class CharDetails extends Component {
  gotService = new gotService();

  state = {
    char: null,
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateChar();
  }

  componentDidUpdate(prevProps) {
    if (this.props.charId !== prevProps.charId) {
      this.updateChar();
    }
  }

  onCharDetailsLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    })
  }

  updateChar() {
    const { charId } = this.props;

    if (!charId) {
      return;
    }

    this.setState({
      loading: true,
    })

    this.gotService.getCharacter(charId)
      .then( this.onCharDetailsLoaded )
      .catch( () => this.onError())
  }

    onError() {
      this.setState({
        char: null,
        error: true
      })
    }

  render() {

    const { char, loading, error } = this.state;

    if (!char) {
      return <SelectError>Please select a character</SelectError>;
    }

    if(loading) {
      return <Spinner/>
    }

    if(error) {
      return <ErrorMessage/>
    }

    const { name, born, gender, died, culture } = this.state.char;


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
