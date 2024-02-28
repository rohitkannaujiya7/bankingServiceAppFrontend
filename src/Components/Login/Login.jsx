import { Link, useNavigate } from "react-router-dom";
import BankImage from "../../Images/Bank Image.jpg";
import { useState } from "react";
import axios from "axios";
const Login = () => {
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });

  let name, value;
  const handleLoginInputChange = (event) => {
    name = event.target.name;
    value = event.target.value;
    setLoginData({ ...loginData, [name]: value });
  };

  const navigate = useNavigate();
  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    // console.log(loginData);
    try {
      const response = await axios.post(
        "http://localhost:8083/api/customer/authenticate",
        loginData
      );
      const data = await response.data;
      console.log(data);
      if (response.status === 200) {
        localStorage.setItem("token", data);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("Username or Password Does Not Match");
      }
    }
  };

  return (
    <>
      <div className="w-full h-[100vh] flex justify-center items-center">
        <div className="container mx-auto">
          <div className="flex justify-center px-6 my-12">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg">
                <img src={BankImage} alt="" />
              </div>

              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <h3 className="pt-4 text-2xl text-center">Login</h3>
                <form
                  onSubmit={handleLoginSubmit}
                  className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
                >
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="username"
                    >
                      Username
                    </label>
                    <input
                      className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      name="userName"
                      placeholder="Username"
                      value={loginData.userName}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="block mb-2 text-sm font-bold text-gray-700"
                      for="password"
                    >
                      Password
                    </label>
                    <input
                      className="w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                      id="password"
                      type="password"
                      placeholder="*************"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginInputChange}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      className="mr-2 leading-tight"
                      type="checkbox"
                      id="checkbox_id"
                    />
                    <label className="text-sm" for="checkbox_id">
                      Remember Me
                    </label>
                  </div>
                  <div className="mb-6 text-center">
                    <button
                      className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                  <hr className="mb-6 border-t" />
                  <div className="text-center flex justify-center items-center gap-3">
                    <p>Not a Customer?</p>
                    <Link
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      to="/register"
                    >
                      Register Here
                    </Link>
                  </div>
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="#"
                    >
                      Forgot Password?
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
