// // import { ErrorMessage, useField } from 'formik'
// // import React, { useState } from 'react'
// // import { HiOutlineEyeSlash } from 'react-icons/hi2'
// // import { SlEye } from 'react-icons/sl'

// // function InputType({
// //   type,
// //   name,
// //   disabled,
// //   placeholder,
// //   icon,
// //   className,
// //   isCompulsory,
// //   ref,
// //   showError = true,
// //   ...props
// // }) {
// //   const [focused, setFocused] = useState(false)
// //   const [field] = useField(name)

// //   const onBlur = () => setFocused(false)
// //   const onFocus = () => setFocused(true)

// //   const [isVisible, setVisible] = useState(false)
// //   const toggle = () => {
// //     setVisible(!isVisible)
// //   }
// //   return (
// //     <div className={`form-control relative  ${props.fullWidth ? 'w-full flex-shrink' : 'flex-shrink-0'}`}>
// //       <input
// //         {...props}
// //         {...field}
// //         placeholder={placeholder ? placeholder : ''}
// //         ref={ref}
// //         name={name}
// //         onFocus={onFocus}
// //         onBlur={(e) => {
// //           field.onBlur(e)
// //           onBlur()
// //         }}
// //         disabled={disabled !== undefined ? disabled : false}
// //         type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
// //         className={`${focused || field.value ? 'hasFocus' : ''} appearance-none rounded-lg border border-medium-grey py-[11px] text-sm leading-6 font-semibold w-full focus:outline-0 focus:border-dark-grey placeholder:text-dark-grey placeholder:font-semibold text-site-black ${
// //           type === 'search' ? 'bg-search-icon bg-no-repeat bg-[left_16px_top_12px] ps-[48px] pe-3' : 'px-4'
// //         } ${className ? className : ''} `}
// //       />
// //       {type === 'password' && (
// //         <span className='absolute right-4 top-[13px] cursor-pointer' onClick={toggle}>
// //           {isVisible ? <HiOutlineEyeSlash size={20} color='#919297' /> : <SlEye size={20} color='#919297' />}
// //         </span>
// //       )}

// //       {showError && (
// //         <ErrorMessage name={name}>
// //           {(msg) => <div className='text-site-red text-sm font-medium'>{msg}</div>}
// //         </ErrorMessage>
// //       )}
// //     </div>
// //   )
// // }

// // export default InputType
// import React, { useState } from 'react';
// import { HiOutlineEyeSlash } from 'react-icons/hi2';
// import { SlEye } from 'react-icons/sl';

// function InputType({
//   type,
//   name,
//   disabled,
//   placeholder,
//   icon,
//   className,
//   isCompulsory,
//   value,
//   onChange,
//   onBlur,
//   onFocus,
//   showError = true,
//   errorMessage,
//   fullWidth = false,
//   ...props
// }) {
//   const [focused, setFocused] = useState(false);
//   const [isVisible, setVisible] = useState(false);

//   const toggleVisibility = () => setVisible(!isVisible);

//   return (
//     <div className={`form-control relative ${fullWidth ? 'w-full flex-shrink' : 'flex-shrink-0'}`}>
//       <input
//         {...props}
//         name={name}
//         value={value}
//         onChange={onChange}
//         onBlur={(e) => {
//           onBlur?.(e);
//           setFocused(false);
//         }}
//         onFocus={(e) => {
//           onFocus?.(e);
//           setFocused(true);
//         }}
//         placeholder={placeholder || ''}
//         disabled={disabled || false}
//         type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
//         className={`${focused || value ? 'hasFocus' : ''} appearance-none rounded-lg border border-medium-grey py-[11px] text-sm leading-6 font-semibold w-full focus:outline-0 focus:border-dark-grey placeholder:text-dark-grey placeholder:font-semibold text-site-black ${
//           type === 'search' ? 'bg-search-icon bg-no-repeat bg-[left_16px_top_12px] ps-[48px] pe-3' : 'px-4'
//         } ${className || ''}`}
//       />

//       {type === 'password' && (
//         <span className="absolute right-4 top-[13px] cursor-pointer" onClick={toggleVisibility}>
//           {isVisible ? <HiOutlineEyeSlash size={20} color="#919297" /> : <SlEye size={20} color="#919297" />}
//         </span>
//       )}

//       {showError && errorMessage && (
//         <div className="text-site-red text-sm font-medium">{errorMessage}</div>
//       )}
//     </div>
//   );
// }

// export default InputType;
// // 

import { ErrorMessage, useField } from 'formik'
import React, { useState } from 'react'
import { HiOutlineEyeSlash } from 'react-icons/hi2'
import { SlEye } from 'react-icons/sl'
 
function InputType({
  type,
  name,
  disabled,
  placeholder,
  icon,
  className,
  isCompulsory,
  ref,
  showError = true,
  ...props
}) {
  const [focused, setFocused] = useState(false)
  const [field] = useField(name)
 
  const onBlur = () => setFocused(false)
  const onFocus = () => setFocused(true)
 
  const [isVisible, setVisible] = useState(false)
  const toggle = () => {
    setVisible(!isVisible)
  }
  return (
    <div className={`form-control relative  ${props.fullWidth ? 'w-full flex-shrink' : 'flex-shrink-0'}`}>
      <input
        {...props}
        {...field}
        placeholder={placeholder ? placeholder : ''}
        ref={ref}
        name={name}
        onFocus={onFocus}
        onBlur={(e) => {
          field.onBlur(e)
          onBlur()
        }}
        disabled={disabled !== undefined ? disabled : false}
        type={type === 'password' ? (isVisible ? 'text' : 'password') : type}
        className={`${focused || field.value ? 'hasFocus' : ''} appearance-none rounded-lg border border-medium-grey py-[11px] text-sm leading-6 font-semibold w-full focus:outline-0 focus:border-dark-grey placeholder:text-dark-grey placeholder:font-semibold text-site-black ${
          type === 'search' ? 'bg-search-icon bg-no-repeat bg-[left_16px_top_12px] ps-[48px] pe-3' : 'px-4'
        } ${className ? className : ''} `}
      />
      {type === 'password' && (
        <span className='absolute right-4 top-[13px] cursor-pointer' onClick={toggle}>
          {isVisible ? <HiOutlineEyeSlash size={20} color='#919297' /> : <SlEye size={20} color='#919297' />}
        </span>
      )}
 
      {showError && (
        <ErrorMessage name={name}>
          {(msg) => <div className='text-site-red text-sm font-medium'>{msg}</div>}
        </ErrorMessage>
      )}
    </div>
  )
}
 
export default InputType