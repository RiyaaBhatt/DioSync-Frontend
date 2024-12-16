import React, { useEffect, useRef, useState } from 'react'
import Button from '../../components/core/formComponents/Button'
import { Form, Formik } from 'formik'
import Paragraph from '../../components/core/typography/Paragraph'
import AuthLeftWrapper from '../../components/containers/AuthLeftWrapper'
import Logo from '../../assets/images/logo.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import { ForgotPassword, OtpVerification } from '../../services/authService'
import { paths } from '../../routes/path'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../redux/slices/siteLoaderSlice'
import { HiOutlineArrowLeft } from 'react-icons/hi2'

let timerId

const OTP = () => {
  const inputRefs = useRef([])
  const dispatch = useDispatch()
  const { state } = useLocation()
  const navigate = useNavigate()
  const [countDown, setCountDown] = useState(120)
  const [otp, setOtp] = useState(Array(6).fill(''))
  const [showResendOtp, setShowResendOtp] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if (countDown < 0 && timerId) {
      setCountDown(0)
    }

    timerId = setInterval(() => {
      setCountDown((prevCount) => prevCount - 1)
    }, 1000)
    if (countDown < 0 && timerId) {
      setShowResendOtp(true)
      setCountDown(0)
    }

    return () => clearInterval(timerId)
  }, [countDown])

  useEffect(() => {
    if (!state?.email) {
      navigate(paths?.auth?.forgotPassword)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.email])

  const handleChange = (e, index) => {
    const { value } = e.target
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1].focus()
      }
    } else {
      e.target.value = ''
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index] === '') {
        if (index > 0) {
          inputRefs.current[index - 1].focus()
        }
      } else {
        const newOtp = [...otp]
        newOtp[index] = ''
        setOtp(newOtp)
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('')
    const newOtp = [...otp]
    pasteData.forEach((char, index) => {
      if (/^[0-9]$/.test(char) && index < inputRefs.current.length) {
        newOtp[index] = char
      }
    })
    setOtp(newOtp)
    if (pasteData.length > 0) {
      inputRefs.current[Math.min(pasteData.length, inputRefs.current.length) - 1].focus()
    }
  }

  const handleResendCode = async () => {
    setShowResendOtp(false)
    setCountDown(120)
    await ForgotPassword({
      email: state.email,
    })
  }

  const OnSubmit = async () => {
    dispatch(showLoader())
    if (otp?.join?.('')?.length === 6 && state.email && typeof state.email === 'string') {
      setErrorMessage('')
      const params = {
        email: state.email,
        otp: String(otp?.join?.('')),
      }
      OtpVerification(params).then((response) => {
        const { success, data, status } = response.data
        if (success && status === 200) {
          navigate('/add-new-password', {
            state: { secret: data?.secret },
          })
        } else {
          setOtp(Array(6).fill(''))
        }
      })
    } else {
      setErrorMessage('Please enter OTP')
    }
    dispatch(hideLoader())
  }

  return (
    <div className='bg-site-black lg:p-6 sm:p-4 p-3 min-h-screen'>
      <div className='bg-white rounded-2xl md:rounded-3xl p-3 sm:p-4 lg:p-8 lg:min-h-[calc(100vh-48px)] sm:min-h-[calc(100vh-32px)] min-h-[calc(100vh-24px)]'>
        <div className='grid grid-cols-12 h-full lg:gap-6 gap-3'>
          <div className='col-span-6 h-full md:block hidden'>
            <AuthLeftWrapper />
          </div>
          <div className='md:col-span-6 sm:col-span-10 col-span-12 md:col-start-7 sm:col-start-2'>
            <div className='flex items-start justify-center flex-col md:min-h-full min-h-[calc(100vh-64px)] xxl:ps-[88px] xl:ps-[20px]  ps-0'>
              <div className='mb-8 md:hidden block'>
                <img src={Logo} alt='logo' width='32px' height='32px' />
              </div>
              <div className={`flex items-center gap-2`}>
                <button
                  className={`rounded-full flex items-center justify-center relative`}
                  onClick={() => navigate(paths?.auth?.forgotPassword)}
                >
                  <HiOutlineArrowLeft size={18} />
                </button>
                <Paragraph text24 className={'mb-2'}>
                  Enter verification code
                </Paragraph>
              </div>
              <Paragraph text12 className={'md:mb-10 mb-5'}>
                An authentication code has been sent to {state?.email ?? ''}
              </Paragraph>
              <Formik initialValues={{ otp: '' }} onSubmit={() => OnSubmit()}>
                {({ isSubmitting }) => (
                  <Form className='xl:w-[510px] w-full'>
                    <div className='grid grid-cols-12 gap-4'>
                      <div className='col-span-12 sm:mb-6 mb-3'>
                        <div className='flex sm:gap-3 gap-2 justify-between'>
                          {Array(6)
                            .fill(0)
                            .map((_, index) => (
                              <input
                                key={index}
                                type='text'
                                maxLength='1'
                                className='text-site-black text-base leading-6 font-semibold xl:w-[75px] xl:h-[56px] lg:w-[60px] lg:h-[50px] md:w-[48px] md:h-[40px] sm:w-[60px] sm:h-[50px] w-[38px] h-[30px] text-center bg-light-grey px-3 py-4 rounded-lg border border-light-grey focus:outline-0 focus:border-primary-blue'
                                value={otp[index]}
                                ref={(el) => (inputRefs.current[index] = el)}
                                onChange={(e) => handleChange(e, index)}
                                onKeyDown={(e) => handleKeyDown(e, index)}
                                onPaste={handlePaste}
                              />
                            ))}
                        </div>
                        {errorMessage && <div className='text-site-red text-sm font-medium'>{errorMessage}</div>}
                      </div>
                      {showResendOtp && (
                        <div className='col-span-12 text-center sm:mb-6 mb-3'>
                          <Paragraph text16 className={'text-dark-grey'}>
                            Didn't receive code?{' '}
                            <button
                              className='text-site-black font-bold hover:text-primary-blue transition-all duration-300'
                              onClick={handleResendCode}
                            >
                              Resend code
                            </button>
                          </Paragraph>
                        </div>
                      )}
                      <div className='col-span-12'>
                        <Button primary className={'w-full lg:!py-3'} type='submit' disabled={isSubmitting}>
                          Verify
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OTP
