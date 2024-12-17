import React, { useEffect, useRef, useState } from 'react'
import SideBar from '../containers/SideBar'
import Header from '../containers/Header'
import { Outlet } from 'react-router-dom'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md'

function Wrapper() {
  const [sideBarOpen, setSideBarOpen] = useState(false)
  const [sideBarMobileOpen, setSideBarMobileOpen] = useState(false)
  const [shadow, setShadow] = useState(false)
  const scrollRef = useRef(null)

  const handleSidebar = () => {
    setSideBarOpen(!sideBarOpen)
  }
  const handleMobileSidebar = () => {
    setSideBarMobileOpen(!sideBarMobileOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (scrollRef.current.scrollTop > 0) {
        setShadow(true)
      } else {
        setShadow(false)
      }
    }

    const currentDiv = scrollRef.current
    currentDiv.addEventListener('scroll', handleScroll)

    return () => {
      currentDiv.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    if (sideBarMobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [sideBarMobileOpen])

  return (
    <div className='relative flex flex-wrap items-stretch bg-site-black px-4 lg:px-0 lg:pe-6 py-4'>

      {/* Sidebar */}
      {sideBarMobileOpen && (
        <div
          className='fixed inset-0 bg-black opacity-50 lg:z-30 z-[15] block lg:hidden sidebar'
          onClick={handleMobileSidebar}
        ></div>
      )}
      <div
        className={`${sideBarOpen ? 'w-[80px]' : 'w-full lg:w-1/4 xl:w-[20%] xxl:w-1/6'
          } relative transition-[width] duration-500 ease-in-out lg:z-[20] z-[15]`}
      >
        <SideBar
          sideBarOpen={sideBarOpen}
          sideBarMobileOpen={sideBarMobileOpen}
          handleMobileSidebar={handleMobileSidebar}
        />
        <button
          className='absolute z-40 bg-primary-blue text-white rounded-full w-7 h-7 items-center justify-center border-[1px] border-white -right-[12px] top-[45px] lg:flex hidden'
          onClick={handleSidebar}
        >
          {sideBarOpen ? <MdKeyboardArrowRight fontSize={'18px'} /> : <MdKeyboardArrowLeft fontSize={'18px'} />}
        </button>
      </div>

      <div
        className={`${sideBarOpen ? 'w-[calc(100%-80px)]' : 'w-full lg:w-3/4 xl:w-[78%] xxl:w-5/6'
          } transition-[width] duration-500 ease-in-out`}
      >
        <div
          className='bg-white rounded-2xl lg:h-[calc(100vh-32px)] h-[calc(100vh-86px)] overflow-x-hidden relative'
          ref={scrollRef}
        >
          {/* Header */}
          <div
            className={` sticky top-0 bg-white lg:z-[19] z-[14] transition-all duration-300 ease-in-out ${shadow ? 'shadow-cardShadow md:px-6 px-4 md:py-4 py-3' : 'md:px-6 py-3 p-4'
              }`}
          >
            <Header />
          </div>

          {/* Outlet */}
          <div className='sm:pb-6 sm:px-6 pb-4 px-4 pt-2'>
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Wrapper
