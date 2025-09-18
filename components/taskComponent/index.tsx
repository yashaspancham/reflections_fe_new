import Image from "next/image";
import { getColorForTask } from "@/utils/getColorForTaskCard";

const TaskComponent = ({ item }: any) => {
  return (
    <div
      className={`p-4 ${getColorForTask(
        item.status,
        item.dueDate
      )} rounded-lg w-[200px] h-[200px] hover:cursor-pointer hover:shadow-md transition-shadow duration-300 ease-in-out flex flex-col`}
    >
      <p className="text-gray-900 h-[100px] max-h-[100px] overflow-hidden">
        {item.description}
      </p>
      <p className="text-xs text-gray-500">
        Created at: {new Date(item.createdAt).toLocaleDateString()}
      </p>
      <p className="text-xs text-gray-500">
        Updated at: {new Date(item.lastUpdated).toLocaleDateString()}
      </p>
      <p className="text-xs text-gray-500">
        finsish by: {new Date(item.dueDate).toLocaleDateString()}
      </p>
      <div className="flex gap-1 self-end mt-auto">
        <button className="hover:cursor-pointer hover:bg-gray-200 text-white w-fit p-1.5 rounded-lg">
          <Image
            src={"/icons/updateTask.png"}
            alt="edit Icon"
            width={20}
            height={20}
          />
        </button>
        {item.status !== "completed" && (
          <button className="hover:cursor-pointer hover:bg-green-100 text-white w-fit p-1.5 rounded-lg">
            <Image
              src={"/icons/doneLogo.png"}
              alt="Done Icon"
              width={30}
              height={30}
            />
          </button>
        )}
      </div>
    </div>
  );
};

export default TaskComponent;
