import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from "react-router";

export const AddContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const contacts = useSelector((state) => state);
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkEmail = contacts.find(
      (contact) => contact.email === email && email
    );
    const checkNumber = contacts.find(
      (contact) => contact.number === parseInt(number) && number
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
      id:contacts[contacts.length-1].id+1,
      name,
      email,
      number
    }

    dispatch({type: 'ADD_CONTACT', payload: data});
    toast.success("Entered Successfully");
    history("/");
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="display-3 text-center">Add Student</h1>
        <div className="col-md-6 shadow mx-auto p-5 ">
          <form onSubmit={handleSubmit}>
            <div className="form-group m-3">
              <input
                type="text"
                placeholder="Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group m-3">
              <input
                type="email"
                placeholder="Email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group m-3">
              <input
                type="number"
                placeholder="Phone number"
                className="form-control"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
            <div className="form-group m-3">
              <input
                type="submit"
                value="Add Student"
                className="btn btn-block btn-dark"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
