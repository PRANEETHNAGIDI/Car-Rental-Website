import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = ({ onClose }) => {
  // State variables for form fields and confirmation
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [duration, setDuration] = useState(0);
  const [pricePerDay, setPricePerDay] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false); // State for confirmation message

  // Function to calculate price based on selected dates and model
  const calculatePrice = () => {
    if (startDate && endDate) {
      // Calculate duration in days
      const diffTime = Math.abs(endDate - startDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDuration(diffDays);

      // You can set prices for different car models
      const priceMap = {
        Safari: 1000,
        Sedan: 1200,
        Hatchback: 800,
        SUV: 1500,
        Convertible: 1800,
      };

      // Set price per day based on selected car model
      setPricePerDay(priceMap[selectedModel]);

      // Calculate total price
      setTotalPrice(priceMap[selectedModel] * diffDays);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    // For example, submit the form data to the server
    // You can add validation logic before submitting the form
    // Show confirmation message
    setShowConfirmation(true);
    // Reset form fields after a delay
    setTimeout(() => {
      setName("");
      setPhoneNumber("");
      setAddress("");
      setSelectedModel("");
      setStartDate(null);
      setEndDate(null);
      setDuration(0);
      setPricePerDay(0);
      setTotalPrice(0);
      setShowConfirmation(false);
      // Call the onClose function passed from App.js to close the form
      onClose();
    }, 2000); // Adjust the delay as needed
  };

  // Function to handle closing the form
  const handleClose = () => {
    // Reset form fields
    setName("");
    setPhoneNumber("");
    setAddress("");
    setSelectedModel("");
    setStartDate(null);
    setEndDate(null);
    setDuration(0);
    setPricePerDay(0);
    setTotalPrice(0);
    // Call the onClose function passed from App.js to close the form
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white dark:bg-gray-900 p-6 rounded-lg w-full md:max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Booking Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Form fields */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name:
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number:
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
              placeholder="Enter Your Mobile Number"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Address:
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
              placeholder="Enter Your Address"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Select a Model:
            </label>
            <select
              value={selectedModel}
              onChange={(e) => {
                setSelectedModel(e.target.value);
                calculatePrice();
              }}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
            >
              <option value="">Select Model</option>
              <option value="Safari">Safari</option>
              <option value="Sedan">Sedan</option>
              <option value="Hatchback">Hatchback</option>
              <option value="SUV">SUV</option>
              <option value="Convertible">Convertible</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Date:
            </label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                calculatePrice();
              }}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
              placeholderText="Select Start Date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Date:
            </label>
            <DatePicker
              selected={endDate}
              onChange={(date) => {
                setEndDate(date);
                calculatePrice();
              }}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
              placeholderText="Select End Date"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Duration:
            </label>
            <input
              type="text"
              value={duration > 0 ? `${duration} days` : ""}
              readOnly
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Total Price:
            </label>
            <input
              type="text"
              value={totalPrice > 0 ? `Rs ${totalPrice}` : ""}
              readOnly
              className="w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 dark:text-gray-900"
            />
          </div>
          {/* Confirmation message */}
          {showConfirmation && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
              role="alert"
            >
              <strong className="font-bold">Booking confirmed!</strong>
              <span className="block sm:inline">
                Thank you for booking with us.
              </span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setShowConfirmation(false)}
              >
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path
                    fillRule="evenodd"
                    d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.36 5.652a.5.5 0 00-.708.708L9.293 10l-3.64 3.64a.5.5 0 10.708.708L10 10.707l3.64 3.64a.5.5 0 00.708-.708L10.707 10l3.64-3.64a.5.5 0 000-.708z"
                    clipRule="evenodd"
                  />
                </svg>
              </span>
            </div>
          )}
          <div className="flex">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
