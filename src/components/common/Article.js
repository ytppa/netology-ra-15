import React from 'react';


export default class Article extends React.Component {
  render() {
    const { name, children } = this.props;
    return (
      <section className={name}>
        {children}
        <span className="about-us__text_overlay"></span>
        <button className="about-us__text_button">читать</button>
      </section>
    );
  }
}
