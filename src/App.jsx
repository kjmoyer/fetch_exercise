import '../public/index.css'
import React, { useState, useEffect } from 'react';
import Modal from './Modal.jsx';
import axios from 'axios';

function App() {

const [occupations, setOccupations] = useState([]);
const [states, setStates] = useState([]);
const [newUser, setNewUser] = useState({});
const [showModal, setShowModal] = useState(false);

useEffect(() => {
  axios.get(`https://frontend-take-home.fetchrewards.com/form`)
    .then(({ data }) => {
      let sortedOcc = data.occupations.sort();
      setOccupations(sortedOcc);
      setStates(data.states);
    })
    .catch((err) => {
      console.log(err);
    })
}, [])

const submitUserForm = (e) => {
  e.preventDefault();
  const fields = e.target.elements;
  const newUser = {
    name: fields.fullName.value,
    email: fields.email.value,
    password: fields.password.value,
    occupation: fields.occupation.value,
    state: fields.state.value,
  }
  axios.post(`https://frontend-take-home.fetchrewards.com/form`, newUser)
    .then((response) => {
      e.target.reset();
      toggleModal();
    })
    .catch((err) => {
      console.log(err);
    })
}

const toggleModal = () => {
  const newDisplay = showModal === false ? true : false;
  setShowModal(newDisplay);
}

  return (
    <div className='App'>
      <h2 className='header'>User Input</h2>
      <form id='inputForm' onSubmit={submitUserForm}>
        <label htmlFor='fullName' className='label'>Full Name</label>
        <input type='text' id='fullName' className='input' placeholder='John Doe' required></input>
        <label htmlFor='email' className='label'>Email</label>
        <input type='email' id='email' className='input' placeholder='John.Doe@gmail.com' required></input>
        <label htmlFor='password' className='label'>Password</label>
        <input type='password' id='password' className='input' required></input>
        <label htmlFor='occupation' className='label'>Occupation</label>
        <select name='occupation' id='occupation' className='input' required>
          {occupations.map((occupation) => {
            return <option key={occupation} value={occupation}>{occupation}</option>
          })}
        </select>
        <label htmlFor='state' className='label'>State</label>
        <select name='state' id='state' className='input' required>
          {states.map((state) => {
            return <option key={state.abbreviation} value={state}>{state.abbreviation}</option>
          })}
        </select>
        <button className='button'>Submit</button>
      </form>
      <Modal display={showModal} toggleModal={toggleModal}/>
    </div>
  );
}

export default App;
