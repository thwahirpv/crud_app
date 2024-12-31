import React, { useState } from "react";
import defaut_user from "../../assets/images/user.png";
import { IoMdCheckmark } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const UploadProfile = () => {
  const [profile, setProfile] = useState(null);
  const [profileError, setProfileError] = useState(null);

  const handleProfile = (e) => {
    const file = e.target.files[0];
    console.log(file);

    if (file) {
      const validTypes = ["image/svg+xml", "image/png", "image/jpeg"];
      if (validTypes.includes(file.type)) {
        setProfileError(null);
        const fileUrl = URL.createObjectURL(file);
        setProfile(fileUrl);
        console.log(profile);
      } else {
        setProfileError("Only SVG, PNG, and JPG files are allowed.");
        setProfile(null);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        {profile ? (
          <div>
            <div className="flex flex-col items-center mt-10">
              <img className="w-[150px] rounded" src={profile} alt="" />
            </div>
            <div className="flex justify-between items-center">
              <button className="py-2 px-3 rounded text-green-500">
                <IoMdCheckmark size={25} />
              </button>
              <button
                onClick={() => setProfile(null)}
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
