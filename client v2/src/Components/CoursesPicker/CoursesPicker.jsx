import React, { useEffect, useState, useRef, useTransition } from "react";
// import Select from "react-select";
import Select, { createFilter } from "react-windowed-select";

import OptionSelection from "../OptionSelection/OptionSelection";
const CoursesPicker = ({
  courses,
  options,
  setOptions,
  setSelectedCourses,
  selectedCourses,
  setTableShowing,
}) => {
  const [isPending, startTransition] = useTransition();

  // function capitalize(word) {
  //   return word.charAt(0).toUpperCase() + word.slice(1);
  // }

  useEffect(() => {
    if (options) {
      setIsPickerDisabled(true);
    } else {
      setIsPickerDisabled(false);

      //give time to remove disabled first
      setTimeout(() => selectRef.current.focus(), 0);
    }
  }, [options]);

  const [displayedProperty, setDisplayedProperty] = useState("code");
  const [isPickerDisabled, setIsPickerDisabled] = useState(false);
  // const properties = ["code", "title"];
  const shakingDurationInMs = 450;
  const selectRef = useRef(null);
  const [isShaking, setIsShaking] = useState(false);

  const courseOptions = isPending
    ? []
    : courses
        .map((course) => ({
          value: course.code,
          label: course[displayedProperty] + ": " + course.title,
        }))
        .sort((a, b) =>
          a.label
            .substring(a.label.indexOf(": ") + 2)
            .toLowerCase()
            .localeCompare(
              b.label.substring(b.label.indexOf(": ") + 2).toLowerCase()
            )
        );

  console.log(courseOptions.length);

  return (
    <div className="pt-2 p-4 max-w-2xl mx-auto">
      <p className="mb-3">
        This utility app helps you to Extract <b>your own exam timetable</b> in
        one click. Try it now!
      </p>
      <hr />
      <p className="mb-5 mt-3">
        Enter all your courses one by one, then click the button below.
      </p>

      <h2 className={`text-xl font-bold mb-2 ${isShaking ? "head-shake" : ""}`}>
        Select Your Courses
      </h2>

      <div className="flex flex-wrap items-center gap-1">
        <Select
          onFocus={() => startTransition(() => {})}
          onInputChange={() => startTransition(() => {})}
          isLoading={isPending}
          // end of optimization
          filterOption={createFilter({ ignoreAccents: false })}
          virtualization={true}
          windowThreshold={50}
          ref={selectRef}
          placeholder={`Type to search courses...`}
          noOptionsMessage={() => "Course not found."}
          loadingMessage={() => "Searching..."}
          options={courseOptions}
          defaultValue={() =>
            selectedCourses.map((course) => ({
              value: course.code,
              label: course[displayedProperty] + ": " + course.title,
            }))
          }
          isMulti
          isDisabled={isPickerDisabled}
          autoFocus
          name="courses"
          className=" flex-grow mr-4"
          classNamePrefix="select"
          onChange={(selectedOptions, { action, removedValue, option }) => {
            console.log("Action: ", action);
            if (action === "remove-value" || action === "pop-value") {
              // Course was removed
              setSelectedCourses((existing) => {
                const remaining = existing.filter(
                  (course) => course.code !== removedValue.value
                );
                return remaining;
              });
              setTimeout(() => selectRef.current.focus(), 0);
            } else if (action === "select-option") {
              console.log("is added course");

              const mostRecentSelection =
                selectedOptions[selectedOptions.length - 1].value;
              console.log({ mostRecentSelection });
              const options = courses
                .filter((course) => course.code === mostRecentSelection)[0]
                .options.sort((a, b) => a.group.localeCompare(b.group));

              console.log({ options });

              if (options.length === 1) {
                setSelectedCourses((selectedCourses) => [
                  ...selectedCourses,
                  options[0],
                ]);
                console.log("Only one option present");
              } else {
                console.log("more than one option present");
                //doing this will trigger the options selector UI, which will add the course itself
                setOptions(options);
              }
              setTimeout(() => selectRef.current.focus(), 0);
              console.log("Selected courses:", selectedCourses);
            } else if (action === "clear") {
              // Clear the entire selection
              setSelectedCourses(() => []);
            }

            console.log({ selectedCourses, selectedOptions });
          }}
        />
      </div>
      {options && (
        <OptionSelection
          options={options}
          setOptions={setOptions}
          selectedCourses={selectedCourses}
          setSelectedCourses={setSelectedCourses}
        />
      )}

      <button
        // disabled={selectedCourses.length < 1}
        onClick={() => {
          if (selectedCourses.length > 0) setTableShowing(true);
          else {
            selectRef.current.focus();

            setIsShaking(true);

            setTimeout(() => setIsShaking(false), shakingDurationInMs);
          }
        }}
        className="mt-5 border p-2 rounded bg-[#001d54] text-white shadow-sm flex items-center gap-1"
      >
        Extract Exam Timetable
        <svg
          fill="white"
          xmlns="http://www.w3.org/2000/svg"
          height="1em"
          viewBox="0 0 448 512"
        >
          <path d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z" />
        </svg>
      </button>
    </div>
  );
};

export default CoursesPicker;
