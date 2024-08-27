import axios from "axios";
import { BASE_URL, getUserInfo } from "../utils/constants";
import { ILoginProps, IRegisterMember } from "./types";

const userInfo = getUserInfo();

async function registerNewMember(membersData: IRegisterMember) {
  try {
    // Retrieve token from localStorage
    const Token = userInfo ? userInfo.token : null;

    // Include token in request headers
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    // Make the API call to register the user
    const response = await axios.post(
      `${BASE_URL}api/member/new`,
      membersData,
      config
    );

    // Return the data
    return response.data;
  } catch (error) {
    console.error("Error registering Member:", error);
    throw error;
  }
}

// User Logging
async function loginUser({ phoneNumber, password }: ILoginProps) {
  try {
    const response = await axios.post(`${BASE_URL}user/login`, {
      phoneNumber,
      password,
    });

    const { token, user } = response.data;

    const userInfo = {
      token,
      user: { ...user, password: undefined },
    };

    // Store userInfo in localStorage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// Update Password
async function updateUserPassword(
  currentPassword: string,
  newPassword: string,
  id: string
) {
  try {
    // Retrieve token from localStorage
    const token = userInfo.token;

    // Include token in request headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the API call to update the password
    const response = await axios.put(
      `${BASE_URL}user/changepassword/${id}`,
      {
        currentPassword,
        newPassword,
      },
      config
    );

    // Return the data
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
}

// Get All Groups
async function fetchAllGroups() {
  try {
    // Retrieve token from localStorage
    const Token = userInfo ? userInfo.token : null;

    // Include token in request headers
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}api/groups`, config);

    return response.data;
  } catch (error) {
    console.error("Error Getting All Groups:", error);
    throw error;
  }
}

// Get Single Group
async function fetchSingleGroup(id: string) {
  try {
    // Retrieve token from localStorage
    const Token = userInfo ? userInfo.token : null;

    // Include token in request headers
    const config = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
    };

    const response = await axios.get(`${BASE_URL}api/groups/${id}`, config);

    return response.data;
  } catch (error) {
    console.error("Error Getting Single Groups:", error);
    throw error;
  }
}

export {
  registerNewMember,
  loginUser,
  updateUserPassword,
  fetchAllGroups,
  fetchSingleGroup,
};
