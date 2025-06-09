import { create } from 'zustand';

type CartItem = {
  productId: string;
  optionId: string;
  optionName: string;
  optionValue: string;
  quantity: number;
  price: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (productId: string, optionId: string) => void;
  cartCount: () => number;
  cartTotal: () => number;
  clearCart: () => void;
};

const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  addItem: (item) => set((state) => {
    const existing = state.items.find(i => 
      i.productId === item.productId && i.optionId === item.optionId
    );
    if (existing) {
      return {
        items: state.items.map(i => i === existing 
          ? { ...i, quantity: i.quantity + 1 }
          : i
        )
      };
    }
    return { items: [...state.items, { ...item, quantity: 1 }] };
  }),
  removeItem: (productId, optionId) => set((state) => ({
    items: state.items.filter(i => 
      !(i.productId === productId && i.optionId === optionId)
    )
  })),
  cartCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  cartTotal: () => get().items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
  clearCart: () => set({ items: [] }),
}));

export default useCartStore;