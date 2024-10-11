import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Textarea,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";

import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export const EditEvent = ({ event, users, categories }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);

  const toast = useToast();

  const navigate = useNavigate();

  const [createdBy, setCreatedBy] = useState(event.createdBy);
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [image, setImage] = useState(event.image);
  const [categoryIds, setCategoryIds] = useState(event.categoryIds);
  const [location, setLocation] = useState(event.location);
  const [startTime, setStartTime] = useState(event.startTime);
  const [endTime, setEndTime] = useState(event.endTime);
  console.log("event2:", event);

  const EditEvent = async (item) => {
    console.log("event1:", item);
    const response = await fetch(
      `https://my-json-server.typicode.com/Tolga0342/online-data-project/events/${event.id}`,
      {
        method: "PUT",
        body: JSON.stringify(item),
        headers: { "Content-Type": "application/json" },
      }
    );
    if (response.ok) {
      toast({
        title: "Current event edited.",
        description: "Your edits have been succesfully applied.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate(`/`);
      }, 3000);
    } else {
      toast({
        title: "Failed to edit current event.",
        description: "We are not able to edit the current event.",
        status: "false",
        duration: 3000,
        isClosable: true,
      });
    }
    const currentEvent = await response.json();
    console.log("currentEvent:", currentEvent);
    //setSelectEvent(currentEvent);
    // console.log("setSelectEvent:", setSelectEvent);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const editCurrentEvent = {
      createdBy,
      title,
      description,
      image,
      categoryIds,
      location,
      startTime,
      endTime,
    };
    console.log("editCurrentEvent:", editCurrentEvent);
    EditEvent(editCurrentEvent);
    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds([]);
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  const handleCategoryChange = (e) => {
    setCategoryIds((current) => current.filter((id) => id != e.target.value));
    const addCategory = () => {
      if (e.target.checked) {
        setCategoryIds([...categoryIds, Number(e.target.value)]);
      } else if (!e.target.checked) {
        setCategoryIds((current) =>
          current.filter((id) => id != e.target.value)
        );
      } else return;
    };
    addCategory();
  };

  return (
    <>
      <Button onClick={onOpen}>Edit event</Button>

      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit current event</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Form onSubmit={handleSubmit}>
              <FormControl>
                <FormLabel htmlFor="user">User:</FormLabel>
                <Select
                  placeholder="Choose an user"
                  id="user"
                  bg="gray.50"
                  onChange={(e) => setCreatedBy(Number(e.target.value))}
                >
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="Title"
                  value={title}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Image</FormLabel>
                <Input
                  onChange={(e) => setImage(e.target.value)}
                  type="url"
                  placeholder="Image"
                  value={image}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  type="text"
                  placeholder="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Start-time</FormLabel>
                <Input
                  onChange={(e) => setStartTime(e.target.value)}
                  type="datetime"
                  placeholder="Start-time"
                  value={startTime}
                />
              </FormControl>

              <FormControl>
                <FormLabel>End-time</FormLabel>
                <Input
                  onChange={(e) => setEndTime(e.target.value)}
                  type="datetime"
                  placeholder="End-time"
                  value={endTime}
                />
              </FormControl>
              <FormControl>
                <FormLabel htmlFor="categoryIds">Categories: </FormLabel>
                {categories.map((cat) => (
                  <Checkbox
                    key={cat.id}
                    id={cat.name}
                    name="category"
                    value={cat.id}
                    onChange={(e) => handleCategoryChange(e)}
                    textTransform="capitalize"
                    isChecked={categoryIds.includes(cat.id)}
                  >
                    {cat.name}
                  </Checkbox>
                ))}
              </FormControl>
            </Form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
