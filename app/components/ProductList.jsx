import ProductCard from "./ProductCard";

const ProductList = ({ products, onOrder }) => {
  return (
    <div className="flex flex-wrap gap-10 p-6 items-center justify-center">
      {products.map((product, index) => (
        <ProductCard key={index} product={product} onOrder={onOrder} />
      ))}
    </div>
  );
};

export default ProductList;
