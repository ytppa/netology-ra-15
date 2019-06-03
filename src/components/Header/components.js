import React from 'react';
import { Link } from 'react-router-dom';

import { formatPrice } from '../common/functions.js';


export const TopMenu = ({ items }) => {
  if (!items) return null;
  return (
    <div className="top-menu">
      <div className="wrapper">
        <ul className="top-menu__items">
          {items.map(item => (
              <li key={item.title} className="top-menu__item">
                <Link to={item.url}>{item.title}</Link>
              </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export const HeaderMainPhone = ({ phone, workingHours }) => {
  // +7-495-790-35-03">+7 495 79 03 5 03
  const formatedPhone = phone;
  return (
    <div className="header-main__phone">
      <a href={`tel:${formatedPhone}`}>{phone}</a>
      {workingHours ? (<p>{workingHours}</p>) : null}
    </div>
  );
};

export const HeaderMainLogo = () => (
    <div className="header-main__logo">
      <Link to="/">
        <h1>
          <img src="/src/img/header-logo.png" alt="logotype" />
        </h1>
      </Link>
      <p>Обувь и аксессуары для всей семьи</p>
    </div>
);

export class HeaderMain extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSearchActive: false,
      isProfilePanelVisible: false,
      isBasketPanelVisible: false,
    };
    this.handleProfileIconClick = this.handleProfileIconClick.bind(this);
    this.handleBasketIconClick = this.handleBasketIconClick.bind(this);
    this.handleSearchIconClick = this.handleSearchIconClick.bind(this);
  }

  onCheckoutStart(event) {
    event.preventDefault();
  }

  handleProfileIconClick(event) {
    event.preventDefault();
    this.setState({
      isProfilePanelVisible: !this.state.isProfilePanelVisible,
      isBasketPanelVisible: false,
    });
  }

  handleBasketIconClick(event) {
    event.preventDefault();
    this.setState({
      isProfilePanelVisible: false,
      isBasketPanelVisible: !this.state.isBasketPanelVisible,
    });
  }

  handleSearchIconClick(event) {
    event.preventDefault();
    this.setState({
      isSearchActive: !this.state.isSearchActive,
    });
  }

  getTotal() {
    const { cartItems } = this.props;
    return cartItems.reduce((a, b) => a + b.amount, 0);
  }

  render() {
    const { isSearchActive, isProfilePanelVisible, isBasketPanelVisible } = this.state;
    const { cartItems } = this.props;
    const total = this.getTotal();
    const isPanelVisible = !!((isProfilePanelVisible || isBasketPanelVisible));
    return (
      <div className="header-main">
        <div className="header-main__wrapper wrapper">
          {this.props.children}
          <HeaderMainProfile
            total={total}
            isSearchActive={isSearchActive}
            isProfileMenuActive={isProfilePanelVisible}
            isBasketMenuActive={isBasketPanelVisible}
            onSearchClick={this.handleSearchIconClick}
            onProfileClick={this.handleProfileIconClick}
            onBasketClick={this.handleBasketIconClick} />
        </div>
        <HeaderMainHiddenPanel isVisible={isPanelVisible}>
          <ProfilePanel isVisible={isProfilePanelVisible} />
          <BasketPanel
            isVisible={isBasketPanelVisible}
            items={cartItems}
            onRemoveItem={this.props.onRemoveItem}
            onCheckoutStart={this.onCheckoutStart}
          />
        </HeaderMainHiddenPanel>
      </div>
    );
  }
}

export const HeaderMainHiddenPanel = (props) => {
  const { isVisible } = props;
  return (
    <div
      className={`header-main__hidden-panel hidden-panel ${isVisible
        ? 'header-main__hidden-panel_visible'
        : null}`
      }>
      <div className="wrapper">
        {props.children}
      </div>
    </div>
  );
};

export const BasketPanel = ({ isVisible, items, onRemoveItem }) => {
  if (!isVisible) return null;
  return (
    <div
      className={`hidden-panel__basket basket-dropped ${isVisible
        ? 'hidden-panel__basket_visible'
        : null}`
      }>
      <div
        className="basket-dropped__title">В вашей корзине{items.length
          ? ':'
          : ' пока ничего нет'
        }</div>
      <div
        className="basket-dropped__product-list product-list">
        {items.map(item => (
          <BasketItem key={`${item.id}-${item.size}`} item={item} onRemoveItem={onRemoveItem} />))}
      </div>
      {(items.length > 0)
        ? <Link to="/order/" className="basket-dropped__order-button">Оформить заказ</Link>
        : null}
    </div>
  );
};

export const BasketItem = ({ item, onRemoveItem }) => {
  const key = `${item.id}-${item.size}`;
  return (
    <div className="product-list__item">
      <Link to={`/product/${item.id}`} className="product-list__pic">
        <img src={item.images[0]} alt={item.title} />
      </Link>
      <Link to={`/product/${item.id}`} className="product-list__product">
        {item.title}
        &nbsp;<span className="product-list__item-details">(размер: {item.size})</span>&nbsp;
        {(item.amount > 0)
          ? (<span className="product-list__item-details">{item.amount} шт</span>)
          : null}
      </Link>
      <div className="product-list__fill"></div>
      <div className="product-list__price">
        {`${formatPrice(item.price * item.amount, '')} `}
        <i className="fa fa-rub" aria-hidden="true"></i>
      </div>
      <div className="product-list__delete" onClick={event => onRemoveItem(event, key)}>
        <i className="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
  );
};

export const ProfilePanel = ({ isVisible }) => (
    <div className={`hidden-panel__profile ${isVisible ? 'hidden-panel__profile_visible' : ''}`}>
      <Link to="#">Личный кабинет</Link>
      <Link to="/favorite/">
        <i className="fa fa-heart-o" aria-hidden="true"></i>Избранное</Link>
      <Link to="#">Выйти</Link>
    </div>
);

export const HeaderMainProfile = (props) => {
  const {
    total,
    isSearchActive,
    isProfileMenuActive,
    isBasketMenuActive,
    onSearchClick,
    onProfileClick,
    onBasketClick,
  } = props;
  return (
    <div className="header-main__profile">
      <div className="header-main__pics">
        <HeaderMainProfileSearchIcon isActive={isSearchActive} onClick={onSearchClick} />
        <HeaderMainProfileBorder />
        <HeaderMainProfileProfileIcon isActive={isProfileMenuActive} onClick={onProfileClick} />
        <HeaderMainProfileBorder />
        <HeaderMainProfileBasketIcon
          total={total}
          isActive={isBasketMenuActive}
          onClick={onBasketClick}
        />
      </div>
      <HeaderMainProfileSearchForm isActive={isSearchActive} />
    </div>
  );
};

export const HeaderMainProfileSearchForm = ({ isActive }) => (
    <form
      className={`header-main__search ${isActive ? 'header-main__search_active' : ''}`}
      action="#"
    >
      <input placeholder="Поиск" />
      <i className="fa fa-search" aria-hidden="true"></i>
    </form>
);

export class HeaderMainProfileBasketIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTotal: false,
    };
  }

  render() {
    const { isActive, onClick, total } = this.props;
    return (
      <div className="header-main__pic header-main__pic_basket" onClick={onClick}>
        <div
          className="header-main__pic_basket_full"
          style={total > 0
            ? { display: 'block' }
            : null}
        >{total > 0 ? total : null}</div>
        <div
          className={`header-main__pic_basket_menu ${isActive
            ? 'header-main__pic_basket_menu_is-active'
            : ''}`}
        ></div>
      </div>
    );
  }
}

export const HeaderMainProfileProfileIcon = ({ isActive, onClick }) => (
    <div className="header-
    main__pic header-main__pic_profile" onClick={onClick}>
      <div
        className={`header-main__pic_profile_menu ${isActive
          ? 'header-main__pic_profile_menu_is-active'
          : ''}`}
      ></div>
    </div>
);

export const HeaderMainProfileSearchIcon = ({ isActive, onClick }) => (
    <div
      className={`header-main__pic header-main__pic_search ${isActive
        ? 'header-main__pic_search_is-hidden'
        : ''}`}
      onClick={onClick}
    ></div>
);

export const HeaderMainProfileBorder = () => <div className="header-main__pic_border"></div>;
