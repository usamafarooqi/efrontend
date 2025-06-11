'use client';

import Header from '@/components/Header';
import useCartStore from '../../store/cartStore';
import { useState } from 'react';
import apiClient from '@/lib/apiClient';
import { useRouter } from 'next/navigation';

const CartPage = () => {
  const { items, removeItem, cartTotal, clearCart } = useCartStore();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleCheckout = async () => {
    if (!deliveryAddress) {
      alert('Please enter delivery address');
      return;
    }

    setIsLoading(true);
    try {
      const orderPayload = {
        deliveryAddress,
        paymentMethod,
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          selectedOptions: [{
            name: item.optionName,
            value: item.optionValue,
            additionalPrice: item.price - (item.price / item.quantity)
          }]
        }))
      };

      await apiClient.post('/orders', orderPayload);
      clearCart();
      router.push('/orders');
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to process checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Header/>
      <main className="max-w-6xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
        
        {items.length === 0 ? (
          <p className="text-gray-600">Your cart is empty</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.optionId}`} className="border p-4 rounded flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{item.productId}</h3>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">
                    Option: {item.optionId}
                  </p>
                </div>
                <div>
                  <p className="text-lg font-bold">Rs.{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item.productId, item.optionId)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
            <div className="border-t pt-4 mt-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-xl font-bold">Rs.{cartTotal()}</span>
              </div>
              
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700">
                    Delivery Address
                  </label>
                  <textarea
                    id="deliveryAddress"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    rows={3}
                    placeholder="Enter your delivery address"
                  />
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700">
                    Payment Method
                  </label>
                  <select
                    id="paymentMethod"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="card">Credit/Debit Card</option>
                  </select>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isLoading}
                  className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 mt-4 disabled:bg-red-400"
                >
                  {isLoading ? 'Processing...' : 'Proceed to Checkout'}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CartPage;