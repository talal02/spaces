import React, {useState} from 'react';
import Hotel from './Hotel';
import Profile from './Profile';


const Home = (props) => {
  const {handleLogout, user, isOpen} = props;
  const [showProfile, setShowProfile] = useState(false);
  const [showBtn, setShowBtn] = useState("Profile");

  return (
    <section className="hero">
      <nav>
        <h2>Welcome <span className='usernameDesign'>@ {user.email.split('@')[0]}</span></h2>
        <h3 className="logoDesign">S P A C E S</h3>
        <div>
          <button onClick={() => {setShowProfile(!showProfile); showProfile ? setShowBtn("Profile") : setShowBtn("Home");}}>{showBtn}</button>
          <button onClick={handleLogout}>Log Out</button>
        </div>
      </nav>
      {showProfile ? (
        <Profile user={user}/>
      ) : (
        <Hotel user={user} is_open={isOpen}/>
      )}
    </section>
  );

}

export default Home;