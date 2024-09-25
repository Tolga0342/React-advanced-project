import React from "react";
import { Heading, Box, Text, Image } from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";

export const loader = async () => {
  const responseEvents = await fetch("http://localhost:3000/events");
  const responseCategories = await fetch("http://localhost:3000/categories");
  const events = await responseEvents.json();
  const categories = await responseCategories.json();

  return { events, categories };
};

export const EventsPage = () => {
  const { events, categories } = useLoaderData();
  console.log("events: ", events);
  console.log("categories:", categories);

  const categoryNames = (categoryId) => {
    const categoryMap = categoryId.map((item) => {
      const categoryFind = categories.find((category) => category.id === item);
      return categoryFind.name;
    });
    console.log("categoryMap:", categoryMap.join("-"));
    return categoryMap.join(" ");
  };
  //console.log("categoryNames:", categoryNames(1));

  return (
    <Box>
      <Heading>List of events</Heading>
      {events.map((event) => (
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
