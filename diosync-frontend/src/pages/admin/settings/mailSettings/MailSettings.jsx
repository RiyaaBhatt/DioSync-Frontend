import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import FormLabel from '../../../../components/core/typography/FormLabel'
import InputType from '../../../../components/core/formComponents/InputType'
import Button from '../../../../components/core/formComponents/Button'
import { EditEmailSettings, GetMailSettings } from '../../../../services/settingsService'
import { emailSettingsValidationSchema } from '../../../../validations/admin/emailSettingValidationSchema'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../../redux/slices/siteLoaderSlice'

function MailSettings() {
  const dispatch = useDispatch()
  const [defaultInitialValues, setDefaultInitialValues] = useState({
    mail_driver: '',
    mail_host: '',
    mail_port: '',
    mail_username: '',
    mail_password: '',
    from_email: '',
  })

  const fetchSettings = async () => {
    try {
      const response = await GetMailSettings()
      if (response?.data?.data) {
        console.log(response.data);
        setDefaultInitialValues(response.data.data)
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  useEffect(() => {
    fetchSettings()
  }, [])

  const OnSubmit = async (data) => {
    dispatch(showLoader())
    const paramsData = {
      mail_driver: String(data?.mail_driver),
      mail_host: String(data?.mail_host),
      mail_port: String(data?.mail_port),
      mail_username: String(data?.mail_username),
      mail_password: String(data?.mail_password),
      from_email: String(data?.from_email),
    }
    const response = await EditEmailSettings(paramsData)
    if (response?.status === 200) {
      fetchSettings()
    }
    dispatch(hideLoader())
  }

  return (
    <Formik
      enableReinitialize
      initialValues={defaultInitialValues}
      validationSchema={emailSettingsValidationSchema}
      onSubmit={OnSubmit}
    >
      {({ isSubmitting, handleBlur }) => (
        <Form className='grid grid-cols-12 gap-4'>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Mail username</FormLabel>
            <InputType placeholder='Mail username' type='text' name='mail_username' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Mail password</FormLabel>
            <InputType placeholder='Mail password' type='text' name='mail_password' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Mail driver</FormLabel>
            <InputType placeholder='Mail driver' type='text' name='mail_driver' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Mail host</FormLabel>
            <InputType placeholder='Mail host' type='text' name='mail_host' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Mail port</FormLabel>
            <InputType placeholder='Mail port' type='number' name='mail_port' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>From email</FormLabel>
            <InputType placeholder='From email' type='text' name='from_email' onBlur={handleBlur} />
          </div>
          <div className='col-span-12 text-end'>
            <Button primary type='submit' disabled={isSubmitting}>
              Save
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default MailSettings
