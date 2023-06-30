import React, { useState } from "react";

const OptionSelection = ({
  options,
  setOptions,
  selectedCourses,
  setSelectedCourses,
  setIsPickerDisabled
}) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelection = (option) => {
    setSelectedOption(option);
    setSelectedCourses([...selectedCourses, option]);

    console.log("Selected option inside optionselection is", option);
    setOptions(null);
    
  };

  return (
    <div className="w-full max-w-[84%] sm:max-w-md mx-auto ml-6 -mt-4 bg-white relative z-10">
      <div className="bg-white rounded-lg overflow-hidden border border-gray-300">
        <h2 className="text-xl font-bold py-2 px-6 whitespace-nowrap">
          Select Your Option{" "}
          <small className="font-normal text-xs">
            {" "}
            <span className="text-sm">for</span> {options[0].code}
          </small>
        </h2>
        {options.map((option, index) => (
          <div
            key={index}
            className={`flex items-center justify-between px-6 py-2 ${
              selectedOption === option
                ? "bg-blue-200 text-gray-900"
                : "hover:bg-blue-100"
            } cursor-pointer`}
            onClick={() => handleOptionSelection(option)}
          >
            <div className="font-semibold whitespace-nowrap">{`Group ${option.group}`}</div>
            <div className="text-ellipsis overflow-clip whitespace-nowrap ml-2">by {option.instructor}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OptionSelection;
