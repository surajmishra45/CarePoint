import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";
import { motion } from "framer-motion";

const DoctorList = () => {
    const { Token, doctors, getAllDoctors,changeAvailability } = useContext(AdminContext);
   console.log(doctors.available)
    useEffect(() => {
        getAllDoctors();
    }, [Token]);

    return (
        <div className="m-5  max-h-[90vh] overflow-y-scroll">
            <h2 className="text-lg font-medium">Doctors List</h2>
            <div className="flex flex-wrap w-full gap-4 pt-5 gap-y-6">
                {doctors.length === 0 ? (
                    <p>No doctors found.</p>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
                        {doctors.map((doctor) => (
                            <motion.div 
                                key={doctor._id} 
                                className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center w-full"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.img 
                                    src={doctor.image} 
                                    alt={doctor.name} 
                                    className="  object-cover  mb-4"
                                    whileHover={{ scale: 1.1 }}
                                />
                                <div className="text-center">
                                    <p className="text-lg font-medium text-gray-800">{doctor.name}</p>
                                    <p className="text-gray-600 text-sm">{doctor.speciality}</p>
                                    <motion.div 
                                        className="flex items-center gap-2 mt-2"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <input onClick={()=>changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} className="w-4 h-4" readOnly />
                                        <p className="text-sm text-gray-700">Available</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorList;
