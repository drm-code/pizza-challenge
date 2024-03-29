import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router } from 'react-router-dom';

import Header from './Header';
import Sidebar from './Sidebar';
import Routes from './Routes';

export default function Main() {
  return (
    <>
      <div className="gradient"></div>
      <Container>
        <Router>
          <Header />
          <Content />
        </Router>
      </Container>
    </>
  );
}

function Content() {
  return (
    <Row>
      <Col md={3} lg={2}>
        <Sidebar />
      </Col>
      <Col>
        <Routes />
      </Col>
    </Row>
  );
}
