/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import Logo from '../../assets/images/logo.svg'
import { IoNotificationsOutline } from 'react-icons/io5'
import { GrCart } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from 'react-icons/io'
import Paragraph from '../core/typography/Paragraph'
import { FaUser } from 'react-icons/fa'
import userProfile from '../../assets/images/user_profile.png'
import { RiLogoutCircleRLine } from 'react-icons/ri'
import productImage from '../../assets/images/product_item_one.svg'
import ListItem from '../themeComponents/ListItem'
import Button from '../core/formComponents/Button'
import { paths } from '../../routes/path'
import { userSelector, userTypeSelector } from '../../redux/slices/userSlice'
import { userRoles } from '../../constants/roleConstants'
import NotificationItem from '../themeComponents/NotificationItem'
import { ReactComponent as IconHome } from '../../assets/images/icon_home.svg'
import { ReactComponent as IconSetting } from '../../assets/images/icon_setting.svg'

import {
  adminSideBarItems,
  barManagerSideBarItems,
  barOwnerSideBarItems,
  mobileViewAdminDropdownItems,
  mobileViewManagerDropdownItems,
  mobileViewOwnerDropdownItems,
} from '../../constants/sidebarConstants'

import Logout from '../../pages/authentication/Logout'
import { hideLoader, showLoader } from '../../redux/slices/siteLoaderSlice'
import { GetCarts, GetNotifications } from '../../services/HeaderService'
import { activeVenueSelector } from '../../redux/slices/ownerVenueSlice'
import noImage from '../../assets/images/noImg.png'
import { generalDataSelector } from '../../redux/slices/generalDataSlice'
import InfiniteScroll from 'react-infinite-scroll-component'
import { NotificationIconType } from '../../utils/commonHelper'
import { companySelector } from '../../redux/slices/companySlice'

function SideBar({ sideBarOpen, sideBarMobileOpen, handleMobileSidebar }) {
  const dispatch = useDispatch()
  const activeVenue = useSelector(activeVenueSelector)
  const userType = useSelector(userTypeSelector)
  const dropdownRef = useRef(null)
  const location = useLocation()
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [openDropdown, setOpenDropdown] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const sideBarRef = useRef(null)
  const user = useSelector(userSelector)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [title, setTitle] = useState([])
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)
  const navigate = useNavigate()
  const [cartData, setCartData] = useState([])
  const [cartPage] = useState(1) // Track current page
  const { generalData } = useSelector(generalDataSelector)

  const [notificationsData, setNotificationsData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1) // Track current page
  const itemsPerPage = 10
  const companyname = useSelector(companySelector)
  console.log("company name at sidebar", companyname);
  useEffect(() => {
    if (title) {
      document.title = title ? `${title + ' -'} DioSync` : 'DioSync'
    }
  }, [title])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    if (isOpen === 'cart') {
      getCartData(cartPage)
    }
  }, [cartPage])

  useEffect(() => {
    if (isOpen === 'notification') {
      getNotifications(page)
    }
  }, [page])

  const getCartData = async (page) => {
    let queryString = `?page=${cartPage}&bar_vanue_id=${activeVenue}`
    dispatch(showLoader()) // Show loader before API call

    try {
      const response = await GetCarts(queryString)
      if (response?.data?.data) {
        setCartData(response?.data?.data?.results[0])
      }
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      dispatch(hideLoader()) // Hide loader after API call
    }
  }

  const getNotifications = async (page) => {
    let queryString = `?page=${page}`
    dispatch(showLoader()) // Show loader before API call
    setLoading(true)
    try {
      const response = await GetNotifications(queryString)
      const count = response?.data?.data?.count || 0
      if (response?.data?.data?.results) {
        setNotificationsData((prevData) => [...prevData, ...response?.data?.data?.results])

        // Stop loading more if we reach the end
        setHasMore(page < Math.ceil(count / itemsPerPage))
      }
    } catch (error) {
      console.error('Error fetching feed:', error)
    } finally {
      setLoading(false)
      dispatch(hideLoader()) // Hide loader after API call
    }
  }

  const getNavItemClass = (path) => {
    return location.pathname === path && !sideBarOpen
      ? 'before:absolute before:block before:w-2 before:h-11 before:rounded-lg before:-left-1 before:bg-primary-blue'
      : ''
  }
  const getDropdownNavItemClass = (path) => {
    return location.pathname === path && !sideBarOpen
      ? 'before:absolute before:block before:w-2 before:h-11 before:rounded-lg before:-left-[48px] before:top-0 before:bg-primary-blue'
      : ''
  }

  const handleClickOutside = (event) => {
    if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
      setNavbarOpen(false)
      closeDropdown()
    }
  }
  const toggleHeaderDropdown = (dropdown) => {
    setIsOpen((prevDropdown) => (prevDropdown === dropdown ? null : dropdown))
  }
useEffect(()=>{

},[])
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleDropdown = (dropdown) => {
    setOpenDropdown((prevDropdown) => (prevDropdown === dropdown ? null : dropdown))
  }

  const handleLogoutClose = () => {
    setIsLogoutModalOpen(false)
  }

  const closeDropdown = () => {
    setIsOpen(false)
  }

  const redirect = () => {
    navigate(paths.owner?.cart)
    setIsOpen(false)
  }

  const filteredSideBarItems = barManagerSideBarItems.reduce((result, sideBarItem) => {
    // Check if the main module_name matches any module_name in the modules array
    const hasMatchingModule = user?.modules?.some((module) => module?.module_name === sideBarItem?.module_name)

    // If it matches the main module_name, push the entire sidebar item
    if (hasMatchingModule) {
      result?.push(sideBarItem)
    } else if (sideBarItem?.submenu && sideBarItem?.subMenuItems) {
      // If the main module_name doesn't match, check subMenuItems
      const matchedSubMenuItems = sideBarItem.subMenuItems?.filter(
        (subItem) =>
          subItem?.module_name !== 'BAR STAFF' &&
          user?.modules?.some((module) => module?.module_name === subItem?.module_name),
      )
      // If there are matching subMenuItems, return the parent item with only the matching subMenuItems
      if (matchedSubMenuItems.length > 0) {
        result.push({
          ...sideBarItem,
          subMenuItems: matchedSubMenuItems, // Replace with matched sub-items
        })
      }
    }

    return result
  }, [])

  filteredSideBarItems?.unshift({
    name: 'Dashboard',
    href: paths.manager.dashboard,
    icon: IconHome,
    submenu: false,
    hidden: true,
    module_name: 'DASHBOARD',
  })

  const hasBarStaffModule = user?.modules?.some((module) => module.module_name === 'BAR STAFF')

  // Create the Settings sidebar item
  const settingsItem = {
    name: 'Settings',
    href: paths.manager.setting,
    icon: IconSetting,
    submenu: true,
    module_name: 'SETTINGS',
    subMenuItems: [
      {
        name: 'Account',
        href: paths.manager.account,
        module_name: 'ACCOUNT',
      },
      {
        name: 'Reset Password',
        href: paths.manager.resetPassword,
        module_name: 'RESET PASSWORD',
      },
    ],
    hidden: true,
  }

  // Conditionally add 'Staff Manager' subitem if the user has the 'BAR STAFF' module
  if (hasBarStaffModule) {
    settingsItem.subMenuItems.push({
      name: 'Staff Manager',
      href: paths.owner.staffMember,
      module_name: 'BAR STAFF',
    })
  }

  // Push the Settings item to the filtered sidebar items
  filteredSideBarItems?.push(settingsItem)

  const sideBarItems =
    userType === userRoles.Owner
      ? barOwnerSideBarItems
      : userType === userRoles.Manager
        ? filteredSideBarItems
        : adminSideBarItems

  const dashboardIconRedirect =
    userType === userRoles.Owner
      ? paths.owner.dashboard
      : userType === userRoles.Manager
        ? paths.manager.dashboard
        : paths.admin.dashboard

  const mobileViewDropdownItems =
    userType === userRoles.Owner
      ? mobileViewOwnerDropdownItems
      : userType === userRoles.Manager
        ? mobileViewManagerDropdownItems
        : mobileViewAdminDropdownItems



  return (
    <div className='lg:h-[calc(100vh-48px)] overflow-y-auto relative' ref={sideBarRef}>
      <div className='flex flex-col items-start gap-10 lg:pt-10 pt-0 lg:pb-0 pb-6'>
        <div
          className={`${!sideBarOpen ? 'lg:px-11' : 'lg:px-3 justify-center'
            } flex items-center lg:justify-start justify-between w-full`}
        >
          <div className='w-1/3 lg:hidden block'>
            <button
              className='flex items-center justify-center text-left z-10 relative w-8 h-8 text-white focus:outline-none'
              onClick={() => {
                handleMobileSidebar()
                setNavbarOpen(!navbarOpen)
              }}
            >
              <span
                className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${navbarOpen ? 'rotate-45 delay-200' : '-translate-y-1.5'
                  }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${navbarOpen ? 'w-0 opacity-50' : 'w-5 delay-200 opacity-100'
                  }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${navbarOpen ? '-rotate-45 delay-200' : 'translate-y-1.5'
                  }`}
              ></span>
            </button>
          </div>
          <div
            className={`w-1/3 lg:w-full ${!sideBarOpen ? 'lg:text-left' : 'lg:text-center'
              }  text-center transition duration-300 ease-in-out  `}
          >
            <div className='flex flex-row gap-4'>
              <a href={dashboardIconRedirect} className='transition-all duration-500 ease-in-out inline-block'>
                <img src={Logo} alt='logo' className='inline-block' />
              </a>
              <div className='text-white'>{companyname.company}</div>
            </div>
          </div>
          <div className='w-1/3 lg:hidden block'>
            <div className='flex justify-end items-center gap-3'>
              {/* Notification Button */}
              <div className='relative' ref={dropdownRef}>
                <button
                  className={`w-8 h-8 ${isOpen === 'notification' ? 'bg-primary-blue' : 'bg-[#F6F6F61A]'
                    }  rounded-full flex items-center text-left justify-center relative`}
                  onClick={() => toggleHeaderDropdown('notification')}
                >
                  <IoNotificationsOutline color='#fff' fontSize={'14px'} />
                  <span className='absolute w-[6px] h-[6px] rounded-full bg-[#CB0303] border border-white top-[8px] right-[10px]'></span>
                </button>
                {isOpen === 'notification' && (
                  <div className='origin-top-right sm:p-5 p-3 fixed sm:right-11 right-1 mt-5 w-[238px] rounded-lg shadow-cardShadow bg-white z-10 sm:min-w-[355px] min-w-[312px]'>
                    <div className='z-0 flex items-center justify-between gap-3 pb-3 relative before:border-transparent before:border-r-[12px] before:border-l-[12px] before:border-b-[16px] before:border-b-white before:absolute sm:before:-top-8 before:-top-6 sm:before:-right-1 before:right-12 before:-z-[1]'>
                      <Paragraph text20>Notifications</Paragraph>
                      <span className='bg-light-grey text-dark-grey px-2 py-1 rounded-md text-sm'>3 New</span>
                    </div>
                    <div className='max-h-[252px] overflow-y-auto'>
                      <InfiniteScroll
                        dataLength={notificationsData?.length}
                        next={() => {
                          if (hasMore) {
                            setPage((prevPage) => prevPage + 1) // Increment page number
                          }
                        }}
                        hasMore={hasMore}
                        loader={loading && <h4>Loading ... </h4>}
                        height={200}
                        scrollableTarget='scrollableDiv'
                      >
                        {!loading && notificationsData?.length === 0 ? (
                          <div className='flex flex-col  justify-center w-full py-4'>
                            <Paragraph text16 className={'font-semibold'}>
                              Data not found..!!
                            </Paragraph>
                          </div>
                        ) : (
                          <>
                            {notificationsData?.map((notification) => (
                              <NotificationItem
                                type={NotificationIconType(notification?.notification_type)}
                                info={notification?.title}
                                key={notification?.id}
                                description={notification?.description}
                                date={notification?.notification_time}
                              />
                            ))}
                          </>
                        )}
                      </InfiniteScroll>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Button */}
              <div className='relative' ref={dropdownRef}>
                <button
                  className={`w-8 h-8  ${isOpen === 'cart' ? 'bg-primary-blue' : 'bg-[#F6F6F61A]'
                    } rounded-full text-left flex items-center justify-center relative me-1`}
                  onClick={() => toggleHeaderDropdown('cart')}
                >
                  <GrCart color='#fff' fontSize={'14px'} />
                  {generalData?.cart_count > 0 && (
                    <span className='absolute w-[18px] h-[18px] rounded-full bg-primary-blue text-white  -top-0 -right-[4px] flex items-center justify-center text-[10px]'>
                      {generalData?.cart_count}
                    </span>
                  )}
                </button>
                {isOpen === 'cart' && (
                  <div className='origin-top-right sm:p-5 p-3 fixed right-1 mt-5 w-[238px] rounded-lg shadow-cardShadow bg-white z-10 sm:min-w-[355px] min-w-[312px]'>
                    <div className='z-0 flex items-center justify-between gap-3 pb-3 relative before:border-transparent before:border-r-[12px] before:border-l-[12px] before:border-b-[16px] before:border-b-white before:absolute sm:before:-top-8 before:-top-6 sm:before:-right-1 before:right-1 before:-z-[1]'>
                      <Paragraph text20>Cart</Paragraph>
                    </div>
                    <div className='sm:max-h-[450px] max-h-[220px] overflow-y-auto'>
                      {cartData?.items?.length === 0 ? (
                        <div className='flex flex-col  justify-center w-full py-4'>
                          <Paragraph text16 className={'font-semibold'}>
                            Data not found..!!
                          </Paragraph>
                        </div>
                      ) : (
                        <>
                          {cartData?.items?.map((item, index) => {
                            return (
                              <ListItem
                                key={index}
                                withBorder
                                withCount
                                className='mb-2'
                                itemName={item?.item?.item_name}
                                productImage={item?.item?.item_image ?? noImage}
                                currency={`${generalData?.currency ?? ''}`}
                                price={item?.price?.toFixed(2)}
                                qty={item?.qty}
                                imgSize={'42px'}
                              />
                            )
                          })}
                        </>
                      )}
                    </div>
                    <div className='bg-light-grey p-4 rounded-lg flex items-center justify-between mb-5'>
                      <Paragraph text16 className={'font-bold'}>
                        Total Price
                      </Paragraph>
                      <Paragraph text16 className={'font-bold'}>
                        {generalData?.currency ?? ''} {cartData?.price?.toFixed(2) ?? 0}
                      </Paragraph>
                    </div>
                    <Button primary className={'w-full'} onClick={redirect}>
                      Your Cart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ul
          className={`flex flex-col items-start lg:justify-start lg:pt-0 pt-11 lg:pb-0 pb-6 lg:w-full lg:static fixed top-0 bg-site-black transition-all duration-300 ease-in-out z-40 ${sideBarMobileOpen && windowWidth < 992
            ? 'left-0 sm:w-1/2 w-full h-screen overflow-x-hidden'
            : '-left-full h-full '
            }`}
        >
          <li className={`absolute top-3 right-4`}>
            <button
              className='lg:hidden flex items-center justify-center z-30 relative w-8 h-8 text-white focus:outline-none'
              onClick={() => {
                handleMobileSidebar()
                setNavbarOpen(!navbarOpen)
              }}
            >
              <span
                className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${navbarOpen ? 'rotate-45 delay-200' : '-translate-y-1.5'
                  }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-white transform transition-all duration-200 ease-in-out ${navbarOpen ? 'w-0 opacity-50' : 'w-5 delay-200 opacity-100'
                  }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-white transform transition duration-300 ease-in-out ${navbarOpen ? '-rotate-45 delay-200' : 'translate-y-1.5'
                  }`}
              ></span>
            </button>
          </li>

          {sideBarItems?.map((item, i) => (
            <li key={item?.name} className={`mb-3 block w-full ${!sideBarOpen ? 'px-2' : 'px-2'} relative `}>
              {!item.submenu ? (
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `text-white text-base leading-6 font-semibold flex items-center ${!sideBarOpen ? 'justify-start' : 'justify-center'
                    } gap-3 ${!sideBarOpen ? 'px-5' : 'px-2'} py-[10px] ${isActive ? 'bg-primary-blue' : ''} rounded-lg ${getNavItemClass(item.href)}`
                  }
                  onClick={() => {
                    handleMobileSidebar()
                    setNavbarOpen(!navbarOpen)
                    setTitle(item?.name)
                  }}
                >
                  <item.icon size={24} className='flex-shrink-0' />
                  {!sideBarOpen && item.name}
                </NavLink>
              ) : (
                <>
                  <button
                    className={`text-white text-base leading-6 text-left font-semibold flex items-center w-full ${!sideBarOpen ? 'justify-start' : 'justify-center'
                      } gap-3 ${!sideBarOpen ? 'px-5' : 'px-2'} py-[10px] rounded-lg ${openDropdown === item.name ? 'bg-primary-blue/10' : ''
                      }`}
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <item.icon size={24} className='flex-shrink-0' />
                    {!sideBarOpen && item.name}
                    {!sideBarOpen && (
                      <IoIosArrowDown
                        size={16}
                        className={`flex-shrink-0 ml-auto transition-transform ${openDropdown === item.name ? 'rotate-180' : 'rotate-0'}`}
                      />
                    )}
                  </button>
                  {openDropdown === item?.name && !sideBarOpen && (
                    <div className={`transition-all duration-600`}>
                      <ul className='pl-5 pt-4'>
                        {item?.subMenuItems?.map((subItem, index) => {
                          const isLastItem = index === item?.subMenuItems.length - 1
                          return (
                            <li key={subItem.name} className={`${isLastItem ? 'mb-0' : 'mb-4'} relative`}>
                              <NavLink
                                to={subItem?.href}
                                // className='text-white text-base leading-6 font-semibold py-[10px] px-5 block rounded-lg'
                                className={({ isActive }) =>
                                  `text-white text-base leading-6 font-semibold py-[10px] px-5 block  ${isActive ? 'bg-primary-blue ' : ''} rounded-lg ${getDropdownNavItemClass(subItem.href)}`
                                }
                                onClick={() => {
                                  handleMobileSidebar()
                                  setNavbarOpen(!navbarOpen)
                                  setTitle(subItem?.name)
                                }}
                              >
                                {subItem?.name}
                              </NavLink>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
          {/* <li className={`mb-4 ${getNavItemClass('/commonelements')}`}>
            <NavLink
              to='/commonelements'
              className={({ isActive }) =>
                `text-white text-base leading-6 font-semibold flex items-center ${
                  !sideBarOpen ? 'justify-start' : 'justify-center'
                } gap-3 ${!sideBarOpen ? 'px-5' : 'px-2'} py-[10px] ${isActive ? 'bg-primary-blue' : ''} rounded-lg`
              }
            >
              Common Elements
            </NavLink>
          </li> */}
          <li className='py-6 block w-full px-2 lg:hidden relative before:w-[calc(100%-48px)] before:h-[1px] before:bg-light-grey before:absolute before:top-0 before:left-0 before:right-0 before:mx-auto'>
            <button
              className={`text-white text-base leading-6 font-semibold flex items-center w-full ${!sideBarOpen ? 'justify-start' : 'justify-center'
                } gap-3 ${!sideBarOpen ? 'px-5' : 'px-2'} py-[10px] rounded-lg ${openDropdown === 'profile' ? 'bg-primary-blue/10' : ''
                }`}
              onClick={() => toggleDropdown('profile')}
            >
              <div
                className={'md:w-10 md:h-10 sm:w-8 sm:h-8 rounded-full bg-[#F7F7FC] flex items-center justify-center'}
              >
                {userProfile ? (
                  <img src={userProfile} alt='userprofile' width={40} height={40} />
                ) : (
                  <FaUser fontSize={'20px'} />
                )}
              </div>
              <Paragraph text16 className={'font-semibold'}>
                {user?.first_name} {user?.last_name}
              </Paragraph>
              {!sideBarOpen && (
                <IoIosArrowDown
                  size={16}
                  className={`ml-auto transition-transform ${openDropdown === 'profile' ? 'rotate-180' : 'rotate-0'}`}
                />
              )}
            </button>
            {openDropdown === 'profile' && !sideBarOpen && (
              <div
                className={`${openDropdown === 'profile' ? 'max-h-screen' : 'max-h-0'
                  } overflow-hidden transition-all duration-300`}
              >
                <ul className='pl-0 pt-4'>
                  {mobileViewDropdownItems?.map((item) => (
                    <li className={`mb-4 ${getNavItemClass(item.href)}`}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `text-white text-base leading-6 font-semibold py-[10px] px-5 block rounded-lg ${isActive ? 'bg-primary-blue' : ''} ${getDropdownNavItemClass(item.href)}`
                        }
                        onClick={() => {
                          handleMobileSidebar()
                          setNavbarOpen(!navbarOpen)
                          setTitle(item?.name)
                        }}
                      >
                        {!sideBarOpen && item.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
          <li className='block w-full px-2 lg:hidden'>
            <button
              className={`text-white text-base leading-6 font-semibold flex items-center w-full ${!sideBarOpen ? 'justify-start' : 'justify-center'
                } gap-3 px-5 py-[10px] rounded-lg`}
              onClick={() => setIsLogoutModalOpen(true)}
            >
              <RiLogoutCircleRLine size={20} />
              {!sideBarOpen && 'Log Out'}
              {isLogoutModalOpen && (
                <Logout handleLogoutClose={handleLogoutClose} isLogoutModalOpen={isLogoutModalOpen} />
              )}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default SideBar
