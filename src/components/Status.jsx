import React, { useEffect, useContext } from 'react';
import {
  Row, Col, ProgressBar, Table, Button
} from 'react-bootstrap';

import Context from './../store/context';
import Api from './../api/api';

export default function Status() {
  const { state, dispatch } = useContext(Context);
  const status = state.orders || {};
  const completed = status.completed || 0;
  const pendings = status.pendings || 0;
  const cancelled = status.cancelled || 0;
  const totalOrders = status.totalOrders || 0;
  const orders = status.ordersList || [];

  useEffect(() => {
    reloadOrders();
  }, []);
  
  function updateOrderStatus(id, status) {
    const dataSend = { id, status };
    Api.setOrderStatus(dataSend).then(({ data }) => {
      if (data.success) {
        reloadOrders();
      }
    });
  }
  
  function reloadOrders() {
    Api.getStatus().then(({ data }) => {
      dispatch({
        type: 'SET_ORDERS',
        payload: data
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
        <p className="h1 text-info d-inline">{totalOrders}</p>
        <p className="small text-muted d-inline">Items</p>
        <ProgressBar className="pa-status-progressbar no-print">
          <ProgressBar className="pa-stacked-success" now={parseInt((completed * 100) / totalOrders)} key={1} />
          <ProgressBar now={parseInt((pendings * 100) / totalOrders)} key={2} />
          <ProgressBar className="pa-stacked-danger" now={parseInt((cancelled * 100) / totalOrders)} key={3} />
        </ProgressBar>
        <hr />
        <Row>
          <Col className="d-flex no-print">
            <Point type="success" label="Completed" amount={completed} />
            <Point type="info" label="Pendings" amount={pendings} />
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
              {orders && orders.length > 0 && orders.map((order, index) => (
                <tr key={Math.random()}>
                  <td><p className="small text-muted m-0">{order.id}</p></td>
                  <td><p className="small text-muted m-0">{order.address}</p></td>
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
