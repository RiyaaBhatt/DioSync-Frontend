/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react'
import { IoArrowBackCircleSharp, IoNotificationsOutline } from 'react-icons/io5'
import { GrCart } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from '../core/formComponents/Dropdown'
import { FaUser } from 'react-icons/fa'
import userProfile from '../../assets/images/user_profile.png'
import { useLocation, useNavigate } from 'react-router-dom'
import Paragraph from '../core/typography/Paragraph'
import SelectType from '../core/formComponents/SelectType'
import productImage from '../../assets/images/product_item_one.svg'
import ListItem from '../themeComponents/ListItem'
import Button from '../core/formComponents/Button'
import Modal from '../core/Modal'
import RecordBreakage from '../../pages/inventory/RecordBreakage'
import { paths } from '../../routes/path'
import RecordTransfer from '../../pages/inventory/RecordTransfer'
import { setUser, userSelector, userTypeSelector } from '../../redux/slices/userSlice'
import { userRoles } from '../../constants/roleConstants'
import { BarManagerRoutes, BarOwnerRoutes, SuperAdminRoutes } from '../../routes/routes'
import ToolTip from '../core/ToolTip'
import { AiOutlineQuestionCircle } from 'react-icons/ai'
import Checkbox from '../core/formComponents/Checkbox'
import AddBarManager from '../../pages/settings/bar_manager/AddBarManager'
import { FiPlus } from 'react-icons/fi'
import noImage from '../../assets/images/noImg.png'

import NotificationItem from '../themeComponents/NotificationItem'
import { HiOutlineArrowLeft } from 'react-icons/hi2'
import OwnerVenueDropdown from '../ownerComponents/OwnerVenueDropdown'
import { GetCarts, GetNotifications } from '../../services/HeaderService'
import InfiniteScroll from 'react-infinite-scroll-component'
import { hideLoader, showLoader } from '../../redux/slices/siteLoaderSlice'
import { NotificationIconType } from '../../utils/commonHelper'
import { GetAdminGeneralData, GetGeneralData } from '../../services/commonService'
import AddStaffMember from '../../pages/settings/staff_manager/AddStaffMember'
import { showData } from '../../redux/slices/loadDataSlice'
import { activeVenueSelector } from '../../redux/slices/ownerVenueSlice'
import { GetUser } from '../../services/authService'
import { generalDataSelector, setGeneral } from '../../redux/slices/generalDataSlice'

function Header() {
  const { generalData } = useSelector(generalDataSelector)
  const activeVenue = useSelector(activeVenueSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(userSelector)
  const userType = useSelector(userTypeSelector)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const [popUpOpen, setPopUpOpen] = useState(false)
  const [popupType, setPopupType] = useState('')
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const location = useLocation()
  const divRef = useRef(null)
  const [isEmpty, setIsEmpty] = useState(false)
  const parentDivRef = useRef(null)
  const [isParentEmpty, setIsParentEmpty] = useState(false)
  const [showBackButton, setShowBackButton] = useState(false)
  const [lastSegment, setLastSegment] = useState('page')

  // const [generalData, setGeneralData] = useState()

  const [notificationsData, setNotificationsData] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1) // Track current page
  const itemsPerPage = 10

  const [cartData, setCartData] = useState([])
  const [cartPage] = useState(1) // Track current page

  useEffect(() => {
    const fetchData = async (activeVenue) => {
      dispatch(showLoader())

      try {
        const queryString = `?bar_vanue_id=${activeVenue}`
        const response = await GetGeneralData(queryString)
        if (response?.status === 200) {
          // setGeneralData(response?.data?.data)
          dispatch(setGeneral({ ...response?.data?.data }))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        dispatch(hideLoader()) // Hide loader after API call
      }
    }

    const fetchAdminGeneralData = async () => {
      dispatch(showLoader())

      try {
        const response = await GetAdminGeneralData()
        if (response?.status === 200) {
          dispatch(setGeneral({ ...response?.data?.data }))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        dispatch(hideLoader()) // Hide loader after API call
      }
    }

    if (activeVenue && activeVenue > 0) {
      fetchData(activeVenue)
    }
    if (location.pathname.includes('/admin')) {
      fetchAdminGeneralData()
    }
  }, [location.pathname, activeVenue])

  useEffect(() => {
    if (parentDivRef.current) {
      setIsParentEmpty(parentDivRef.current.innerHTML.trim() === '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parentDivRef.current]) // Ensure the hook runs when parentDivRef updates

  useEffect(() => {
    if (divRef.current) {
      setIsEmpty(divRef.current.innerHTML.trim() === '')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [divRef.current])

  useEffect(() => {
    if (isOpen === 'notification') {
      getNotifications(page)
    }
  }, [page])

  useEffect(() => {
    if (isOpen === 'cart') {
      getCartData(cartPage)
    }
  }, [cartPage])

  const openPopup = (type) => {
    setPopupType(type)
    setPopUpOpen(true)
  }
  const closePopup = () => {
    setPopUpOpen(false)
    setPopupType('')
    if (location?.pathname === paths?.owner?.inventory) {
      navigate(paths?.owner?.inventory)
      dispatch(showData())
    } else if (location?.pathname?.includes(paths?.manager?.inventory)) {
      navigate(paths?.manager?.inventory)
      dispatch(showData())
    } else if (location?.pathname?.includes(paths?.owner?.staffMember)) {
      navigate(paths?.owner?.staffMember)
      dispatch(showData())
    } else if (location?.pathname?.includes(paths?.manager?.staffMember)) {
      navigate(paths?.manager?.staffMember)
      dispatch(showData())
    } else if (location?.pathname?.includes(paths?.owner?.barManager)) {
      navigate(paths?.owner?.barManager)
      dispatch(showData())
    } else if (location?.pathname?.includes(paths?.manager?.barManager)) {
      navigate(paths?.manager?.barManager)
      dispatch(showData())
    }
  }

  useEffect(() => {
    let mounted = true
    if (mounted) {
      getUser()
    }
    return () => {
      mounted = false
    }
  }, [])

  const getUser = async () => {
    const userData = await GetUser()
    if (userData?.status === 200) {
      dispatch(setUser(userData?.data?.data))
    }
  }

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
    const matchingRoute = getLastSegment(location?.pathname)
    if (matchingRoute) {
      setShowBackButton(matchingRoute.isback)
      setLastSegment(matchingRoute.name)
    } else {
      setShowBackButton(false)
      setLastSegment('page')
    }
  }, [location?.pathname, userType])

  const getRoutesByRole = (role) => {
    switch (role) {
      case userRoles.Owner:
        return BarOwnerRoutes
      case userRoles.Manager:
        return BarManagerRoutes
      default:
        return SuperAdminRoutes
    }
  }
  const getLastSegment = (path) => {
    const routes = getRoutesByRole(userType)
    const matchingRoute = routes?.find((route) => {
      // Convert route.path to a regular expression, replacing dynamic segments with regex wildcards
      const regexPath = route.path.replace(/:[^/]+/g, '[^/]+')
      const regex = new RegExp(`^${regexPath}$`)
      return regex.test(path)
    })
    return matchingRoute
  }

  const dropdownItems = [
    {
      LinkName: 'Account',
      Link: paths.owner.account,
    },
    {
      LinkName: 'Reset Password',
      Link: paths.owner.resetPassword,
    },
    {
      LinkName: 'My Subscription',
      Link: paths?.owner.mySubscription,
    },
    {
      LinkName: 'Logout',
      Link: './login',
    },
  ]

  const managerDropdownItems = [
    {
      LinkName: 'Account',
      Link: paths.manager.account,
    },
    {
      LinkName: 'Reset Password',
      Link: paths.manager.resetPassword,
    },
    {
      LinkName: 'Logout',
      Link: './login',
    },
  ]

  const adminDropdownItems = [
    {
      LinkName: 'Account',
      Link: paths.admin.account,
    },
    {
      LinkName: 'Reset Password',
      Link: paths.admin.resetPassword,
    },
    {
      LinkName: 'Logout',
      Link: './login',
    },
  ]

  const profileDropDownItems =
    userType === userRoles.SuperAdmin
      ? adminDropdownItems
      : userType === userRoles.Owner
        ? dropdownItems
        : managerDropdownItems

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

  const toggleDropdown = (dropdown) => {
    setIsOpen((prevDropdown) => (prevDropdown === dropdown ? null : dropdown))
  }
  const closeDropdown = () => {
    setIsOpen(false)
  }
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      closeDropdown()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='grid grid-cols-12 md:gap-6 gap-5'>
      <div className='xxl:col-span-4 lg:col-span-4 md:col-span-5 col-span-12'>
        <div className={`${showBackButton ? 'flex' : ''} items-center gap-2`}>
          {showBackButton && (
            <button className={`rounded-full flex items-center justify-center relative`} onClick={() => navigate(-1)}>
              <HiOutlineArrowLeft size={18} />
            </button>
          )}
          <Paragraph text24>{lastSegment}</Paragraph>
          {(location?.pathname === paths.owner.dashboard || location?.pathname === paths.manager.dashboard) && (
            <Paragraph text16 className={'font-semibold text-dark-grey'}>
              Welcome back! {user?.first_name} {user?.last_name}
            </Paragraph>
          )}
        </div>
      </div>
      {!isParentEmpty && (
        <div className='xxl:col-span-8 lg:col-span-8 md:col-span-7 col-span-12' ref={parentDivRef}>
          {!isEmpty && (
            <div className='flex items-center justify-end md:gap-6 gap-3 md:flex-nowrap flex-wrap' ref={divRef}>
              {/* Inventory Buttons */}
              {(location?.pathname === paths.owner.inventory || location?.pathname === paths.manager.inventory) &&
                (windowWidth > 1199 || windowWidth < 992) && (
                  <>
                    <Button primary onClick={() => openPopup('transfer')} className={'w-full md:w-auto'}>
                      Record a transfer
                    </Button>
                    <Button secondary onClick={() => openPopup('breakage')} className={'w-full md:w-auto'}>
                      Record a breakage
                    </Button>
                  </>
                )}
              {location.pathname === paths.owner.barManager && (windowWidth > 1199 || windowWidth < 992) && (
                <Button primary onClick={() => openPopup('add_bar_member')} className={'w-full md:w-auto'}>
                  <FiPlus size={18} />
                  Add Bar Manager
                </Button>
              )}
              {location.pathname === (paths.owner.staffMember || paths.manager.staffMember) &&
                (windowWidth > 1199 || windowWidth < 992) && (
                  <Button primary onClick={() => openPopup('add_staff_member')} className={'w-full md:w-auto'}>
                    <FiPlus size={18} />
                    Add Bar Staff
                  </Button>
                )}
              {popupType === 'transfer' && (
                <Modal
                  open={popUpOpen}
                  onClose={closePopup}
                  header
                  headingText={'Record Transfer'}
                  width={'md:w-[700px]'}
                >
                  <RecordTransfer onClose={closePopup} />
                </Modal>
              )}
              {popupType === 'breakage' && (
                <Modal
                  open={popUpOpen}
                  onClose={closePopup}
                  header
                  headingText={'Record Breakage'}
                  width={'md:w-[700px]'}
                >
                  <RecordBreakage onClose={closePopup} />
                </Modal>
              )}
              {popupType === 'add_bar_member' && (
                <Modal open={popUpOpen} onClose={closePopup} header headingText={'Add Bar Manager'} width={'w-[760px]'}>
                  <AddBarManager onClose={closePopup} />
                </Modal>
              )}
              {popupType === 'add_staff_member' && (
                <Modal open={popUpOpen} onClose={closePopup} header headingText={'Add Bar Staff'} width={'w-[760px]'}>
                  <AddStaffMember onClose={closePopup} />
                </Modal>
              )}

              {(location?.pathname === paths?.owner?.dashboard ||
                location?.pathname === paths?.manager?.dashboard ||
                location?.pathname === paths?.owner?.historyInventory ||
                location?.pathname === paths?.manager?.historyInventory ||
                location?.pathname === paths?.owner?.stocks ||
                location?.pathname === paths?.owner?.sales ||
                location?.pathname === paths?.owner?.variances ||
                location?.pathname === paths?.owner?.purchase ||
                location?.pathname === paths?.manager?.stocks ||
                location?.pathname === paths?.manager?.sales ||
                location?.pathname === paths?.manager?.variances ||
                location?.pathname === paths?.manager?.purchase ||
                location?.pathname === paths?.owner?.historyInventory ||
                location?.pathname === paths?.owner?.historyOrders ||
                location?.pathname === paths?.owner?.historyInventory ||
                location?.pathname === paths?.manager?.historyOrders) && <OwnerVenueDropdown />}
              {windowWidth > 991 && (
                <div className='lg:flex hidden items-center justify-end gap-3 '>
                  {/* Notification Button */}
                  {userType !== userRoles.SuperAdmin && (
                    <div className='relative' ref={dropdownRef}>
                      <button
                        className={`md:w-10 md:h-10 sm:w-8 sm:h-8 ${isOpen === 'notification' ? 'bg-primary-blue' : 'bg-[#F7F7FC]'
                          } rounded-full flex items-center justify-center relative`}
                        onClick={() => {
                          getNotifications(page)
                          toggleDropdown('notification')
                        }}
                      >
                        <IoNotificationsOutline
                          fontSize={'20px'}
                          color={isOpen === 'notification' ? '#fff' : '#080808'}
                        />
                        {generalData?.notification_flag && (
                          <span className='absolute w-2 h-2 rounded-full bg-[#CB0303] border border-white top-[10px] right-[10px]'></span>
                        )}
                      </button>
                      {isOpen === 'notification' && (
                        <div className='origin-top-right p-5 absolute -right-2 mt-5 w-[500px] rounded-lg shadow-cardShadow bg-white z-10 min-w-[355px]'>
                          <div className='z-0 flex items-center justify-between gap-3 pb-3 relative before:border-transparent before:border-r-[12px] before:border-l-[12px] before:border-b-[16px] before:border-b-white before:absolute before:-top-8 before:-right-1 before:-z-[1]'>
                            <Paragraph text20>Notifications</Paragraph>
                            <span className='bg-light-grey text-dark-grey px-2 py-1 rounded-md text-sm'>
                              {notificationsData?.length}
                            </span>
                          </div>
                          <div className='max-h-[252px] overflow-y-auto' id={'scrollableDiv'}>
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
                  )}
                  {/* Cart Button */}
                  {userType !== userRoles.SuperAdmin && (
                    <div className='relative' ref={dropdownRef}>
                      <button
                        className={`md:w-10 md:h-10 sm:w-8 sm:h-8 ${isOpen === 'cart' ? 'bg-primary-blue' : 'bg-[#F7F7FC]'
                          } rounded-full flex items-center justify-center relative`}
                        onClick={() => {
                          toggleDropdown('cart')
                          getCartData(cartPage)
                        }}
                      >
                        <GrCart fontSize={'18px'} color={isOpen === 'cart' ? '#fff' : '#080808'} />
                        {generalData?.cart_count > 0 && (
                          <span className='absolute w-5 h-5 rounded-full bg-primary-blue text-white border border-white -top-[4px] -right-[4px] flex items-center justify-center text-xs'>
                            {generalData?.cart_count}
                          </span>
                        )}
                      </button>
                      {isOpen === 'cart' && (
                        <div className='origin-top-right p-5 absolute -right-2 mt-5 w-[238px] rounded-lg shadow-cardShadow bg-white z-10 min-w-[355px]'>
                          <div className='z-0 flex items-center justify-between gap-3 pb-3 relative before:border-transparent before:border-r-[12px] before:border-l-[12px] before:border-b-[16px] before:border-b-white before:absolute before:-top-8 before:-right-1 before:-z-[1]'>
                            <Paragraph text20>Cart</Paragraph>
                          </div>
                          <div className='sm:max-h-[300px] max-h-[220px] overflow-y-auto' id={'scrollableDivcart'}>
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
                          {cartData?.price > 0 && (
                            <div className='bg-light-grey p-4 rounded-lg flex items-center justify-between mb-5'>
                              <Paragraph text16 className={'font-bold'}>
                                Total Price
                              </Paragraph>
                              {cartData?.price && (
                                <Paragraph text16 className={'font-bold'}>
                                  {generalData?.currency ?? ''} {cartData?.price?.toFixed(2) ?? 0}
                                </Paragraph>
                              )}
                            </div>
                          )}
                          {cartData?.items?.length > 0 && (
                            <Button
                              primary
                              className={'w-full'}
                              onClick={() => {
                                closeDropdown()
                                navigate(paths.owner?.cart)
                              }}
                            >
                              Your Cart
                            </Button>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* User Profile Dropdown */}
                  <Dropdown
                    className={'lg:flex items-center justify-center hidden'}
                    dropdownItems={profileDropDownItems}
                    withChevron
                    onClick={() => toggleDropdown('userProfile')}
                    isOpen={isOpen}
                    closeDropdown={closeDropdown}
                  >
                    <div
                      className={
                        'md:w-10 md:h-10 sm:w-8 sm:h-8 rounded-full bg-[#F7F7FC] flex items-center justify-center'
                      }
                    >
                      {user?.profileImage ? (
                        <img src={user?.profileImage} alt='userprofile' width={40} height={40} />
                      ) : (
                        <FaUser fontSize={'20px'} />
                      )}
                    </div>
                    <Paragraph text16 className={'font-semibold truncate xxl:max-w-[80px] lg:max-w-[80px]'}>
                      {user?.first_name} {user?.last_name}
                    </Paragraph>
                  </Dropdown>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {(location.pathname === paths.owner.inventory || location.pathname === paths.manager.inventory) &&
        windowWidth < 1200 &&
        windowWidth > 991 && (
          <div className='col-span-12'>
            <div className='flex items-center justify-end md:gap-6 gap-3 md:flex-nowrap flex-wrap'>
              <Button primary onClick={() => openPopup('transfer')} className={'w-full xl:w-auto'}>
                Record a transfer
              </Button>
              <Button secondary onClick={() => openPopup('breakage')} className={'w-full xl:w-auto'}>
                Record a breakage
              </Button>
            </div>
          </div>
        )}
      {location.pathname === paths.owner.barManager && windowWidth < 1200 && windowWidth > 991 && (
        <div className='col-span-12'>
          <Button primary onClick={() => openPopup('add_bar_member')} className={'w-full xl:w-auto'}>
            <FiPlus size={18} />
            Add Bar Manager
          </Button>
        </div>
      )}
      {(location.pathname === paths.owner.staffMember || location.pathname === paths.manager.staffMember) &&
        windowWidth < 1200 &&
        windowWidth > 991 && (
          <div className='col-span-12'>
            <Button primary onClick={() => openPopup('add_staff_member')} className={'w-full xl:w-auto'}>
              <FiPlus size={18} />
              Add Bar Staff
            </Button>
          </div>
        )}
    </div>
  )
}

export default Header
