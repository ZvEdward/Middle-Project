import { useState,useContext } from "react"
import {  useCredentials } from '../../context'
import {useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import './SignUp.css'

function SignUp() {

const userContext = useCredentials()
const { register, handleSubmit, formState: { errors } } = useForm();
const CreateNewUser =userContext.createNewUser
const navigate = useNavigate()

  function OnSubmit(data) {
    const newUser = data
    newUser.favorites = []
    newUser.userID = ''
    newUser.pickUpTime =[]
    console.log(newUser);
    CreateNewUser(newUser)
    navigate('/')
    return alert('New user created!')
  }


  return (
    <>
    <div id="entire-page-signup">
      <h1>Sign up!</h1>
    <form onSubmit={handleSubmit(OnSubmit)} id="main-form-signup">
    <label>
      <p>Username:</p>
     <input type="text" placeholder="username" {...register('userName', { required: 'Username is required', validate: {
        minLength: (v) => v.length >= 5 || 'The username should have at least 5 characters',
        maxLength: (v) => v.length <= 15 || 'The username should have less than 15 characters',
        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v)||'Username must contain only letters, numbers and _',
      } })} />
  {errors.username?.message && (
    <small className="error-massage">{errors.userName.message}</small>)}
    </label>
    <label>
      <p>Password:</p>
     <input type="text" placeholder="password" {...register('password', { required: 'password is required', validate: {
        minLength: (v) => v.length >= 8 || 'The password should have at least 8 characters',
      }})} />
  {errors.password?.message && (
    <small className="error-massage">{errors.password.message}</small>)}
    </label>
    <label>
      <p>First name:</p>
     <input type="text" placeholder="first name" {...register('firstName', { required: 'first name is required', validate: {
        matchPattern: (v) => /^[a-zA-Z-]+$/.test(v)||'first name must contain only letters',
        maxLength: (v) => v.length <= 20 || 'The first name should have less than 20 characters',
      } })} />
      {errors.firstName?.message && (
    <small className="error-massage">{errors.firstName.message}</small> )}
    </label>
    <label>
      <p>Last name:</p>
     <input type="text" placeholder="last name" {...register('lastName', { required: 'last name is required', validate: {
        matchPattern: (v) => /^[a-zA-Z-]+$/.test(v)||'last name must contain only letters',
        maxLength: (v) => v.length <= 20 || 'The last name should have less than 20 characters',
      } })} />
      {errors.lastName?.message && (
    <small className="error-massage">{errors.lastName.message}</small> )}
    </label>
    <label>
      <p>Mail:</p>
     <input type="text" placeholder="user@email.com" {...register('mail', { required: "Email is required", validate: {
        maxLength: (v) =>
          v.length <= 50 || "The email should have at most 50 characters",
        matchPattern: (v) =>
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
          "Email address must be a valid address",
      },
   })} />
   {errors.email?.message && (
    <small className="error-massage">{errors.email.message}</small> )}
    </label>
    <label>
      <p>:טלפון</p>
     <input type="text" placeholder="050-0000000" {...register('phoneNumber', { required: "phone number is required", validate: {
        maxLength: (v) =>
          v.length <= 50 || "The phone number should have at most 50 characters",
        matchPattern: (v) =>
        /^[0-9-]+$/.test(v) ||  "phone number must contain only numbers and -",
      },
  })} />
  {errors.phoneNumber?.message && (
    <small className="error-massage">{errors.phoneNumber.message}</small> )}
    </label>
    <label>
      <p>IDF roll:</p>
     <input type="text" placeholder="millitary roll" {...register('roll', { required: 'millitary roll is required', validate: {
        minLength: (v) => v.length >= 5 || 'The millitary roll should have at least 5 characters',
        matchPattern: (v) => /^[a-zA-Z0-9_]+$/.test(v)||'millitary rol must contain only letters, numbers and _',
      } })} />
  {errors.roll?.message && (
    <small className="error-massage">{errors.roll.message}</small>)}
    </label>
    <label>
     <p>Spacial service conditions:</p>
     <select  {...register('tashType', { required: 'tash is required', })}>
      <option>none</option>
      <option>lone soldier</option>
      <option>semi lone soldier</option>
      <option>tash 2</option>
      <option>tash 3</option>
      <option>tash 4</option>
      <option>tash 5</option>
     </select>
     {errors.tashType?.message && (
    <small className="error-massage">{errors.tashType.message}</small> )}
    </label>
    <label >
    <p>Date of enlistment:</p>
    <input type="date"  {...register('enlistment', { required: 'required'})} />
    {errors.enlistment?.message && (
    <small className="error-massage">{errors.enlistment.message}</small> )}
    </label>
    <label >
    <p>Date of discharge:</p>
    <input type="date"  {...register('discharge', { required: 'required'})} />
    {errors.discharge?.message && (
    <small className="error-massage">{errors.discharge.message}</small> )}
    </label>
    <button type="submit" id="submit-button">Sign up!</button>
    </form>
    </div>
    </>
  )
}
export default SignUp