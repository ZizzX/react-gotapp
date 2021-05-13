import React from "react";
import { Col, Row } from "reactstrap";


const RowBlock = ({ left, right }) => {
    return (
      <Row className="mb-5 mt-1">
        <Col md="6"> {left} </Col>
        <Col md="6"> {right} </Col>
      </Row>
    );
};

export default RowBlock;