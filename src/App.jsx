import Header from "./components/Header.jsx";
import Hero from "./components/Hero.jsx";
import Meals from "./components/Meals.jsx";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import { CartContextProvider } from "./store/CartContext.jsx";
import { UserProgressContextProvider } from "./store/UserProgressContext.jsx";

function App() {
  return (
    <CartContextProvider>
      <UserProgressContextProvider>
        <div>
          <Header />
          <Hero />
          <Meals />
          <Cart />
          <Checkout />
        </div>
      </UserProgressContextProvider>
    </CartContextProvider>
  );
}

export default App;
