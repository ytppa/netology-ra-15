import React from 'react';

import {
  TopMenu,
  HeaderMainPhone,
  HeaderMainLogo,
  HeaderMain,
} from './components.js';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topMenuItems: this.props.topMenuItems,
      phone: this.props.phone,
      workingHours: this.props.workingHours,
    };
  }

  render() {
    const { topMenuItems, phone, workingHours } = this.state;

    return (
      <header className="header">
        <TopMenu items={topMenuItems} />
        <HeaderMain cartItems={this.props.cartItems} onRemoveItem={this.props.onRemoveItem}>
          <HeaderMainPhone phone={phone} workingHours={workingHours}/>
          <HeaderMainLogo />
        </HeaderMain>
        <nav className="main-menu">
          <div className="wrapper">
            <ul className="main-menu__items">
              <li className="main-menu__item main-menu__item_sales">
                <a href="#">Акции</a>
              </li>
              <li className="main-menu__item main-menu__item_women">
                <a href="#">Женская обувь</a>
              </li>
              <li className="main-menu__item main-menu__item_men">
                <a href="#">Мужская обувь</a>
              </li>
              <li className="main-menu__item main-menu__item_kids">
                <a href="#">Детская обувь</a>
              </li>
              <li className="main-menu__item main-menu__item_accessories">
                <a href="#">Аксессуары</a>
              </li>
              <li className="main-menu__item main-menu__item_home">
                <a href="#">Для дома</a>
              </li>
              <li className="main-menu__item main-menu__item_brands">
                <a href="#">Бренды</a>
              </li>
              <li className="main-menu__item main-menu__item_new">
                <a href="#">Новинки</a>
              </li>
            </ul>
          </div>

        </nav>
        <div className="dropped-menu">
          <div className="wrapper">
            <div className="dropped-menu__lists dropped-menu__lists_women">
              <h3 className="dropped-menu__list-title">Повод:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Офис</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Вечеринка</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Свадьба</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Спорт</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Море</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Дом</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Повседневное</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists dropped-menu__lists_three-coloumns">
              <h3 className="dropped-menu__list-title">Категории:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Балетки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Босоножки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботильоны</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботинки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ботфорты</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Галоши</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Кеды и кроссовки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Мокасины</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Полусапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Резиновые сапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сабо</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сапоги</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Сникерсы</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Тапочки</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Туфли</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Шлёпанцы и вьетнамки</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Сезон:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Зима</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Весна</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Лето</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Осень</a>
                </li>
              </ul>
            </div>
            <div className="dropped-menu__lists">
              <h3 className="dropped-menu__list-title">Бренды:</h3>
              <ul className="dropped-menu__list">
                <li className="dropped-menu__item">
                  <a href="#">Albano</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Ballin</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Baldinini</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Damlax</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Pegia</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Renzi</a>
                </li>
                <li className="dropped-menu__item">
                  <a href="#">Все</a>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </header>
    );
  }
}
