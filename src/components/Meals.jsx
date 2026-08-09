import { useMemo, useState } from "react";
import MealItem from "./MealItem.jsx";
import useHttp from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

const CATEGORY_ORDER = [
  "All",
  "Breakfast",
  "Burger",
  "Nigerian",
  "Pastries",
  "Pizza",
  "Sushi",
];

function getCategoryForMeal(meal) {
  const name = meal.name.toLowerCase();
  const description = meal.description.toLowerCase();

  if (
    name.includes("pancake") ||
    name.includes("waffle") ||
    name.includes("omelet") ||
    name.includes("omelette") ||
    description.includes("breakfast")
  ) {
    return "Breakfast";
  }

  if (name.includes("burger")) {
    return "Burger";
  }

  if (
    name.includes("jollof") ||
    name.includes("suya") ||
    name.includes("egusi") ||
    name.includes("fufu") ||
    name.includes("yam") ||
    name.includes("plantain") ||
    description.includes("nigerian")
  ) {
    return "Nigerian";
  }

  if (
    name.includes("brownie") ||
    name.includes("cheesecake") ||
    name.includes("cake") ||
    name.includes("pastry") ||
    description.includes("pastry") ||
    description.includes("dessert")
  ) {
    return "Pastries";
  }

  if (name.includes("pizza") || description.includes("pizza")) {
    return "Pizza";
  }

  if (
    name.includes("sushi") ||
    name.includes("roll") ||
    description.includes("sushi")
  ) {
    return "Sushi";
  }

  return "All";
}

export default function Meals() {
  const [activeCategory, setActiveCategory] = useState("All");

  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("https://funmeal-api.onrender.com/meals", requestConfig, []);

  const mealsWithCategory = useMemo(() => {
    if (!loadedMeals) return [];

    return loadedMeals.map((meal) => ({
      ...meal,
      category: getCategoryForMeal(meal),
    }));
  }, [loadedMeals]);

  const categories = useMemo(() => {
    const categorySet = new Set(["All"]);
    mealsWithCategory.forEach((meal) => categorySet.add(meal.category));
    return CATEGORY_ORDER.filter((category) => categorySet.has(category));
  }, [mealsWithCategory]);

  const filteredMeals = useMemo(() => {
    if (activeCategory === "All") {
      return mealsWithCategory;
    }
    return mealsWithCategory.filter((meal) => meal.category === activeCategory);
  }, [activeCategory, mealsWithCategory]);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return (
      <Error
        title="Failed to fetch meals"
        message={error}
      />
    );
  }

  return (
    <section className="menu-section">
      <div className="menu-header">
        <h2>Menu</h2>
        <p>Filter meals by category to find what you crave faster.</p>
      </div>

      <div className="menu-filters">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`menu-filter ${activeCategory === category ? "active" : ""}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {filteredMeals.length === 0 ? (
        <p className="center">No meals match this category yet.</p>
      ) : (
        <ul id="meals">
          {filteredMeals.map((meal) => (
            <MealItem
              key={meal.id}
              meal={meal}
            />
          ))}
        </ul>
      )}
    </section>
  );
}

// import MealItem from "./MealItem.jsx";
// import useHttp from "../hooks/useHttp.js";
// import Error from "./Error.jsx";

// const requestConfig = {};

// export default function Meals() {
//   const {
//     data: loadedMeals,
//     isLoading,
//     error,
//   } = useHttp("/api/meals", requestConfig, []);

//   if (isLoading) {
//     return <p>Fetching meals...</p>;
//   }

//   if (error) {
//     return (
//       <Error
//         title="Failed to fetch meals"
//         message={error.message}
//       />
//     );
//   }

//   return (
//     <ul id="meals">
//       {loadedMeals.map((meal) => (
//         <MealItem
//           key={meal.id}
//           meal={meal}
//         />
//       ))}
//     </ul>
//   );
// }
