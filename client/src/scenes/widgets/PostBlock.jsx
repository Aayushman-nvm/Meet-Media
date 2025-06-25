import {
  EditOutlined,
  DeleteOutlineOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "../../state/slice";
import Dropzone from "react-dropzone";

function PostBlock({ picturePath }) {
  const dispatch = useDispatch();
  const [isImage, setIsImage] = useState(false);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [caption, setCaption] = useState("");
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const mode = useSelector((state) => state.mode);

  async function handlePost() {
    const formData = new FormData();
    formData.append("userId", _id);
    formData.append("description", caption);

    if (image) {
      formData.append("picture", image);
      formData.append("picturePath", image.name);
    }

    try {
      setLoading(true);
      const response = await fetch(`http://localhost:5000/posts`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const posts = await response.json();
      dispatch(setPosts({ posts }));
      setImage(null);
      setPosts("");
      setCaption("");
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className={`${mode === "light" ? "bg-gray-200" : "bg-gray-800"} p-4 rounded shadow space-y-4`}>
      <div className="flex items-center space-x-4">
        <img
          src={`http://localhost:5000/assets/${picturePath}`}
          alt="Profile"
          className="w-12 h-12 rounded-full object-cover"
        />
        <input
          placeholder="What's on your mind?"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className={`flex-1 px-4 py-2 border rounded focus:outline-none ${mode === "light" ? "bg-gray-300 text-gray-700" : "bg-gray-700 text-gray-300"}`}
        />
      </div>

      {isImage && (
        <Dropzone
          acceptedFiles=".jpg,.jpeg,.png"
          multiple={false}
          onDrop={(acceptedFiles) => setImage(acceptedFiles[0])}
        >
          {({ getRootProps, getInputProps }) => (
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-4 rounded cursor-pointer hover:border-blue-400 transition"
            >
              <input {...getInputProps()} />
              {!image ? (
                <p className={mode === "light" ? "text-gray-500" : "text-gray-300"}>Drag 'n' drop an image here, or click to select</p>
              ) : (
                <div className={`flex items-center space-x-2 ${mode === "light" ? "text-gray-500" : "text-gray-300"}`}>
                  <p>{image.name}</p>
                  <EditOutlined />
                  <button onClick={() => setImage(null)}><DeleteOutlineOutlined /></button>
                </div>
              )}
            </div>
          )}
        </Dropzone>
      )}

      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsImage(!isImage)}
          className={`flex items-center space-x-1 ${mode === "light" ? "text-gray-600" : "text-gray-300"} hover:text-blue-600`}
        >
          <ImageOutlined />
          <span>Image</span>
        </button>
        <button
          disabled={!caption}
          onClick={handlePost}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post"}
        </button>
      </div>
    </div>
  );
}

export default PostBlock;
