// src/RegistrationForm.tsx
import React, { useState } from 'react';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegistrationForm: React.FC = () => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState<string | null>(null);

  const validateForm = () => {
    if (!name || !phoneNumber || !address) {
      return 'Please Fill all fields!';
    }
    // Add more validation logic if needed
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }

    const formData = {
      name,
      phoneNumber,
      address,
    };

    try {
      const response = await fetch('https://kchds-api.purposeblacketh.com/api/guests/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // console.log('Success:', data);

      // Show success toast
      toast.success('Guest Registered successful!');

      // Optionally clear the form
      setName('');
      setPhoneNumber('');
      setAddress('');
      setError(null);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to submit the form');
      
      // Show error toast
      toast.error('Failed to submit the form');
    }
  };

  // const toastOptions: ToastOptions = {
  //   style: { marginTop: '20px' },
  // };

  return (
    <div className={`w-full lg:w-[80%] items-center h-screen mt-16 right-0 fixed transition-all duration-500 ease-in overflow-auto md:px-20`} style={{ marginTop: '70px' }}>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2 text-center" htmlFor="name" style={{ fontSize: '30px' }}>
        Guest Registration Form
        </label>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phoneNumber">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="tel"
            placeholder="Enter your phone number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Register
          </button>
        </div>
      </form>
      <ToastContainer toastStyle={{ marginTop: '47px' }} />
    </div>
  );
};

export default RegistrationForm;
