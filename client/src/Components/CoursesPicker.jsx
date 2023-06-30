import React, { useState } from "react";
import Select from "react-select";

const CoursesPicker = ({ courses }) => {
  function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  const [displayedProperty, setDisplayedProperty] = useState("title");
  const [selectedCourses, setSelectedCourses] = useState();

  const properties = ["id", "title"];

  return (
    <div className="bg-gray-200 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Pick Your Courses</h2>
      <div className="flex flex-wrap items-center gap-1">
        <Select
          placeholder={`Search Course ${capitalize(displayedProperty)}...`}
          noOptionsMessage={() => "No Course Found"}
          options={courses.map((course) => ({
            value: course.id,
            label: course[displayedProperty],
          }))}
          isMulti
          name="courses"
          className=" flex-grow mr-4"
          classNamePrefix="select"
          onChange={(selectedOptions) => setSelectedCourses(selectedOptions)}
        />

        <Select
          options={properties.map((property) => ({
            value: property,
            label: "Course " + capitalize(property),
          }))}
          name="properties"
          defaultValue={{
            value: displayedProperty,
            label: "Course " + capitalize(displayedProperty),
          }}
          className=" "
          classNamePrefix="select"
          onChange={(selectedOption) => {
            setDisplayedProperty(selectedOption.value);
            //todo:update the already selected courses on changing the disp propty
          }}
        />
      </div>
    </div>
  );
};

export default CoursesPicker;
