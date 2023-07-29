import React from 'react'
import { Link } from 'react-router-dom'
import LogoSvg from '../assets/logo.svg'
const Logo = () => {
    return (
        <>

            <Link to='/' className='absolute top-[1.5rem] left-[1.5rem] [text-decoration-none] text-lg text-cyan flex items-center ' >

                <img src={LogoSvg} alt="logo" />
                <span>CryptoBucks</span>


            </Link>



        </>
    )
}

export default Logo