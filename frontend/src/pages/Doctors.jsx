import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const Doctors = () => {
  const navigate = useNavigate();
  const { speciality } = useParams();
  console.log("Speciality:", speciality);

  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const { doctors } = useContext(AppContext);
  console.log("Doctors:", doctors);

  const AppyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    AppyFilter();
  }, [doctors, speciality]);

  return (
    <div className="px-4 py-8 lg:px-16 mt-16">
      <p className="text-2xl font-semibold text-center mb-6">   
        Browse Through the Specialists
      </p>
      <div className="flex w-28 flex-col sm:flex-row gap-5 mt-5 mb-5">
        <button
          className={`sm:hidden px-4 py-2 rounded-lg transition-all ${
            showFilter ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filter
        </button>                   
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Specialities List */}
        <div className={`lg:flex flex-col gap-4 lg:w-1/4 xs:w-40 xs:gap-2 ${showFilter ? 'flex' : 'xs:hidden'}`}>
          <p onClick={() => speciality === 'General Physician' ? navigate('/doctors') : navigate('/doctors/General physician')}
             className={`cursor-pointer border border-gray-300 rounded-lg shadow-md bg-white text-center font-medium text-gray-700 hover:bg-blue-500 hover:scale-105 transition-all duration-300 ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>
            General physician
          </p>
          <p onClick={() => speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist')}
             className={`cursor-pointer border border-gray-300 rounded-lg shadow-md bg-white text-center font-medium text-gray-700 hover:bg-blue-500 hover:scale-105 transition-all duration-300 ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>
            Gynecologist
          </p>
          <p onClick={() => speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist')}
             className={`cursor-pointer border border-gray-300 rounded-lg shadow-md bg-white text-center font-medium text-gray-700 hover:bg-blue-500 hover:scale-105 transition-all duration-300 ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>
            Dermatologist
          </p>
          <p onClick={() => speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist')}
             className={`cursor-pointer border border-gray-300 rounded-lg shadow-md bg-white text-center font-medium text-gray-700 hover:bg-blue-500 hover:scale-105 transition-all duration-300 ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>
            Neurologist
          </p>
          <p onClick={() => speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist')}
             className={`cursor-pointer border border-gray-300 rounded-lg shadow-md bg-white text-center font-medium text-gray-700 hover:bg-blue-500 hover:scale-105 transition-all duration-300 ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>
            Gastroenterologist
          </p>
          <p onClick={() => speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians')}
             className={`cursor-pointer border border-gray-300 rounded-lg shadow-md bg-white text-center font-medium text-gray-700 hover:bg-blue-500 hover:scale-105 transition-all duration-300 ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>
            Pediatricians
          </p>
        </div>

        {/* Doctors List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:w-3/4">
          {filterDoc.map((item, index) => (
            <div
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
              key={index}
            >
              <img
                className="bg-blue-50 w-full h-40 object-cover"
                src={item.image}
                alt={item.name}
              />
              <div className="p-4">
                <div className={`flex items-center gap-2 text-sm text-center ${
                  item.available ? "text-green-500" : "text-red-500"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${
                    item.available ? "bg-green-500" : "bg-red-500"
                  }`}></div>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
