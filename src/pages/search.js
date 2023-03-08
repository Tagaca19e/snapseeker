import React, { useState } from 'react';
import Router from 'next/router';
import {v4} from 'uuid'



export default function Search() {
    const [input,setInput] = useState('')
    const [properties,setProperties] = useState('')

    const handleSearch = async () => {
        const res = await fetch(`http://localhost:3000/api/searchDatabase?term=${input}`);
        const data = await res.json();

        setProperties (JSON.parse(JSON.stringify(data)));




 //       console.log("data",properties);
 //       console.log("properties",properties);
       console.log("JSON data",data);


    }
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='flex flex-col items-center gap-6'>
                <input
                  type='text'
                  value={input}
                  onChange = {(e) => setInput(e.target.value)}
                  className='rounded-md border-2 border-gray-300 p-2'
                  placeholder='Enter item'
                  required
                />
                <button onClick={handleSearch} type='button' className='rounded-md bg-pink-600 p-4 text-x1'>
                    Go
                </button>
            </div>
            {properties && properties.map((property) => (
            <div className='flex-auto w-1/4 rounded overflow-hidden shadow-1g m-2'>
                <div className='font-bold text-x1 mb-2'>
                    <p >id: {property._id}</p>
                    <p >item: {property.item}</p> 
                    <p >price: {property.price}</p>
                </div>
            </div>
            ))}
        </div>
    )
}
