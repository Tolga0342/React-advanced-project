import React from "react";
import { Heading } from "@chakra-ui/react";
import { useState } from "react";
import {
  FormControl,
  FormLabel,
  Checkbox,
  Select,
  useToast,
} from "@chakra-ui/react";
import { useLoaderData } from "react-router-dom";

// inladen van de data.
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

  // voor elk property een useState() aangemaakt.
  const [createdBy, setCreatedBy] = useState(2);
  const [title, setTitle] = useState("hallo");
  const [description, setDescription] = useState("hoi");
  const [image, setImage] = useState(
    "https://www.ctvnews.ca/polopoly_fs/1.5118552.1600965663!/httpImage/image.jpg_gen/derivatives/landscape_1020/image.jpg"
  );
  const [categoryIds, setCategoryIds] = useState([]);
  const [location, setLocation] = useState("amsterdam");
  const [startTime, setStartTime] = useState("2023-03-15T12:00:00.000Z");
  const [endTime, setEndTime] = useState("2023-03-15T13:30:00.000Z");

  // nieuwe data insturen naar de events.json
  const createEvent = async (event) => {
    // console.log(JSON.stringify(event));
    const response = await fetch("http://localhost:3000/events", {
      method: "POST",
      body: JSON.stringify(event),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      toast({
        title: "New event created.",
        description: "We have created the new event.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "New event not created.",
        description: "We were not able to create the new event.",
        status: "false",
        duration: 3000,
        isClosable: true,
      });
    }
    const addingEvent = await response.json();
    console.log("addingEvent", addingEvent);
  };

  //handlesubmit voor Form (leeghalen van de form na insturing nieuwe data).
  const handleSubmit = (event) => {
    event.preventDefault();
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
    console.log("newEvent:", newEvent);
    createEvent(newEvent);
    setCreatedBy("");
    setTitle("");
    setDescription("");
    setImage("");
    setCategoryIds([]);
    setLocation("");
    setStartTime("");
    setEndTime("");
  };

  //handleCategoryChange voor checkbox
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
      <Heading> Add-event</Heading>

      <form onSubmit={handleSubmit}>
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

        <input
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          required="required"
          placeholder="Title"
          value={title}
        />

        <input
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          required="required"
          placeholder="Description"
          value={description}
        />

        <input
          onChange={(e) => setImage(e.target.value)}
          type="url"
          required="required"
          placeholder="Image"
          value={image}
        />

        <input
          onChange={(e) => setLocation(e.target.value)}
          type="text"
          required="required"
          placeholder="location"
          value={location}
        />

        <input
          onChange={(e) => setStartTime(e.target.value)}
          type="datetime"
          required="required"
          placeholder="Start-time"
          value={startTime}
        />

        <input
          onChange={(e) => setEndTime(e.target.value)}
          type="datetime"
          required="required"
          placeholder="End-time"
          value={endTime}
        />

        <FormControl>
          <FormLabel htmlFor="categoryIds">Categories: </FormLabel>
          {categories.map((cat) => (
            <Checkbox
              key={cat.id}
              id={cat.name}
              name="category"
              value={cat.id}
              onChange={(e) => handleCategoryChange(e)}
            >
              {cat.name}
            </Checkbox>
          ))}
        </FormControl>

        <button type="submit"> Submit </button>
      </form>
    </>
  );
};
