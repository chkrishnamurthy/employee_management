import { MdOutlineEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import MaleAvatar from "../images/man.png";
import FemaleAvatar from "../images/girl.png";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const List = (props) => {
  const { employees, setEmployees, editOpenPopUp, setSelectedEmployee } = props;

  const deleteHandler = (employee) => {
    const filteredEmployees = employees.filter((emp) => emp.id !== employee.id);
    localStorage.setItem("employees", JSON.stringify(filteredEmployees));
    setEmployees(filteredEmployees);
  };

  const EditHandler = (employee) => {
    editOpenPopUp(employee);
  };

  const handleDelete = (employee) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this item?",

      customUI: ({ onClose }) => {
        return (
          <div className="relative p-4 w-full max-w-md h-full md:h-auto">
            <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
              <button
                type="button"
                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-toggle="deleteModal"
                onClick={onClose}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>

                <span className="sr-only">Close modal</span>
              </button>
              <svg
                className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <p className="mb-4 text-gray-500 dark:text-gray-300">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-center items-center space-x-4">
                <button
                  data-modal-toggle="deleteModal"
                  type="button"
                  onClick={onClose}
                  className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                >
                  No, cancel
                </button>
                <button
                  onClick={() => {
                    deleteHandler(employee);
                    onClose();
                  }}
                  type="submit"
                  className="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
                >
                  Yes, I'm sure
                </button>
              </div>
            </div>
          </div>
        );
      },
    });
  };

  return (
    <>
      <div>
        <div className="overflow-hidden rounded-lg shadow-md m-5">
          {employees.length > 0 && (
            <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
              <thead className="bg-gray-300">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Name
                  </th>

                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Mobile
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-4 font-medium text-gray-900"
                  ></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 border-t border-gray-100">
                {employees.map((employee, index) => (
                  <tr
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedEmployee(employee)}
                    key={employee?.email + index}
                  >
                    <th className="flex gap-3 px-6 py-4 font-normal text-gray-900">
                      <div className="relative h-10 w-10">
                        <img
                          className="h-full w-full rounded-full object-cover object-center"
                          src={
                            employee.image
                              ? employee.image
                              : employee.gender === "male"
                              ? MaleAvatar
                              : FemaleAvatar
                          }
                          alt=""
                        />
                        <span className="absolute right-0 bottom-0 h-2 w-2 rounded-full bg-green-400 ring ring-white"></span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium text-gray-700">
                          {employee.name}
                        </div>
                        <div className="text-gray-400">{employee.email}</div>
                      </div>
                    </th>
                    {/* <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-1 text-xs font-semibold text-green-600">
                        <span className="h-1.5 w-1.5 rounded-full bg-green-600"></span>
                        {employee.dob}
                      </span>
                    </td> */}
                    <td className="px-6 py-4">{employee.phone}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-4">
                        <MdOutlineEdit
                          onClick={(e) => EditHandler(employee)}
                          className="bold cursor-pointer hover:text-red-700 h-6 w-6 fill-current text-blue-500"
                        />
                        <MdDelete
                          onClick={(e) => handleDelete(employee)}
                          className="bold cursor-pointer hover:text-red-700 h-6 w-6 fill-current text-red-500"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {employees.length === 0 && (
          <div className="text-center text-sm text-bold  text-gray-500">
            No Employees Found
          </div>
        )}
      </div>
    </>
  );
};

export default List;
