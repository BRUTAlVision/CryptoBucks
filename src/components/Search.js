import React, { useContext, useState } from 'react'
import searchIcon from '../assets/search-icon.svg'
import { CryptoContext } from '../context/CryptoContext';
import debounce from 'lodash.debounce';

const SearchInput = ({ handlesearch }) => {
    const [searchText, setsearchText] = useState("");
    let { searchData, setcoinSearch, setsearchData } = useContext(CryptoContext);

    const handleSubmit=(e)=>{
        e.preventDefault();
        handlesearch(searchText)

    }

    let handlechange = (e) => {
        e.preventDefault();
        let query = e.target.value;
        // console.log(query);
        setsearchText(query);
        handlesearch(query);
    }
    const selectCoin = (coin) => {
        setcoinSearch(coin);
        setsearchText('')
        setsearchData()
    }
    return (
        <>
            <form className='w-96 relative flex items-center ml-7 font-nunito' onSubmit={handleSubmit} >
                <input type="text" name='sesrch' value={searchText} className='w-full rounded bg-gray-200 placeholder:text-gray-100 pl-2
            required outline-0 border border-transparent
     ' placeholder='search here . . .' onChange={handlechange} />
                <button type='submit' className='absolute right-1 cursor-pointer'>
                    <img src={searchIcon} alt="searchicon" />
                </button>
            </form>
            {
                searchText.length > 0 ? <ul className='absolute bg-gray-200 top-11 left-[.3rem] p-[1rem] bg-opacity-60 backdrop-blur-md w-full h-96 rounded overflow-x-hidden py-2'>
                    {
                        searchData ?
                            searchData.map(coin => {
                                return <li className='flex items-center ml-4 my-2 cursor-pointer' key={coin.id} onClick={() => selectCoin(coin.id)}>

                                    <img className=' w-[2rem]  mx-1.5 ' src={coin.thumb} alt={coin.name} />
                                    <span>{coin.name}</span>
                                </li>
                            })
                            : <div className='W-FULL H-FULL flex justify-center items-center'>
                                <div className='w-8 h-8 border-4 border-cyan rounded-full border-b-gray-100 animate-spin' role='status'/>
                                <span className='ml-2'>Searching . . .</span>
                            </div>
                    }
                </ul> : null
            }

        </>
    )
}

const Search = () => {



    let { getSearchResult } = useContext(CryptoContext);

    const debouncefun = debounce(function (val) {
        getSearchResult(val);
    }, 2000);

    return (
        <>
            <SearchInput handlesearch={debouncefun} />
        </>
    )
}

export default Search