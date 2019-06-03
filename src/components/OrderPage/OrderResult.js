import React from 'react';
import { Link } from 'react-router-dom';

import { SitePath, formatPrice } from '../common/functions.js';

const Constants = require('../common/constants.js');

const { paymentTypes } = Constants;


class OrderResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Заказ принят',
    };
  }

  render() {
    const { title, order } = this.props;
    const { info, email } = order;
    const price = 1213;

    const payment = paymentTypes.find(element => element.value === info.paymentType);

    return (
      <div className="wrapper order-wrapper">
        <SitePath
          title={title}
          url={this.props.match.url}
          middlePath={[
            { url: '/order/', title: 'Корзина' },
            { url: '/order/', title: 'Оформление заказа' },
          ]}
        />
        <section className="order-done">
          <h2 className="order-done__title order-process__title">Заказ принят, спасибо!</h2>
          <div className="order-done__information order-info">
            <div className="order-info__item order-info__item_summ">
              <h3>Сумма заказа:</h3>
              <p>{formatPrice(price, '')} <i className="fa fa-rub" aria-hidden="true"></i></p>
            </div>
            {(payment !== undefined)
              ? (
                  <div className="order-info__item order-info__item_pay-form">
                    <h3>Способ оплаты:</h3>
                    <p>{payment.title}</p>
                  </div>
              )
              : null
            }
            <div className="order-info__item order-info__item_customer-name">
              <h3>Имя клиента:</h3>
              <p>{info.name}</p>
            </div>
            <div className="order-info__item order-info__item_adress">
              <h3>Адрес доставки:</h3>
              <p>{info.address}</p>
            </div>
            <div className="order-info__item order-info__item_phone">
              <h3>Телефон:</h3>
              <p>{info.phone}</p>
            </div>
          </div>
          <p className="order-done__notice">
            Данные о заказе отправлены на адрес <span>{email}. </span>
          </p>
          <Link to="/catalogue/" className="order-done__continue" style={{ maxWidth: '250px' }}>
            продолжить покупки
          </Link>
        </section>
      </div>
    );
  }
}

export default OrderResult;
