import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import MobileNavDropdown from './mobileNavDropdown/MobileNavDropdown'

const Topbar: FC = () => {
  const navigate = useNavigate()
  const [dropdown, setDropdown] = useState(false)

  const dropdownToggle = () => {
    setDropdown((currState) => !currState)
  }

  return (
    <>
      <div className="w-full h-[75px] px-[10px] bg-[#1a1c1d] flex justify-between items-center">
        <div className="flex items-center">
          <div className="md:hidden hover:cursor-pointer">
            <img
              src="/images/burger.png"
              onClick={() => dropdownToggle()}
              className="w-[25px] h-[25px]"
            ></img>
          </div>
          <div>
            <img
              src="/images/istokbet-logo-1.svg"
              className="w-[100px] h-[30px] md:w-[150px] md:h-[50px]"
            ></img>
          </div>
        </div>

        <div className="">
          <div className="text-[#ebebeb] px-[10px] text-[13px] text-right bg-[#1a1c1d] hidden md:block">
            {moment().format('MMMM Do YYYY, h:mm:ss a')}
          </div>
          <div className="flex-center md:mt-[10px]">
            <button
              onClick={() => {
                navigate('/register')
              }}
              className="bg-[#ffbb1a] mr-[5px] button hidden md:block"
            >
              Registracija
            </button>

            <button className="bg-white button">Prijava</button>
          </div>
        </div>
      </div>
      <div
        className={`fixed top-0 h-[100%] w-[280px] bg-[#181818] z-50 ${
          dropdown ? 'mobile-dropdown-active' : 'mobile-dropdown-inactive'
        } md:hidden`}
      >
        <MobileNavDropdown setDropdown={setDropdown} />
      </div>
    </>
  )
}

export default Topbar
