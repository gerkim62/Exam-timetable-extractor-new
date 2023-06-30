import {
  CURRENT_PAGE_NUMBER_SELECTOR,
  SEMESTER_SELECTOR,
  TABLES_SELECTOR,
  TIMETABLE_NAME_SELECTOR,
  RELEASE_DATE_SELECTOR,
} from "./selectors.js";

import {
  convertUploadedFileToHtmlDoc,
  parseDate,
  getCourseFromTr,
  getHeaders,
  isFooter,
  isValidCourse,
  isValidDate,
} from "./helpers.js";

// const timetable = getTimetableFromUploadedHtml(uploadedHTMLDocument);

// console.log(JSON.stringify(timetable));

function getTimetableFromUploadedHtml(uploadedHTMLDocument) {
  const timetableHTMLDocument =
    convertUploadedFileToHtmlDoc(uploadedHTMLDocument);

  const semester =
    timetableHTMLDocument.querySelector(SEMESTER_SELECTOR).innerHTML;

  const timetableName = timetableHTMLDocument
    .querySelector(TIMETABLE_NAME_SELECTOR)
    .textContent.trim();

  const timetableReleaseDate = parseDate(
    timetableHTMLDocument
      .querySelector(RELEASE_DATE_SELECTOR)
      .textContent.trim()
  );

  console.log(timetableReleaseDate);

  const tables = timetableHTMLDocument.querySelectorAll(TABLES_SELECTOR);
  const headers = getHeaders(timetableHTMLDocument);

  const timetablePages = [];
  tables.forEach((table) => {
    const page = {};

    //convert it from the format "Page n of" to "n"
    const pageId = parseInt(
      table
        .querySelector(CURRENT_PAGE_NUMBER_SELECTOR)
        .innerHTML.replace("Page", "")
        .replace("of", "")
        .trim()
    );

    page.id = pageId;
    page.courses = [];

    const trs = table.querySelectorAll("tr");

    let lastValidDate = "";

    for (let i = 0; i < trs.length; i++) {
      const course = getCourseFromTr(trs[i], headers);

      if (isValidDate(course.date) && !isFooter(course)) {
        //update valid date
        lastValidDate = parseDate(
          course.date,
          timetableReleaseDate.getFullYear()
        );
      }
      course.date = lastValidDate;

      if (isValidCourse(course)) page.courses.push(course);
    }

    timetablePages.push(page);
  });

  return {
    semester: semester,
    name: timetableName,
    releaseDate: timetableReleaseDate,
    pages: timetablePages,
  };
}

export default getTimetableFromUploadedHtml;
