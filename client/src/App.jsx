import CoursesPicker from "./Components/CoursesPicker";

// const timetableJsonUrl = `https://jsonkeeper.com/b/AD61`;

function getCourses(timetable) {
  const courses = [];
  timetable.pages.forEach((page) => {
    // courses.push(...page.courses);
    page.courses.forEach((course) => {
      course.page = page.id;
      courses.push(course);
    });
  });

  const ids = Array.from(new Set(courses.map((course) => course.id)));
  // console.log(ids);

  return ids.map((id) => {
    const filtered = courses.filter((course) => course.id === id);
    // console.log(filtered);
    let course = {
      id,
      title: filtered[0].title,
      options: [],
    };
    filtered.forEach((item) => {
      //todo: remove unnecessary keys
      course.options.push(item);
    });
    return course;
  });
}

import { timetable } from "./data/timetable";
const courses = getCourses(timetable);
// console.log(courses);
function App() {
  return <CoursesPicker courses={courses} />;
}

export default App;
