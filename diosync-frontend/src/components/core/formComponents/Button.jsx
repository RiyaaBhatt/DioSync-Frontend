// import React from 'react'
// import classNames from 'classnames'

// function Button({
//   type,
//   loader,
//   children,
//   className,
//   primary,
//   secondary,
//   onlyIcon,
//   lightBlueBg,
//   greyBg,
//   disabled,
//   ...props
// }) {
//   const classes = classNames(
//     'rounded-lg inline-flex items-center justify-center gap-[10px] border transition-all duration-700 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none text-base font-semibold whitespace-nowrap',
//     {
//       'bg-primary-blue text-white border-primary-blue hover:text-site-black hover:bg-white hover:border-medium-grey ':
//         primary,
//       'bg-[#fff] text-site-black hover:text-white hover:bg-primary-blue': secondary,
//       'bg-light-blue text-primary-blue hover:text-white hover:bg-primary-blue focus:text-white focus:bg-primary-blue':
//         lightBlueBg,
//       'bg-light-grey text-site-black': greyBg,
//       'w-10 h-10 !px-0 !py-0 border-0': onlyIcon,
//       'bg-light-grey text-dark-grey': disabled,
//     },
//   )
//   return (
//     <button
//       className={`${className ? className : ''} ${classes} ${props?.small ? 'px-[14px] py-[6px] text-xs leading-[18px]' : 'px-[16px] py-[7px] text-base leading-[24px]'}`}
//       type={type}
//       disabled={loader || disabled}
//       {...props}
//     >
//       {children}
//     </button>
//   )
// }

// export default Button
import React from 'react'
import classNames from 'classnames'
 
function Button({
  type,
  loader,
  children,
  className,
  primary,
  secondary,
  onlyIcon,
  lightBlueBg,
  greyBg,
  disabled,
  ...props
}) {
  const classes = classNames(
    'rounded-lg inline-flex items-center justify-center gap-[10px] border transition-all duration-700 ease-in-out motion-reduce:transition-none motion-reduce:hover:transform-none text-base font-semibold whitespace-nowrap',
    {
      'bg-primary-blue text-white border-primary-blue hover:text-site-black hover:bg-white hover:border-medium-grey ':
        primary,
      'bg-[#fff] text-site-black hover:text-white hover:bg-primary-blue': secondary,
      'bg-light-blue text-primary-blue hover:text-white hover:bg-primary-blue focus:text-white focus:bg-primary-blue':
        lightBlueBg,
      'bg-light-grey text-site-black': greyBg,
      'w-10 h-10 !px-0 !py-0 border-0': onlyIcon,
      'bg-light-grey text-dark-grey': disabled,
    },
  )
  return (
    <button
      className={`${className ? className : ''} ${classes} ${props?.small ? 'px-[14px] py-[6px] text-xs leading-[18px]' : 'px-[16px] py-[7px] text-base leading-[24px]'}`}
      type={type}
      disabled={loader || disabled}
      {...props}
    >
      {children}
    </button>
  )
}
 
export default Button