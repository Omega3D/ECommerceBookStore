import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { register } from "../api/AuthApi";
import type RegisterDto from "../DTOs/BookDto/Auth/RegisterDto";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password =
          "Password must be at least 6 characters";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword =
          "Confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword =
          "Passwords do not match";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  async function handleRegister(
      e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (!validate()) return;

    const registerData: RegisterDto = {
      fullName,
      email,
      password,
      confirmPassword,
      phoneNumber,
    };

    try {
      setLoading(true);

      await register(registerData);

      toast.success("Account created successfully!");

      navigate("/login");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="min-h-screen bg-linear-to-br from-slate-100 to-slate-200 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>
          </div>

          <form
              className="space-y-5"
              onSubmit={handleRegister}
          >
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Full Name
              </label>

              <input
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) =>
                      setFullName(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              {errors.fullName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.fullName}
                  </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Email
              </label>

              <input
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) =>
                      setEmail(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </p>
              )}
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Phone Number
              </label>

              <input
                  type="text"
                  placeholder="+380 XX XXX XX XX"
                  value={phoneNumber}
                  onChange={(e) =>
                      setPhoneNumber(e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />

              {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber}
                  </p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) =>
                        setPassword(e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Confirm Password
                </label>

                <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) =>
                        setConfirmPassword(e.target.value)
                    }
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                />

                {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                )}
              </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-xl transition shadow-lg hover:shadow-xl"
            >
              {loading
                  ? "Creating account..."
                  : "Create Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
                to="/login"
                className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
  );
};

export default RegisterPage;