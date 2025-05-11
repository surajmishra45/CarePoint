import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {
    const {doctors}=useContext(AppContext)
     const navigate=useNavigate()
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
       <h1 className='text-3xl font-medium '>Top Doctors To Book</h1>
       <p className='sm:w-1/3 text-center text-sm'>simply browse through our sensitive list of doctors</p>
       <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 sm:px-0'>
    {doctors.slice(0, 10).map((item, index) => (
        <div onClick={() =>{ navigate(`/appointment/${item._id}`); scrollTo(0,0)}}
            className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
            key={index}
        >
            <img className='bg-blue-50' src={item.image} alt="" />
            <div className='p-4'>
                <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                    <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                    <p>Available</p>
                </div>
                <p className='text-lg font-medium text-gray-900'>{item.name}</p>
                <p className='text-grey-600 text-sm'>{item.speciality}</p>
            </div>
        </div>
    ))}
</div>

<button onClick={()=>{navigate('/doctors');scrollTo(0,0)}} className='bg-blue-100 text-green-600 px-12 py-3 rounded-full mt-10 hover:scale-90 hover:bg-blue-200 hover:text-green-700 transition-all duration-500'>
    More
</button>

    </div>
  )
}

export default TopDoctors
