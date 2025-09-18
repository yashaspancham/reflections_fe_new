"use client";

import { useEffect, useState } from "react";

const TaskPagesButton = ({ taskDetails }: any) => {
  const [loaded, setLoaded] = useState(false);
  let url: any;
  if (typeof window !== "undefined") {
    const fullUrl = window.location.href;
    url = fullUrl.split("?")[0];
  }
  useEffect(() => {
    setLoaded(true);
  }, []);
  return (
    loaded &&
    taskDetails &&
    Object.keys(taskDetails).length > 0 && (
      <div className="p-5">
        {taskDetails.prev_page && (
          <button
            onClick={() => {
              window.location.href = `${url}?${
                taskDetails.prev_page.split("?")[1]
              }`;
            }}
            className="p-2 bg-purple-900 rounded-lg hover:cursor-pointer text-white"
          >
            Prev
          </button>
        )}

        {[...Array(taskDetails.total_pages)].map((_, i) => (
          <button
            onClick={() => {
              if (taskDetails.current_page !== i + 1) {
                window.location.href = `${url}?page=${
                  i + 1
                }`;
                // console.log(`${url}?page=${i + 1}&${urlForSearchAndSort()}`);
              }
            }}
            className={`hover:cursor-pointer rounded-[50%] ${
              taskDetails.current_page === i + 1
                ? "text-white hover:bg-purple-800 bg-purple-900 p-1.5"
                : "p-2 text-purple-900 hover:bg-gray-100"
            }`}
            key={i}
          >
            {i + 1}
          </button>
        ))}
        {taskDetails.next_page && (
          <button
            onClick={() => {
              window.location.href = `${url}?${
                taskDetails.next_page.split("?")[1]
              }`;
            }}
            className="p-2 bg-purple-900 rounded-lg hover:cursor-pointer text-white"
          >
            Next
          </button>
        )}
      </div>
    )
  );
};
export default TaskPagesButton;
