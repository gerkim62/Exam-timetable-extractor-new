function getCourses(timetable) {
  const courses = [];
  timetable.pages.forEach((page) => {
    // courses.push(...page.courses);
    page.courses.forEach((course) => {
      course.page = page.id;
      courses.push(course);
    });
  });

  const coursecodes = Array.from(new Set(courses.map((course) => course.code)));
  // console.log(coursecodes);

  return coursecodes.map((code) => {
    const filtered = courses.filter((course) => course.code === code);
    // console.log(filtered);
    let course = {
      code,
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

export default getCourses;
