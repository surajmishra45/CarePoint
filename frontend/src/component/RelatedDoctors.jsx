import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ docId, speciality }) => {
    const { doctors } = useContext(AppContext);
    const [relDoc, setRelDoc] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const specialData = doctors.filter(
                (doc) => doc.speciality === speciality && doc._id !== docId
            );
            setRelDoc(specialData);
        }
    }, [doctors, speciality, docId]);

    console.log("Related Doctors Data:", relDoc);
    console.log("Doctors:", doctors);

    return (
        <div>
            <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
                <h1 className="text-3xl font-medium">Related Doctors</h1>

                <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-5 gap-y-6 sm:px-0">
                    {relDoc.slice(0, 5).map((item, index) => (
                        <div
                            onClick={() => {
                                navigate(`/appointment/${item._id}`);
                                scrollTo(0, 0);
                            }}
                            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-500"
                            key={index}
                        >
                            <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt={item.name} />
                            <div className="p-4">
                                <div
                                    className={`flex items-center gap-2 text-sm text-center ${
                                        item.available ? "text-green-500" : "text-red-500"
                                    }`}
                                >
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

export default RelatedDoctors;
