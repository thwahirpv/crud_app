import React, { useContext } from 'react'
import { ContextProvider } from '../../context/Context'

const Search = () => {
  const { setSearchTXT } = useContext(ContextProvider)
  return (
    <div className='w-[60%] sm:w-[50%] md:w-[20%]'>
      <input 
      onChange={(e) => setSearchTXT(e.target.value)}
      className='w-full py-3 px-5 rounded outline-none border-b border-b-gray-400 bg-transparent' placeholder='Search' type="search" name="" id="" />
    </div>
  )
}

export default Search
