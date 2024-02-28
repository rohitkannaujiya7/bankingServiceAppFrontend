import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
const Register = () => {
  const [registerData, setRegisterData] = useState({
    userName: "",
    fullName: "",
    password: "",
    roles: "ROLE_USER",
  });

  let name, value;
  const handleRegisterInputChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setRegisterData({ ...registerData, [name]: value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(registerData);

    try {
      const response = await axios.post(
        "http://localhost:8083/api/customer/register",
        registerData
      );
      const data = await response.data;
      console.log(response.status);

      if (response.status === 200) {
        navigate("/");
      } else if (response.status === 403) {
        console.log("Already Exists");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("User Already Exists");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-lg">
            <h1 className="text-center text-2xl font-bold text-indigo-600 sm:text-3xl">
              Register
            </h1>
            <form
              onSubmit={handleSubmit}
              className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 lg:p-8"
            >
              <div>
                <label for="Username" className="sr-only">
                  Username
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="userName"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Username"
                    value={registerData.userName}
                    onChange={handleRegisterInputChange}
                  />
                </div>
              </div>
              <div>
                <label for="Fullname" className="sr-only">
                  Fullname
                </label>

                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter Fullname"
                    value={registerData.fullName}
                    onChange={handleRegisterInputChange}
                  />
                </div>
              </div>

              <div>
                <label for="password" className="sr-only">
                  Password
                </label>

                <div className="relative">
                  <input
                    type="password"
                    name="password"
                    className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                    placeholder="Enter password"
                    value={registerData.password}
                    onChange={handleRegisterInputChange}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
              >
                Register
              </button>

              <p className="text-center text-sm text-gray-500">
                Already Have an Customer Account?
                <Link className="underline text-indigo-600" to="/">
                  Login Here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
