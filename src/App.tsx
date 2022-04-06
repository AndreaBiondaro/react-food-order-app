import { useState } from 'react';
import Cart from './components/Cart/Cart';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import CartProvider from './store/CartProvider';

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const showCartHandler = () => {
    setCartOpen(true);
  };

  const hideCartHandler = () => {
    setCartOpen(false);
  };

  return (
    <CartProvider>
      {cartOpen && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
