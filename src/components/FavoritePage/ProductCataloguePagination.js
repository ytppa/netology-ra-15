import { Link } from 'react-router-dom';


const ProductCataloguePagination = ({ aPage, aPages }) => {
  const page = parseInt(aPage, 10);
  const pages = parseInt(aPages, 10);

  const pagesLinks = [];
  const fromPage = (page > 2) ? (page - 2) : 1;
  const tillPage = (fromPage + 4 < pages) ? fromPage + 4 : pages;

  for (let i = 1; i <= pages; i += 1) {
    if (i === 1
        || i === pages
        || (i >= fromPage && i <= tillPage)
    ) {
      pagesLinks.push({ key: i.toString(), num: i.toString(), active: i === page });
    } else if (i === fromPage - 1 || i === tillPage + 1) {
      pagesLinks.push({ key: i.toString() });
    }
  }

  return (
    <div className="product-catalogue__pagination">
      <div className="page-nav-wrapper">
        {(page > 1)
          ? (
            <div className="angle-back">
              <Link to={`/favorite/${page > 2 ? page - 1 : ''}`}></Link>
            </div>
          )
          : null}
        <ul>
          {pagesLinks.map((link) => {
            if (link.num !== undefined) {
              return (
                <li
                  key={link.key}
                  className={link.active ? 'active' : null}
                >
                  <Link to={`/favorite/${link.num === 1 ? '' : link.num}`}>{link.num}</Link>
                </li>
              );
            }
            return <li key={link.key}>...</li>;
          })}
        </ul>
        {(page < pages)
          ? (
            <div className="angle-forward">
              <Link to={`/favorite/${page < pages - 1 ? page + 1 : pages}`}></Link>
            </div>
          )
          : null}
      </div>
    </div>
  );
};

export default ProductCataloguePagination;
