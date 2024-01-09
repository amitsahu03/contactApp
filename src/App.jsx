import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { FaSearch } from "react-icons/fa";
import { AiFillPlusCircle } from "react-icons/ai";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Contactcard from "./components/contactcard";

import AddAndUpdate from "./components/AddAndUpdate";
import useDisclouse from "./hooks/useDisclouse";
import NotFound from "./components/NotFound";
const App = () => {
  const [contacts, setContacts] = useState([]);
  const {isOpen,onClose,onOpen} = useDisclouse()

  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db, "contacts");
        

        onSnapshot(contactRef, (snapshot)=>{
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });
          setContacts(contactList);
          return contactList
        })
        
      } catch (error) {
        console.log(error);
      }
    };
    getContacts();
  }, []);

  const filtercontacts = (e)=>{
    const value = e.target.value
    const contactRef = collection(db, "contacts");
        

        onSnapshot(contactRef, (snapshot)=>{
          const contactList = snapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data(),
            };
          });

          const filteredContact = contactList.filter((contacts)=>contacts.name.toLowerCase().includes(value.toLowerCase()))
          setContacts(filteredContact);
          return contactList
        })
  }

  return (
    <>
      <div className="max-w-[370px] mx-auto">
        <Navbar />
        <div className="flex gap-2">
          <div className=" flex items-center px-4 relative flex-grow">
            <FaSearch className="text-white text-3xl ml-2 absolute" />
            <input onChange={filtercontacts}
              type="text"
              className="bg-transparent border flex-grow  rounded-md h-10 border-white text-white pl-10"
            />
          </div>
          <div>
            <AiFillPlusCircle
              onClick={onOpen}
              className="text-5xl text-white cursor-pointer"
            />
          </div>
        </div>
        <div className="">
          {contacts<=0?<NotFound/>:contacts.map((contacts) => (
            <Contactcard key={contacts.id} contacts={contacts} />
          ))}
        </div>
      </div>
      <AddAndUpdate onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="bottom-center"/>
    </>
  );
};

export default App;
