import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const stats = [
  { label: 'Total Items', value: '60' },
  { label: 'Total Customer', value: '2.5k' }
]

const Profile = () => {
  const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [videos, setVideos] = useState([]) 
    
     useEffect(() => {
        axios.get(`http://localhost:3000/api/food-partner/${id}`, { withCredentials: true })
            .then(response => {
                setProfile(response.data.foodPartner)
                setVideos(response.data.foodPartner.foodItems)
                console.log(response.data.foodPartner);
                 
            })
    }, [ id ])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header card */}
      <div className="bg-slate-800 rounded-lg p-6 shadow-md">
        <div className="flex items-start gap-6">
          <div className="shrink-0">
            <div className="w-28 h-28 rounded-full bg-slate-600" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div>
                <div className="inline-block bg-slate-700 text-slate-100 px-4 py-2 rounded-full font-semibold">
                  {profile ? profile.businessName : 'Loading...'}
                </div>
                <div className="mt-3 inline-block bg-slate-700 text-slate-100 px-4 py-2 rounded-full">
                  Kolkata, WB, India
                </div>
              </div>

              <div className="hidden sm:flex sm:items-center sm:gap-8">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-slate-300">{s.label}</div>
                    <div className="text-2xl font-semibold text-slate-100 mt-2">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile stats under header */}
            <div className="mt-6 sm:hidden grid grid-cols-2 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-slate-300">{s.label}</div>
                  <div className="text-xl font-semibold text-slate-100 mt-1">{s.value}</div>
                </div>
              ))}
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
  )
}

export default Profile