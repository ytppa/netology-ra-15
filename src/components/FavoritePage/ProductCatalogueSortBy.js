
const ProductCatalogueSortBy = ({ sortBy, onSortBySelect }) => (
    <div className="product-catalogue__sort-by">
      <p className="sort-by">Сортировать</p>
      <select id="sorting" name="sorting"
        value={sortBy}
        onChange={onSortBySelect}
      >
        <option value="price">по цене</option>
        <option value="popularity">по популярности</option>
      </select>
    </div>
);

export default ProductCatalogueSortBy;
