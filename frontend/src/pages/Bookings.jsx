import React, { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader/Loader';
import AuthContext from '../context/auth-context';
import BookingsList from '../components/BookingsList/BookingsList';
import axios from 'axios'; 

const Bookings = () => {
  const [bookings, setBookings] = useState([]); 
  const [isLoading, setIsLoading] = useState(true); 
  const authContext = useContext(AuthContext);

  const { token } = authContext;

  useEffect(() => {
    fetchBookings();
  }, [token]); 


  const fetchBookings = async () => {
    try {
      const requestBody = {
        query: `
          query {
            bookings {
              _id
              createdAt
              event {
                _id
                title
                date
              }
              user {
                _id
              }
            }
          }
        `,
      };

      const response = await axios.post(
        'http://localhost:5000/api', 
        JSON.stringify(requestBody),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = response.data;

      if (resData.data && resData.data.bookings) {
        setBookings(resData.data.bookings);
      }
      
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setIsLoading(false); 
    }
  };

  const cancelBookingHandler = async (bookingId) => {
    try {
      setIsLoading(true);
      const requestBody = {
        query: `
          mutation CancelBooking($bookingId: ID!) {
            cancelBooking(bookingId: $bookingId) {
              _id
            }
          }
        `,
        variables: {
          bookingId: bookingId,
        },
      };
  
      const response = await axios.post(
        'http://localhost:5000/api',
        JSON.stringify(requestBody),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const resData = response.data;
  
      if (resData.data && resData.data.cancelBooking) {
        setBookings((prevBookings) =>
          prevBookings.filter((booking) => booking._id !== bookingId)
        );
      } else {
        console.error('Error canceling booking:', resData.errors);
      }
    } catch (error) {
      console.error('Error canceling booking:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <div style={{ marginTop: '80px', padding: '20px' }}>
      {isLoading ? (
        <Loader />
      ) : bookings.length === 0 ? (
        <p>No bookings available.</p>
      ) : (
        <BookingsList bookings={bookings} onDelete={cancelBookingHandler} />
      )}
    </div>
  );
};

export default Bookings;
