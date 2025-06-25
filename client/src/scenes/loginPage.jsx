import { useState } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../state/slice";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import SignUp from "../components/signUp";

function LoginPage() {
  const [pageType, setPageType] = useState("login");
  const isLogin = pageType === "login";
  const isRegister = pageType === "register";
  const mode = useSelector((state) => state.mode);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  const signUpSchema = yup.object().shape({
    firstName: yup.string().required("Required"),
    lastName: yup.string().required("Required"),
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
    location: yup.string().required("Required"),
    occupation: yup.string().required("Required"),
    picture: yup.mixed().required("Required"),
  });

  const initialValuesLogin = {
    email: "",
    password: "",
  };

  const initialValuesSignUp = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
  };

  const register = async (values, onSubmitProps) => {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picturePath", values.picture.name);

    const response = await fetch("http://localhost:5000/auth/register", {
      method: "POST",
      body: formData,
    });

    const registeredUser = await response.json();
    onSubmitProps.resetForm();
    if (registeredUser) {
      setPageType("login");
    }
  };

  const login = async (values, onSubmitProps) => {
    const response = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    const loggedInUser = await response.json();
    onSubmitProps.resetForm();

    if (loggedInUser) {
      dispatch(
        setLogin({
          user: loggedInUser.user,
          token: loggedInUser.token,
        })
      );
      navigate("/home");
    }
  };

  const handleFormSubmit = async (values, onSubmitProps) => {
    if (isLogin) {
      await login(values, onSubmitProps);
    } else {
      await register(values, onSubmitProps);
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 mt-13 md:mt-10 ${mode === "light"
        ? "bg-gradient-to-br from-blue-100 to-white"
        : "bg-gradient-to-br from-gray-800 to-gray-900"
        } transition-colors duration-500`}
    >
      <div className={`w-full max-w-md ${mode === "light" ? "bg-white" : "bg-gray-800"} p-8 rounded-lg shadow-lg transition-all duration-500`}>
        <h1 className={`text-3xl font-bold text-center mb-2 ${mode === "light" ? "text-blue-600" : "text-blue-400"}`}>
          Meet Media
        </h1>
        <p className={`text-center mb-6 ${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>
          Welcome to Meet Media!
        </p>

        <Formik
          onSubmit={handleFormSubmit}
          initialValues={isLogin ? initialValuesLogin : initialValuesSignUp}
          validationSchema={isLogin ? loginSchema : signUpSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
            setFieldValue,
            resetForm,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              {isRegister && (
                <SignUp
                  values={values}
                  errors={errors}
                  touched={touched}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  setFieldValue={setFieldValue}
                />
              )}

              <div>
                <input
                  placeholder="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  type="email"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "light" ? "bg-gray-400 border-gray-300" : "bg-gray-700 border-gray-600"}`}
                />
                {touched.email && errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <input
                  placeholder="Password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  type="password"
                  className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "light" ? "bg-gray-400 border-gray-300" : "bg-gray-700 border-gray-600"}`}
                />
                {touched.password && errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition"
              >
                {isLogin ? "Login" : "Register"}
              </button>

              <p
                onClick={() => {
                  setPageType(isLogin ? "register" : "login");
                  resetForm();
                }}
                className={`text-sm text-center ${mode === "light" ? "text-blue-600" : "text-blue-400"} cursor-pointer hover:underline`}
              >
                {isLogin
                  ? "Don't have an account? Sign up!"
                  : "Already have an account? Sign in!"}
              </p>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LoginPage;
