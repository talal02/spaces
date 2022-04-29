import React from "react";

const Login = (props) => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    EmailErr,
    PasswordErr,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
  } = props;
  return (
    <section className="login">
      <div className="loginContainer">
        <h3 className="logoDesign">S P A C E S</h3>
        <label>Email</label>
        <input
          type="email"
          autoFocus
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <p className="errorMsg">{EmailErr}</p>
        <label>Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="errorMsg">{PasswordErr}</p>
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button onClick={handleLogin}>Sign In</button>
              <p>Don't Have an Account <span onClick={() => setHasAccount(!hasAccount)}>Sign Up</span></p>
            </>
          ) : (
            <>
              <button onClick={handleSignUp}>Sign Up</button>
              <p>Already Have an Account? <span onClick={() => setHasAccount(!hasAccount)}>Sign In</span></p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
