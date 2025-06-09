'use client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useCartStore from '../store/cartStore';
import useAuthStore from '../store/authStore';

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const cartCount = useCartStore(state => state.cartCount());
    console.log(user, 'user');
    
  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="sticky top-0 bg-white shadow-md z-50 p-4">
      <nav className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold text-red-600">
          SpicyHub
        </Link>
        <div className="flex gap-4 items-center">
          {user ? (
            <>
              <Link href="/orders" className="hover:text-red-600">
                My Orders
              </Link>
              <button onClick={handleLogout} className="hover:text-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link href="/login" className="hover:text-red-600">
              Login
            </Link>
          )}
          <Link href="/cart" className="relative hover:text-red-600">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;