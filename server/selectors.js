//document wide
export const SEMESTER_SELECTOR = `body > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(1) > p`;
export const TABLES_SELECTR = `body > table`;
export const HEADERS_TR_SELECTOR = `body > table:nth-child(2) > tbody > tr:nth-child(3)`;
export const TIMETABLE_NAME_SELECTOR = `body > table:nth-child(2) > tbody > tr:nth-child(1) > td:nth-child(4) > p`;
export const RELEASE_DATE_SELECTOR = `body > table:nth-child(2) > tbody > tr:nth-child(28) > td:nth-child(1) > p`;

//inside a table (each page)
export const CURRENT_PAGE_NUMBER_SELECTOR = `tbody > tr:last-child > td:nth-child(8) > p`;
