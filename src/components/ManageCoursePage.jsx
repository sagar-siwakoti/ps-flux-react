import React from "react";
import CourseForm from "./CourseForm";
import { useState, useEffect } from "react";
import * as courseApi from "../api/courseApi";
import { toast } from "react-toastify";

const ManageCoursePage = (props) => {
  const [errors, setErrors] = useState({});
  const [course, setCourse] = useState({
    id: null,
    slug: "",
    title: "",
    authorId: null,
    category: "",
  });

  useEffect(() => {
    const slug = props.match.params.slug; //from the path '/courses/:slug'
    if (slug) {
      courseApi.getCourseBySlug(slug).then((_course) => {
        setCourse(_course);
      });
    }
  },[props.match.params.slug]);

  function handleChange({ target }) {
    //using {target } is same as using {target }= event;  on handleChange(event)
    const updatedCourse = {
      ...course,
      // [event.target.name]: event.target.value,
      [target.name]: target.value,
    };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = "Title is required";
    if (!course.authorId) _errors.authorId = "Author ID is required";
    if (!course.category) _errors.category = "Category is required";

    setErrors(_errors);
    //Form is valid if the error object has no properties
    return Object.keys(_errors).length === 0;
  }

  //saving data
  function hanldeSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseApi.saveCourse(course).then(() => {
      props.history.push("/courses"); //redirecting back to courses page after saving data.
      toast.success("Course saved");
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      <CourseForm
        errors={errors}
        course={course}
        onChange={handleChange}
        onSubmit={hanldeSubmit}
      />
    </>
  );
};

export default ManageCoursePage;
