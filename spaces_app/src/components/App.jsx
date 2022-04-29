import React, {useState, useEffect} from "react";
import fire from '../fire';
import { getAuth, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import Login from "./Login";
import Home from "./Home";
import UserForm from "./UserForm";
import Popup from "./Popup";
import './styles/App.css';

function App() {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [password, setPassword] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [user, setUser] = useState("");
  const [hasAccount, setHasAccount] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const clearInput = () => {
    setEmail("");
    setPassword("");
  }

  const clearErr = () => {
    setEmailErr("");
    setPasswordErr("");
  }

  const handleSignUp = () => {
    clearErr();
    const auth = getAuth(fire);
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      togglePopup();
    })
    .catch((err) => {
      switch(err.code) {
        case "auth/invalid-email":
        case "auth/email-already-in-use":
          setEmailErr(err.message);
          break;
        case "auth/weak-password":
          setPasswordErr(err.message);
          break;
        default:
          break;
      }
    });
  }

  const handleLogin = () => {
    clearErr();
    const auth = getAuth(fire);
    signInWithEmailAndPassword(auth, email, password)
    .catch(err => {
      switch(err.code) {
        case "auth/invalid-email":
        case "auth/user-disabled":
        case "auth/user-not-found":
          setEmailErr(err.message);
          break;
        case "auth/wrong-password":
          setPasswordErr(err.message);
          break;
        default:
          break;
      }
    });
  }

  const handleLogout = () => {
    const auth = getAuth(fire);
    signOut(auth)
  }

  const authListner = () => {
    const auth = getAuth(fire);
    onAuthStateChanged(auth, (user) => {
      if(user) {
        clearInput();
        setUser(user);
      } else {
        setUser("");
      }
    });
  }

  useEffect(() => {
    authListner();
  }, []);

  return (
    <div className="App">
      {!user ? (
        <Login 
        email={email} 
        setEmail={setEmail} 
        password={password}
        setPassword={setPassword} 
        EmailErr={emailErr} 
        PasswordErr={passwordErr} 
        handleLogin={handleLogin} 
        handleSignUp={handleSignUp} 
        hasAccount={hasAccount}
        setHasAccount={setHasAccount}
        />
      ) : (
        <Home user={user} isOpen={isOpen} handleLogout={handleLogout}/>
      )}
      {isOpen && <Popup
        content={
          <UserForm user={user} togglePopup={togglePopup} />  
        }
        handleClose={togglePopup}
      />}
    </div>
  );
}

export default App;
