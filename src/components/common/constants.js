

module.exports = {
  apiUrl: 'http://api-neto.herokuapp.com/bosa-noga',
  paymentTypes: [
    { value: 'onlineCard', title: 'Картой онлайн' },
    { value: 'offlineCard', title: 'Картой при получении' },
    { value: 'offlineCash', title: 'Наличными при получении' },
  ],
  catalogueFilterParams: [
    {
      name: 'type',
      title: 'Каталог',
      type: 'select',
      containerClass: 'catalogue-list',
    },
    {
      name: 'brand',
      title: 'Бренд',
      type: 'search',
      containerClass: 'brand',
    },
    {
      name: 'color',
      title: 'Цвет',
      type: 'select',
      containerClass: 'color',
      icons: [
        { title: 'Черный', iconClass: 'black' },
        { title: 'Бежевый', iconClass: '' },
        { title: 'Серый', iconClass: '' },
        { title: 'Бардо', iconClass: '' },
        { title: 'Белый', iconClass: 'white' },
        { title: 'Прозрачный', iconClass: '' },
        { title: 'Синий', iconClass: '' },
        { title: 'Красный', iconClass: '' },
        { title: 'Темно-салатовый', iconClass: '' },
        { title: 'Фиолетовый', iconClass: '' },
        { title: 'Беж', iconClass: '' },
        { title: 'Оранжевый', iconClass: '' },
        { title: 'Металлик', iconClass: '' },
        { title: 'Разноцветные', iconClass: '' },
        { title: 'Коричневый', iconClass: '' },
        { title: 'Серебряный', iconClass: '' },
        { title: 'Черно-белый', iconClass: '' },
        { title: 'Розовый', iconClass: '' },
      ],
    },
    {
      name: 'reason',
      title: 'Повод',
      type: 'select',
      containerClass: 'occasion',
    },
    {
      name: 'season',
      title: 'Сезон',
      type: 'select',
      containerClass: 'season',
    },
    {
      name: 'heelSize',
      title: 'Размер каблука',
      type: 'checkbox',
      containerClass: 'heal-height',
    },
    {
      name: 'sizes',
      title: 'Размер',
      type: 'checkbox',
      containerClass: 'size',
    },
  ],
};
