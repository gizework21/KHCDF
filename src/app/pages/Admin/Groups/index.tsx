/* eslint-disable @typescript-eslint/no-explicit-any */
import { AdminDashboardProps } from "../Dashboard/types";
import { IoLocation } from "react-icons/io5";
import { selectAllGroups } from "./slice/selectors";
import { useDispatch, useSelector } from "react-redux";
import { fetchingAllGroupsThunk } from "./slice";
import { useEffect } from "react";
import { MdGroups } from "react-icons/md";
import { Link } from "react-router-dom";

function Groups({ minimized }: AdminDashboardProps) {
  const dispatch = useDispatch();
  const AllGroups = useSelector(selectAllGroups);

  useEffect(() => {
    dispatch<any>(fetchingAllGroupsThunk());
  }, [dispatch]);
  return (
    <div
      className={`w-full ${
        minimized ? "lg:w-[90%]" : "lg:w-[80%]"
      } items-center h-screen mt-16 right-0 fixed transition-all duration-500 ease-in overflow-scroll p-4`}
    >
      <h1 className="text-2xl font-bold mb-4">Groups</h1>

      <div className="flex items-center sm:justify-between sm:px-10 flex-col sm:flex-row gap-5 flex-wrap">
        {AllGroups.map((group) => (
          <Link to={group._id}>
            <div key={group._id} className="border-b pb-4 w-1/3">
              <div className="cursor-pointer p-2 bg-gray-200 rounded-md hover:bg-gray-300 h-24 w-60 flex">
                <div className="text-lg font-semibold flex flex-col justify-between w-full">
                  <div className="w-full flex justify-between items-start h-20">
                    <p className="flex justify-center items-center gap-1 text-[#D7A022]">
                      <MdGroups />
                      {group.groupName}
                    </p>

                    <div className="flex justify-center items-center gap-2 text-sm ">
                      <IoLocation />

                      <div className="flex flex-col items- h-full">
                        <p>{group.category}</p>
                        <p>{group.housingLocation}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm">{group.members.length} members</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Groups;
