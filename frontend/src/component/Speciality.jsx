import React from 'react'
import { specialityData } from '../assets/assets_frontend/assets'
import { Link } from 'react-router-dom'

const Speciality = () => {
  return (
    <div className='flex flex-col items-center  gap-4 py-16' id='speciality'>
         <h1 className='text-3xl font-medium '>find by speciality</h1>
         <p className='sm:w-1/3 text-center text-sm'>simply browse through our extensive list of trusted doctors</p>
         <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-hidden'>
         {
           specialityData.map((item, index) => (
            <Link
              onClick={() => scrollTo(0, 0)}
              className="flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500"
              key={index}
              to={`/doctors/${encodeURIComponent(item.speciality)}`} // Encode URL
            >
              <img
                src={item.image || "default-image-path.png"} // Fallback image
                alt={item.speciality || "Speciality"}
                className="w-16 h-16 object-cover rounded-full" // Styling for images
              />
              <p className="mt-2 text-gray-700">{item.speciality || "Unknown"}</p> {/* Fallback text */}
            </Link>
          ))
          
         }
         </div>
    </div>
  )
}

export default Speciality
