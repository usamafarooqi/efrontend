import useCartStore from '../store/cartStore';

export const useCart = () => {
  const { items, addItem, removeItem, cartCount, cartTotal } = useCartStore();

  const addToCart = (productId: string, optionId: string, price: number) => {
    addItem({ productId, optionId, price });
  };

  const removeFromCart = (productId: string, optionId: string) => {
    removeItem(productId, optionId);
  };

  return {
    cartItems: items,
    cartCount,
    cartTotal,
    addToCart,
    removeFromCart
  };
};