import { HEADERS_TR_SELECTOR } from "./selectors.js";
import { toCamelCase } from "./utils.js";

export function isFooter(course) {
  return course.date.includes("/");
}

export function getCourseFromTr(tr, headers) {
  const course = {};
  const tds = tr.querySelectorAll("td");

  tds.forEach((td, i) => {
    if (headers[i]) course[headers[i]] = td.innerText.replace(/\s/, " ").trim();
    if (headers[i] === "group")
      course[headers[i]] = td.innerText.trim().replace("Group ", "");
    if (headers[i] === "rows") {
      if (course[headers[i]] !== "")
        course[headers[i]] = td.innerText.trim().split(",");
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
    course?.startTime !== "" && course.endTime !== "" && course.id !== "Course"
  );
}

export function parseDate(dateString) {
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

  return new Date(year, month - 1, day);
}

export function isValidDate(str) {
  return str !== "";
}

export const convertPdfToHtmlDoc = () => {
  //todo: implement the logic for scraping the xodo pdf to html converter website

  return document;
};
