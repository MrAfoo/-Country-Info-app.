"use client";

import React, { useState, useEffect } from 'react';
import { useDebounce } from 'use-debounce';

type Country = {
  cca3: string;
  name: { common: string };
  region: string;
  population: number;
  flags: { svg: string };
};

const CountriesPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        if (!res.ok) throw new Error('Network response was not ok');
        const countriesData: Country[] = await res.json();
        setCountries(countriesData);
      } catch (error) {
        setError('Failed to fetch countries. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <img
          src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif"
          alt="Loading..."
          className="w-16 h-16"
        />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl text-center font-bold my-4 text-blue-800">Country Information</h1>
      
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a country..."
          className="border p-2 rounded w-full md:w-1/2 mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() => setSearchTerm('')}
          className="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Clear
        </button>
      </div>

      {filteredCountries.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <div key={country.cca3} className="border rounded-lg shadow-lg bg-white p-4 hover:shadow-xl transition-shadow duration-300">
              <img src={country.flags.svg} alt={`${country.name.common} flag`} className="w-24 h-auto mb-2 mx-auto" />
              <h3 className="text-lg font-semibold text-gray-800">{country.name.common}</h3>
              <p className="text-gray-600">Region: {country.region}</p>
              <p className="text-gray-600">Population: {country.population.toLocaleString()}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 col-span-full">No countries found matching "{searchTerm}"</p>
      )}
    </div>
  );
};

export default CountriesPage;
