import React, { useRef, useState, useEffect } from "react";
import { FaEye, FaEyeSlash, FaCopy } from "react-icons/fa";
import { MdEdit, MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const passwordRef = useRef();
  const [showPass, setshowPass] = useState(false);
  const [form, setform] = useState({ url: "", username: "", password: "" });
  const [userCredential, setuserCredential] = useState([]);
  const getCredentials = async () => {
    const response = await fetch("http://localhost:3000/");
    const data = await response.json();
    setuserCredential(data);
  };
  useEffect(() => {
    getCredentials();
    // const data = localStorage.getItem("userCredential");
    // if (data) {
    //   setuserCredential(JSON.parse(data));
    // }
  }, []);

  const showPassword = (params) => {
    setshowPass(!showPass);
  };
  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    if (
      form.url.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      toast("Credentials Saved.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setuserCredential([...userCredential, { ...form, id: uuidv4() }]);
      // localStorage.setItem(
      //   "userCredential",
      //   JSON.stringify([...userCredential, {...form, id: uuidv4()}])
      // );
      // await fetch("http://localhost:3000", {
      //   method: "DELETE",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ id:form.id }),
      // });

      await fetch("http://localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, id: uuidv4() }),
      });
    } else {
      toast("Invalid Credentials", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    //console.log([...userCredential, {...form, id: uuidv4()}]);
  };

  const deleteUser = async (index) => {
    console.log(index);
    const filteredData = userCredential.filter((user, i) => user.id !== index);
    setuserCredential(filteredData);
    await fetch("http://localhost:3000", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id:index }),
    });

    //localStorage.setItem("userCredential",JSON.stringify(filteredData));
    toast("Credential Deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const editUser =async (id) => {
    
    setform({...userCredential.filter((user) => user.id == id)[0],id:id});
    console.log({...userCredential.filter((user) => user.id == id)[0],id:id})
    const filteredData = userCredential.filter((user, i) => user.id !== id);
    setuserCredential(filteredData);
    await fetch("http://localhost:3000", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    //localStorage.setItem("userCredential", JSON.stringify(filteredData));
  };
  const copyData = (data) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(data);
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-[-2] rotate-180 transform bg-white bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          <div className="heading text-center mb-8">
            <h1 className="text-3xl sm:text-4xl">PassVault</h1>
            <h2 className="text-xl sm:text-2xl">Your Own Password Manager</h2>
          </div>
          <div className="flex flex-col gap-6 sm:gap-12 items-center">
            <div className="relative w-full sm:w-auto">
              <input
                className="bg-white border-2 border-green-500 rounded-full px-4 py-1 text-black w-full sm:w-[400px] mx-auto"
                type="text"
                placeholder="Enter Website Url"
                value={form.url}
                name="url"
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center w-full sm:w-auto">
              <div className="relative w-full sm:w-auto">
                <input
                  className="bg-white border-2 border-green-500 rounded-full px-4 py-1 text-black w-full sm:w-[200px]"
                  type="text"
                  placeholder="Enter Username"
                  value={form.username}
                  name="username"
                  onChange={handleChange}
                />
              </div>
              <div className="relative w-full sm:w-auto">
                <input
                  className="bg-white border-2 border-green-500 rounded-full px-4 py-1 text-black w-full sm:w-[200px]"
                  type={showPass ? "text" : "password"}
                  name="password"
                  id=""
                  placeholder="Enter Password"
                  ref={passwordRef}
                  value={form.password}
                  onChange={handleChange}
                />
                <span
                  className="absolute right-2 top-0 h-full flex items-center justify-center cursor-pointer"
                  onClick={showPassword}
                >
                  {showPass ? <FaEye size={20} /> : <FaEyeSlash size={20} />}
                </span>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="flex justify-center items-center gap-2 bg-green-500 rounded-full w-full sm:w-fit px-4 py-2 hover:bg-green-400 border-2 border-x-green-800"
            >
              <lord-icon
                src="https://cdn.lordicon.com/jgnvfzqg.json"
                trigger="hover"
              ></lord-icon>
              Add Credential
            </button>
          </div>
          {userCredential.length == 0 && (
            <div className="text-center text-gray-500">
              No Username and Password to show
            </div>
          )}
          {userCredential.length > 0 && (
            <div className="relative overflow-x-auto mt-5 w-full">
              <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-green-500">
                  <tr>
                    <th scope="col" className="px-3 sm:px-6 py-3">
                      URL
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3">
                      Username
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3">
                      Password
                    </th>
                    <th scope="col" className="px-3 sm:px-6 py-3">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userCredential.map((user, index) => {
                    return (
                      <tr
                        key={index}
                        className="bg-green-50 border-b text-slate-600 border-gray-200"
                      >
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex gap-2 items-center">
                            <span className="truncate max-w-[150px] sm:max-w-[200px]">
                              {user.url}
                            </span>
                            <FaCopy
                              className="cursor-pointer flex-shrink-0"
                              onClick={() => {
                                copyData(user.url);
                              }}
                              size={15}
                            />
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex gap-2 items-center">
                            <span className="truncate max-w-[100px] sm:max-w-[150px]">
                              {user.username}
                            </span>
                            <FaCopy
                              className="cursor-pointer flex-shrink-0"
                              onClick={() => copyData(user.username)}
                              size={15}
                            />
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex gap-2 items-center">
                            <span className="truncate max-w-[100px] sm:max-w-[150px]">
                              {user.password}
                            </span>
                            <FaCopy
                              className="cursor-pointer flex-shrink-0"
                              onClick={() => copyData(user.password)}
                              size={15}
                            />
                          </div>
                        </td>
                        <td className="px-3 sm:px-6 py-4">
                          <div className="flex gap-4 sm:gap-8 items-center">
                            <MdEdit
                              className="cursor-pointer"
                              size={20}
                              onClick={() => editUser(user.id)}
                            />
                            <MdDelete
                              className="cursor-pointer"
                              onClick={() => deleteUser(user.id)}
                              size={20}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
