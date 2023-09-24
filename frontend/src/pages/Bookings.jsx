import React, { useEffect, useState, useContext } from 'react';
import Loader from '../components/Loader/Loader';
import AuthContext from '../context/auth-context';
import axios from 'axios'; // Import axios

const Bookings = () => {
  const [bookings, setBookings] = useState([]); // Initialize bookings state
  const [isLoading, setIsLoading] = useState(true); // Set initial loading state to true
  const authContext = useContext(AuthContext);

  const { token } = authContext;

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
        'http://localhost:5000/api', // Use the correct URL
        JSON.stringify(requestBody),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const resData = response.data;
      console.log(resData);

      if (resData.data && resData.data.bookings) {
        setBookings(resData.data.bookings);
      }
      
      setIsLoading(false); // Set loading to false after data is fetched
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setIsLoading(false); // Set loading to false in case of an error
    }
  };

  useEffect(() => {
    fetchBookings();
  }, [token]); 

  return (
    <div style={{ marginTop: '80px', padding: '20px' }}>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="bookings">
          {bookings.map((booking) => (
            <li key={booking._id}>
              {booking.event.title} -{' '}
              {new Date(booking.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
