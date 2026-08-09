import React, { useContext } from "react";
import foodHero from "../assets/food.jpg";
import CartContext from "../store/CartContext.jsx";
import UserProgressContext from "../store/UserProgressContext.jsx";

const Hero = () => {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  function scrollToMenu() {
    const menuSection = document.getElementById("meals");
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function handleOrderNow() {
    if (cartCtx.items.length > 0) {
      userProgressCtx.showCart();
      return;
    }

    scrollToMenu();
  }

  function handleBrowseMenu() {
    scrollToMenu();
  }

  return (
    <section className="relative overflow-hidden bg-[#29251d] text-white hero-section">
      {/* Bottom curved shape */}
      <div className="absolute bottom-0 left-0 z-0 h-28 w-full overflow-hidden">
        <div className="absolute -bottom-20 left-1/2 h-48 w-[125%] -translate-x-1/2 rounded-[50%] bg-[#0f0c08]" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-76px)] max-w-[1240px] flex-col justify-center px-4 pb-20 pt-8 sm:px-6 lg:px-12 hero-inner">
        <div className="grid w-full items-center gap-14 lg:grid-cols-[0.9fr_1fr]">
          {/* Left content */}
          <div className="mx-auto max-w-[520px] text-center lg:mx-0 lg:text-left">
            <h1 className="text-[32px] font-extrabold leading-[1.03] tracking-[-1.8px] text-white sm:text-[42px] lg:text-[52px]">
              Delicious Meals
              <br />
              Delivered Fresh To Your
              <br />
              Door
            </h1>

            <p className="mt-5 mx-auto max-w-[470px] text-[13px] leading-[1.65] text-[#aaa49a]">
              Discover handcrafted meals prepared with fresh ingredients and
              delivered fast. Whether you're craving pizza, pasta, burgers, or
              healthy salads, we've got something you'll love.
            </p>

            {/* Buttons */}
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
              <button
                type="button"
                onClick={handleOrderNow}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f6b900] px-5 py-3 text-[11px] font-bold text-[#1b170f] shadow-[0_8px_30px_rgba(246,185,0,0.18)] transition hover:bg-[#ffc51c] sm:w-auto"
              >
                <span className="text-sm">🛒</span>
                Order Now
              </button>

              <button
                type="button"
                onClick={handleBrowseMenu}
                className="w-full rounded-full border border-[#aaa49a] bg-white/5 px-5 py-3 text-[11px] font-semibold text-white transition hover:border-white hover:bg-white/10 sm:w-auto"
              >
                Browse Menu
              </button>
            </div>

            {/* Feature pills */}
            <div className="mt-7 flex flex-wrap justify-center gap-2 lg:justify-start">
              <Feature
                icon="🚚"
                text="Fast Delivery"
              />

              <Feature
                icon="★"
                text="Premium Quality"
              />

              <Feature
                icon="🍴"
                text="Fresh Ingredients"
              />
            </div>
          </div>

          {/* Right food image */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Glow behind image */}
            <div className="absolute h-[320px] w-[320px] rounded-full bg-[#f4b800]/5 blur-[80px]" />

            <img
              src={foodHero}
              alt="Delicious meals"
              className="relative z-10 w-full max-w-[560px] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

const Feature = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-white/[0.035] px-3 py-1.5 text-[9px] font-semibold text-[#b8b1a3]">
      <span className="text-[9px] text-[#f6c33b]">{icon}</span>
      {text}
    </div>
  );
};

export default Hero;
