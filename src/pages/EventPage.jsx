import React from "react";
import { Heading, Text, Image } from "@chakra-ui/react";
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
    <>
      <Heading>Event</Heading>
      <Text> {selectedEvent.title} </Text>
      <Text> {selectedEvent.description} </Text>
      <Image
        src={selectedEvent.image}
        alt="Image"
        height="12em"
        width="12em"
        borderTopRadius="xl"
        mb={1}
      />
      <Text> {selectedEvent.startTime} </Text>
      <Text> {selectedEvent.endTime} </Text>
      <Text>{categoryNames(event.categoryIds)}</Text>

      <Image
        src={user.image}
        alt="Image"
        height="12em"
        width="12em"
        borderRadius="100%"
        mb={1}
      />
      <Text>{user.name}</Text>

      <EditEvent
        categories={categories}
        event={selectedEvent}
        users={users}
        setSelectEvent={setSelectedEvent}
      />
      <DeleteButton event={selectedEvent} />
    </>
  );
};
