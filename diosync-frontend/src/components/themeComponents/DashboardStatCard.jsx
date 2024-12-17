import React, { useEffect, useRef, useState } from 'react'
import { LuChevronDown, LuChevronUp, LuInfo } from 'react-icons/lu'
import { PiArrowDownBold, PiArrowUpBold } from 'react-icons/pi'
import Paragraph from '../core/typography/Paragraph'
import ToolTip from '../core/ToolTip'

function DashboardStatCard({ children, className, expandableItem, expandableBG, tooltipPosition, ...props }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef(null)
  const [height, setHeight] = useState('56px')
  const handleExpand = () => {
    setOpen(!open)
  }
  useEffect(() => {
    if (contentRef.current) {
      if (open) {
        setHeight(`${contentRef.current.scrollHeight + 56}px`)
      } else {
        setHeight('56px')
      }
    }
  }, [open])
  return (
    <div
      className={`${className ? className : ''} flex flex-col justify-between gap-3 p-3 rounded-lg relative 
      ${props.expandable ? 'mb-10' : 'h-full'} `}
    >
      <div className='flex items-center justify-between  gap-4'>
        {props.icon && (
          <div className='bg-white rounded-full w-10 h-10 inline-flex items-center justify-center flex-shrink-0'>
            {props.icon}
          </div>
        )}
        <div className='inline-flex items-center justify-between gap-3'>
          {props.increasedValue && (
            <span className='inline-flex items-center gap-[2px] bg-[#00A5111A] px-2 py-1 rounded-[30px] text-site-green text-sm leading-[15px] font-semibold'>
              <PiArrowUpBold />
              {props.increasedValue}
            </span>
          )}
          {props.value && (
            <span
              className={`inline-flex items-center gap-[2px] px-2 py-1 rounded-[30px] ${props?.isUp ? `text-site-green bg-[#00A5111A]` : `text-site-red bg-site-red/10`} text-sm leading-[15px] font-semibold`}
            >
              {props?.isUp ? <PiArrowUpBold /> : <PiArrowDownBold />}
              {props.value}
            </span>
          )}

          {props.tooltip && (
            <ToolTip tooltip={props.tooltip} position={tooltipPosition ?? ''}>
              <LuInfo fontSize={'20px'} />
            </ToolTip>
          )}
        </div>
      </div>
      <div>
        <div className='flex items-center gap-2 justify-between'>
          <div className='flex items-center gap-[6px]'>
            {props.statValueLabel ? (
              <Paragraph text14 className={'mb-1'}>
                {props.statValueLabel}
              </Paragraph>
            ) : (
              ''
            )}
            <Paragraph text24 className={'mb-1'}>
              {props.statValue}
            </Paragraph>
          </div>
          {props?.unitLabel ? (
            <div className='flex items-center gap-[6px]'>
              {props.unitLabel ? (
                <Paragraph text14 className={''}>
                  {props.unitLabel}
                </Paragraph>
              ) : (
                ''
              )}
              <Paragraph text24 className={'mb-1'}>
                {props.unitValue}
              </Paragraph>
            </div>
          ) : (
            ''
          )}
        </div>
        <Paragraph text14 className={'text-dark-grey'}>
          {props.statName}
        </Paragraph>
      </div>
      {props.expandable && (
        <div
          className={`${expandableBG ? expandableBG : ''
            } expandable-div absolute w-full left-0 top-full -mt-4 p-4 rounded-b-lg z-10 transition-[max-height] duration-500 ease-in-out overflow-hidden `}
          ref={contentRef}
          style={{ maxHeight: height }}
        >
          {open && (
            <div className='border-t border-medium-grey pt-2'>
              {expandableItem.map((item) => {
                return (
                  <div className='mb-2'>
                    <Paragraph text14 className={'text-dark-grey'}>
                      {item?.label}
                    </Paragraph>
                    <Paragraph text20 className={'text-site-black'}>
                      {item?.value ?? 0}
                    </Paragraph>
                  </div>
                )
              })}
            </div>
          )}
          {expandableItem?.length > 0 && (
            <button className='w-full flex justify-center' onClick={handleExpand}>
              {open ? <LuChevronUp fontSize={'24px'} /> : <LuChevronDown fontSize={'24px'} />}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

export default DashboardStatCard
