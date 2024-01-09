import React from 'react'
import { createPortal } from 'react-dom'
import { AiOutlineClose } from 'react-icons/ai'

const Modals = ({onClose,isOpen,children}) => {
  return  createPortal(
    <>{isOpen && 
    (
        <div className='h-screen backdrop-blur grid place-items-center w-screen top-0 absolute z-40'>        
    <div className='m-auto relative z-50 min-h-[200px] min-w-[80%] bg-white p-4'>
        <div className='flex justify-end'>
            <AiOutlineClose onClick={onClose} className='text-2xl cursor-pointer '/>
        </div>
        {children}
    </div>
    
    </div>
        )}
    </>,
    document.getElementById('modal-root')
  )
}

export default Modals