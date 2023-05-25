const Timetable = ({ courses }) => {
  console.log(timetable);
  const { title, courses } = timetable;
  const identifier = "code"; //"title", "code", "instructor", "venue", "location", "building", "option"

  function getCurrentCourses({ timestamp, dayName }) {
    console.log(arguments);
    console.log(timestamp, dayName, "in getCurrentCourses");
    // should return array of course with given start and end at the day name given
    return courses.filter((course) => {
      return course.days.some(
        (day) =>
          day.name === dayName &&
          day.timestamps.start === timestamp.start &&
          day.timestamps.end === timestamp.end
      );
    });
  }
  function getTimestamps(courses) {
    const timestamps = [];
    courses.forEach((course) => {
      course.days.forEach((day) => {
        const timestamp = {
          start: day.timestamps.start,
          end: day.timestamps.end,
        };

        if (
          !timestamps.some(
            (currentTimestamp) =>
              currentTimestamp.start === timestamp.start &&
              currentTimestamp.end === timestamp.end
          )
        ) {
          timestamps.push(timestamp);
        }
      });
    });
    return timestamps;
  }
  function getDays(courses) {
    console.log(courses);
    const days = new Set();
    const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    for (const course of courses) {
      for (const day of course.days) {
        days.add(day.name);
      }
    }
    return Array.from(days).sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }
  const convertTo12HourFormat = (time) => {
    let hours = Number(time.slice(0, 2));
    const minutes = time.slice(3, 5);
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? `0${hours}` : hours;
    return `${hours}:${minutes}${ampm}`;
  };
  const formatTimestamp = (timestamp) => {
    const start = convertTo12HourFormat(timestamp.start);
    const end = convertTo12HourFormat(timestamp.end);
    return `
          <p>${start}</p> <p>${end}</p>
        `;
  };
  function formatTimestamps(timestamps) {
    console.log(timestamps);
    return timestamps.map((timestamp) => formatTimestamp(timestamp));
  }
  const days = getDays(courses);
  const timestamps = getTimestamps(courses);
  const formatedTimestamps = formatTimestamps(timestamps);

  const copyrightNotice = `Created by Gerison \u00A9 ${new Date().getFullYear()}. All rights reserved.`;

  const UNSCHEDULED_CLASS_LABEL = "No class";
  return (
    <table className="">
      {/* add the title or caption eg Gerison's timetable */}
      <caption>{title}</caption>
      <thead>
        {/* first row before we add days */}
        <tr key="timestamps" className="timestamps">
          <th key="intersection">
            <p>Time</p>
            <p>Days</p>
          </th>

          {/* top header row of timestamps */}
          {timestamps.map((timestamp) => (
            <th key={`${timestamp.start}-${timestamp.end}`}>
              <p>{timestamp.start}</p>
              <p>{timestamp.end}</p>
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {/* days rows */}
        {days.map((day) => {
          return (
            <tr key={day.name}>
              {/* the first th is the day name eg Mon */}
              <th className="day">{day}</th>

              {/* the rest tds are equal to number of timestamps, will hold the courses */}
              {timestamps.map((timestamp, i, timestamps) => {
                console.log(timestamp);
                // get the courses that apply to the current day and timestamp
                const currentCourses = getCurrentCourses({
                  dayName: day,
                  timestamp,
                });
                console.log(currentCourses);

                return (
                  <td
                    style={{
                      backgroundColor: `var(${currentCourses[0]?.color})`,
                    }}
                    data-color={currentCourses[0]?.color}
                    key={`${timestamp.start}-${timestamp.end} on ${day.name}`}
                    className={`${
                      currentCourses.length === 0 ? "unscheduled" : "scheduled"
                    }`}
                  >
                    {
                      //TODO: handle multiple courses in a single cell
                      currentCourses.length === 0
                        ? UNSCHEDULED_CLASS_LABEL
                        : currentCourses[0][identifier]
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
          <td colSpan={formatedTimestamps.length + 1}>
            <p>{copyrightNotice}</p>
          </td>
        </tr>
      </tfoot>
    </table>
  );
};

export default Timetable;
