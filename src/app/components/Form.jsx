import React from 'react'

const Form = () => {
  return (
    <div className='bg-red-300 max-w-[1280px] mx-auto py-10'>
        <div className='text-center text-inter text-3xl font-semibold'>
            <p>Contact Information</p>
        </div>

        <div className='flex flex-col gap-3 items-center mt-10'>
            <div>
                <label htmlFor="">First Name:</label>
                <input type="text" name="" id="" className='border border-black rounded-md p-1 ml-1 focus:outline-none'/>   
            </div>
            <div>
                <label htmlFor="">Last Name:</label>
                <input type="text" name="" id="" className='border border-black rounded-md p-1 ml-1 focus:outline-none'/>
            </div>
           <div>
                <label htmlFor="">Mail:</label>
                <input type="mail" name="" id="" className='border border-black rounded-md p-1 ml-1 focus:outline-none'/>
           </div>
        </div>
       
    </div>
  )
}

export default Form