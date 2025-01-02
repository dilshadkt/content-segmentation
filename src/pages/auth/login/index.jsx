import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomeInput from "../../../components/shared/customeInput";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { values, errors, handleBlur, handleChange, touched, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
        clientId: "",
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("E-mail is required"),
        password: Yup.string()
          .min(6, "Password must be atleast 6 characters")
          .required("Password is required"),
        clientId: Yup.string().required("Client id is required"),
      }),
      onSubmit: (values) => {
        console.log("Form submited", values);
      },
    });
  return (
    <section className="w-full h-full px-5 xl:px-16  flex flex-col  font-radio flexCenter relative">
      <div className="max-w-screen-xl w-full   md:grid grid-cols-2">
        <div className=" hidden md:flexCenter">
          <img src="/image/login.png" alt="" />
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center font-light md:font-normal text-sm md:text-base w-[95%] md:w-[85%]">
            "Welcome to the future of restaurant reporting! We're serving up a
            fresh approach to streamline your restaurant management, making data
            deliciously easy to digest."
          </p>

          <form
            onSubmit={handleSubmit}
            className="bg-[#2F2F2F] flex flex-col gap-y-4 w-full lg:w-[80%] 
            mt-8 md:mt-12 py-10 px-5 rounded-2xl"
          >
            <CustomeInput
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={"email"}
              touched={touched}
              values={values}
              placeholder={"Email"}
            />
            <div>
              <div className="relative ">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="p-3 px-4 outline-none pr-14 bg-[#404040] rounded-xl  w-full"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-5 top-2"
                >
                  {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="text-red-500 text-xs mt-2">{errors.password}</p>
              )}
            </div>
            <CustomeInput
              errors={errors}
              handleBlur={handleBlur}
              handleChange={handleChange}
              name={"clientId"}
              touched={touched}
              values={values}
              placeholder={"Client Id"}
            />

            <button className="p-3  mt-4 bg-black rounded-xl">Login</button>
            <div className="flexCenter">
              <p className="text-xs text-center w-2/3 leading-5 ">
                By continuing, you agree to (name)'s{" "}
                <b>Terms of service and Privacy policy</b>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
