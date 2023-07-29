import React, { useContext, useRef } from 'react'
import Search from './Search'
// import Currency from './Currency'
import submiticon from '../assets/submit-icon.svg'
import { CryptoContext } from '../context/CryptoContext'

const Filters = () => {
    let { setcurrency, setsort } = useContext(CryptoContext);
    const currencyRef = useRef(null);
    const handlecurrencySubmit = (e) => {
        e.preventDefault();
        let val = currencyRef.current.value;
        setcurrency(val);
        currencyRef.current.value = "";
    }
    const handlesort = (e) => {
        e.preventDefault();
        let val = e.target.value;
        setsort(val);
    }
    return (
        <>
            <div className='w-full h-12 border-2 border-gray-100 rounded-lg flex flex-row items-center justify-between relative'>

                <Search />
                <div className='felx  mr-7'>
                    <form className='relative flex items-center font-nunito mr-12' onSubmit={handlecurrencySubmit}>
                        <label htmlFor="currency" className='relative flex justify-center items-center mr-2 font-bold'>currency</label>
                        <input placeholder='usd' type="text" name='currency' ref={currencyRef} className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4' />
                        <button type='submit' className='ml-1 cursor-pointer'>
                            <img src={submiticon} alt="submit icon" className='w-full h-auto' />
                        </button>
                    </form>
        
                </div>
                <label className='relative flex justify-center items-center mr-10'  >
                    <span className='font-bold mr-2'>sort by : </span>
                    <select className='rounded bg-gray-200 text-base pl-2 pr-10 py-1.5 leading-4 capitalize' onChange={handlesort} name="sortby" >
                        <option value="market_cap_desc">market_cap_desc</option>
                        <option value="gecko_desc">gecko_desc</option>
                        <option value="gecko_asc">gecko_asc</option>
                        <option value="market_cap_asc">market_cap_asc</option>
                        <option value="volume_asc">volume_asc</option>
                        <option value="volume_desc">volume_desc</option>
                        <option value="id_asc">id_asc</option>
                        <option value="id_desc">id_desc</option>
                    </select>
                </label>


            </div>

        </>
    )
}

export default Filters