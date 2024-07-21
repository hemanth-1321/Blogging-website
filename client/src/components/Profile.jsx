import React, { useEffect, useState } from "react";
import { LeftHome } from "./LeftHome";
import axiosInstance from "../axiosConfig";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
export const Profile = ({ username }) => {
  //start from here
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get(`/profile/stan`);
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        toast.error("Unexpected Error");
      }
    };

    fetchUsers();
  }, [username]);

  return (
    <div className="flex">
      <ToastContainer />
      <LeftHome />
      <button>Edit Profile</button>
      <div className="bg-black text-white flex-grow max-w-[35%]">
        {profile ? (
          <div className="relative">
            <div className="relative h-48">
              <p>{profile.username}</p>
              <img
                src={profile.coverImg}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <img
                src={profile.profileImg}
                alt="Profile"
                className="w-24 h-24 rounded-full absolute left-[10%] transform -translate-x-1/2 -translate-y-1/2 border-4 border-black"
                style={{ bottom: "-50%" }}
              />
            </div>
            <div className="mt-12 text-start p-4">
              <h1 className="text-xl font-bold">{profile.username}</h1>
              <p className="text-gray-700">{profile.email}</p>
              <div className="mt-4">
                <p>{profile.bio}</p>
                {/* <p className="text-gray-700 text-sm">
                  Since {format(new Date(profile.createdAt), "MMMM, dd, yyyy")}
                </p> */}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};
