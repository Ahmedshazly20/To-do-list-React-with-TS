import { AxiosError } from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { IErrorResponse, userDetailsT } from '../interfaces';
import { toast } from 'react-hot-toast';
import axiosInstance from '../config/axios.config';
import MyModal from '../component/Modal';
import Input from '../component/ui/Input';
import { styleUserEditInput } from '../typs/Style';
import { EditUserData } from '../typs';
import { DatePicker } from "react-rainbow-components";
import Userdata from './../component/Userdata';
import { SubmitHandler, useForm } from 'react-hook-form';

const ProfilePage = () => {
  const [isopen, setisopen] = useState(false);

  const storageKey = "LoggedinUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;

  const { email, username, Phone, DateoFbirth, Country, Address, job, bio, id } = userData?.user || {};

  const [date, setDate] = useState(DateoFbirth);

  const [userDetails, setuserDetails] = useState<userDetailsT>({
    job: job,
    email: email,
    username: username,
    Phone: Phone,
    DateoFbirth: DateoFbirth,
    Country: Country,
    Address: Address,
    bio: bio,
  });

  const ChangeHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = evt.target;
    setuserDetails({ ...userDetails, [name]: value });
  };

  const setitclose = () => {
    setisopen(false);
  };

  const setitopen = () => {
    setisopen(true);
  };

  const { register, handleSubmit, formState: { errors } } = useForm<userDetailsT>();

  const GetUserdata = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { status, data: userdata } = await axiosInstance.get(`/users/${id}`, { headers: { Authorization: `Bearer ${userData.jwt}` } });
      if (status === 200) {
        localStorage.setItem("LoggedinUser", JSON.stringify({ ...userData, user: userdata }));
        setTimeout(() => {
          location.replace('/ProfilePage');
        }, 1500);
      }
    } catch (errors) {
      const errorobj = errors as AxiosError<IErrorResponse>;
      toast.error(`${errorobj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 2500,
      });
    }
  };

  const OnSubmitUpdate: SubmitHandler<userDetailsT> = async (data) => {
    try {
      const { status } = await axiosInstance.put(`/users/${id}`, {
        ...data,
        DateoFbirth: date // Make sure to include the date in the correct format
      }, {
        headers: {
          Authorization: `Bearer ${userData.jwt}`,
        },
      });

      if (status === 200) {
        toast.success("Your information has been updated", {
          position: 'top-center',
          duration: 2500,
          icon: '👏',
        });
        // Optionally update local storage and state if necessary
        const updatedUser = { ...userData.user, ...data, DateoFbirth: date };
        localStorage.setItem(storageKey, JSON.stringify({ ...userData, user: updatedUser }));
        setuserDetails(updatedUser);
      }

    } catch (errors) {
      const errorobj = errors as AxiosError<IErrorResponse>;
      toast.error(`${errorobj.response?.data.error.message}`, {
        position: "bottom-center",
        duration: 2500,
      });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <Userdata job={job} bio={bio} Address={Address} Country={Country} DateoFbirth={DateoFbirth} Phone={Phone} email={email} username={username} />
        <div className='flex items-center justify-center'>
          <button onClick={setitopen} name='button' className='px-7 py-2 flex items-center justify-center disabled:bg-indigo-400 mr-2 bg-[#cac5c5] mt-3 font-DM Sans text-white font-[18px] placeholder:px-2 shadow-[0_px_8px_20px_#4a3aff42] focus:outline-none rounded-[10px] w-100 border-solid border-2 border-[#F3F1FF]'>Update</button>
        </div>
      </div>
      <MyModal isOpen={isopen} title='Edit your profile' closeModal={setitclose}>
        <form onSubmit={handleSubmit(OnSubmitUpdate)} className='flex flex-col'>
          {EditUserData.map(data => {
            return (
              <div className='flex flex-col' key={data.id}>
                <label className='my-[3px] ml-[6px]'>{data.name}</label>
                <Input type='text' {...register(data.name)} name={data.name} className={styleUserEditInput} onChange={ChangeHandler} value={userDetails[data.name]} />
              </div>
            )
          })}
          <DatePicker
            id="datePicker-1"
            value={date}
            onChange={setDate} // Directly use setDate
            label="Date of birth"
            formatStyle="large"
          />
          <div className="flex items-center space-x-3 my-[12px]">
            <button type='submit' className="bg-indigo-600 py-1 px-3 rounded border-[#00000057] hover:bg-indigo-800 text-white">Submit</button>
            <button type='button' onClick={setitclose} className="bg-gray-300 py-1 px-3 rounded hover:bg-gray-400">Cancel</button>
          </div>
        </form>
      </MyModal>
    </div>
  );
};

export default ProfilePage;
