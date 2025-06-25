import Dropzone from "react-dropzone";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useSelector } from "react-redux";

function SignUp({
  values,
  errors,
  touched,
  handleBlur,
  handleChange,
  setFieldValue,
}) {
  const mode = useSelector((state) => state.mode);

  return (
    <div className="space-y-4">
      <input
        placeholder="First Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.firstName || ""}
        name="firstName"
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "light" ? "bg-gray-400 border-gray-300" : "bg-gray-700 border-gray-600"}`}
      />
      {touched.firstName && errors.firstName && (
        <p className="text-red-500 text-sm">{errors.firstName}</p>
      )}

      <input
        placeholder="Last Name"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.lastName || ""}
        name="lastName"
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "light" ? "bg-gray-400 border-gray-300" : "bg-gray-700 border-gray-600"}`}
      />
      {touched.lastName && errors.lastName && (
        <p className="text-red-500 text-sm">{errors.lastName}</p>
      )}

      <input
        placeholder="Location"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.location || ""}
        name="location"
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "light" ? "bg-gray-400 border-gray-300" : "bg-gray-700 border-gray-600"}`}
      />
      {touched.location && errors.location && (
        <p className="text-red-500 text-sm">{errors.location}</p>
      )}

      <input
        placeholder="Occupation"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.occupation || ""}
        name="occupation"
        className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 ${mode === "light" ? "bg-gray-400 border-gray-300" : "bg-gray-700 border-gray-600"}`}
      />
      {touched.occupation && errors.occupation && (
        <p className="text-red-500 text-sm">{errors.occupation}</p>
      )}

      <Dropzone
        acceptedFiles=".jpg, .jpeg, .png"
        multiple={false}
        onDrop={(acceptedFiles) => setFieldValue("picture", acceptedFiles[0])}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            {...getRootProps()}
            className={`flex items-center justify-center border-2 border-dashed ${mode === "light" ? "border-gray-400" : "border-gray-600"} p-4 rounded cursor-pointer hover:border-blue-400 transition`}
          >
            <input {...getInputProps()} />
            {!values.picture ? (
              <p className={`${mode === "light" ? "text-gray-600" : "text-gray-300"}`}>Add picture here</p>
            ) : (
              <div className="flex items-center space-x-2">
                <p className={mode === "light" ? "text-gray-800" : "text-gray-100"}>
                  {values.picture.name}
                </p>
                <EditOutlinedIcon className={mode === "light" ? "text-gray-800" : "text-gray-100"} />
              </div>
            )}
          </div>
        )}
      </Dropzone>
      {touched.picture && errors.picture && (
        <p className="text-red-500 text-sm">{errors.picture}</p>
      )}
    </div>
  );
}

export default SignUp;
