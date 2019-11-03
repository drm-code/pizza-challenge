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
  const completed = dashboard.completed || 0;
  const pendings = dashboard.pendings || 0;
  const totalOrders = completed + pendings;
  const totalSales = dashboard.totalSales || 0;
  const areaData = dashboard.areaData || [];
  const totalPercentCompleted = dashboard.totalPercentCompleted || 0;
  const totalPercentPending = dashboard.totalPercentPending || 0;
  const performace = totalPercentCompleted - totalPercentPending;

  useEffect(() => {
    Api.getDashboardReport()
      .then(({ data }) => {
        const areaData = data.timeAndOrders.time.map((item, index) => ({
          time: item,
          orders: data.timeAndOrders.orders[index]
        })).sort((a, b) => {
          if (a.time < b.time) return -1;
          if (a.time > b.time) return 1;
          return 0;
        });
        dispatch({
          type: 'LOAD_DASHBOARD',
          payload: {
            ...data,
            areaData
          }
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
            <p className="small text-center mt-3">Orders Delivered</p>
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
            <p className="small text-center mt-3">Pending Delivery</p>
          </Col>
        </Row>
      </Col>
      <Col md={6} className="d-flex align-items-center flex-column justify-content-center">
        <p className="h3 text-uppercase">total sales</p>
        <p className="small text-muted text-uppercase">usd</p>
        <p className="display-4 font-weight-bold">{totalSales}</p>
      </Col>
      <Col md={7} className="border-right mt-5">
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
            <p className="small text-muted text-center mb-0">Late Deliveiesy</p>
            <p className="h2">{+totalPercentPending.toFixed(2)}%</p>
            <ProgressBar now={totalPercentPending} className="pa-sm-progress pa-danger" />
          </Col>
        </Row>
        <Row className="pt-4">
          <Col>
            <p className="small text-muted mb-0">Performace</p>
            <p className={`h4 font-weight-bold pa-success ${performace > 0 ? 'pa-success' : 'pa-danger'}`}>{+performace.toFixed(2)}%</p>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
