import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../../components/nav/Navbar'

const stats = [
  { label: 'Total Items', value: '60' },
  { label: 'Total Customer', value: '2.5k' }
]

const Profile = () => {
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
      .then(response => {
        setProfile(response.data.foodPartner)
        setVideos(response.data.foodPartner.foodItems)
        console.log(response.data.foodPartner);

      })
  }, [id])

  return (
    <div className="flex flex-col items-center min-h-screen">

      <div className='w-[90vw] sm:w-[75vw] lg:w-[65vw] rounded-3x'>

        {/* Header card */}
        <div className="w-full rounded-lg p-6 pt-12">
          <div className="flex flex-col gap-2 sm:flex-row items-start justify-between">

            {/* img */}
            <div className="shrink-0">
              <div className="w-28 h-28 rounded-full bg-slate-600" />
            </div>

            {/* Food Partner details */}
            <div className="flex">
              <div className=" flex flex-col gap-5  ">

                {/* Company Name & Address */}
                <div className='flex flex-col font-bold'>
                  <div>
                    {profile ? profile.businessName : 'Loading...'}
                  </div>
                  <div>
                    Kolkata, WB, India
                  </div>
                </div>

                {/* Items & Customer details */}
                <div className="flex items-center gap-8">
                  {stats.map((s) => (
                    <div key={s.label} className="text-center">
                      <div>{s.label}</div>
                      <div className="text-2xl font-semibol mt-2">{s.value}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>


        {/* Divider */}
        <div className="my-6 border-t border-slate-700" />

        {/* Videos grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {videos.map((v) => (
            <div key={v._id} className="bg-slate-800 rounded-3xl overflow-hidden h-86">
              {/* <span className="text-slate-100 text-lg">Video</span> */}

              <video src={v.video} className='object-cover w-full h-full'></video>

            </div>
          ))}
        </div>
      </div>
      {/* <Navbar/> */}
    </div>
  )
}

export default Profile