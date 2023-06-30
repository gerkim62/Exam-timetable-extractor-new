export function getCurrentCourses({ timestamp, dayName, courses }) {
  // console.log(arguments);
  // console.log(timestamp, dayName, "in getCurrentCourses");
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
export function getTimestamps(courses) {
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
  return sortTimeRanges(timestamps);
}
export function getDays(courses) {
  // console.log(courses);
  const days = new Set();
  const order = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
  for (const course of courses) {
    for (const day of course.days) {
      days.add(day.name);
    }
  }
  return Array.from(days).sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export const convertTo12HourFormat = (time) => {
  let hours = Number(time.slice(0, 2));
  const minutes = time.slice(3, 5);
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  hours = hours < 10 ? `0${hours}` : hours;
  return `${hours}:${minutes}${ampm}`;
};
export const formatTimestamp = (timestamp) => {
  const start = convertTo12HourFormat(timestamp.start);
  const end = convertTo12HourFormat(timestamp.end);
  return `
          <p>${start}</p> <p>${end}</p>
        `;
};
export function formatTimestamps(timestamps) {
  // console.log(timestamps);
  return timestamps.map((timestamp) => formatTimestamp(timestamp));
}

export function sortTimeRanges(timeRanges) {
  timeRanges.sort(function (a, b) {
    var startTimeA = convertTo24HourFormat(a.start);
    var startTimeB = convertTo24HourFormat(b.start);

    return startTimeA.localeCompare(startTimeB);
  });

  return timeRanges;
}

function convertTo24HourFormat(timeString) {
  var timeComponents = timeString.split(" ");
  var time = timeComponents[0];
  var meridiem = timeComponents[1];
  var separator = time.includes(".") ? "." : ":";

  var hourMinute = time.split(separator);
  var hour = parseInt(hourMinute[0]);
  var minute = parseInt(hourMinute[1]);

  if (meridiem === "PM" && hour !== 12) {
    hour += 12;
  } else if (meridiem === "AM" && hour === 12) {
    hour = 0;
  }

  return (
    hour.toString().padStart(2, "0") + ":" + minute.toString().padStart(2, "0")
  );
}

// Example usage:
// var timeRanges = [
//   { start: '02.00 PM', end: '05.00 PM' },
//   { start: '07.00 AM', end: '10.00 AM' },
//   { start: '10:30 AM', end: '01:30 PM' }
// ];

// var sortedTimeRanges = sortTimeRanges(timeRanges);
// console.log(sortedTimeRanges);
