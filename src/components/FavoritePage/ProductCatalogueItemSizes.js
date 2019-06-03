
const ProductCatalogueItemSizes = sizes => (
    <div className="sizes">
      <p className="sizes__title">Размеры в наличии:</p>
      <p className="sizes__avalible">{() => {
        const availableSizes = sizes.filter(el => el.available === true);
        return availableSizes.map((el, i) => ((i > 0) ? ', ' : null) + el.size);
      }
      }</p>
    </div>
);

export default ProductCatalogueItemSizes;
