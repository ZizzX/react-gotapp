import React, { Component } from "react";
import styled from "styled-components";
import gotService from "../../sevrices/gotService";
import Spinner from "../spinner";
import ErrorMessage from "../errorMessage";

const RandomBlock = styled.div`
  background-color: #fff;
  padding: 25px 25px 15px 25px;
  margin-bottom: 40px;
`;

const RandomTitle = styled.h4`
  margin-bottom: 20px;
  text-align: center;
`;

const Term = styled.span`
  font-weight: bold;
`;

export default class RandomChar extends Component {
  constructor() {
    super();
    this.updateChar();
  }
  gotService = new gotService();

  state = {
    char: {},
    loading: true,
    error: false,
  };

  onCharLoaded = (char) => {
    this.setState({
      char,
      loading: false,
    });
  };

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateChar() {
    const id = Math.floor(Math.random() * 140 + 25); //25 - 140
    // const id = 5000000;
    this.gotService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError);
  }

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage /> : null;

    const spinner = loading ? <Spinner /> : null;

    const content = !(loading || error) ? <View char={char} /> : null;
    return (
      <>
        <RandomBlock className="random-block rounded">
          {spinner}
          {errorMessage}
          {content}
        </RandomBlock>
      </>
    );
  }
}

const View = ({ char }) => {
  const { name, gender, born, died, culture } = char;

  return (
    <>
      <RandomTitle> Random Character: {name} </RandomTitle>
      <ul className="list-group list-group-flush">
        <li className="list-group-item d-flex justify-content-between">
          <Term>Gender </Term>
          <span>{gender === '' ? '❌' : gender}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Born </Term>
          <span>{born === '' ? '❌' : born}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Died </Term>
          <span>{died === '' ? '❌' : died}</span>
        </li>
        <li className="list-group-item d-flex justify-content-between">
          <Term>Culture </Term>
          <span>{culture === '' ? '❌' : culture}</span>
        </li>
      </ul>
    </>
  );
};
