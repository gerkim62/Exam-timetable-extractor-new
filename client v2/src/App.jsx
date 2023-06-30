import Timetable from "./Components/Timetable/Timetable";
import CoursesPicker from "./Components/CoursesPicker/CoursesPicker";
import getCourses from "./helpers/getCourses";
import Navbar from "./Components/Navbar/Navbar";
import PropertiesCard from "./Components/PropertiesCard/PropertiesCard";
import { timetable } from "./Components/Timetable/data/timetable";
import { useState } from "react";
import Select from "react-windowed-select";
import Footer from "./Components/Footer/Footer";

const courses = getCourses(timetable);
// console.log(JSON.stringify(courses, undefined, 2));

function formatSelectedCourses(courses) {
  return courses
    .map((course, i) => {
      return {
        ...course,
        days: [
          {
            name: new Date(course.date).toLocaleDateString("en-GB", {
              weekday: "short",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            }),
            timestamps: { start: course.startTime, end: course.endTime },
          },
        ],
        color: "--color-course-" + (+i + 1), //index start at 0 so add 1
      };
    })
    .sort((a, b) => new Date(a.date) - new Date(b.date));
}

function App() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [options, setOptions] = useState(null);
  const [tableShowing, setTableShowing] = useState(false);
  const [prefferedCoursesIdentifier, setPrefferedCoursesIdentifier] =
    useState("code");
  // const [timetableTitle, setTimetableTitle] = useState("Gerison's Timetable");
  const [showingPropertiesFor, setShowingPropertiesFor] = useState(null);
  return (
    <div
      onClick={(e) => {
        const target = e.target;
        const hasScheduledClass = target.classList.contains("scheduled");
        const isDescendantOfProperties =
          target.closest("._properties") !== null;

        if (hasScheduledClass || isDescendantOfProperties) {
          return;
        }
        setShowingPropertiesFor(null);
      }}
      className=" min-h-[100vh] flex flex-col select-none"
    >
      <Navbar />

      {!tableShowing && (
        <CoursesPicker
          setSelectedCourses={setSelectedCourses}
          selectedCourses={selectedCourses}
          options={options}
          setOptions={setOptions}
          courses={courses}
          setTableShowing={setTableShowing}
        />
      )}

      {tableShowing && (
        <div className="max-w-4xl mx-auto w-full">
          {/* {JSON.stringify(selectedCourses)} */}
          <Timetable
            setShowingPropertiesFor={setShowingPropertiesFor}
            // title={timetableTitle}
            emptyCellLabel="No exam"
            prefferedCoursesIdentifier={prefferedCoursesIdentifier}
            courses={formatSelectedCourses(selectedCourses)}
          />
          {showingPropertiesFor && (
            <PropertiesCard
              setShowingPropertiesFor={setShowingPropertiesFor}
              className="absolute z-10 left-[50%] -translate-x-1/2 -mt-2"
              course={showingPropertiesFor}
            />
          )}

          <div className="m-4 flex justify-between max-w-[90%] mx-auto">
            <button className="border border-[#001d54] p-1 px-2 rounded text-[#001d54] flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM320 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H320zM448 352c0-17.7-14.3-32-32-32s-32 14.3-32 32v64H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c17.7 0 32-14.3 32-32V352z" />
              </svg>
              Fullscreen
            </button>
            <button
              onClick={() => {
                setTableShowing(false);
                // setSelectedCourses([]);
              }}
              className="border border-[#001d54] p-1 px-2 rounded text-[#001d54] flex items-center gap-1 hover:border-[hover-color] hover:ring-[hover-color] hover:rounded"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 512 512"
              >
                <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
              </svg>
              Update
            </button>
          </div>

          <p className="max-w-[90%] mx-auto mt-5">
            Choose what appears in your Timetable
          </p>

          <Select
            defaultValue={{
              value: prefferedCoursesIdentifier,
              label: "Course " + prefferedCoursesIdentifier,
            }}
            isSearchable={false}
            options={[
              { value: "code", label: "Course Code" },
              { value: "title", label: "Course Title" },
            ]}
            className="max-w-[90%] mx-auto"
            onChange={(selectedOption) =>
              setPrefferedCoursesIdentifier(selectedOption.value)
            }
          />
          <p className="text-xs max-w-[90%] mx-auto">
            <b>Suggeseted: </b>Use Course code. It is short and unique.
          </p>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default App;
