import React, { useContext, useRef } from 'react'
import paginationArrow from '../assets/pagination-arrow.svg'
import { CryptoContext } from '../context/CryptoContext';
import submiticon from '../assets/submit-icon.svg'

const PerPage = () => {
    let { setPerpage } = useContext(CryptoContext);
    const hanndlePerPage = (e) => {
        e.preventDefault();
        let val = inputRef.current.value;
        if (val !== 0) {

            setPerpage(val);
            inputRef.current.value = val;
        }
    }
    const inputRef = useRef(null);
    return (
        <>
            <form className='relative flex items-center font-nunito mr-12'
                onSubmit={hanndlePerPage}
            >
                <label className='relative flex justify-center items-center mr-2 font-bold'>PerPage</label>
                <input placeholder='10' type="number" min={1} max={250} name='PerPage' ref={inputRef} className='w-16 rounded bg-gray-200 placeholder:text-gray-100 pl-2 required outline-0 border border-transparent focus:border-cyan leading-4' />
                <button type='submit' className='ml-1 cursor-pointer'>
                    <img src={submiticon} alt="submit icon" className='w-full h-auto' />
                </button>
            </form>
        </>
    );
}

const Pagination = () => {
    let { page, setpage, Totalpage, Perpage } = useContext(CryptoContext)

    const totalPage = Math.ceil(Totalpage / Perpage);
    const next = () => {
        if (page === totalPage) {
            return null;
        }
        else {
            setpage(page + 1);
        }
    }
    const prev = () => {
        if (page === 1) {
            return null;
        }
        else {
            setpage(page - 1);
        }
    }

    const multiStepNext = () => {
        if (page + 3 >= totalPage) {
            setpage(totalPage - 1);
        }
        else {
            setpage(page + 3);
        }
    }
    const multiStepPrev = () => {
        if (page - 3 <= 1) {
            setpage(totalPage);
        }
        else {
            setpage(page - 2);
        }
    }

    return (
        <>
            <div className='flex items-center'>
                <PerPage />
                <ul className='flex justify-center items-center gap-2'>
                    <li>
                        <button className='outline-0 hover:text-cyan w-8' onClick={prev}>

                            <img className='w-full h-auto transform -scale-x-100' src={paginationArrow} alt="" />
                        </button>
                    </li>

                    {page === 1 || page === 2 ? null : <li> <button onClick={multiStepPrev} className='outline-0 hover:text-cyan w-8 h-8 rounded-full flex justify-center items-center  bg-gray-200 mx-1.5'>...</button> </li>}
                    {page - 1 !== 0 ? <li> <button onClick={prev} className='outline-0 hover:text-cyan w-8 h-8 rounded-full flex justify-center items-center bg-gray-200 mx-1.5'>{page - 1}</button> </li> : null}
                    <li> <button disabled className='outline-0  w-8 h-8 rounded-full flex justify-center items-center bg-cyan text-gray-200 mx-1.5'>{page}</button> </li>
                    {
                        page === totalPage ? null : <li> <button onClick={next} className='outline-0 hover:text-cyan w-8 h-8 rounded-full flex justify-center items-center bg-gray-200 mx-1.5'>{page + 1}</button> </li>
                    }
                    {
                        page + 1 !== totalPage && page !== totalPage ? <li> <button onClick={multiStepNext} className='outline-0 hover:text-cyan w-8 h-8 rounded-full flex justify-center items-center  bg-gray-200 mx-1.5'>...</button> </li> : null
                    }
                    {
                        page !== totalPage && page + 1 !== totalPage ? <li> <button onClick={() => setpage(totalPage)} className='outline-0 hover:text-cyan w-8 h-8 rounded-full flex justify-center items-center bg-gray-200 mx-1.5'>{totalPage}</button></li> : null
                    }

                    <li> <button className='outline-0 hover:text-cyan w-8' onClick={next}>

                        <img className='w-full h-auto ' src={paginationArrow} alt="" />
                    </button></li>
                </ul>
            </div>
        </>
    )
}

export default Pagination