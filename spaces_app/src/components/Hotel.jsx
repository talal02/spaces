import React, { useEffect, useState } from 'react';
import './styles/Hotel.css'
import { Rating } from 'react-simple-star-rating'
import { AiFillEnvironment, AiFillBook } from "react-icons/ai";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore"; 
import fire from '../fire';
import loadingGif from "./resources/yy3.gif";
import Popup from './Popup';

const Hotel = (props) => {

  const [hotels, setHotels] = useState([]);
  const [hotelid, setHotelId] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { is_open } = props;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  }

  const getHotel = async () => {
    const db = getFirestore(fire);
    const docRef = doc(db, 'hotels', hotelid);
    const _doc = await getDoc(docRef);
    if (_doc.exists()) {
      return _doc._document.data.value.mapValue.fields;
    } else {
      return undefined;
    }
  }

  const getHotels = () => {
    const db = getFirestore(fire);
    getDocs(collection(db, 'hotels'))
    .then((data) => {
      let _hotels = [];
      data.forEach((doc) => {
        const _data = doc._document.data.value.mapValue.fields;
        const r =  _data.ratings.doubleValue ? _data.ratings.doubleValue : _data.ratings.integerValue;
        _hotels.push({
          'id': doc.id,
          'name': _data.name.stringValue,
          'address': _data.address.stringValue,
          'description': _data.description.stringValue,
          'comments': _data.comments.arrayValue.values,
          'ratings': r,
          'totalRatings': _data.totalRatings.integerValue,
          'photo': _data.photo.stringValue
        });
      })
      setHotels(_hotels);
    })
    .catch((err1) => console.log(err1));
  }

  useEffect(() => {
    getHotels();
  }, [])

  return (
    <div className="hotel-container">
      <h2>CATALOG</h2>
      {!is_open && hotels.length !== 0 ? (
        hotels.map((hotel) => (
          <div onClick={e => {setHotelId(e.currentTarget.id); togglePopup();}} className="hotel-card" id={hotel.id}>
            <div className='hotel-data'>
              <h2>{hotel.name}<span><Rating size={25} initialValue={hotel.ratings} readonly={true} /> {hotel.ratings}</span></h2>
              <h4><AiFillEnvironment /> {hotel.address}</h4>
              <h6><AiFillBook /> {hotel.description}</h6>
            </div>
            <div className='hotel-img'>
              <img src={hotel.photo} alt="hotel-img" />
            </div>
          </div>
        ))

      ) : (
        <h1 style={{'margin': '30px'}}>
          <img src={loadingGif} alt="wait until the page loads" />
        </h1>
      )}
      {isOpen && <Popup
        content={
          <div className='comments-section'>
            <h3 className='center'>C O M M E N T S</h3>
            <h5>
            <div>
            {
              hotels.find(x => x.id === hotelid).comments[0].stringValue.split('|')[0]
            }
            </div>
              <span><Rating size={20} initialValue={Number(hotels.find(x => x.id === hotelid).comments[0].stringValue.split('|')[1])} readonly={true} /> {hotels.find(x => x.id === hotelid).comments[0].stringValue.split('|')[1]}</span>
            </h5>
          </div>  
        }
        handleClose={togglePopup}
      />}
    </div>
  )
}

export default Hotel;