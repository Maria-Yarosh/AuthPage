import { useState } from "react";
import style from "./AuthForm.module.css";
import { Login } from "./Login/Login";
import { SignUp } from "./SignUp/SignUp";

const authMode = {
    login: 'login',
    signUp: 'signUp'
} as const
type TViews = typeof authMode 
type TAuthMode = keyof TViews

export const AuthForm = () => {
  const [stateAuthMode, setStateAuthMode] = useState<TAuthMode>(authMode.login)

  const renderAuthForm = () => {
    if(stateAuthMode === authMode.signUp) {
        return (
            <SignUp />
        )
    }
    return <Login />
  }

  const handleAuthMode = (mode: TAuthMode) => {
    setStateAuthMode(mode)
  }


  return (
    <div className={style.form}>
      {stateAuthMode === authMode.signUp && <button onClick={() => handleAuthMode(authMode.login)}>Назад</button>}
        {renderAuthForm()}
        {
            stateAuthMode === authMode.login && <button onClick={() => handleAuthMode(authMode.signUp)}>Регистрация</button>
        }
    </div>
  );
};
