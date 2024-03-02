import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";
import { User } from "@/types";

const API_BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export const useGetUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Fail to get the user");
    }
    return response.json();
  };
  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);
  if (error) {
    toast.error(error.toString());
  }
  return { currentUser, isLoading };
};

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};
export const useCreateMyUser = () => {
  console.log("abc");
  const { getAccessTokenSilently } = useAuth0();
  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to Create a User");
    }
    return response.json();
  };
  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);
  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

type UpdateUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

export const useUpdateUser = () => {
  const { getAccessTokenSilently } = useAuth0();
  const updateUserRequest = async (formData: UpdateUserRequest) => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      throw new Error("Failed to update user!");
    }
    return response.json();
  };
  const {
    mutateAsync: updateUser,
    isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation(updateUserRequest);

  if (isSuccess) {
    toast.success("User profile Updated!");
  }
  if (error) {
    toast.error(error.toString());
    reset();
  }
  return {
    updateUser,
    isLoading,
  };
};
