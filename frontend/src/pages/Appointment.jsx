import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AppContext } from '../context/AppContext';
import RelatedDoctors from '../component/RelatedDoctors';
import axios from 'axios';

// SVG Icon Components
const VerifiedIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
  </svg>
);

const CalendarIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zm13.5 9a1.5 1.5 0 00-1.5-1.5H5.25a1.5 1.5 0 00-1.5 1.5v7.5a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5v-7.5z" clipRule="evenodd" />
  </svg>
);

const ClockIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
  </svg>
);

const ExperienceIcon = ({ className = '' }) => (
  <svg className={`w-5 h-5 ${className}`} viewBox="0 0 24 24" fill="currentColor">
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM9.763 9.51a2.25 2.25 0 013.828-1.351.75.75 0 001.06-1.06 3.75 3.75 0 00-6.38 2.252c-.033.307 0 .595.032.822l.154 1.077H8.25a.75.75 0 000 1.5h.421l.138.964a3.75 3.75 0 01-.358 2.208l-.122.242a.75.75 0 00.908 1.047l1.539-.512a1.5 1.5 0 01.948 0l.655.218a3 3 0 002.29-.163l.666-.333a.75.75 0 10-.67-1.342l-.667.333a1.5 1.5 0 01-1.145.082l-.654-.218a3 3 0 00-1.898 0l-.06.02a5.25 5.25 0 00.053-1.794l-.108-.752H12a.75.75 0 000-1.5H9.972l-.184-1.29a1.863 1.863 0 01-.025-.45z" clipRule="evenodd" />
  </svg>
);

const LoadingSpinner = ({ className = '' }) => (
  <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

const Appointment = () => {
  const navigate = useNavigate();
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendUrl, getDoctorData } = useContext(AppContext);

  const [docSlot, setDocSlot] = useState([]);
  const [slotIndex, setSlotIndex] = useState(null);
  const [slotTime, setSlotTime] = useState(null);
  const [docInfo, setDocInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Redirect user to login if not authenticated
  useEffect(() => {
    if (!token) {
      toast.warn("Please log in to continue.");
      navigate('/login');
    }
  }, [token, navigate]);

  // Fetch doctor details
  useEffect(() => {
    const doc = doctors.find((doc) => doc._id === docId);
    setDocInfo(doc || null);
  }, [doctors, docId]);

  // Generate available slots for booking
  const getAvailableSlots = () => {
    const today = new Date();
    const allSlots = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
      const endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10, 0, 0, 0);
      }

      const timeSlots = [];
      while (currentDate < endTime) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }
      allSlots.push(timeSlots);
    }
    setDocSlot(allSlots);
  };

  useEffect(() => {
    if (docInfo) getAvailableSlots();
  }, [docInfo]);

  const handleBookAppointment = async () => {
    if (slotIndex === null || slotTime === null) {
      toast.warn("Please select a date and time.");
      return;
    }
    
    try {
      setLoading(true);
      const date = docSlot[slotIndex][0].datetime;
      const slotDate = `${date.getDate()}_${date.getMonth() + 1}_${date.getFullYear()}`;

      const { data } = await axios.post(
        `${backendUrl}/api/user/book-appointment`,
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorData();
        navigate('/my-appointments');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  const getFormattedDate = (date) => {
    return `${date.getDate()} ${months[date.getMonth()]}`;
  };

  if (!docInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner className="w-12 h-12 text-blue-500" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Doctor Profile Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col lg:flex-row border border-gray-200">
        {/* Doctor Info Section */}
        <div className="lg:w-1/3 bg-gradient-to-br from-blue-50 to-blue-100 p-8 flex flex-col items-center">
          <div className="relative mb-6">
            <img
              src={docInfo.image}
              alt={docInfo.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-white shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 shadow-md">
              <VerifiedIcon className="text-white" />
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-gray-800 text-center">{docInfo.name}</h3>
          <p className="text-blue-600 font-medium mt-1">{docInfo.speciality}</p>
          
          <div className="flex items-center mt-4 space-x-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
              <ExperienceIcon className="mr-1 text-blue-500" />
              {docInfo.experience}+ years
            </span>
            <span className="text-lg font-semibold text-gray-700">
              {currencySymbol}{docInfo.fees}
            </span>
          </div>
        </div>

        {/* Booking Section */}
        <div className="lg:w-2/3 p-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">About Doctor</h2>
            <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
          </div>

          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-3">Qualifications</h2>
            <p className="text-gray-700 font-medium">{docInfo.degree}</p>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Book Your Appointment</h2>
            
            {/* Date Selection */}
            <div className="mb-6">
              <div className="flex items-center mb-3 text-gray-700">
                <CalendarIcon className="mr-2" />
                <h3 className="text-lg font-semibold">Select Date</h3>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
                {docSlot.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => { setSlotIndex(index); setSlotTime(null); }}
                    className={`p-2 rounded-lg transition-all flex flex-col items-center border
                      ${slotIndex === index 
                        ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                        : 'bg-white border-gray-200 hover:border-blue-400 hover:shadow-sm'}`}
                  >
                    <span className="font-medium text-sm">
                      {daysOfWeek[item[0]?.datetime.getDay()].substring(0, 3)}
                    </span>
                    <span className="text-xs">
                      {item[0] && getFormattedDate(item[0].datetime)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {slotIndex !== null && (
              <div className="mt-6">
                <div className="flex items-center mb-3 text-gray-700">
                  <ClockIcon className="mr-2" />
                  <h3 className="text-lg font-semibold">Available Times</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {docSlot[slotIndex].map((item, index) => (
                    <button
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                      className={`py-2 px-3 rounded-md transition-all border text-sm
                        ${slotTime === item.time 
                          ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                          : 'bg-white border-gray-200 hover:border-blue-400'}`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Submit Button */}
            <div className="mt-8">
              <button
                onClick={handleBookAppointment}
                disabled={loading || slotTime === null}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white shadow-md transition-all flex items-center justify-center
                  ${loading || slotTime === null 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 hover:shadow-lg'}`}
              >
                {loading && <LoadingSpinner className="w-5 h-5 mr-2 text-white" />}
                {loading ? 'Processing...' : 'Confirm Appointment'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Similar Doctors</h2>
        <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
      </div>
    </div>
  );
};

export default Appointment;