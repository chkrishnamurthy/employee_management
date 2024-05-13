import { CgCloseR } from "react-icons/cg";
import { useEffect, useState } from "react";
import React from "react";
import shortid from "shortid";

const Form = (props) => {
  const {
    setShowPopup,
    employees,
    setEmployees,
    editEmployee,
    setEditEmployee,
  } = props;
  const [validationError, setValidationError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    gender: "male",
    image: "",
  });

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
    }
  }, [editEmployee]);

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    return;

    // setEmployees((prev) => [...prev, data]);

    // // clear all input fields
    // e.target.name.value = "";
    // e.target.email.value = "";
    // e.target.phone.value = "";
    // e.target.address.value = "";
    // e.target.dob.value = "";
    // e.target.image.value = "";

    // // store in local storage
    // localStorage.setItem("employees", JSON.stringify([...employees, data]));

    // setShowPopup(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.dob) {
      setValidationError(true);
      return;
    }

    const data = {
      ...formData,
      id: shortid.generate(),
    };
    setEmployees([...employees, data]);

    let getExistingLocalStorage = JSON.parse(localStorage.getItem("employees"));

    if (getExistingLocalStorage) {
      localStorage.setItem(
        "employees",
        JSON.stringify([...getExistingLocalStorage, data])
      );
      setEmployees([...getExistingLocalStorage, data]);
    } else {
      localStorage.setItem("employees", JSON.stringify([data]));
      setEmployees([data]);
    }

    setShowPopup(false);
  };

  const validator = () => {
    if (!formData.name || !formData.email || !formData.dob || !formData.phone) {
      return true;
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.dob) {
      setValidationError(true);
      return;
    }
    let getExistingLocalStorage = JSON.parse(localStorage.getItem("employees"));

    let updatedEmployees = getExistingLocalStorage.map((employee) => {
      if (employee.id === formData.id) {
        return formData;
      }
      return employee;
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    setEmployees(updatedEmployees);
    setShowPopup(false);
    setEditEmployee(null);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 animate-slideIn">
      <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-8 rounded-lg w-1/3">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">
              {" "}
              {editEmployee ? "Update Employee Information" : "Create Employee"}
            </h2>
            <CgCloseR
              onClick={() => {
                setShowPopup(false);
                setEditEmployee(null);
              }}
              className="bold cursor-pointer hover:text-red-500 h-6 w-6 fill-current text-red-500"
            />
          </div>
          <h3>
            {validationError && validator() && (
              <span className="text-red-500">Please fill all fields</span>
            )}
          </h3>
          <form className="mt-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="dob"
                className="block text-sm font-medium text-gray-700"
              >
                DOB
                <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                id="dob"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="gender"
                className="block text-sm font-medium text-gray-700"
              >
                Gender<span className="text-red-500">*</span>
              </label>

              <div className="flex w-full mt-2">
                <div
                  onChange={(e) => {
                    setFormData({ ...formData, gender: "male" });
                  }}
                  className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 w-1/2"
                >
                  <input
                    id="bordered-radio-1"
                    type="radio"
                    defaultChecked={formData.gender === "male"}
                    name="gender"
                    className="w-4 h-4 text-blue-600 outline-none bg-gray-100 border-gray-300 cursor-pointer"
                  />
                  <label
                    htmlFor="bordered-radio-1"
                    className="w-full py-4 ms-2 text-sm font-medium cursor-pointer"
                  >
                    Male
                  </label>
                </div>
                <div
                  onChange={(e) => {
                    setFormData({ ...formData, gender: "female" });
                  }}
                  className="flex items-center ps-4 border border-gray-200 rounded dark:border-gray-700 w-1/2"
                >
                  <input
                    id="bordered-radio-2"
                    type="radio"
                    name="gender"
                    defaultChecked={formData.gender === "female"}
                    className="h-4 outline-none text-blue-600 bg-gray-100 border-gray-300 "
                  />
                  <label
                    htmlFor="bordered-radio-2"
                    className="w-full py-4 ms-2 text-sm font-medium cursor-pointer"
                  >
                    Female
                  </label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                required
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Address
              </label>
              <input
                type="text"
                name="address"
                id="address"
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-700"
              >
                Profile Image (Optional)
              </label>
              <input
                type="text"
                name="image"
                id="image"
                placeholder="Place image url here..."
                className="mt-1 p-2 border border-gray-300 rounded w-full"
                value={formData.image}
                onChange={handleChange}
              />
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                onClick={editEmployee ? handleEditSubmit : handleSubmit}
              >
                {editEmployee ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
