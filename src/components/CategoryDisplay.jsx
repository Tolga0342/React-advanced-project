import { useContext } from "react";
import { eventContext } from "./categoryContext";

export const CategoryDisplay = () => {
  const { categories, handleCategoryChange } = useContext(eventContext);
  return (
    <div>
      <h1>Evenementen</h1>
      <label>Kies een categorie:</label>
      <select id="category-select" onChange={handleCategoryChange}>
        <option value="">Alle categorieën</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};
