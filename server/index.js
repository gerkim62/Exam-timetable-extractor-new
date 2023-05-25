const convertPdfToHtmlDoc = () => {
  //todo: implement the logic for scraping the converter website

  return document;
};

import {
  HEADERS_TR_SELECTOR,
  CURRENT_PAGE_NUMBER_SELECTOR,
  SEMESTER_SELECTOR,
  TABLES_SELECTR,
  TIMETABLE_NAME_SELECTOR,
  RELEASE_DATE_SELECTOR,
} from "./selectors.js";

const timetable = {};

const timetableHTMLDocument = convertPdfToHtmlDoc();

const semester =
  timetableHTMLDocument.querySelector(SEMESTER_SELECTOR).innerHTML;
const timetableName = timetableHTMLDocument
  .querySelector(TIMETABLE_NAME_SELECTOR)
  .textContent.trim();
const timetableReleaseDate = parseDate(
  timetableHTMLDocument.querySelector(RELEASE_DATE_SELECTOR).textContent.trim()
);
timetable.semester = semester;
timetable.name = timetableName;
const tables = timetableHTMLDocument.querySelectorAll(TABLES_SELECTR);
const headers = getHeaders();

timetable.pages = [];
tables.forEach((table) => {
  const page = {};

  //convert it from the format "Page n of" to "n"
  const pageId = table
    .querySelector(CURRENT_PAGE_NUMBER_SELECTOR)
    .innerHTML.replace("Page", "")
    .replace("of", "")
    .trim();

  page.id = pageId;
  page.courses = [];

  const trs = table.querySelectorAll("tr");

  let lastValidDate = "";
  for (let i = 0; i < trs.length; i++) {
    const course = getCourseFromTr(trs[i]);

    if (isValidDate(course.date) && !isFooter(course)) {
      //update valid date
      lastValidDate = parseDate(course.date);
    }
    course.date = lastValidDate;

    if (isValidCourse(course)) page.courses.push(course);
  }

  timetable.pages.push(page);
});

function isFooter(course) {
  return course.date.includes("/");
}

console.log(JSON.stringify(timetable, undefined, 2));

function getCourseFromTr(tr) {
  const course = {};
  const tds = tr.querySelectorAll("td");

  tds.forEach((td, i) => {
    if (headers[i]) course[headers[i]] = td.innerText.trim();
  });

  return course;
}

function getHeaders() {
  const DATE_INDEX = 0;
  const headers = [];
  const headersTr = timetableHTMLDocument.querySelector(HEADERS_TR_SELECTOR);

  const tds = headersTr.querySelectorAll("td");

  tds.forEach((td, i) => {
    const header = toCamelCase(td.innerText.trim());
    if (i === DATE_INDEX) headers.push("date");
    else if (header === "course") headers.push("id");
    else if (header === "courseTitle") headers.push("title");
    else headers.push(header);
  });

  return headers;
}

function toCamelCase(str) {
  const chars = [...str];

  chars[0] = chars[0].toLowerCase();

  return chars.join("").trim().replace(" ", "");
}

function isValidDate(str) {
  return str !== "";
}

function isValidCourse(course) {
  return (
    course?.startTime !== "" && course.endTime !== "" && course.id !== "Course"
  );
}

function parseDate(dateString) {
  let day, month, year;

  const currentYear = new Date().getFullYear();
  const currentCentury = Math.floor(currentYear / 100) * 100;

  const isDDMMYYYY = dateString.includes("-");
  const isMMDDYYYY = dateString.includes("/");

  if (isDDMMYYYY) {
    //e.g Thu, 13-04-2023
    [day, month, year] = dateString.trim().split(" ")[1].split("-");
  } else if (isMMDDYYYY) {
    //e.g 4/6/23 2:54 PM
    [month, day, year] = dateString.trim().split(" ")[0].split("/");
  } else return null;

  year = Number(year);
  if (year < 100) year += currentCentury;
  console.log(day);
  return new Date(year, month - 1, day);
}
