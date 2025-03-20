import React from "react";

const CustomeInput = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  name,
  type = "text",
  className,
  placeholder,
}) => {
  return (
    <div>
      <div className="relative ">
        <input
          type={type}
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`p-3 px-4 outline-none bg-[#404040] rounded-xl  w-full ${className}`}
          placeholder={placeholder}
        />
        {touched[name] && errors[name] && (
          <p className="text-red-500 text-xs mt-2">{errors[name]}</p>
        )}
      </div>
    </div>
  );
};

export default CustomeInput;
