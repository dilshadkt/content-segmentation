import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import CustomeInput from "../../../components/shared/customeInput";
import { useAuth } from "../../../hooks/UseAuth";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    values,
    errors,
    handleBlur,
    handleChange,
    touched,
    handleSubmit,
    isSubmitting,
  } = useFormik({
    initialValues: {
      UserName: "",
      password: "",
      clientId: "",
    },
    validationSchema: Yup.object({
      UserName: Yup.string().required("E-mail is required"),
      password: Yup.string().required("Password is required"),
      clientId: Yup.string().required("Client id is required"),
    }),
    onSubmit: async (values) => {
      try {
        await login({ ...values });
        navigate("/branches");
      } catch (error) {
        console.error(error);
        localStorage.clear();
        setError(error?.response?.data?.message || "Failed to Login");
      }
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
              name={"UserName"}
              touched={touched}
              values={values}
              placeholder={"User Name"}
              className={" outline-none bg-[#404040] w-full"}
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
                  type="button"
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
              className={" outline-none bg-[#404040] w-full"}
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              disabled={isSubmitting}
              type="submit"
              className="p-3  mt-4 bg-black rounded-xl"
            >
              {isSubmitting ? "Loading..." : "Login"}
            </button>
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
