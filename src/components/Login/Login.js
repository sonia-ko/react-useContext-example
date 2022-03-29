import React, {
  useState,
  useReducer,
  useRef,
  useEffect,
  useContext
} from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import Input from "../UI/Input/Input";
import AuthContext from "../../store/auth-context";

// useEffect(() => {
//   const identifier = setTimeout(() => {
//     console.log('Checking form validity!');
//     setFormIsValid(
//       enteredEmail.includes('@') && enteredPassword.trim().length > 6
//     );
//   }, 500);

//   return () => {
//     console.log('CLEANUP');
//     clearTimeout(identifier);
//   };
// }, [enteredEmail, enteredPassword]);

// useEffect(() => {
//   console.log("EFFECT RUNNING");

//   return () => {
//     console.log("EFFECT CLEANUP");
//   };
// }, []);

const emailReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.includes("@") };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.includes("@") };
  }
  return { value: "", formIsValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === "USER_INPUT") {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  }

  if (action.type === "INPUT_BLUR") {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }
  return { value: "", formIsValid: false };
};

const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    formIsValid: false
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    formIsValid: false
  });

  const authCtx = useContext(AuthContext);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const { isValid: emailValid } = emailState;
  const { isValid: passwordValid } = passwordState;
  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checkoing form validity");
      setFormIsValid(emailValid && passwordValid);
    }, 500);

    return () => {
      console.log("EFFECT CLEANUP");
      clearTimeout(identifier);
    };
  }, [emailValid, passwordValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: "USER_INPUT", val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: "USER_INPUT", val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailValid) {
      emailInputRef.current.focus();
    } else {
      passwordInputRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          isValid={emailValid}
          htmlFor="email"
          label="E - Mail"
          type="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          ref={passwordInputRef}
          isValid={passwordValid}
          htmlFor="password"
          label="Password"
          type="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
