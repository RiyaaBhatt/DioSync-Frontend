import { Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import FormLabel from '../../../../components/core/typography/FormLabel'
import InputType from '../../../../components/core/formComponents/InputType'
import Button from '../../../../components/core/formComponents/Button'
import TextArea from '../../../../components/core/formComponents/TextArea'
import { EditGeneralSettings, GetGeneralSettings } from '../../../../services/settingsService'
import { generalSettingsValidationSchema } from '../../../../validations/admin/generalSettingValidationSchema'
import { useDispatch } from 'react-redux'
import { hideLoader, showLoader } from '../../../../redux/slices/siteLoaderSlice'
import { setCompany } from '../../../../redux/slices/companySlice'

function GeneralSettings() {
  const dispatch = useDispatch()
  const [defaultInitialValues, setDefaultInitialValues] = useState({
    support_name: '',
    support_email: '',
    address: '',
    phone_number: '',
    android_version: '',
    ios_version: '',
    site_title: '',
    copyright_text: '',
    date_format: '',
  })

  const fetchSettings = async () => {
    try {
      const response = await GetGeneralSettings()
      // console.log("fetch settings detail ", response);
      if (response?.data?.data) {
        setDefaultInitialValues({ ...response?.data?.data })
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  useEffect(() => {
    // console.log("general seettings");
    fetchSettings()
  }, [])

  const OnSubmit = async (data) => {
    console.log("submiting");
    dispatch(showLoader())
    const response = await EditGeneralSettings(data)
    console.log("res from backedn", response);
    dispatch(setCompany(response.data.data.site_title))
    if (response?.status == 200) {
      console.log("res get 200");
      fetchSettings()
    }
    dispatch(hideLoader())
  }
  return (
    <Formik
      enableReinitialize
      initialValues={defaultInitialValues}
      validationSchema={generalSettingsValidationSchema}
      onSubmit={OnSubmit}
    >
      {({ isSubmitting, handleBlur }) => (
        <Form className='grid grid-cols-12 gap-4'>
          {/* {console.log("hi iam submitting = ", isSubmitting)} */}
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Support name</FormLabel>
            <InputType placeholder='Type here' type='text' name='support_name' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Support email</FormLabel>
            <InputType placeholder='Type here' type='text' name='support_email' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Android version</FormLabel>
            <InputType placeholder='Type here' type='text' name='android_version' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Ios version</FormLabel>
            <InputType placeholder='Type here' type='text' name='ios_version' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Site title</FormLabel>
            <InputType placeholder='Type here' type='text' name='site_title' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Phone number</FormLabel>
            <InputType placeholder='Type here' type='number' name='phone_number' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Address</FormLabel>
            <TextArea placeholder='Type here' name='address' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Copyright text</FormLabel>
            <TextArea placeholder='Type here' name='copyright_text' onBlur={handleBlur} />
          </div>
          <div className='md:col-span-6 col-span-12'>
            <FormLabel>Date format</FormLabel>
            <InputType placeholder='Type here' type='date' name='date_format' onBlur={handleBlur} />
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

export default GeneralSettings
