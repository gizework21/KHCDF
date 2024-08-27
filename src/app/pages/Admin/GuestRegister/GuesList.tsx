import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Guest {
  name: string;
  phoneNumber: string;
  address: string;
  orderNumber: number;
}

const GuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const pageSize = 8;

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get('https://kchds-api.purposeblacketh.com/api/guests/all');
        const totalGuests = response.data.length;
        setTotalPages(Math.ceil(totalGuests / pageSize));

        const paginatedGuests = response.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
        const guestsWithOrderNumber = paginatedGuests.map((guest: Guest, index: number) => ({
          ...guest,
          orderNumber: (currentPage - 1) * pageSize + index + 1,
        }));

        setGuests(guestsWithOrderNumber);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching guests:', error);
      }
    };

    fetchGuests();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white-100">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl ml-10" style={{ width: '750px', marginLeft: '370px', marginTop:"-60px"}}>
        <div className="p-6 bg-white text-black text-center text-5xl font-semibold">
          Guest List
        </div>
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <svg className="animate-spin h-10 w-10 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8 8 0 0012 20v4c-6.627 0-12-5.373-12-12h4zm14-2A8 8 0 0020 12h4c0 6.627-5.373 12-12 12v-4zm-2-14.373A8 8 0 0012 4V0c6.627 0 12 5.373 12 12h-4z"></path>
            </svg>
          </div>
        ) : (
          <div>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-black text-white">Order</th>
                  <th className="py-2 px-4 bg-black text-white">Name</th>
                  <th className="py-2 px-4 bg-black text-white">Phone Number</th>
                  <th className="py-2 px-4 bg-black text-white">Address</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest) => (
                  <tr key={guest.orderNumber} className="even:bg-gray-100 odd:bg-white">
                    <td className="py-2 px-4 border">{guest.orderNumber}</td>
                    <td className="py-2 px-4 border">{guest.name}</td>
                    <td className="py-2 px-4 border">{guest.phoneNumber}</td>
                    <td className="py-2 px-4 border">{guest.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center mt-4">
              <button className="bg-black  hover:bg-gray-700 text-white font-bold py-2 px-7 mx-5 rounded" onClick={handlePrevPage}>
                Prev
              </button>
              <button className="bg-black  hover:bg-gray-700 text-white font-bold py-1 px-7 mx-5  rounded" onClick={handleNextPage}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestList;
