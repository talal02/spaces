import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from "firebase/firestore"; 
import { AiFillEnvironment, AiFillDollarCircle } from "react-icons/ai";
import fire from '../fire';
import './styles/Profile.css';

const Profile = (props) => {
  const { user } = props;
  const [userData, setUserData] = useState({});
  
  const getProfile = () => {
    const db = getFirestore(fire);
    const docRef = doc(db, 'users', user.email);
    getDoc(docRef)
    .then((data) => {
      console.log();
      const _data = data._document.data.value.mapValue.fields;
      setUserData({
        'address': _data.address.stringValue,
        'city': _data.city.stringValue,
        'email': _data.email.stringValue,
        'name': _data.name.stringValue,
        'profileImg': _data.profileImg.stringValue,
        'username': _data.username.stringValue,
        'totalBookings': _data.totalBookings.integerValue
      });
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
    getProfile();
  }, [])
  

  return (
    <>
      {userData.name ? (
        <div className="profile-container">
          <h3>{userData.name}</h3>
          <img src={userData.profileImg} alt="avatar" />
          <div className='profile-data'>
            <h4><AiFillEnvironment /> {userData.city}</h4>
            <h4><AiFillEnvironment /> {userData.address}</h4>
            <h4><AiFillDollarCircle /> Total Bookings {userData.totalBookings}</h4>
          </div>
        </div>
      ) : (
        <div className="profile-container">
          LOADING
        </div>
      )}
    </>
  );
}

export default Profile;