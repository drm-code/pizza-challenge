import React, { useEffect, useContext } from 'react';
import {
  Row, Col, ProgressBar, Table, Button
} from 'react-bootstrap';

import Context from './../store/context';
import Api from './../api/api';

export default function Status() {
  const { state, dispatch } = useContext(Context);
  const completed = state.orders ? state.orders.filter(o => o.status === 'completed').length : 0;
  const pending = state.orders ? state.orders.filter(o => o.status === 'pending').length : 0;
  const cancelled = state.orders ? state.orders.filter(o => o.status === 'cencelled').length : 0;
  const totalOrders = state.orders ? state.orders.length : 0;
  
  useEffect(() => {
    Api.getOrders().then(({ data }) => {
      dispatch({
        type: 'LOAD_ORDERS',
        payload: data.orders
      });
    });
  }, [dispatch]);
  
  function updateOrderStatus(id, status) {
    const data = { id, status };
    Api.setOrderStatus(data).then(({ data }) => {
      dispatch({
        type: 'LOAD_ORDERS',
        payload: data.orders
      });
    });
  }

  return (
    <Row>
      <Col>
        <Button variant="outline-primary no-print" className="float-right" onClick={() => window.print()}>Print Summary</Button>
        <p className="h3 mb-0 no-print">Order Management</p>
        <p className="small text-muted no-print">Manage your orders here and get an overview of status</p>
        <p className="h5 mt-4 mb">Total items in inventory</p>
        <p className="h1 text-info d-inline">{state.orders ? state.orders.length : 0}</p>
        <p className="small text-muted d-inline">Items</p>
        <ProgressBar className="pa-status-progressbar no-print">
          <ProgressBar className="pa-stacked-success" now={parseInt((completed * 100) / totalOrders)} key={1} />
          <ProgressBar now={parseInt((pending * 100) / totalOrders)} key={2} />
          <ProgressBar className="pa-stacked-danger" now={parseInt((cancelled * 100) / totalOrders)} key={3} />
        </ProgressBar>
        <hr />
        <Row>
          <Col className="d-flex no-print">
            <Point type="success" label="Completed" amount={completed} />
            <Point type="info" label="Pending" amount={pending} />
            <Point type="danger" label="Cancelled" amount={cancelled} />
          </Col>
        </Row>
        <Row>
          <Table striped bordered className="mt-5" id="Orders">
            <thead>
              <tr>
                <th>Item ID</th>
                <th>Address</th>
                <th>Ordered Time</th>
                <th>Status / Actions</th>
              </tr>
            </thead>
            <tbody>
              {state.orders && state.orders.length > 0 && state.orders.map((order, index) => (
                <tr key={Math.random()}>
                  <td><p className="small text-muted m-0">{order.id}</p></td>
                  <td><p className="small text-muted m-0">{order.personalDetails.address}</p></td>
                  <td><p className="small text-muted m-0">{order.createdAt}</p></td>
                  <td>
                    {order.status === 'pending' && (
                      <>
                        <Button
                          size="sm"
                          variant="link"
                          className="pa-success mr-4 p-0"
                          onClick={() => updateOrderStatus(order.id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="link"
                          className="pa-danger p-0"
                          onClick={() => updateOrderStatus(order.id, 'cancelled')}
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                    {(order.status === 'accepted' || order.status === 'cancelled' || order.status === 'completed') && (
                      <>
                        <span className={`text-capitalize small mr-4 ${order.status === 'cancelled' ? 'pa-danger' : null}`}>{order.status}</span>
                        {order.status === 'accepted' && (
                          <Button
                            size="sm"
                            variant="link"
                            className="p-0"
                            onClick={() => updateOrderStatus(order.id, 'completed')}
                          >
                            Mark as completed
                          </Button>
                        )}
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Row>
      </Col>
    </Row>
  );
}

function Point({ type, label, amount }) {
  return (
    <div className="d-flex align-items-center mr-5">
      <div className={`point pa-bg-${type}`}></div>
      <p className="point-label mb-0 ml-2">{label}<br/><small className="text-muted">{amount}</small></p>
    </div>
  );
}
