import React from "react";
import {
  Heading,
  Box,
  Text,
  Image,
  Input,
  Center,
  Flex,
  Tag,
  Wrap,
} from "@chakra-ui/react";
import { useLoaderData, Link } from "react-router-dom";
import { useState } from "react";
import { CategoryDisplay } from "../components/CategoryDisplay";
import { eventContext } from "../components/categoryContext";
//import { img1 } from "../image/color-smoke.jpg";

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
    //  console.log("categoryMap:", categoryMap.join("-"));
    // return categoryMap.join(" ");
    console.log(categoryMap);
    return categoryMap;
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
    console.log("categoryValueTargetValue:", categoryValue.target.value);
    if (categoryValue.target.value === "") {
      console.log("categoryValueIsLeeg:");
      setSearchField(events);
    } else {
      console.log("categoryValueIsNietLeeg:");
      const showCategoryId = getCategoryId(categoryValue.target.value);
      const filteredEvents = events.filter((event) => {
        //console.log("event:", event);
        const checkEvent = event.categoryIds.includes(showCategoryId);
        //console.log("checkEvent", checkEvent);
        return checkEvent;
      });
      //console.log("filteredEvents:", filteredEvents);
      setSearchField(filteredEvents);
    }
  };

  return (
    // "Context" toegevoegd zodat gebruik van prop rechtstreeks kan.
    <eventContext.Provider value={{ categories, events, handleCategoryChange }}>
      <Box>
        <Heading
          color="white"
          size={["lg", "xl", "2xl"]}
          mt={6}
          mb={4}
          textAlign="center"
        >
          Welcome to homepage
        </Heading>
        <Center>
          <Input
            type="text"
            w={["90vw", "60vw", "60vw", "30vw"]}
            onChange={handleChange}
            placeholder="Search events..."
            bg="gray.200"
          />
        </Center>
        <Flex
          flexDirection={["column", "column", "row"]}
          mt={10}
          mr={20}
          ml={[35, 0]}
          justifyContent={["center", "center", "right"]}
          align={["center"]}
        >
          <CategoryDisplay />
        </Flex>

        <Flex
          mt={10}
          justify={["center", "center", "center", "space-evenly"]}
          align={["center"]}
          flexWrap="wrap"
          flexDir={["column", "row"]}
          gap={1}
        >
          {searchField.map((event) => (
            <Box
              key={event.id}
              padding={2}
              _hover={{ transform: "scale(1.05)", bg: "gray" }}
              boxShadow="xl"
              p={5}
              align="center"
              mb={8}
              w={["85vw", "48vw", "48vw", "25vw"]}
              h={["80vh", "85vh", "80vh", "75vh"]}
              bg="black"
            >
              {/* link to /event/:eventId */}
              <Link to={`/event/${event.id}`}>
                <Text mb={2} color="gold" fontSize="2xl">
                  {event.title}
                </Text>
                <Text mb={3} color="gold">
                  {event.description}
                </Text>
                <Image
                  src={event.image}
                  alt="Image"
                  height="12em"
                  width="12em"
                  w="90vw"
                  h="40vh"
                  borderTopRadius="xl"
                  mb={4}
                />
                <Text bg="gold" mb={3} color="black" fontWeight="bold">
                  {event.startTime}
                </Text>
                <Text bg="gold" mb={5} color="black" fontWeight="bold">
                  {event.endTime}
                </Text>
                <Wrap justify="center">
                  {categoryNames(event.categoryIds).map((item) => (
                    <Tag colorScheme="yellow" key={item}>
                      {" "}
                      {item}{" "}
                    </Tag>
                  ))}
                </Wrap>
              </Link>
            </Box>
          ))}
        </Flex>
      </Box>
    </eventContext.Provider>
  );
};
