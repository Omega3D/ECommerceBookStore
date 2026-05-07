import LoginDto from "../DTOs/BookDto/Auth/LoginDto";
import RegisterDto from "../DTOs/BookDto/Auth/RegisterDto";
import toast from "react-hot-toast";

const BASE_URL = "https://localhost:7107/api/Account";

export const register = async (registerDto: RegisterDto) => {
  const url = new URL(`${BASE_URL}/register`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerDto),
  });

  if (!response.ok) {
    const error = await response.json();
    toast.error(error.message);
    throw new Error(error.message);
  }
};

export const login = async (loginDto: LoginDto) => {
  const url = new URL(`${BASE_URL}/login`);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginDto),
  });

  if (!response.ok) {
    const error = await response.json();
    toast.error(error.message);
    throw new Error(error.message);
  }

  return await response.json();
}