import React from 'react'
import Modal from '../../components/core/Modal'
import Paragraph from '../../components/core/typography/Paragraph'
import Button from '../../components/core/formComponents/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  refreshTokenSelector,
  setRefreshToken,
  setToken,
  setUserType,
  tokenSelector,
} from '../../redux/slices/userSlice'
import { LogoutApi } from '../../services/authService'
import { useNavigate } from 'react-router-dom'
import { paths } from '../../routes/path'
import { hideLoader, showLoader } from '../../redux/slices/siteLoaderSlice'
import { setActiveVenue, setVenueData } from '../../redux/slices/ownerVenueSlice'

const Logout = (props) => {
  const { isLogoutModalOpen, handleLogoutClose } = props
  const accessToken = useSelector(tokenSelector)
  const refreshToken = useSelector(refreshTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    let data = {
      access_token: accessToken,
      refresh_token: refreshToken,
    }
    const response = await LogoutApi(data)
       console.log(data)
    dispatch(showLoader())
    if (response?.status === 200) {
      dispatch(setToken(null))
      dispatch(setRefreshToken(null))
      dispatch(setUserType(null))
      dispatch(setVenueData(null))
      dispatch(setActiveVenue(null))

      navigate(paths.auth.login)
    }
    dispatch(hideLoader())
  }
  return (
    <>
      <Modal
        open={isLogoutModalOpen}
        onClose={handleLogoutClose}
        headingText={'Logout Confirmation'}
        width={'md:w-[700px]'}
      >
        <div>
          <Paragraph text18>{'Are you sure you want to logout?'}</Paragraph>
          <div className='mt-5 flex justify-end gap-4'>
            <Button primary onClick={handleLogout}>
              {'Confirm'}
            </Button>
            <Button secondary onClick={handleLogoutClose}>
              {'Cancel'}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default Logout
