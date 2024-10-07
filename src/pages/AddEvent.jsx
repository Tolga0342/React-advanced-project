import React, { useState } from "react";
import {
  Heading,
  Text,
  FormControl,
  FormLabel,
  Center,
  Checkbox,
  Button,
  Select,
  Input,
  Flex,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useLoaderData, useNavigate } from "react-router-dom";

// Load user and category data
export const loader = async () => {
  const responseUsers = await fetch("http://localhost:3000/users");
  const responseCategories = await fetch("http://localhost:3000/categories");
  const users = await responseUsers.json();
  const categories = await responseCategories.json();
  return { users, categories };
};

export const AddEvent = () => {
  const { users, categories } = useLoaderData();
  const toast = useToast();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure(); // Modal control

  // State for form inputs
  const [createdBy, setCreatedBy] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  // State for error messages
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    if (!createdBy) {
      newErrors.createdBy = "User is required";
    }
    if (!title) {
      newErrors.title = "Event title is required";
    }
    if (!description) {
      newErrors.description = "Description is required";
    }
    if (!location) {
      newErrors.location = "Location is required";
    }
    if (!image || !/^(ftp|http|https):\/\/[^ "]+$/.test(image)) {
      newErrors.image = "Valid Image URL is required";
    }
    if (!startTime) {
      newErrors.startTime = "Start time is required";
    }
    if (!endTime) {
      newErrors.endTime = "End time is required";
    }
    if (new Date(startTime) >= new Date(endTime)) {
      newErrors.endTime = "End time must be after start time";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validate the form
    if (!validateForm()) {
      toast({
        title: "Validation error.",
        description: "Please fill in all required fields correctly.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    onOpen(); // Open the confirmation modal
  };

  // Function to create the event after confirmation
  const confirmSubmit = async () => {
    const newEvent = {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    };

    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(newEvent),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      const addingEvent = await response.json();
      toast({
        title: "New event created.",
        description: "Redirecting to the event page.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // Redirect to the event page after 3 seconds
      setTimeout(() => {
        navigate(`/event/${addingEvent.id}`);
      }, 3000);
    } else {
      toast({
        title: "Failed to create event.",
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
    onClose(); // Close the modal after submission
  };

  // Handle category change for checkboxes
  const handleCategoryChange = (e) => {
    setCategoryIds((current) =>
      current.includes(Number(e.target.value))
        ? current.filter((id) => id !== Number(e.target.value))
        : [...current, Number(e.target.value)]
    );
  };

  return (
    <>
      <Heading color="gold" size="2xl" mt={6} mb={4} textAlign="center">
        Add your event
      </Heading>

      <form onSubmit={handleSubmit}>
        <Center>
          <Flex
            bg="black"
            padding={5}
            border="1px solid black"
            m={5}
            flexDir="column"
            align="center"
            justify="center"
            gap={2}
            w="50vw"
          >
            <FormControl isRequired isInvalid={errors.createdBy}>
              <FormLabel color="gold">User:</FormLabel>
              <Select
                placeholder="Choose a user"
                bg="gray.200"
                onChange={(e) => setCreatedBy(Number(e.target.value))}
              >
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </Select>
              {errors.createdBy && (
                <Text color="red.500">{errors.createdBy}</Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.title}>
              <FormLabel color="gold">Event Name:</FormLabel>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                value={title}
                bg="gray.200"
              />
              {errors.title && <Text color="red.500">{errors.title}</Text>}
            </FormControl>

            <FormControl isRequired isInvalid={errors.description}>
              <FormLabel color="gold">Description:</FormLabel>
              <Input
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
                value={description}
                bg="gray.200"
              />
              {errors.description && (
                <Text color="red.500">{errors.description}</Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.image}>
              <FormLabel color="gold">Image URL:</FormLabel>
              <Input
                onChange={(e) => setImage(e.target.value)}
                placeholder="Image URL"
                value={image}
                bg="gray.200"
              />
              {errors.image && <Text color="red.500">{errors.image}</Text>}
            </FormControl>

            <FormControl isRequired isInvalid={errors.location}>
              <FormLabel color="gold">Location:</FormLabel>
              <Input
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Location"
                value={location}
                bg="gray.200"
              />
              {errors.location && (
                <Text color="red.500">{errors.location}</Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.startTime}>
              <FormLabel color="gold">Start Time:</FormLabel>
              <Input
                onChange={(e) => setStartTime(e.target.value)}
                placeholder="Start Time"
                type="datetime-local"
                value={startTime}
                bg="gray.200"
              />
              {errors.startTime && (
                <Text color="red.500">{errors.startTime}</Text>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={errors.endTime}>
              <FormLabel color="gold">End Time:</FormLabel>
              <Input
                onChange={(e) => setEndTime(e.target.value)}
                placeholder="End Time"
                type="datetime-local"
                value={endTime}
                bg="gray.200"
              />
              {errors.endTime && <Text color="red.500">{errors.endTime}</Text>}
            </FormControl>

            <FormControl>
              <FormLabel color="gold">Categories:</FormLabel>
              {categories.map((cat) => (
                <Checkbox
                  key={cat.id}
                  value={cat.id}
                  onChange={handleCategoryChange}
                  isChecked={categoryIds.includes(cat.id)}
                  color="gold"
                >
                  {cat.name}
                </Checkbox>
              ))}
            </FormControl>

            <Center>
              <Button bg="gold" type="submit" w="15vw" h="7vh">
                <Text color="black">Submit</Text>
              </Button>
            </Center>
          </Flex>
        </Center>
      </form>

      {/* Modal for confirmation */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Event Submission</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to submit this event?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="green" mr={3} onClick={confirmSubmit}>
              Confirm
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
