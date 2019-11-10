import React, { useEffect, useContext } from 'react';
import {
  Row, Col, ProgressBar
} from 'react-bootstrap';
import {
  CircularProgressbar,
  buildStyles
} from 'react-circular-progressbar';
import {
  AreaChart, Area, XAxis, ResponsiveContainer, CartesianGrid, Tooltip
} from 'recharts';  

import Context from './../store/context';
import Api from './../api/api';

export default function Dashboard() {
  const { state, dispatch } = useContext(Context);
  const dashboard = state.dashboard || {};
  const totalOrders = dashboard.totalOrders || 0;
  const completed = dashboard.completed || 0;
  const pendings = dashboard.pendings || 0;
  const cancelled = dashboard.cancelled || 0;
  const totalSales = dashboard.totalSales || 0;
  const areaData = dashboard.areaData || [];
  const totalPercentCompleted = dashboard.totalPercentCompleted || 0;
  const totalPercentPendings = dashboard.totalPercentPendings || 0;
  const performance = totalPercentCompleted - totalPercentPendings;

  useEffect(() => {
    Api.getDashboardReport().then(({ data }) => {
      data.areaData.sort((a, b) => a.index - b.index);
      dispatch({
        type: 'SET_DASHBOARD',
        payload: data
      });
    });
  }, [dispatch]);

  return (
    <Row>
      <Col md={6} className="border-right">
        <p className="h3 text-uppercase text-center">delivery status</p>
        <p className="h6 text-center">Total Orders</p>
        <p className="h1 font-weight-bold text-center">{totalOrders}</p>
        <Row>
          <Col>
            <CircularProgressbar
              value={completed}
              text={`${completed}`}
              maxValue={totalOrders > 0 ? totalOrders : 1}
              styles={buildStyles({
                pathColor: 'rgba(34,216,175,0.7)',
                textColor: '#212529'
              })}
            />
            <p className="small text-center mt-3">Completed</p>
          </Col>
          <Col>
            <CircularProgressbar
              value={pendings}
              text={`${pendings}`}
              maxValue={totalOrders > 0 ? totalOrders : 1}
              styles={buildStyles({
                pathColor: 'rgba(232,47,83,0.7)',
                textColor: '#212529'
              })}
            />
            <p className="small text-center mt-3">Pending</p>
          </Col>
          <Col>
            <CircularProgressbar
              value={cancelled}
              text={`${cancelled}`}
              maxValue={totalOrders > 0 ? totalOrders : 1}
              styles={buildStyles({
                pathColor: 'rgba(232,47,83,0.7)',
                textColor: '#212529'
              })}
            />
            <p className="small text-center mt-3">Cancelled</p>
          </Col>
        </Row>
      </Col>
      <Col md={6} className="d-flex align-items-center flex-column justify-content-center">
        <p className="h3 text-uppercase">total sales</p>
        <p className="small text-muted text-uppercase">usd</p>
        <p className="display-4 font-weight-bold">{+totalSales.toFixed(2)}</p>
      </Col>
      <Col md={7} className="border-right mt-5">
        <p className="text-uppercase text-center">order history</p>
        <ResponsiveContainer
          width="100%"
          height={250}
        >
          <AreaChart data={areaData}>
            <CartesianGrid strokeDasharray="3 1" />
            <XAxis dataKey="time" interval="preserveStartEnd"/>
            <Tooltip/>
            <Area type='monotone' dataKey='orders' stroke='#8884d8' fill='#8884d8' />
          </AreaChart>
        </ResponsiveContainer>
      </Col>
      <Col md={5} className="mt-5">
        <p className="text-uppercase text-center">report</p>
        <Row className="border-bottom pb-4">
          <Col md={6}>
            <p className="small text-muted text-center mb-0">Ontime Delivery</p>
            <p className="h2">{+totalPercentCompleted.toFixed(2)}%</p>
            <ProgressBar now={totalPercentCompleted} className="pa-sm-progress pa-success" />
          </Col>
          <Col md={6}>
            <p className="small text-muted text-center mb-0">Late Delivery</p>
            <p className="h2">{+totalPercentPendings.toFixed(2)}%</p>
            <ProgressBar now={totalPercentPendings} className="pa-sm-progress pa-danger" />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <p className="small text-muted mb-0">Performace</p>
            <p className={`h4 font-weight-bold pa-success ${performance > 0 ? 'pa-success' : 'pa-danger'}`}>{+performance.toFixed(2)}%</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
