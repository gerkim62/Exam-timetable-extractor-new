import { HEADERS_TR_SELECTOR } from "./selectors.js";
import { toCamelCase, sanitizeString } from "./utils.js";
const DDMMYYYY_DATE_SEPARATOR = "-";
const MMDDYYYY_DATE_SEPARATOR = "/";

export function isFooter(course) {
  return course.date.includes(MMDDYYYY_DATE_SEPARATOR);
}

export function getCourseFromTr(tr, headers) {
  const course = {};
  const tds = tr.querySelectorAll("td");

  tds.forEach((td, i) => {
    if (headers[i]) course[headers[i]] = sanitizeString(td.innerText);
    if (headers[i] === "group")
      course[headers[i]] = td.innerText.trim().replace("Group ", "");
    if (headers[i] === "rows") {
      if (course[headers[i]] !== "")
        course[headers[i]] = td.innerText.trim().split(",").filter(Boolean);
      else course[headers[i]] = [];
    }
  });

  return course;
}

export function getHeaders(timetableHTMLDocument) {
  const DATE_INDEX = 0;
  const headers = [];
  const headersTr = timetableHTMLDocument.querySelector(HEADERS_TR_SELECTOR);

  const tds = headersTr.querySelectorAll("td");

  tds.forEach((td, i) => {
    const header = toCamelCase(td.innerText.trim());
    if (i === DATE_INDEX) headers.push("date");
    else if (header === "course") headers.push("code");
    else if (header === "option") headers.push("group");
    else if (header === "row") headers.push("rows");
    else if (header === "courseTitle") headers.push("title");
    else headers.push(header);
  });

  return headers;
}

export function isValidCourse(course) {
  return (
    course?.startTime !== "" &&
    course.endTime !== "" &&
    course.code !== "Course"
  );
}

export function parseDate(dateString, timetableReleaseYear) {
  let day, month, year;

  const currentYear = new Date().getFullYear();
  const currentCentury = Math.floor(currentYear / 100) * 100;

  const isDDMMYYYY = dateString.includes(DDMMYYYY_DATE_SEPARATOR);
  const isMMDDYYYY = dateString.includes(MMDDYYYY_DATE_SEPARATOR);

  if (isDDMMYYYY) {
    //e.g Thu, 13-04-2023
    [day, month, year] = dateString.trim().split(" ")[1].split("-");
  } else if (isMMDDYYYY) {
    //e.g 4/6/23 2:54 PM
    console.log(dateString);
    [month, day, year] = dateString.trim().split(" ")[0].split("/");
  } else {
    console.log("date unparsable", dateString, dateString);
    return null;
  }

  year = Number(year);
  if (year === 0) {
    //Assumption made: exam can only be done during timetable release year
    console.log("Year is 0. let set it to", timetableReleaseYear);
    year = timetableReleaseYear || 0;
  } else if (year < 100) {
    console.log("Year has no century");
    year += currentCentury;
  }

  return new Date(year, month - 1, day); //months start index 0
}

export function isValidDate(str) {
  return str !== "" && !str.includes("Date");
}

export const convertUploadedFileToHtmlDoc = () => {
  //todo: implement the logic for scraping the xodo pdf to html converter website

  return document;
};
