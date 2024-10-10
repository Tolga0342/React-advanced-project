import { useContext } from "react";
import { eventContext } from "./categoryContext";
import { FormControl, FormLabel, Select } from "@chakra-ui/react";

export const CategoryDisplay = () => {
  const { categories, handleCategoryChange } = useContext(eventContext);
  return (
    <FormControl w={["50vw", "40vw", "20vw"]}>
      <FormLabel
        fontSize={["md", "lg", "xl"]}
        color="white"
        fontWeight={["bold"]}
      >
        Choose your category:
      </FormLabel>
      <Select
        onChange={handleCategoryChange}
        variant="flushed"
        bg="white"
        _hover={{ transform: "scale(1.05)", bg: "gray" }}
      >
        <option value="">All categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </Select>
    </FormControl>
  );
};
