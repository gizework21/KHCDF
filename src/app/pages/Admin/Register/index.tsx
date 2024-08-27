/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { AdminDashboardProps } from "../Dashboard/types";
import { useDispatch } from "react-redux";
import { registerMemberThunk } from "./slice";
import { CgSpinner } from "react-icons/cg";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FormData } from "./types";

const DiasporaSubCategories = [
  "DownTown",
  "MidTown",
  "SubUrban",
  "SingleFamily",
  "Commercial",
];
const singleFamilySubCategories = ["Luxury", "Medium", "Fair"];

const singleFamilySubSubCategories = ["Luxury", "Medium", "Fair"];

const commercialSubCategories = [
  "ApartmentBureaus",
  "CondominiumMall",
  "MixedUseBuildings",
  "RecreationalCenters",
];

const commercialSubSubCategories = [
  "ApartmentBureaus",
  "CondominiumMall",
  "MixedUseBuildings",
  "RecreationalCenters",
];

const categories = [
  "Diaspora",
  "SingleFamily",
  "DownTown",
  "MidTown",
  "SubUrban",
  "Commercial",
];
const housingLocations = {
  DownTown: [
    "AddisAbaba",
    "Adama", // Adama is relatively close to Addis Ababa and can be considered suburban
    "Diredawa", // Also relatively close, similar to Adama
    "Asosa", // More distant, but still fits the suburban classification
    "Gambela", // Outlying city, fits the suburban category
    "Arbaminch", // Suburban city
    "Nekeme", // Suburban city
    "Bole",
    "22",
    "4 Killo",
    "Megenagan",
    "Mexico",
    "Sar Bet",
    "Mekanissa",
    "6 Killo",
    "Merkato",
    "Piassa",
  ],
  MidTown: [
    "Debre Birhan", // Suburban city located outside the main urban area
    "Ambo", // Suburban city
    "Sodo", // Suburban city
    "Waliso", // Suburban city
    "Asela", // Suburban city
    "Bahirdar", // Suburban city
    "Hawassa", //
    "Bulbula",
    "Kotebe",
    "Semit",
    "Mekanissa",
    "Lebu",
    "Lafto",
    "Tor Hailoch",
    "Kolfe",
    "Lideta",
    "Saris",
    "Ferensay",
    "Enkulal Fabrika",
  ],
  SubUrban: [
    "Jimma", // Suburban city
    "Lalibela", // Suburban city
    "Jimma", // Suburban city
    "Shire", // Suburban city
    "Zeway", // Suburban city
    "Abado",
    "Hayat",
    "Arabssa",
    "Kara",
    "Shiromeda",
    "Wingate",
    "Bethel",
    "Akaki",
    "Kality",
    "Goro",
    "Hana Mariam",
  ],
};

const AllHousingLocations = [
  ...housingLocations.DownTown,
  ...housingLocations.MidTown,
  ...housingLocations.SubUrban,
];

function Register({ minimized }: AdminDashboardProps) {
  const dispatch = useDispatch();
  const [activeForm, setActiveForm] = useState("members");
  const [formData, setFormData] = useState<FormData>({});

  const [loading, setLoading] = useState(false);
  const [filteredHousingLocations, setFilteredHousingLocations] = useState<
    string[]
  >(housingLocations["DownTown"]);
  const [isDiaspora, setIsDiaspora] = useState(false);
  const [isSingleFamily, setIsSingleFamily] = useState(false);
  const [isCommercial, setIsCommercial] = useState(false);

  const [filteredSubSubCategories, setFilteredSubSubCategories] = useState<
    string[]
  >([]);

  const [filteredSubCategories, setFilteredSubCategories] = useState<string[]>(
    []
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "category") {
      if (["DownTown", "MidTown", "SubUrban"].includes(value)) {
        setFilteredHousingLocations(
          housingLocations[value as keyof typeof housingLocations]
        );
      } else if (value === "SingleFamily") {
        setFilteredHousingLocations(AllHousingLocations);
      } else if (value === "Commercial") {
        setFilteredHousingLocations(AllHousingLocations);

        setFilteredSubCategories(commercialSubCategories);
      } else {
        setFilteredHousingLocations([]);
      }

      setIsDiaspora(value === "Diaspora");
      setIsSingleFamily(value === "SingleFamily");
      setIsCommercial(value === "Commercial");

      // Clear sub-sub categories
      setFilteredSubSubCategories([]);
    }

    if (name === "subCategory") {
      if (value === "SingleFamily") {
        setFilteredSubSubCategories(singleFamilySubSubCategories);

        setFilteredHousingLocations(AllHousingLocations);
      } else if (["DownTown", "MidTown", "SubUrban"].includes(value)) {
        setFilteredSubSubCategories([]);

        setFilteredHousingLocations(
          housingLocations[value as keyof typeof housingLocations]
        );
      } else if (value === "Commercial") {
        setFilteredSubSubCategories(commercialSubSubCategories);

        setFilteredHousingLocations(AllHousingLocations);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (activeForm === "members") {
        await dispatch<any>(registerMemberThunk(formData));
        // Show success toast
        toast.success("Member registration successful!");
        setLoading(false);
      } else if (activeForm === "collectiveHouses") {
        // Handle collective house registration
        // await dispatch<any>(registerCollectiveHouseThunk(formData));
        // Show success toast
        // toast.success("Collective house registration successful!");
        // setLoading(false);
      }
    } catch (error) {
      // Handle error
      console.error("Error registering:", error);
      toast.error("Failed to Register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer autoClose={3000} hideProgressBar position="top-center" />

      <div
        className={`w-full ${
          minimized ? "lg:w-[90%]" : "lg:w-[80%]"
        } items-center h-screen mt-16 right-0 fixed transition-all duration-500 ease-in overflow-auto md:px-20`}
      >
        <div className="flex w-full gap-5 justify-around items-center p-2">
          <div
            className={`border border-black p-2 cursor-pointer w-60 text-center rounded-md text-sm sm:text-base ${
              activeForm === "members"
                ? "bg-slate-950 text-white"
                : "hover:bg-slate-950 hover:text-white"
            }`}
            onClick={() => setActiveForm("members")}
          >
            Register Members
          </div>

          <div
            className={`border border-black p-2 cursor-pointer w-60 text-center rounded-md text-sm sm:text-base ${
              activeForm === "collectiveHouse"
                ? "bg-slate-950 text-white"
                : "hover:bg-slate-950 hover:text-white"
            }`}
            onClick={() => setActiveForm("collectiveHouse")}
          >
            Register Collective Houses
          </div>
        </div>

        {activeForm === "members" && (
          <form
            className="w-full px-5 pb-5 border border-gray-300 rounded-md flex flex-col sm:gap-10 mb-20"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-between sm:gap-5">
              <h2 className="text-lg font-bold sm:mb-4 mb-3 text-center">
                Member Registration
              </h2>

              <div className="flex flex-wrap justify-between w-full">
                <div className="sm:mb-4 mb-3 w-full sm:w-[40%]">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="sm:mb-4 mb-3 w-full sm:w-[40%]">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="sm:mb-4 mb-3 w-full sm:w-[40%]">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="sm:mb-4 mb-3 w-full sm:w-[40%]">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Password
                  </label>
                  <input
                    type="text"
                    name="password"
                    placeholder="Password"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  />
                </div>

                <div className="sm:mb-4 mb-3 w-full sm:w-[40%]">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-4 w-full">
                <div className="sm:mb-4 mb-3 w-36 sm:w-40">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      Select
                    </option>

                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category.replace(/([A-Z])/g, " $1").trim()}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:mb-4 mb-3 w-36 sm:w-40">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Sub Category
                  </label>
                  <select
                    name="subCategory"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                    disabled={!isDiaspora && !isSingleFamily && !isCommercial}
                  >
                    <option value="" disabled selected>
                      {isDiaspora || isSingleFamily || isCommercial
                        ? "Select"
                        : "No Sub Category"}
                    </option>
                    {isDiaspora &&
                      DiasporaSubCategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory.replace(/([A-Z])/g, " $1").trim()}
                        </option>
                      ))}

                    {isSingleFamily &&
                      singleFamilySubCategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory}
                        </option>
                      ))}

                    {isCommercial &&
                      filteredSubCategories.map((subCategory) => (
                        <option key={subCategory} value={subCategory}>
                          {subCategory.replace(/([A-Z])/g, " $1").trim()}
                        </option>
                      ))}
                  </select>
                </div>

                {filteredSubSubCategories.length > 0 && (
                  <div className="sm:mb-4 mb-3 w-36 sm:w-40">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Sub-Sub Category
                    </label>
                    <select
                      name="subSubCategory"
                      className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                      onChange={handleInputChange}
                    >
                      <option value="" disabled selected>
                        Select
                      </option>

                      {filteredSubSubCategories.map((subSubCategory) => (
                        <option key={subSubCategory} value={subSubCategory}>
                          {subSubCategory.replace(/([A-Z])/g, " $1").trim()}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="sm:mb-4 mb-3 w-36 sm:w-40">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Housing Location
                  </label>
                  <select
                    name="housingLocation"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  >
                    <option value="" disabled selected>
                      {filteredHousingLocations.length === 0
                        ? "No Location"
                        : "Select Location"}
                    </option>

                    {filteredHousingLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-slate-950 hover:opacity-80 text-white font-bold w-1/3 mx-auto py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              {loading ? (
                <CgSpinner size={28} className="animate-spin" />
              ) : (
                "Register"
              )}
            </button>
          </form>
        )}

        {activeForm === "collectiveHouse" && (
          <form
            className="w-full p-5 border border-gray-300 rounded-md mt-5 flex flex-col gap-10"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col justify-between gap-5">
              <h2 className="text-lg font-bold mb-4">
                Register Collective House
              </h2>
              <div className="flex flex-wrap justify-between w-full">
                <div className="mb-4 w-1/2 sm:w-1/4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Category
                  </label>
                  <select
                    name="category"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 w-1/2 sm:w-1/4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Housing Location
                  </label>
                  <select
                    name="housingLocation"
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 text-sm leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  >
                    {filteredHousingLocations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 w-1/2 sm:w-[40%]">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Area
                  </label>
                  <input
                    type="text"
                    name="area"
                    placeholder="Land Area"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="bg-slate-950 hover:opacity-80 text-white font-bold w-1/3 mx-auto py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Register
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default Register;
