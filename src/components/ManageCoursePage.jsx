import React from "react";
import CourseForm from "./CourseForm";
import { useState } from "react";

const ManageCoursePage = (props) => {
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  function handleChange({target}) { //using {target } is same as using {target }= event;  on handleChange(event)
    const updatedCourse = {
      ...course,
      // [event.target.name]: event.target.value,
      [target.name]: target.value,
    };
    setCourse(updatedCourse);
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm course={course} onChange={handleChange} />
    </>
  );
};

export default ManageCoursePage;
