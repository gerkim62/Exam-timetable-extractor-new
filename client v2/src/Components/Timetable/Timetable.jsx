import { getCurrentCourses, getTimestamps, getDays } from "./helpers.js";
import "./Timetable.css";
import { useState } from "react";

const Timetable = ({
  prefferedCoursesIdentifier,
  courses,
  // title,
  emptyCellLabel,
  showingPropertiesFor,
  setShowingPropertiesFor,
}) => {
  const [title, setTitle] = useState("Gerison's Timetable");

  //identifier: "title", "code", "instructor", "venue", "location", "building", "option"

  const leftHeaders = getDays(courses);
  const topHeaders = getTimestamps(courses);
  // console.log({topHeaders});
  // const formatedTimestamps = formatTimestamps(timestamps);
  const copyrightNotice = `Designed by Gerison \u00A9 ${new Date().getFullYear()}`;

  const DEFAULT_EMPTY_CELL_LABEL = "No class";

  return (
    <div className="w-full overflow-auto p-4 bg-[#001d54]">
      <table className="mx-auto">
        {/* add the title or caption eg Gerison's timetable */}
        <caption>{title}</caption>
        <thead>
          {/* first row before we add days */}
          <tr key="timestamps" className="timestamps">
            <th key="intersection">
              <p>Time</p>
              <p>Day</p>
            </th>

            {/* top header row of timestamps */}
            {topHeaders.map((timestamp) => (
              <th key={`${timestamp.start}-${timestamp.end}`}>
                <p key={timestamp.start}>{timestamp.start}</p>
                <p key={timestamp.end}>{timestamp.end}</p>
              </th>
            ))}
          </tr>
        </thead>

        <tbody key={"tbody"}>
          {/* days rows */}
          {leftHeaders.map((day) => {
            return (
              <tr key={day}>
                {/* the first th is the day name eg Mon */}
                <th key={day} className="day">
                  {day}
                </th>

                {/* the rest tds are equal to number of timestamps, will hold the courses */}
                {topHeaders.map((timestamp, i, timestamps) => {
                  // console.log(timestamp);
                  // get the courses that apply to the current day and timestamp
                  const currentCourses = getCurrentCourses({
                    dayName: day,
                    timestamp,
                    courses,
                  });
                  console.log({ currentCourses });

                  return (
                    <td
                      onClick={({ target }) => {
                        // todo: fix this problem
                        // target.classList.add("active")
                        setShowingPropertiesFor(currentCourses[0]);
                      }}
                      style={{
                        backgroundColor: `var(${currentCourses[0]?.color})`,
                      }}
                      data-color={currentCourses[0]?.color}
                      key={`${timestamp.start}-${timestamp.end} on ${day.name}`}
                      className={`${
                        currentCourses.length === 0
                          ? "unscheduled"
                          : "scheduled"
                      }`}
                    >
                      {
                        //TODO: handle multiple courses in a single cell: a clash
                        currentCourses.length === 0
                          ? emptyCellLabel ?? DEFAULT_EMPTY_CELL_LABEL
                          : currentCourses[0][prefferedCoursesIdentifier]
                      }
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>

        <tfoot>
          <tr>
            {/* this is a hack to make the td span full width of the entire table */}
            <td colSpan={topHeaders.length + 1}>
              <p>{copyrightNotice}</p>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default Timetable;
