import React from "react";
import "./PropertiesCard.css";
const PropertiesCard = ({ course, className, setShowingPropertiesFor }) => {
  // console.log(course);
  const { code, title, instructor, group, rows, page, building } = course;
  return (
    <div className={`${className} _properties`}>
      <div id="properties-custom-card" className="custom-card">
        <button
          onClick={() => setShowingPropertiesFor(null)}
          id="close-properties"
          className="close"
        >
          ×
        </button>

        <div className="circle">
          <h2 id="code">{code}</h2>
        </div>
        <div className="content">
          <ul>
            <li tooltip="Title" flow="left">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M96 0C43 0 0 43 0 96V416c0 53 43 96 96 96H384h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V384c17.7 0 32-14.3 32-32V32c0-17.7-14.3-32-32-32H384 96zm0 384H352v64H96c-17.7 0-32-14.3-32-32s14.3-32 32-32zm32-240c0-8.8 7.2-16 16-16H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16zm16 48H336c8.8 0 16 7.2 16 16s-7.2 16-16 16H144c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/></svg>               
                          <p id="title">{title}</p>
            </li>
            <li tooltip="Option" flow="left">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z"/></svg>              <p id="group">Group {group}</p>
            </li>
            <li tooltip="Lecturer" flow="left">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512"><path d="M224 256A128 128 0 1 1 224 0a128 128 0 1 1 0 256zM209.1 359.2l-18.6-31c-6.4-10.7 1.3-24.2 13.7-24.2H224h19.7c12.4 0 20.1 13.6 13.7 24.2l-18.6 31 33.4 123.9 36-146.9c2-8.1 9.8-13.4 17.9-11.3c70.1 17.6 121.9 81 121.9 156.4c0 17-13.8 30.7-30.7 30.7H285.5c-2.1 0-4-.4-5.8-1.1l.3 1.1H168l.3-1.1c-1.8 .7-3.8 1.1-5.8 1.1H30.7C13.8 512 0 498.2 0 481.3c0-75.5 51.9-138.9 121.9-156.4c8.1-2 15.9 3.3 17.9 11.3l36 146.9 33.4-123.9z"/></svg>              <p id="instructor">by {instructor} </p>
            </li>
            <li tooltip="Building" flow="left">
            <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><path d="M64 48c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16h80V400c0-26.5 21.5-48 48-48s48 21.5 48 48v64h80c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64zM0 64C0 28.7 28.7 0 64 0H320c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V64zm88 40c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V104zM232 88h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V104c0-8.8 7.2-16 16-16zM88 232c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H104c-8.8 0-16-7.2-16-16V232zm144-16h48c8.8 0 16 7.2 16 16v48c0 8.8-7.2 16-16 16H232c-8.8 0-16-7.2-16-16V232c0-8.8 7.2-16 16-16z"/></svg>              <p id="building">at {building}</p>
            </li>
            <li tooltip="Source" flow="left">
              {/* <i className="fa fa-map-marker" aria-hidden="true"></i> */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18.468 18.468" xmlSpace="preserve">
    <path  d="M15.713 0H2.753a.497.497 0 0 0-.496.496v17.476c0 .273.222.496.496.496h9.667a.5.5 0 0 0 .37-.165l3.293-3.689a.49.49 0 0 0 .127-.329V.496A.497.497 0 0 0 15.713 0zm-1.067 12.907-2.955-.002a.556.556 0 0 0-.39.161.554.554 0 0 0-.16.39l.011 3.699H3.746V1.243h10.899l.001 11.664z"/>
    <path  d="M12.158 10.131H9.05v-.026l.761-.633c1.193-1.066 2.196-2.17 2.196-3.554 0-1.496-1.029-2.588-2.894-2.588-1.118 0-2.082.38-2.703.85l.544 1.383c.433-.33 1.055-.685 1.765-.685.951 0 1.357.533 1.357 1.204-.024.966-.901 1.891-2.702 3.504l-1.066.964v1.168h5.85v-1.587z"/>
</svg>
              <p id="location">Page {page}</p>
            </li>
            <li tooltip="Rows" flow="left">
              {/* <i className="fa fa-university" aria-hidden="true"></i> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M248 48V256h48V58.7c23.9 13.8 40 39.7 40 69.3V256h48V128C384 57.3 326.7 0 256 0H192C121.3 0 64 57.3 64 128V256h48V128c0-29.6 16.1-55.5 40-69.3V256h48V48h48zM48 288c-12.1 0-23.2 6.8-28.6 17.7l-16 32c-5 9.9-4.4 21.7 1.4 31.1S20.9 384 32 384l0 96c0 17.7 14.3 32 32 32s32-14.3 32-32V384H352v96c0 17.7 14.3 32 32 32s32-14.3 32-32V384c11.1 0 21.4-5.7 27.2-15.2s6.4-21.2 1.4-31.1l-16-32C423.2 294.8 412.1 288 400 288H48z" />
              </svg>
              <p className={rows.length>5?"text-xs":""} id="venue">{rows.join(", ") || "Row Unavailable"}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PropertiesCard;
