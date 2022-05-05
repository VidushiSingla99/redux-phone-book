import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {useSelector, useDispatch} from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router";

export const EditContact = () => {
  const dispatch = useDispatch();
  const history = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
    const{ id } = useParams();
    const contacts = useSelector((state) => state);
    const currentContact=contacts.find(contact => contact.id === parseInt(id));

    useEffect(()=>{

      if(currentContact){
        setName(currentContact.name);
        setEmail(currentContact.email);
        setNumber(currentContact.number);
      }
    }, [currentContact]);

    const handleSubmit = (e) => {
      e.preventDefault();
      const checkEmail = contacts.find(
        (contact) => contact.id !==parseInt(id) && contact.email === email && email
      );
      const checkNumber = contacts.find(
        (contact) => contact.id !==parseInt(id) && contact.number === parseInt(number) && number
      );
      if (!email || !number || !name) {
        return toast.warning("Fill in all required fields");
      }
      if (checkEmail) {
        return toast.error("Email already in use");
      }
      if (checkNumber) {
        return toast.error("Number already in use");
      }

      const data={
        id:parseInt(id),
        name,
        email,
        number
      }

      dispatch({type: 'UPDATE_CONTACT', payload: data});
      toast.success("Entered Successfully");
      history("/")};


  return (
    <div className="container">
    {currentContact?(
      <>
      <div className="row">
        <h1 className="display-3 text-center">Edit Student {id} </h1>
        <div className="col-md-6 shadow mx-auto p-5 ">
          <form onSubmit={handleSubmit}>
            <div className="form-group m-3">
              <input type="text" placeholder="Name" className='form-control'  value={name}
                onChange={(e) => setName(e.target.value)}/>
            </div>
            <div className="form-group m-3">
              <input type="email" placeholder="Email" className='form-control'  value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="form-group m-3">
              <input type="number" placeholder="Phone number" className='form-control'   value={number}
                onChange={(e) => setNumber(e.target.value)}/>
            </div>
            <div className="d-flex justify-content-between">
            <div className="form-group m-3">
              <input type="submit" value="Update Student" className='btn btn-dark'/>
            </div>
            <Link to="/" className="btn btn-danger m-3">
             Cancel
            </Link>
            </div>
          </form>
        </div>
      </div>
      </>
    ):(<h1 className="display-3 text-center">Studentcontact {id} does not exist </h1>)}
    </div>
  )
}
