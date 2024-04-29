import MaleAvatar from "../images/mann.png";
import FemaleAvatar from "../images/woman.png";
import { useEffect, useState } from "react";

const Profile = (props) => {
  const { selectedEmployee } = props;

  const [selectedState, setSelectedState] = useState(null);

  useEffect(() => {
    setSelectedState(selectedEmployee);
  }, [selectedEmployee]);

  console.log("wwwww", selectedEmployee);
  return (
    <>
      {selectedEmployee === null ? (
        <div className="text-center text-2xl text-red-500">
          No Employee Selected
        </div>
      ) : (
        <section class="bg-blueGray-50">
          <div class="w-full  px-4 mx-auto">
            <div class="flex flex-col break-words bg-white w-full mb-6 shadow-xl rounded-lg ">
              <div class="px-6">
                <div class="flex  justify-center">
                  <div class="w-full flex justify-center">
                    <div className="w-40">
                      <img
                        alt="profile"
                        src={
                          selectedEmployee?.image
                            ? selectedEmployee.image
                            : selectedEmployee?.gender === "male"
                            ? MaleAvatar
                            : FemaleAvatar
                        }
                        class="shadow-xl rounded-full h-auto align-middle border-none"
                      />
                    </div>
                  </div>
                </div>

                <div class="my-4 m-10  border-t border-blueGray-200 text-center"></div>

                <div class="text-center my-4">
                  <h3 class="text-xl font-semibold leading-normal text-blueGray-700 mb-2">
                    {selectedEmployee?.name} {/*  get age here suing dob */}(
                    {new Date().getFullYear() -
                      new Date(selectedEmployee?.dob).getFullYear()}
                    )
                  </h3>
                  <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                    <i class="fas fa-map-marker-alt mr-2 text-blueGray-400"></i>
                    {selectedEmployee?.email}
                  </div>

                  <p class="text-base leading-relaxed  mt-0 text-blueGray-400 font-bold uppercase">
                    DOB: {selectedEmployee?.dob}
                  </p>
                  <p class="text-base leading-relaxed  mt-0 text-blueGray-400 font-bold uppercase">
                    Gender: {selectedEmployee?.gender}
                  </p>

                  <p class="text-base leading-relaxed  mt-0 text-blueGray-400 font-bold uppercase">
                    Mobile: {selectedEmployee?.phone}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Profile;
