import React, { useState, useEffect } from "react";
import { useFilters } from "../context/FilterContext";
import axios from "axios";
import Cookies from "js-cookie";
import {
  FaUser,
  FaVenusMars,
  FaCalendarAlt,
  FaRedo,
  FaShareAlt,
} from "react-icons/fa";

const Filter = () => {
  const {
    ageRange,
    setAgeRange,
    gender,
    setGender,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useFilters();

  const [dates, setDates] = useState([]); // To store all the available dates from API
  const [filteredEndDates, setFilteredEndDates] = useState([]); // To store filtered end dates based on start date
  const [copySuccess, setCopySuccess] = useState(""); // To display success message on clipboard copy
  const [showCopySuccess, setShowCopySuccess] = useState(false);

  // Fetch data from API on component mount
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get(
          `https://analyzer-roc8-assigment.onrender.com/api/chart/data`
        );
        const uniqueDates = Array.from(
          new Set(response.data.map((entry) => entry.Day))
        ); // Get unique dates
        setDates(uniqueDates); // Set available dates
      } catch (error) {
        console.error("Error fetching date data", error);
      }
    };

    fetchDates();
  }, []); // Run only once on mount

  // Load filter preferences from cookies
  useEffect(() => {
    const savedAgeRange = Cookies.get("ageRange");
    const savedGender = Cookies.get("gender");
    const savedStartDate = Cookies.get("startDate");
    const savedEndDate = Cookies.get("endDate");

    if (savedAgeRange) setAgeRange(savedAgeRange);
    if (savedGender) setGender(savedGender);
    if (savedStartDate) {
      setStartDate(savedStartDate);
      // Filter end dates based on the saved start date
      const availableEndDates = dates.filter((date) => date > savedStartDate);
      setFilteredEndDates(availableEndDates);

      // Check if the saved end date is still valid
      if (savedEndDate && availableEndDates.includes(savedEndDate)) {
        setEndDate(savedEndDate);
      } else {
        setEndDate(""); // Reset if not valid
      }
    }
  }, [dates, setAgeRange, setGender, setStartDate, setEndDate]); // Depend on 'dates'

  // Save preferences to cookies on filter change
  useEffect(() => {
    if (ageRange) Cookies.set("ageRange", ageRange, { expires: 7 });
    if (gender) Cookies.set("gender", gender, { expires: 7 });
    if (startDate) Cookies.set("startDate", startDate, { expires: 7 });
    if (endDate) Cookies.set("endDate", endDate, { expires: 7 });
  }, [ageRange, gender, startDate, endDate]); // Only depend on filter states

  // Handle Start Date Change and filter end dates
  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    // Filter end dates to be after the selected start date
    const availableEndDates = dates.filter((date) => date > selectedStartDate);
    setFilteredEndDates(availableEndDates);
    setEndDate(""); // Reset end date when start date changes
  };

  // Handle End Date Change
  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAgeRange(e.target.value);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  // Clear user preferences (reset filters)
  const handleReset = () => {
    setAgeRange("");
    setGender("");
    setStartDate("");
    setEndDate("");
    Cookies.remove("ageRange");
    Cookies.remove("gender");
    Cookies.remove("startDate");
    Cookies.remove("endDate");
  };

  // Function to generate shareable URL with query params for filters
  const generateShareableUrl = () => {
    const baseUrl = window.location.origin;
    const params = new URLSearchParams();

    if (ageRange) params.append("ageRange", ageRange);
    if (gender) params.append("gender", gender);
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    return `${baseUrl}/?${params.toString()}`; // Construct shareable URL
  };

  // Copy URL to clipboard
  const handleShare = () => {
    const shareableUrl = generateShareableUrl();
    navigator.clipboard
      .writeText(shareableUrl)
      .then(() => {
        setCopySuccess("Link copied to clipboard!");
      })
      .catch(() => {
        setCopySuccess("Failed to copy link.");
      });
  };

  useEffect(() => {
    if (copySuccess) {
      setShowCopySuccess(true);
      const timer = setTimeout(() => {
        setShowCopySuccess(false);
      }, 5000); // 5 seconds delay

      return () => clearTimeout(timer); // Cleanup timer on unmount
    }
  }, [copySuccess]);

  const isAnyFilterSelected = ageRange || gender || startDate || endDate;

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-100 rounded-2xl shadow-2xl max-w-lg mx-auto mt-6 md:max-w-3xl lg:max-w-5xl">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Age Range Selector */}
        <div className="mb-4">
          <label className=" text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <FaUser className="mr-2 text-gray-500" /> Age Range:
          </label>
          <select
            value={ageRange}
            onChange={handleAgeChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">Select Age Range</option>
            <option value="15-25">15-25</option>
            <option value="0-25">&gt; 25</option>
          </select>
        </div>

        {/* Gender Selector */}
        <div className="mb-4">
          <label className=" text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <FaVenusMars className="mr-2 text-gray-500" /> Gender:
          </label>
          <select
            value={gender}
            onChange={handleGenderChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>

        {/* Start Date Selector */}
        <div className="mb-4">
          <label className=" text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" /> Start Date:
          </label>
          <select
            value={startDate}
            onChange={handleStartDateChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">Select Start Date</option>
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>

        {/* End Date Selector */}
        <div className="mb-4">
          <label className=" text-sm font-semibold text-gray-800 mb-2 flex items-center">
            <FaCalendarAlt className="mr-2 text-gray-500" /> End Date:
          </label>
          <select
            value={endDate}
            onChange={handleEndDateChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          >
            <option value="">Select End Date</option>
            {filteredEndDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end gap-5">
        <button
          onClick={handleReset}
          disabled={!isAnyFilterSelected} // Disable if no filters are selected
          className={`flex items-center px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 transition duration-300 ease-in-out ${
            !isAnyFilterSelected ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaRedo className="mr-2" /> Reset
        </button>

        <button
          onClick={handleShare}
          disabled={!isAnyFilterSelected} // Disable if no filters are selected
          className={`flex items-center px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600 transition duration-300 ease-in-out ${
            !isAnyFilterSelected ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaShareAlt className="mr-2" /> Share
        </button>
      </div>

      {/* Copy Success Message */}
      {showCopySuccess && (
        <div className="mt-4 text-green-600">{copySuccess}</div>
      )}
    </div>
  );
};

export default Filter;
