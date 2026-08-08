import { useContext } from "react";
import Button from "./ui/Button.jsx";
import logoImg from "../assets/logo.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

export default function Header() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const totalCartItems = cartCtx.items.reduce((totalNumberOfItems, item) => {
    return totalNumberOfItems + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header
      id="main-header"
      className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 md:px-10"
    >
      <div id="title">
        <img
          src={logoImg}
          alt="A restaurant"
        />
        <h1 className=" text-base">FunMeal</h1>
      </div>

      <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-7 md:flex">
        <a
          href="#"
          className="relative text-[11px] font-semibold text-[#f6c33b]"
        >
          Home
          <span className="absolute -bottom-2 left-0 h-[1px] w-full bg-[#f6c33b]" />
        </a>

        <a
          href="#"
          className="text-[11px] text-[#aaa49a] transition hover:text-white"
        >
          Menu
        </a>

        <a
          href="#"
          className="text-[11px] text-[#aaa49a] transition hover:text-white"
        >
          About
        </a>

        <a
          href="#"
          className="text-[11px] text-[#aaa49a] transition hover:text-white"
        >
          Contact
        </a>
      </nav>

      <Button
        textOnly
        className="text-sm"
        onClick={handleShowCart}
      >
        Cart ({totalCartItems})
      </Button>
    </header>
  );
}
