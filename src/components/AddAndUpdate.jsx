import React from "react";
import Modals from "./Modals";
import { Field, Formik, Form, ErrorMessage } from "formik";
import { addDoc, collection, updateDoc ,doc } from "firebase/firestore";
import { db } from "../config/firebase.js"
import { toast } from "react-toastify";
import * as Yup from 'yup'

const contactSchemaValidation = Yup.object().shape(
    {name:Yup.string().required("Required Field"),
    email:Yup.string().email("Invalid").required("Required Field")
}
)

const AddAndUpdate = ({contact ,isUpdate, isOpen, onClose }) => {
    const AddContact = async(contacts)=>{
        try {
            const ContactRef = collection(db , "contacts")
            await addDoc(ContactRef , contacts)
            onClose()
            toast.success("Contact Added Succesfully!")
            
        } catch (error) {
            console.log(error);
        }
    
    }
    const UpdateContact = async(contacts ,id)=>{
        try {
            const ContactRef = doc(db , "contacts" ,id)
            await updateDoc(ContactRef , contacts)
            onClose()
            toast.success("Contact Updated Succesfully!")
            
        } catch (error) {
            console.log(error);
        }
    
    }


  return (
    <div>
      <Modals isOpen={isOpen} onClose={onClose}>
        <Formik validationSchema={contactSchemaValidation} 
        initialValues={
            
            isUpdate ?
            {
                name:contact.name,
                email:contact.email
            }
            :
            {
                name:"",
                email:""
            }
             }
             onSubmit={(values)=>{
                console.log(values)
                isUpdate?
                UpdateContact(values,contact.id)
                :
                AddContact(values)
             }}
             >
          <Form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="name">
                Name
              </label>
              <Field className="border h-10" name="name" />
              <div className="text-red-500 ">
                <ErrorMessage name = "name"/>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-bold" htmlFor="email">
                Email
              </label>
              <Field className="border h-10" name="email" />
              <div className="text-red-500">
                <ErrorMessage name = "email"/>
              </div>
            </div>
            <button className="border bg-orange px-3 py-1.5 mt-3 self-end">
              {" "}
              {isUpdate?"Update":"Add"} Contact
            </button>
          </Form>
        </Formik>
      </Modals>
    </div>
  );
};

export default AddAndUpdate;
