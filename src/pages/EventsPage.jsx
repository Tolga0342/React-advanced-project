import React from "react";
import { Heading, Box, Text, Image, Input } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { CategoryDisplay } from "../components/CategoryDisplay";
import { eventContext } from "../components/categoryContext";

// inladen van de data(s)
export const loader = async () => {
  const responseEvents = await fetch("http://localhost:3000/events");
  const responseCategories = await fetch("http://localhost:3000/categories");
  const events = await responseEvents.json();
  const categories = await responseCategories.json();
  return { events, categories };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  const [searchField, setSearchField] = useState(events);
  //console.log("check:", useLoaderData(categories));

  // met deze functie weergeef je de categories.name
  const categoryNames = (categoryId) => {
    const categoryMap = categoryId.map((item) => {
      const categoryFind = categories.find((category) => category.id === item);
      return categoryFind.name;
    });
    // console.log("categoryMap:", categoryMap.join("-"));
    return categoryMap.join(" ");
  };

  // hiermee kan je in de searchbar zoeken op naam en beschrijving van de event.
  const handleChange = (event) => {
    const matchedEvents = events.filter((changeFn) => {
      return (
        changeFn.title
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        changeFn.description
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
      );
    });
    //console.log("matchedEvents:", matchedEvents);
    setSearchField(matchedEvents);
  };

  // in deze functie zoeken we naar de category ID.
  const getCategoryId = (categoryName) => {
    // console.log("categoryName:", categoryName);
    const categoryFind = categories.find(
      (category) => category.name === categoryName
    );
    //console.log("categoryfind:", categoryFind.id);
    return categoryFind.id;
  };

  // categorieen filteren obv de namen.
  const handleCategoryChange = (categoryValue) => {
    // console.log("categoryValue:", categoryValue.target.value);
    const showCategoryId = getCategoryId(categoryValue.target.value);
    const filteredEvents = events.filter((event) => {
      //console.log("event:", event);
      const checkEvent = event.categoryIds.includes(showCategoryId);
      //console.log("checkEvent", checkEvent);
      return checkEvent;
    });
    //console.log("filteredEvents:", filteredEvents);
    setSearchField(filteredEvents);
  };

  return (
    // "Context" toegevoegd zodat gebruik van prop rechtstreeks kan.
    <eventContext.Provider value={{ categories, events, handleCategoryChange }}>
      <Box>
        <Heading>List of events</Heading>
        <Input
          type="text"
          w="40vw"
          onChange={handleChange}
          placeholder="Search events..."
          bg="gray.50"
        />
        <CategoryDisplay />
        {searchField.map((event) => (
          <Box key={event.id} padding={2}>
            {/* link to /event/:eventId */}
            <Link to={"event/${event.id}"}>
              <Text> {event.title}</Text>
              <Text> {event.description} </Text>
              <Image
                src={event.image}
                alt="Image"
                height="12em"
                width="12em"
                borderTopRadius="xl"
                mb={1}
              />
              <Text> {event.startTime} </Text>
              <Text> {event.endTime} </Text>
              <Text>{categoryNames(event.categoryIds)}</Text>
            </Link>
          </Box>
        ))}
      </Box>
    </eventContext.Provider>
  );
};
