import React from "react";
import { Heading, Text, Image, Box, SimpleGrid, Flex } from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import { EditEvent } from "../components/EditEvent";
import { DeleteButton } from "../components/DeleteEvent";

// data ingeladen
export const loader = async ({ params }) => {
  const event = await fetch(`http://localhost:3000/events/${params.eventId}`);
  const categories = await fetch(`http://localhost:3000/categories`);
  const users = await fetch(`http://localhost:3000/users`);
  return {
    event: await event.json(),
    categories: await categories.json(),
    users: await users.json(),
  };
};

export const EventPage = () => {
  const { event, users, categories } = useLoaderData();
  console.log("event:", event);
  const [selectedEvent, setSelectedEvent] = useState(event);
  console.log("selectedEvent:", selectedEvent);

  // met deze functie weergeef je de categories.name
  const categoryNames = (categoryId) => {
    const categoryMap = categoryId.map((item) => {
      const categoryFind = categories.find((category) => category.id === item);
      return categoryFind.name;
    });
    // console.log("categoryMap:", categoryMap.join("-"));
    return categoryMap.join(" ");
  };

  const user = users.find((x) => x.id === selectedEvent.createdBy);

  return (
    <Box>
      <Heading color="gold" size="2xl" mt={6} mb={10} textAlign="center">
        {selectedEvent.title}
      </Heading>

      <SimpleGrid columns={2}>
        <Box ml={10}>
          <Text color="gold" fontSize="xl" fontWeight="bold">
            Description:
          </Text>
          <Text color="gold" mb={3} fontSize="xl">
            {" "}
            {selectedEvent.description}{" "}
          </Text>

          <Text color="gold" fontSize="xl" fontWeight="bold">
            {" "}
            Location:
          </Text>
          <Text color="gold" mb={3} fontSize="xl">
            {selectedEvent.location}
          </Text>

          <Text color="gold" fontSize="xl" fontWeight="bold">
            {" "}
            Start time:
          </Text>
          <Text color="gold" mb={3} fontSize="xl">
            {" "}
            {selectedEvent.startTime}{" "}
          </Text>

          <Text color="gold" fontSize="xl" fontWeight="bold">
            {" "}
            End time:
          </Text>
          <Text color="gold" mb={3} fontSize="xl">
            {" "}
            {selectedEvent.endTime}{" "}
          </Text>

          <Text color="gold" fontSize="xl" fontWeight="bold">
            {" "}
            Categories:
          </Text>
          <Text color="gold" mb={3} fontSize="xl">
            {categoryNames(event.categoryIds)}
          </Text>

          <Text color="gold" fontSize="xl" fontWeight="bold">
            {" "}
            Created by:
          </Text>
          <Flex align="center">
            <Image
              src={user.image}
              alt="Image"
              height="5em"
              width="5em"
              borderRadius="100%"
              mr={2}
              mb={3}
            />
            <Text color="gold" fontSize="xl" mb={3}>
              {user.name}
            </Text>
          </Flex>

          <EditEvent
            categories={categories}
            event={selectedEvent}
            users={users}
            setSelectEvent={setSelectedEvent}
          />
          <DeleteButton event={selectedEvent} />
        </Box>

        <Box>
          <Image
            src={selectedEvent.image}
            alt="Image"
            h="70vh"
            w="45vw"
            borderTopRadius="xl"
          />
        </Box>
      </SimpleGrid>
    </Box>
  );
};
