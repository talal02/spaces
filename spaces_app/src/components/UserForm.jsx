import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import fire from '../fire';

const UserForm = (props) => {

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image , setImage] = useState('');
  const { user, togglePopup } = props;
  const [imageStatus, setImageStatus] = useState("");


  const upload = ()=>{
    const storage = getStorage(fire);
    if(image == null)
      return;
    const storageRef = ref(storage, `/images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on('state_changed', (snapshot) => {
      setImageStatus('Image is Uploading');
    }, (error) => {
      switch (error.code) {
        case 'storage/unauthorized':
          setImageStatus("User doesn't have permission to access the object");
          break;
        case 'storage/canceled':
          setImageStatus("User canceled the upload");
          break;
        case 'storage/unknown':
          setImageStatus("Unknown error occurred, inspect error.serverResponse");
          break;
        default:
            break;
      }
  }, () => {
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
      const db = getFirestore(fire);
      const username = user.email.split('@')[0];
      const email = user.email;
      const docRef = doc(db, "users", email);
      setDoc(docRef, {
        address,
        city,
        email,
        name,
        username,
        'profileImg': downloadURL,
        'totalBookings': 0
      }).catch((err) => {
        alert(err);
      });
    });
  });
  setTimeout(togglePopup, 3000);
  }

  return (
    <>
      <h3 className="center">Save Profile Data</h3>
      <div className="form-container">
        <input type="text" placeholder="Name" required value={name} onChange={e => setName(e.target.value)} />
        <input type="text" placeholder="Address" required value={address} onChange={e => setAddress(e.target.value)} />
        <input type="text" placeholder="City" required value={city} onChange={e => setCity(e.target.value)} />
        <label className="custom-file-upload">
          <input type="file" onChange={(e)=>{setImage(e.target.files[0])}}/>
            Upload Profile Image
        </label>
        <p className='center'>{imageStatus}</p>
        <button onClick={upload}>Save</button>
      </div>
    </>
  );

}


export default UserForm;