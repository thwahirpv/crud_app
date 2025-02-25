import React, { useContext, useState } from "react";
import defaut_user from "../../assets/images/user.png";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { api } from "../../utils/api";
import axios from "axios";
import { ACCESS_TOKEN, BASE_URL, PROFILE } from "../../constants/token";
import ClipLoader from "react-spinners/ClipLoader";
import { ContextProvider } from "../../context/Context";

const UploadProfile = () => {
  const [image, setImage] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [profile_pic, setProfile_pic] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setProfile } = useContext(ContextProvider)

  const handleProfile = (e) => {
    const file = e.target.files[0];
    setProfile_pic(file);
    if (file) {
      const validTypes = ["image/svg+xml", "image/png", "image/jpeg"];
      if (validTypes.includes(file.type)) {
        setProfileError(null);
        const fileUrl = URL.createObjectURL(file);
        setImage(fileUrl);
      } else {
        setProfileError("Only SVG, PNG, and JPG files are allowed.");
        setImage(null);
      }
    }
  };

  const handleProfileUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("profile", profile_pic);

    try {
      const res = await axios.put(`${BASE_URL}profile-upload/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem(ACCESS_TOKEN)}`,
        },
      });
      setProfile(res.data.profile)
      localStorage.setItem(PROFILE, res.data.profile)
      setLoading(false);
      setImage(null)
      setProfileError(null)
      console.log(res)
    } catch (error) {
      console.log(error)
      setLoading(false);
      setProfileError(error.response?.data?.detail || "Failed to upload profile!")
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {image ? (
          <div className="">
            <div className="relative flex flex-col items-center mt-10">
              <img className="w-[150px] rounded" src={image} alt="" />
              {loading && (
                <div className="absolute top-0 bottom-0 left-0 right-0 bg-white bg-opacity-50 flex items-center justify-center">
                  <ClipLoader color="#0f172a" loading={loading} />
                </div>
              )}
            </div>
            <div className="flex justify-between items-center">
              <button
                onClick={handleProfileUpload}
                className="py-2 px-3 rounded text-green-500"
              >
                <IoMdCheckmark size={25} />
              </button>
              <button
                onClick={() => setImage(null)}
                className="py-2 px-3 rounded text-red-500"
              >
                <RxCross2 size={25} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <label className="text-sm bg-sky-400 hover:bg-sky-500 py-2 px-5 font-semibold rounded">
              <input type="file" className="hidden" onChange={handleProfile} />
              Upload File
            </label>
            <p
              className={`mt-1 text-sm ${
                profileError ? "text-red-500" : "text-slate-600"
              }`}
            >
              {profileError ? profileError : "SVG, PNG, JPG."}
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default UploadProfile;
