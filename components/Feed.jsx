"use client";

import { categories } from "@data";
import WorkList from "./WorkList";
import { useEffect, useState } from "react";
import Loader from "./Loader";

const Feed = () => {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [workList, setWorkList] = useState([]);

  const getWorkList = async () => {
    const response = await fetch(`/api/work/list/${selectedCategory}`);
    const data = await response.json();
    setWorkList(data);
    setLoading(false);
  };

  useEffect(() => {
    getWorkList();
  }, [selectedCategory]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <div className="flex justify-center items-start flex-wrap gap-5 my-5">
        {categories?.map((item, index) => (
          <p
            key={index}
            onClick={() => setSelectedCategory(item)}
            className={`text-sm cursor-pointer transition duration-300 ease-in-out hover:opacity-80 ${
              item === selectedCategory ? "font-semibold text-blue-500" : ""
            }`}
          >
            {item}
          </p>
        ))}
      </div>

      <WorkList data={workList} />
    </>
  );
};

export default Feed;