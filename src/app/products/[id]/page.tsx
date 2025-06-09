
import axios from 'axios';
import ProductDetail from './ProductDetail';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const { data: product } = await axios.get(`http://localhost:4000/products/${params.id}`);
  return <ProductDetail product={product} />;
};

export default ProductPage;