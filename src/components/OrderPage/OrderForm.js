import React from 'react';

import OrderBasketItem from './OrderBasketItem.js';

import { FormField, FormRadioField } from './formFields.js';
import { SitePath, formatPrice } from '../common/functions.js';

const Constants = require('../common/constants.js');

const { apiUrl } = Constants;
const { paymentTypes } = Constants;


class OrderForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Оформление заказа',
      formFields: [
        {
          type: 'text',
          title: 'Имя',
          placeholder: 'Представьтесь, пожалуйста',
          name: 'name',
          value: '',
          required: true,
        }, {
          type: 'tel',
          title: 'Телефон',
          placeholder: 'Номер в любом формате',
          name: 'phone',
          value: '',
          required: true,
        }, {
          type: 'email',
          title: 'E-mail',
          placeholder: 'Укажите E-mail',
          name: 'email',
          value: '',
          required: true,
        }, {
          type: 'text',
          title: 'Адрес',
          placeholder: 'Ваша покупка будет доставлена по этому адресу',
          name: 'address',
          value: '',
          required: true,
        },
      ],
      formRadioGroup: {
        name: 'paymentType',
        value: null,
        required: true,
        data: paymentTypes,
      },
    };
    // this.refForm = React.createRef();
    this.form = null;
    this.getTotal = this.getTotal.bind(this);
    this.onQuantityDecrease = this.onQuantityDecrease.bind(this);
    this.onQuantityIncrease = this.onQuantityIncrease.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
  }

  onQuantityDecrease(aId, aSize, aAmount) {
    let amount = aAmount;
    if (amount > 0) amount -= 1;
    this.props.onCartItemUpdate(aId, aSize, aAmount);
  }

  onQuantityIncrease(aId, aSize, aAmount) {
    let amount = aAmount;
    amount += 1;
    this.props.onCartItemUpdate(aId, aSize, amount);
  }

  getTotal() {
    let summ = 0;
    this.props.cartItems.forEach((item) => {
      summ += item.price * item.amount;
    });
    return summ;
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = {};
    let email = '';
    const { formFields, formRadioGroup } = this.state;
    const { cartId } = this.props;


    formFields.forEach((field) => {
      if (field.name === 'email') {
        email = field.value;
      } else {
        data[field.name] = field.value;
      }
    });
    data[formRadioGroup.name] = formRadioGroup.value;
    data.cart = cartId;

    this.registerOrder(data, email);
  }

  registerOrder(aData, aEmail) {
    const init = {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(aData),
    };
    fetch(`${apiUrl}/order`, init)
      .then(result => result.json())
      .then((json) => {
        if (json.status === 'ok') {
          this.props.saveOrder(json.data, aEmail);
        } else {
          alert(json.message);
        }
      });
  }

  handleFieldChange(event) {
    const { name } = event.currentTarget;
    const { value } = event.currentTarget;
    const { formFields } = this.state;
    const i = formFields.findIndex(field => field.name === name);
    formFields[i].value = value;
    this.setState({ formFields });
  }

  handleRadioChange(event) {
    const { formRadioGroup } = this.state;
    formRadioGroup.value = event.target.value;
    this.setState({ formRadioGroup });
  }

  render() {
    const { title, formFields, formRadioGroup } = this.state;
    const { cartItems } = this.props;
    const isValid = (this.form !== null) ? this.form.checkValidity() : false;

    return (
      <div className="wrapper order-wrapper">
        <SitePath
          title={title}
          url={this.props.match.url}
          middlePath={[{ url: '/order/', title: 'Корзина' }]} />
        <section className="order-process">
          <h2 className="order-process__title">Оформление заказа</h2>
          <div className="order-process__basket order-basket">
            <div className="order-basket__title">
              в вашей корзине{cartItems.length ? ':' : ' пока ничего нет'}
            </div>
            <div className="order-basket__item-list">
              {cartItems.map(item => (
                  <OrderBasketItem
                    key={`${item.id}-${item.size}`}
                    item={item}
                    onQuantityDecrease={
                      () => this.onQuantityDecrease(item.id, item.size, item.amount)
                    }
                    onQuantityIncrease={
                      () => this.onQuantityIncrease(item.id, item.size, item.amount)
                    }
                  />
              ))}
            </div>
            <div className="order-basket__summ">
                Итого:
                <span>{formatPrice(this.getTotal(), '')}
                  <i className="fa fa-rub" aria-hidden="true"></i>
                </span>
            </div>
          </div>
          <div className="order-process__confirmed">
            <form onSubmit={this.handleSubmit} ref={(form) => { this.form = form; }}>
              <div className="order-process__delivery">
                <h3 className="h3">кому и куда доставить?</h3>
                <div className="order-process__delivery-form">
                  {formFields.map(field => (
                    <FormField key={field.name} {...field} onChange={this.handleFieldChange} />
                  ))}
                </div>
                <p>
                  Все поля обязательны для заполнения.
                  Наш оператор свяжется с вами для уточнения деталей заказа.
                </p>
              </div>
              <div className="order-process__paid">
                <h3 className="h3">хотите оплатить онлайн или курьеру при получении?</h3>
                <div className="order-process__paid-form">
                  { formRadioGroup.data.map(radio => (
                      <FormRadioField
                        key={radio.value}
                        name={formRadioGroup.name}
                        required={formRadioGroup.required}
                        checked={formRadioGroup.value === radio.value}
                        onChange={this.handleRadioChange}
                        {...radio}
                      />
                  ))}
                </div>
              </div>
              <button
                className={`order-process__form-submit order-process__form-submit_click ${
                  (!isValid) ? 'order-process__form-submit_disabled' : ''
                }`}
              >
                Подтвердить заказ
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
}

export default OrderForm;
