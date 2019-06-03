import React from 'react';
import { Link } from 'react-router-dom';

export default class SalesAndNews extends React.Component {
  // constructor(props) { super(props); }

  render() {
    return (
      <section className="sales-and-news wave-bottom">
        <h2 className="h2">{this.props.title}</h2>
        <div className="sales-and-news__items">
          <SalesAndNewsBanner id="1" href="#">
            обувь к свадьбе
          </SalesAndNewsBanner>
          <SalesAndNewsBanner id="2" href="#">
            20% скидка<br /><span>На летнюю обувь</span>
          </SalesAndNewsBanner>
          <SalesAndNewsBanner id="3" href="#">
            готовимся к лету!
          </SalesAndNewsBanner>
          <SalesAndNewsBanner id="4" href="#">
            Больше покупок – <br />больше скидка!
          </SalesAndNewsBanner>
          <NewsCarousel />
        </div>
      </section>
    );
  }
}

const SalesAndNewsBanner = (props) => {
  const { id, href, children } = props;
  return (
    <div className={`sales-and-news__item sales-and-news__item_${id}`}>
      <Link to={href}>
        <h3 className="h3">{children}</h3>
      </Link>
    </div>
  );
};

// Замечание: Блок сверстан плохо. Длинные заголовки не растягивают его,
// а выходят ниже, за границы блока. Требуется более аккуратное решение.
class NewsCarousel extends React.Component {
  render() {
    return (
      <div className="sales-and-news__news">
        <div className="sales-and-news__arrow sales-and-news__arrow_up arrow"></div>

        <NewsCarouselItem url="#" dateTime="2017-01-18 00:00">
          Американские резиновые сапоги Bogs идеально подходят для русской зимы!
        </NewsCarouselItem>
        <NewsCarouselItem url="#" dateTime="2017-05-18 00:00">
          Магазины Bosa Noga
        </NewsCarouselItem>
        <NewsCarouselItem url="#" dateTime="2017-03-10 00:00">
          Тенденция весны 2018: розовый и фуксия. 10 пар обуви для яркого образа
        </NewsCarouselItem>

        <div className="sales-and-news__arrow sales-and-news__arrow_down arrow"></div>
      </div>
    );
  }
}

const NewsCarouselItem = (props) => {
  const { url, dateTime, children } = props;
  const monthsArr = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря',
  ];
  // Тут будет проверка dateTime
  const d = new Date(dateTime);
  const dateString = `${d.getDate()} ${
    monthsArr[d.getMonth()]} ${
    d.getFullYear()}`;

  return (
    <div className="sales-and-news__new">
      <time dateTime={dateTime}>{dateString}</time>
      <Link to={url}>{children}</Link>
    </div>
  );
};
