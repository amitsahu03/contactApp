import React from 'react'
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine} from 'react-icons/ri'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { deleteDoc,doc } from 'firebase/firestore';
import {db} from '../config/firebase'
import AddAndUpdate from './AddAndUpdate';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

const Contactcard = ({contacts}) => {
    const {isOpen, onClose, onOpen} = useDisclouse();

   
  
 const deleteContact = async(id)=>{
try {
    await deleteDoc(doc(db, "contacts" , id))
    toast.success("Contact deleted Succesfully!")
} catch (error) {
    console.log(error);
}
 }


  return (
    <>
    <div key={contacts.id} className='bg-yellow flex items-center justify-between p-2 rounded-lg mt-2 '>
          <div className='flex gap-1'>
          <HiOutlineUserCircle className='text-4xl text-orange'/>
          
          <div className=''>
            <h2 className='font-medium'>{contacts.name}</h2>
            <p className='text-sm'>{contacts.email}</p>
          </div>
          </div>
          
          
          <div className='flex text-3xl'>
            <RiEditCircleLine onClick={onOpen} className='cursor-pointer'/>
            <IoMdTrash onClick={()=>deleteContact(contacts.id)} className='text-orange cursor-pointer'/>
          </div>
    </div>
    <AddAndUpdate contact={contacts} isUpdate isOpen={isOpen} onClose={onClose}/>
    </>

  )
}

export default Contactcard