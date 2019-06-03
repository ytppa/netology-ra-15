import React from 'react';

import Slider from './Slider.js';
import { NewDealsWithCategories } from './NewDeals.js';
import SalesAndNews from './SalesAndNews.js';
import Article from '../common/Article.js';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slides: [
        {
          href: '#1',
          src: './src/img/slider.jpg',
          alt: 'slide picture',
        }, {
          href: '#2',
          src: './src/img/slider180deg.jpeg',
          alt: 'slide picture',
        }, {
          href: '#3',
          src: './src/img/slider.jpg',
          alt: 'slide picture',
        }, {
          href: '#4',
          src: './src/img/slider180deg.jpeg',
          alt: 'slide picture',
        },
      ],
    };
  }

  render() {
    const { slides } = this.state;
    return (
      <div>
        <Slider title="К весне готовы" slides={slides} />
        <NewDealsWithCategories title="Новинки" />
        <SalesAndNews title="Aкции и новости" />
        <Article name="about-us">
          <h2 className="about-us__title">Клиенты делают заказ
            <br /> в интернет-магазине BosaNoga!</h2>
          <p className="about-us__text">
            В Интернете можно встретить немало магазинов, предлагающих аксессуары. Но именно к нам
            хочется возвращаться снова и снова.
          </p>
          <h3 className="about-us__text_header">Мы предлагаем вам особые условия:</h3>
          <ol className="about-us__text">
            <li>Индивидуальный подход специалиста. Когда поступает новая коллекция обуви весна-лето
            или же коллекция обуви осень-зима – покупателям бывает трудно сориентироваться во всем
            многообразии новинок. Наш менеджер по телефону поможет вам определиться с товарами,
            подходящими именно вам.</li>
            <li>Мы периодически проводим распродажи как женских и мужских, так и детских моделей.
            Вы будете приятно удивлены ценами на аксессуары в мага- зине BosaNoga.</li>
            <li>У нас всегда есть из чего выбрать. Неважно, какую категорию вы прос- матриваете:
            осень-зима, или же весна-лето –вы всегда сможете найти ва- рианты, подходящие вам
            по внешнему виду и цене.</li>
            <li>Мы несем ответственность за все товары.</li>
            <li>Молодые мамы будут рады обширному ассортименту детских моделей.</li>
          </ol>
          <p className="about-us__text">
            Если вы ищете место, где представлены обувные новинки от самых известных брендов, то вы
            зашли по верному адресу.
          </p>
          <p className="about-us__text">
          У нас представлены модели для мужчин, женщин, а также детские сапоги, босоножки, ботинки
          и туфли. Сделав заказ в нашем интернет-магазине, вы сможете быть модным и стильным как
          осенью-зимой, так и весной-летом. Просто наберите номер нашего телефона, и мы
          поможем вам определиться с покупкой.</p>
        </Article>
      </div>
    );
  }
}
