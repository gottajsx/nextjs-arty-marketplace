"use client";

import {
  ArrowBackIosNew,
  ArrowForwardIos,
  Delete,
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const WorkCard = ({ work }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  const { data: session, update } = useSession();
  const userId = session?.user?._id;
  const wishlist = session?.user?.wishlist;
  const isLiked = wishlist?.find((item) => item?._id === work._id);

  const goToNextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % work.workPhotoPaths.length);
  };

  const goToPrevSlide = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + work.workPhotoPaths.length) % work.workPhotoPaths.length
    );
  };

  const handleDelete = async () => {
    const hasConfirmed = confirm("Are you sure you want to delete this work?");
    if (hasConfirmed) {
      try {
        await fetch(`api/work/${work._id}`, {
          method: "DELETE",
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const patchWishlist = async () => {
    if (!session) return router.push("/login");
    const response = await fetch(`api/user/${userId}/wishlist/${work._id}`, {
      method: "PATCH",
    });
    const data = await response.json();
    update({ user: { wishlist: data.wishlist } });
  };

  return (
    <div
      className="relative bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition duration-300 cursor-pointer max-w-sm mx-auto"
      onClick={() => router.push(`/work-details?id=${work._id}`)}
    >
      {/* SLIDER */}
      <div className="relative overflow-hidden h-60">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {work.workPhotoPaths.map((photo, index) => (
            <div key={index} className="min-w-full h-60 relative">
              <img
                src={photo}
                alt="work"
                className="object-cover w-full h-full"
              />
              <div
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevSlide();
                }}
              >
                <ArrowBackIosNew sx={{ fontSize: "16px" }} />
              </div>
              <div
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-white p-1 rounded-full shadow cursor-pointer z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNextSlide();
                }}
              >
                <ArrowForwardIos sx={{ fontSize: "16px" }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INFO */}
      <div className="p-4 flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-1">
            {work.title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <img
              src={work.creator.profileImagePath}
              alt="creator"
              className="w-6 h-6 rounded-full object-cover"
            />
            <span>{work.creator.username}</span>
            <span className="text-gray-400">in</span>
            <span className="text-blue-600 font-medium">{work.category}</span>
          </div>
        </div>
        <div className="text-right font-bold text-blue-700">${work.price}</div>
      </div>

      {/* ICON (Delete or Like) */}
      <div
        className="absolute top-3 right-3 z-20"
        onClick={(e) => {
          e.stopPropagation();
          userId === work.creator._id ? handleDelete() : patchWishlist();
        }}
      >
        {userId === work.creator._id ? (
          <Delete
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
            }}
          />
        ) : isLiked ? (
          <Favorite
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              color: "red",
              padding: "5px",
              fontSize: "30px",
            }}
          />
        ) : (
          <FavoriteBorder
            sx={{
              borderRadius: "50%",
              backgroundColor: "white",
              padding: "5px",
              fontSize: "30px",
            }}
          />
        )}
      </div>
    </div>
  );
};

export default WorkCard;