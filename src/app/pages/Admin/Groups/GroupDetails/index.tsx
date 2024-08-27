/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useParams } from "react-router-dom";
import { AdminDashboardProps } from "../../Dashboard/types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchingSingleGroup } from "../slice";
import { selectSingleGroup } from "../slice/selectors";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function GroupDetails({ minimized }: AdminDashboardProps) {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const SingleGroup = useSelector(selectSingleGroup);

  useEffect(() => {
    if (id) {
      dispatch<any>(fetchingSingleGroup(id));
    }
  }, [dispatch, id]);

  return (
    <div
      className={`w-full ${
        minimized ? "lg:w-[90%]" : "lg:w-[80%]"
      } items-center h-screen mt-16 right-0 fixed transition-all duration-500 ease-in overflow-scroll p-4`}
    >
      <div className="p-4">
        <div className="flex items-start gap-10">
          <Link
            to="/admin/groups"
            className="p-1 rounded-md hover:bg-slate-950 hover:text-white"
          >
            <IoReturnUpBackOutline size={24} />
          </Link>
          <h1 className="text-2xl font-bold mb-4">
            {SingleGroup?.groupName} Members
          </h1>
        </div>

        <table className="table-auto text-sm w-full">
          <thead>
            <tr>
              <th className="px-4 py-2">No</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Phone Number</th>
              <th className="px-4 py-2">Address</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Housing Location</th>
            </tr>
          </thead>
          <tbody>
            {SingleGroup?.members?.map((member: any, index: number) => (
              <tr
                key={member._id}
                className="hover:bg-[#EFEFEF] cursor-pointer"
              >
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{member.name}</td>
                <td className="border px-4 py-2">{member.email}</td>
                <td className="border px-4 py-2">{member.phoneNumber}</td>
                <td className="border px-4 py-2">{member.address}</td>
                <td className="border px-4 py-2">{member.category}</td>
                <td className="border px-4 py-2">{member.housingLocation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
