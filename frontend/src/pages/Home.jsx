import React from 'react'
import Header from '../component/Header'
import Speciality from '../component/Speciality'
import TopDoctors from '../component/TopDoctors'
import Banner from '../component/Banner'

const Home = () => {
  return (
    <div className='mt-9'>
       <Header/>
       <Speciality/>
       <TopDoctors/>
       <Banner/>
    </div>
  )
}

export default Home
