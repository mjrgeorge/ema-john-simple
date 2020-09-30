import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { UserContext } from '../../App';
import './Shipment.css';

const Shipment = () => {

  const { register, handleSubmit, watch, errors } = useForm();
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const onSubmit = data => {
    console.log('From submitted data', data);
  };

return (
  <form className='ship-form' onSubmit={handleSubmit(onSubmit)}>
    <input name="name" defaultValue={loggedInUser.name} ref={register({required:true})} placeholder="Enter Your Name"/>
    {errors.name && <span className="error">Name is required</span>}

    <input name="phone" defaultValue={loggedInUser.email} ref={register({required:true})} placeholder="Enter Your Email"/>
    {errors.name && <span className="error">Email is required</span>}

    <input name="address" ref={register({required:true})} placeholder="Enter Your Address"/>
    {errors.name && <span className="error">Address is required</span>}

    <input name="phone" ref={register({required:true})} placeholder="Enter Your Phone"/>
    {errors.name && <span className="error">Phone is required</span>}
    <input type="submit" />
  </form>
);
};

export default Shipment;