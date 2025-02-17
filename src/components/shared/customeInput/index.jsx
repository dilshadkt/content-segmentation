import React from "react";
import clsx from "clsx";
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
  title = null,
}) => {
  return (
    <div className="flex flex-col gap-y-2">
      {title && <span className="text-gray-500  text-sm">{title}</span>}
      <div className="relative ">
        <input
          type={type}
          name={name}
          value={values[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          className={clsx(`p-3 px-4  rounded-xl `, className)}
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
