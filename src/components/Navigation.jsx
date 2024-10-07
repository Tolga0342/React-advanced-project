import React from "react";
import { Link } from "react-router-dom";
import { Flex, Box } from "@chakra-ui/react";

export const Navigation = () => {
  return (
    <Flex
      flexDirection="row"
      bg="black"
      gap={10}
      alignContent="center"
      justify="center"
      p={2}
      fontFamily="Georgia, serif"
      fontSize={"xl"}
      fontWeight="bold"
      color="gold"
    >
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Box>
        <Link to="/event/1">Event</Link>
      </Box>
      <Box>
        <Link to="/addevent"> Add-event</Link>
      </Box>
    </Flex>
  );
};
