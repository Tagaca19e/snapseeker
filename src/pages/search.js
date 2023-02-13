import React, { useState } from 'react';
import Router from 'next/router';



export default function Search() {
    const [input,setInput] = useState('')

    const handleSearch = async () => {
        const res = await fetch(`http://localhost:3000/api/searchDatabase?term=${input}`);
        const data = await res.json();

        const properties = JSON.parse( JSON.stringify(data));

        document.getElementById("_id").innerHTML = properties[0]._id;
        document.getElementById("name").innerHTML = properties[0].item;
        document.getElementById("price").innerHTML = properties[0].price;
 //       console.log("data",properties);
 //       console.log("properties",properties);
   //     console.log("JSON data",data);


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

                <h2 id='_id'>_id </h2>
                <p id='name'>Name </p>
                <p id='price'>$</p>

        </div>
    )
}
