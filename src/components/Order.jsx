import React, { useState, useEffect } from 'react';
import {
  Row, Col, Form, Button, Accordion, Card, ToggleButtonGroup, ToggleButton,
  Modal, Alert
} from 'react-bootstrap';

import Api from './../api/api';

export default function Order() {
  const name = useFormInput('');
  const email = useFormInput('');
  const address = useFormInput('');
  const contactNumber = useFormInput('');
  const [pizzas, setPizzas] = useState([]);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [pizzaTemplate, setPizzaTemplate] = useState({});
  const [totalOrder, setTotalOrder] = useState(0);
  const [confirmModal, setConfirmModal] = useState(false);
  const newPizza = {
    size: 'small',
    toppings: []
  };

  useEffect(() => {
    const template = [{ size: 'small', toppings: [] }];
    Api.getPizzaSummary(template).then(({ data }) => {
      setPizzaTemplate(data);
    });      
  }, []);
  
  useEffect(() => {
    Api.getPizzaSummary(pizzas).then(({ data }) => {
      setTotalOrder(data.total);
    });
  }, [pizzas]);

  function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue);
    const handleChange = (e) => {
      setValue(e.target.value);
      if (visibleAlert) setVisibleAlert(false);
    }

    return {
      value,
      onChange: handleChange,
    }
  }

  function addPizza() {
    if (name.value !== '' && address.value !== '' && contactNumber.value !== '') {
      setPizzas([
        ...pizzas,
        newPizza
      ]);
    } else {
      setVisibleAlert(true);
    }
  }

  function setPizzaSize(size, index) {
    const updated = [ ...pizzas ];
    updated[index].size = size;
    setPizzas([ ...updated ]);
  }
  
  function setTopping(e, index, topping) {
    let updated = [ ...pizzas ];
    if (e.target.checked) {
      updated[index].toppings.push(topping);
    } else {
      updated[index].toppings = updated[index].toppings.filter(t => t !== topping);
    }
    setPizzas([ ...updated ]);
  }

  function removePizza(pIndex) {
    setPizzas([ ...pizzas.filter((pizza, index) => index !== pIndex) ]);
  }

  function placeOrder() {
    const data = {
      personalDetails: {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: contactNumber.value,
      },
      order: [ ...pizzas ]
    };

    Api.submitOrder(data).then(() => {
      const blank = { target: { value: '' }};
      name.onChange(blank);
      email.onChange(blank);
      address.onChange(blank);
      contactNumber.onChange(blank);
      setPizzas([]);
      setConfirmModal(true);
    }, (error) => {
      console.log(error);
    });
  }

  return (
    <>
      <Row>
        <Col>
          <p className="h3 text-uppercase">pizza order</p>
          <p className="h6">Basic Information</p>
          <hr />
          <Form>
            <Row>
              <Input title="Name" {...name} />
              <Input title="E-Mail Address" {...email} />
              <Input title="Address" {...address} />
              <Input title="Contact Number" {...contactNumber} />
            </Row>
            <Alert
              dismissible
              show={visibleAlert}
              variant="danger"
              onClose={() => setVisibleAlert(false)}
            >
              <p>Please fill all the following fields</p>
              <p className="font-weight-bold">
                {name.value === '' && <span>Name, </span>}
                {address.value === '' && <span>Address, </span>}
                {contactNumber.value === '' && <span>Contact Number</span>}
              </p>
            </Alert>
          </Form>
        </Col>
      </Row>

      <Row className="my-5">
        <Col>
          <p className="h4 d-inline">Choose your pizza</p>
          <Button
            size="lg"
            className="float-right btn-success"
            onClick={addPizza}
          >
            Add Pizza
          </Button>
        </Col>
      </Row>

      <Row>
        {pizzas && pizzas.length > 0 && (
          <>
            <Col xs={12}>
              <Accordion defaultActiveKey={0}>
                {pizzas.map((pizza, pizzaIndex) => (
                  <Card key={Math.random()}>
                    <Card.Header>
                      <Accordion.Toggle
                        as={Button}
                        variant="link"
                        eventKey={pizzaIndex}
                      >
                        <p className="text-uppercase h5 m-0">{`PIZZA ${pizzaIndex+1}`}</p>
                      </Accordion.Toggle>
                      <Button
                        variant="danger"
                        className="float-right"
                        onClick={() => removePizza(pizzaIndex)}
                      >
                        Remove Pizza
                      </Button>
                    </Card.Header>
                    <Accordion.Collapse eventKey={pizzaIndex}>
                      <Card.Body>
                        <Row>
                          <Col>
                            <p className="h6 mb-3">Choose size</p>
                            <ToggleButtonGroup
                              type="radio"
                              value={pizza.size}
                              onChange={e => setPizzaSize(e, pizzaIndex)}
                              name="size"
                              className="mb-5"
                            >
                              {Object.keys(pizzaTemplate.size).map((size) => (
                                <ToggleButton
                                  className="pa-pizza-size-toggle"
                                  key={Math.random()}
                                  value={size}
                                >
                                  <small className="text-uppercase">{size}</small>
                                </ToggleButton>
                              ))}
                            </ToggleButtonGroup>
                          </Col>
                        </Row>
                        
                        <Row>
                          <Col>
                            <p className="h6">Pick your toppings</p>
                            <Row>
                              {Object.keys(pizzaTemplate.toppings).map((topping, toppingIndex) => (
                                <Col
                                  md={3}
                                  key={Math.random()}
                                  className="pb-3"
                                >
                                  <Form.Check
                                    id={Math.random()}
                                    type="checkbox"
                                    className={`text-capitalize pa-topping pl-4 py-2 ${pizza.toppings.includes(topping) ? 'bg-primary pa-topping-selected' : ''}`}
                                    label={topping}
                                    checked={pizza.toppings.includes(topping)}
                                    onChange={e => setTopping(e, pizzaIndex, topping)}
                                  />
                                </Col>
                              ))}
                            </Row>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Accordion.Collapse>
                  </Card>
                ))}
              </Accordion>
            </Col>
            <Col xs={12} className="mt-5">
              <p className="h4">Summary</p>
              <hr />
              {pizzas.map((pizza, pizzaIndex) => (
                <Row key={Math.random()}>
                  <Col className={pizzaIndex > 0 ? 'mt-4' : null}>
                    <Row>
                      <Col>
                        <p className="h5 mb-0 font-weight-bold float-right text-capitalize">{`${pizza.size} Pizza ${pizzaIndex+1}`}</p>
                      </Col>
                      <Col>
                        <p className="h5 mb-0 font-weight-bold float-right">{+pizzaTemplate.size[pizza.size].toFixed(2)}</p>
                      </Col>
                    </Row>
                    {pizza.toppings.map((topping) => (
                      <Row key={Math.random()}>
                        <Col>
                          <p className="float-right mb-0 text-capitalize">{topping}</p>
                        </Col>
                        <Col>
                          <p className="float-right mb-0">{+pizzaTemplate.toppings[topping].toFixed(2)}</p>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                </Row>
              ))}
              <hr />
            </Col>
            <Col>
              <p className="h2 text-uppercase float-right">total usd</p>
            </Col>
            <Col>
              <p className="h2 float-right">{totalOrder}</p>
            </Col>
            <Col xs={12}>
              <Button onClick={placeOrder} className="float-right mt-5" size="lg">Place Order</Button>
            </Col>
          </>
        )}
      </Row>
      <Modal
        show={confirmModal}
        onHide={() => setConfirmModal(false)}
      >
        <Modal.Header>
          <Modal.Title>
            Your Order has been placed!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          We will contact you via phone call to {`${contactNumber.value}${email.value ? ' (or email to ' + email.value + ')' : ''}`} to heads up about your order.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setConfirmModal(false)}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function Input(props) {
  const { title, ...rest } = props;
  
  return (
    <Col md={6}>
      <Form.Group>
        <Form.Label>{title}</Form.Label>
        <Form.Control {...rest} />
      </Form.Group>
    </Col>
  );
}
