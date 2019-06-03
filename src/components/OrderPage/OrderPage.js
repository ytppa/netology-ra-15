import React from 'react';

import OrderResult from './OrderResult.js';
import OrderForm from './OrderForm.js';

import '../../css/style-order.css';


// import Storage from '../common/Storage.js';
// import { SitePath, showLoader, hideLoader, declOfNum } from '../common/functions.js';

// var Constants = require('../common/constants.js');
// var apiUrl =  Constants.apiUrl;


class OrderPage extends React.Component {
  // constructor(props) { super(props); }

  render() {
    const orderId = (this.props.match.params !== undefined && !!this.props.match.params.orderId)
      ? this.props.match.params.orderId
      : null;
    const { orders } = this.props;
    const order = Array.isArray(orders)
      ? orders.find(element => element.id === orderId)
      : null;

    if (orders.length && !!orderId && !!order) {
      return <OrderResult {...this.props} order={order}/>;
    }
    return <OrderForm {...this.props} />;
  }
}

export default OrderPage;
