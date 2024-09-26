import React from "react";
import { Heading, Box, Text, Image, Input } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";

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

  // hiermee kan je in de searchbar filteren op naam en beschrijving van de event.
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
    console.log("matchedEvents:", matchedEvents);
    setSearchField(matchedEvents);
  };

  // met deze functie weergeef je de categorienaam/namen.
  const categoryNames = (categoryId) => {
    const categoryMap = categoryId.map((item) => {
      const categoryFind = categories.find((category) => category.id === item);
      return categoryFind.name;
    });
    // console.log("categoryMap:", categoryMap.join("-"));
    return categoryMap.join(" ");
  };
  //console.log("categoryNames:", categoryNames(1));

  return (
    <Box>
      <Heading>List of events</Heading>
      <Input
        type="text"
        w="40vw"
        onChange={handleChange}
        placeholder="Search events..."
        bg="gray.50"
      />
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
  );
};
