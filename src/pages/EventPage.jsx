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
      <Heading
        color="white"
        size={["lg", "2xl"]}
        mt={6}
        mb={[5, 10]}
        textAlign="center"
      >
        {selectedEvent.title}
      </Heading>

      <SimpleGrid columns={[1, 2]}>
        <Box>
          <Image
            src={selectedEvent.image}
            alt="Image"
            h={["60vw", "70vh"]}
            w={["85vw", "45vw"]}
            ml={5}
            mb={[5, 0]}
            borderTopRadius="xl"
          />
        </Box>

        <Box ml={30}>
          <Text color="white" fontSize="xl" fontWeight="bold">
            Description:
          </Text>
          <Text color="white" mb={3} fontSize="xl">
            {" "}
            {selectedEvent.description}{" "}
          </Text>

          <Text color="white" fontSize="xl" fontWeight="bold">
            {" "}
            Location:
          </Text>
          <Text color="white" mb={3} fontSize="xl">
            {selectedEvent.location}
          </Text>

          <Text color="white" fontSize="xl" fontWeight="bold">
            {" "}
            Start time:
          </Text>
          <Text color="white" mb={3} fontSize="xl">
            {" "}
            {selectedEvent.startTime}{" "}
          </Text>

          <Text color="white" fontSize="xl" fontWeight="bold">
            {" "}
            End time:
          </Text>
          <Text color="white" mb={3} fontSize="xl">
            {" "}
            {selectedEvent.endTime}{" "}
          </Text>

          <Text color="white" fontSize="xl" fontWeight="bold">
            {" "}
            Categories:
          </Text>
          <Text color="white" mb={3} fontSize="xl">
            {categoryNames(event.categoryIds)}
          </Text>

          <Text color="white" fontSize="xl" fontWeight="bold">
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
            <Text color="white" fontSize="xl" mb={3}>
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
      </SimpleGrid>
    </Box>
  );
};
