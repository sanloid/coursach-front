import React, { useState } from "react";
import { authAPI } from "../services/authService";
import { useAppDispatch } from "../hooks/redux";
import { authSlice } from "../store/reducers/authSlice";

export default function LoginForm() {
  const [pas, setPas] = useState("");
  const [name, setName] = useState("");
  const dispatch = useAppDispatch();

  let [flag, setFla] = useState(false);
  const [login, { isLoading }] = authAPI.useLoginMutation();
  const [register, { isLoading: isLoad }] = authAPI.useRegisterMutation();
  const [flagToRed, setFlagToRed] = useState(false);

  async function signin() {
    try {
      const user = await login({ name: name, password: pas }).unwrap();
      console.log(user.token);
      localStorage.setItem('token', user.token);
      localStorage.setItem('name', name);
      dispatch(authSlice.actions.login({ token: user.token, name: name }));
    } catch (e) {
      console.log(e)
      setFla(true);
    }
  }

  async function signup() {
    try {
      const user = await register({ name: name, password: pas }).unwrap();
      console.log(user);
      if (!user.token) {
        setFlagToRed(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="container mx-auto mt-2">
      <div className="flex flex-col border-2 border-red-100 rounded-xl p-2 mb-5">
        <h1 className="mb-5 border-b-2 border-red-100 p-2 flex justify-center">Sign in</h1>
        <div className="p-2 flex justify-center">
          Username
        </div>
        <div className="flex justify-center">
          <input
            className="border-2 border-red-100 w-50 mb-4 rounded-xl p-2 focus:outline-none focus:border-red-500 focus:ring-red-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="username"
          />
        </div>
        <div className="p-2 flex justify-center">
          Password
        </div>
        <div className="flex justify-center">
          <input
            className="border-2 border-red-100 w-50 mb-4 rounded-xl p-2 focus:outline-none focus:border-red-500 focus:ring-red-500"
            value={pas}
            onChange={(e) => setPas(e.target.value)}
            type="password"
            placeholder="password"
          />
        </div>
        {flag ? <> wrong password or username </> : <></>}
        <div className="flex justify-center">
          <button onClick={signin} className="border-2 border-red-100 w-28 mb-4 p-2 rounded-xl hover:bg-red-300"> sign in </button>
        </div>
      </div>
      <div className="border-2 border-red-100 rounded-xl p-2 flex flex-col">
        <div className="p-2 flex justify-center">
          Don't have an account?
        </div>
        <div className="p-2 flex justify-center">
          <button onClick={signup} className="border-2 border-red-100 w-20 hover:bg-red-300 rounded-xl p-2 w-28"> Sign up</button>
        </div>
        <div className="p-2 flex justify-center">
          {flagToRed ? <> user with the same name already exist </> : <></>}
        </div>
      </div>
    </div>
  );
}
