import React, { useEffect } from "react";
import Posts from "./components/Posts";
import LoginForm from "./components/LoginForm";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { authSlice } from "./store/reducers/authSlice";

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(authSlice.actions.checkLogin());
  }, [])

  return (
    <div>
      {useAppSelector(state => state.autchReducer.isLoged) ? (
        <>
          <Posts />
        </>
      ) : (
        <LoginForm />
      )}
    </div>
  );
}

export default App;
