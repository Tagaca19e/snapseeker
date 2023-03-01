import React, { useState } from 'react';


export default function Search() {
    const [input,setInput] = useState('')
    const [properties,setProperties] = useState('')

    const handleSearch = async () => {

        event.preventDefault();

        if(!input.trim()) {
            alert('Please enter a value.');
            return;
        }

        const res = await fetch(`http://localhost:3000/api/walmart?term=${input}`)
        const data = await res.json();

        setProperties (data.items)


    }
    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='flex flex-col items-center gap-6'>
                <input
                  type='text'
                  value={input}
                  onChange = {(event) => setInput(event.target.value)}
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
                    <ul>
                    <li key ={property.itemId}>
                    <p>name: {property.name}</p>
                    <p>price $: {property.salePrice}</p> 
                    <p>offertype: {property.offerType}</p>
                    <p>UPC: {property.upc}</p>
                    <p>stock: {property.stock}</p>
                    <img src = {property.thumbnailImage} alt = {property.name}/>
                    </li>
                    </ul>
            </div>
            ))}
        </div>
    )
}
