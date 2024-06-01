import React from 'react'
import { userDetails } from './../interfaces/index';


function Userdata({email,username,Phone,DateoFbirth,Country,Address,job,bio}:userDetails) {
  return (
    <div>
         <div className="text-center mb-4">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="w-32 h-32 mx-auto rounded-full"
          />
          <h2 className="text-xl font-bold mt-2">{username}</h2>
          <p className="text-gray-600">{job? job:"No job"}</p>

        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold mb-2">Contact Information</h3>
            <p> <span className='font-bold	  px-[7px] py-[3px] rounded text-[#6366f1db]'>Email</span>  {email?  email:"No email"}</p>

            <p><span className='font-bold	  px-[7px] py-[3px] rounded text-[#6366f1db]'>Phone</span>  {Phone?  Phone:"No phone"}</p>

          </div>
          <div>
            <h3 className="font-semibold mb-2">Location</h3>
            <p> <span className='font-bold	  px-[7px] py-[3px] rounded text-[#6366f1db]'>City</span>{Address?Address:"No address" }</p>
            <p> <span className='font-bold	  px-[7px] py-[3px] rounded text-[#6366f1db]'>Country</span>{Country? Country:"No country" }</p>

          </div>
          <div>
            <h3 className="font-semibold mb-2">Date of birth</h3>
            <p> {DateoFbirth?  DateoFbirth:"No date of birth" }</p>

          </div>
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Bio</h3>
          <p>{bio}</p>
        </div>
    </div>
  )
}

export default Userdata