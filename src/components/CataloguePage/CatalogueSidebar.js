import React from 'react';

import Separator from './Separator.js';
import SidebarDivision from './SidebarDivision.js';

const Constants = require('../common/constants.js');

const { catalogueFilterParams } = Constants;

/*
  catalogueFilterParams: [
    {
      name: 'type',
      title: 'Каталог',
      type: 'select',
      containerClass: 'catalogue-list',
      icons: [{title, iconClass}]
    }
  ]
*/

class CatalogueSidebar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleViewListener = this.toggleViewListener.bind(this);
    this.state = {
      filterParams: catalogueFilterParams,
      filters: [],
    };
  }


  toggleViewListener(event, name) {
    event.preventDefault();
    console.log(name);
  }

  render() {
    // console.log(catalogueFilterParams);
    return (
      <section className="sidebar">
        {
          catalogueFilterParams.map((item, index) => (
              <SidebarDivision
                key={item.name}
                index={index}
                onToggleView={this.toggleViewListener}
                {...item}
                opened
              >
              </SidebarDivision>
          ))}
        <p>1111111111111111</p>
        <SidebarDivision
          title="Каталог"
          containerClass="catalogue-list"
          onToggleView={this.toggleViewListener}
          opened>
          <ul>
            <li><a href="#">Балетки</a></li>
            <li><a href="#">Босоножки и сандалии</a></li>
            <li><a href="#">Ботильоны</a></li>
            <li><a href="#">Ботинки</a></li>
            <li><a href="#">Ботфорты</a></li>
            <li><a href="#">Галоши</a></li>
            <li><a href="#">Тапочки</a></li>
            <li><a href="#">Туфли</a></li>
            <li><a href="#">Сапоги</a></li>
          </ul>
        </SidebarDivision>
        <Separator size="150" id="1" />
        <SidebarDivision
          title="Цена"
          containerClass="price"
          onToggleView={this.toggleViewListener}
          opened>
          <div className="price-slider">
            <div className="circle-container">
              <div className="circle-1"></div>
              <div className="line-white"></div>
              <div className="line-colored"></div>
              <div className="circle-2"></div>
            </div>
            <div className="counter">
              <input type="text" className="input-1" value="1000" />
              <div className="input-separator"></div>
              <input type="text" className="input-2" value="30 000" />
            </div>
          </div>
        </SidebarDivision>
        <Separator size="150" id="2" />
        <SidebarDivision
          title="Цвет"
          containerClass="color"
          onToggleView={this.toggleViewListener}
          opened>
          <ul>
            <li>
              <a href="#">
                <div className="color beige"></div>
                <span className="color-name">Бежевый</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="color whitesnake"></div>
                <span className="color-name">Белый</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="color shocking-blue"></div>
                <span className="color-name">Голубой</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="color yellow"></div>
                <span className="color-name">Жёлтый</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="color king-crimson"></div>
                <span className="color-name">Алый</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="color deep-purple"></div>
                <span className="color-name">Фиолетовый</span>
              </a>
            </li>
            <li>
              <a href="#">
                <div className="color black-sabbath"></div>
                <span className="color-name">Чёрный</span>
              </a>
            </li>
          </ul>
        </SidebarDivision>
        <Separator size="150" id="3" />
        <SidebarDivision
          title="Размер"
          containerClass="size"
          onToggleView={this.toggleViewListener}
          opened>
          <ul>
            <div className="list-1">
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-31" />
                  <span className="checkbox-custom"></span>
                  <span className="label">31</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-33" />
                  <span className="checkbox-custom"></span>
                  <span className="label">33</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-35" />
                  <span className="checkbox-custom"></span>
                  <span className="label">35</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-37" />
                  <span className="checkbox-custom"></span>
                  <span className="label">37</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-39" />
                  <span className="checkbox-custom"></span>
                  <span className="label">39</span>
                </label>
              </li>
            </div>
            <div className="list-2">
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-32" />
                  <span className="checkbox-custom"></span>
                  <span className="label">32</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-34" />
                  <span className="checkbox-custom"></span>
                  <span className="label">34</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-36" checked />
                  <span className="checkbox-custom"></span>
                  <span className="label">36</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-38" />
                  <span className="checkbox-custom"></span>
                  <span className="label">38</span>
                </label>
              </li>
              <li>
                <label>
                  <input type="checkbox" className="checkbox" name="checkbox-40" />
                  <span className="checkbox-custom"></span>
                  <span className="label">40</span>
                </label>
              </li>
            </div>
          </ul>
        </SidebarDivision>
        <Separator size="150" id="4" />
        <SidebarDivision
          title="Размер каблука"
          containerClass="heel-height"
          onToggleView={this.toggleViewListener}
          opened={false}>
        </SidebarDivision>
        <Separator size="150" id="5" />
        <SidebarDivision
          title="Повод"
          containerClass="occasion"
          onToggleView={this.toggleViewListener}
          opened>
          <ul>
            <li><a href="#">Офис</a></li>
            <li><a href="#">Вечеринка</a></li>
            <li><a href="#">Свадьба</a></li>
            <li><a href="#">Спорт</a></li>
            <li><a href="#">Путешествие</a></li>
            <li><a href="#">Свидание</a></li>
            <li><a href="#">Дома</a></li>
            <li><a href="#">Произвести впечатление</a></li>
          </ul>
        </SidebarDivision>
        <Separator size="150" id="6" />
        <SidebarDivision
          title="Сезон"
          containerClass="season"
          onToggleView={this.toggleViewListener}
          opened={false}>
        </SidebarDivision>
        <Separator size="150" id="7" />
        <section className="sidebar__division">
          <div className="sidebar__brand">
            <h3>Бренд</h3>
            <form action="post" className="brand-search">
              <input
                type="search"
                className="brand-search"
                id="brand-search"
                placeholder="Поиск"
              />
              <input type="submit" name="" value="" className="submit" />
            </form>
          </div>
          <label>
            <input type="checkbox" className="checkbox" name="checkbox-disc" />
            <span className="checkbox-discount"></span>
            <span className="text-discount">Со скидкой</span>
          </label>
          <Separator size="240" />
        </section>
        <section className="sidebar__division">
          <div className="drop-down">
            <a href="#"><span className="drop-down-icon"></span>Сбросить</a>
          </div>
        </section>
      </section>
    );
  }
}


export default CatalogueSidebar;
