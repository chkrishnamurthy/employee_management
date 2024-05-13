import { useEffect, useState } from "react";
import Profile from "./components/Profile";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [editEmployee, setEditEmployee] = useState(null);

  useEffect(() => {
    const employees = JSON.parse(localStorage.getItem("employees"));
    if (employees) {
      setEmployees(employees);
    }
  }, []);

  const editOpenPopUp = (employee) => {
    setShowPopup(true);
    setEditEmployee(employee);
  };

  return (
    <>
      <div className="flex justify-end pr-14 mt-4">
        <button
          type="button"
          onClick={() => setShowPopup(!showPopup)}
          className="text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
          Create Employee
        </button>
      </div>
      <div className="text-3xl font- border-2 flex w-full m-auto p-4">
        <div className="h-screen border w-1/2 p-4">
          <List
            employees={employees}
            setEmployees={setEmployees}
            editOpenPopUp={editOpenPopUp}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div>

        <div className="h-screen border w-1/2 p-4">
          <Profile selectedEmployee={selectedEmployee} />
        </div>
      </div>

      {showPopup && (
        <Form
          setShowPopup={setShowPopup}
          employees={employees}
          setEmployees={setEmployees}
          editEmployee={editEmployee}
          setEditEmployee={setEditEmployee}
        />
      )}
    </>
  );
}
