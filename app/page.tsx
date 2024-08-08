'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ref, get, DataSnapshot } from 'firebase/database';
import { database } from '../lib/firebase';
import Chart from '../components/Chart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DataType from '@/Type/DataType';
import GroupedDataType from '@/Type/GroupedDataType';

const FireBaseRB = async (): Promise<DataType | null> => {
  try {
    const dbRef = ref(database, 'Data');
    const snapshot: DataSnapshot = await get(dbRef);
    if (snapshot.exists()) {
      return snapshot.val() as DataType;
    }
    return null;
  } catch (error) {
    console.error('Error fetching data from Firebase:', error);
    return null;
  }
};

const MongoDB = async (): Promise<DataType[]> => {
  try {
    const response = await fetch('/api/getData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch data from API');
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

const TmrMongoDB = async (): Promise<DataType[]> => {
  try {
    const response = await fetch('/api/getDataTmr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error('Failed to fetch data from API');
  } catch (error) {
    console.error('Error fetching data from API:', error);
    throw error;
  }
};

const groupByDate = (data: DataType[]): GroupedDataType => {
  const grouped = data.reduce((acc, item) => {
    const date = item.TimeString.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {} as GroupedDataType);

  const sortedGrouped: GroupedDataType = Object.keys(grouped)
    .sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    .reduce((acc, date) => {
      acc[date] = grouped[date];
      return acc;
    }, {} as GroupedDataType);

  return sortedGrouped;
};

const formatDate = (dateString: string): string => {
  const [year, month, day] = dateString.split('-').map(Number);
  return `${day}-${month}-${year}`;
};

const exportToCSV = (data: DataType[]) => {
  if (!data.length) return;

  // Create CSV header and rows
  const header = 'Date,Time,Temperature (°C),Humidity (%)\n';
  const rows = data.map(item => {
    const [date, time] = item.TimeString.split(' ');
    return `${date},${time},${item.Temperature.toFixed(1)},${item.Humidity.toFixed(1)}`;
  }).join('\n');
  const csvContent = header + rows;

  const now = new Date();
  const formattedDate = now.toISOString().split('T')[0];
  const filename = `data_${formattedDate}.csv`;

  // Create a downloadable link
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export default function Home() {
  const [dataFireBase, setDataFireBase] = useState<DataType | null>(null);
  const [dataDB, setDataDB] = useState<DataType[]>([]);
  const [tmrData, setTmrData] = useState<DataType[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedDataType>({});
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rowsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const firebaseData = await FireBaseRB();
        if (firebaseData) {
          setDataFireBase(firebaseData);
        } else {
          setError('No data available from Firebase');
        }

        const apiData = await MongoDB();
        setDataDB(apiData);
        setGroupedData(groupByDate(apiData));
        setSelectedDate(null);

        const tmrApiData = await TmrMongoDB();
        setTmrData(tmrApiData);
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDisplayedData = (): DataType[] => {
    if (selectedDate) {
      const dateString = selectedDate.toISOString().split('T')[0];
      return groupedData[dateString] || [];
    }
    return dataDB;
  };

  const displayedData = getDisplayedData();

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedData = displayedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-200 via-pink-200 to-purple-200 background-animate z-[-1]"></div>
      <div className="relative min-h-screen flex flex-col items-center p-4">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl mb-4 flex flex-col sm:flex-row">
          <div className="w-full sm:w-1/4 bg-gradient-to-b from-purple-100 to-pink-200 p-6 text-white">
            {error ? (
              <p className="text-center text-red-400">{error}</p>
            ) : loading ? (
              <p className="text-center text-gray-300">Loading data...</p>
            ) : dataFireBase ? (
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold mb-1 text-sky-700">
                  วันนี้
                </div>
                <div className="text-xl font-bold mb-1 bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                  {dataFireBase.TimeString.split(' ')[0]}
                </div>
                <div className="text-lg font-bold mb-1 bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                  {dataFireBase.TimeString.split(' ')[1]}
                </div>
                <Image
                  src="http://openweathermap.org/img/wn/04d@4x.png"
                  alt="Weather icon"
                  width={96}
                  height={96}
                  className="w-24 h-24 object-cover mb-1"
                />
                <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                  {dataFireBase.Temperature.toFixed(1)}°C
                </div>
                <div className="mt-1 text-sky-500 font-bold mb-2 bg-gradient-to-r from-sky-300 to-purple-400 bg-clip-text text-transparent text-lg">
                  Humidity: {dataFireBase.Humidity.toFixed(1)}%
                </div>
                <div className="text-center text-gray-400">
                  <div className="text-3xl font-bold mb-1 text-sky-700">
                    วันพรุ่งนี้
                  </div>
                  {tmrData.length > 0 ? (
                    <>
                      <div className="text-2xl font-bold mb-1 bg-gradient-to-r from-sky-300 to-purple-300 bg-clip-text text-transparent">
                        {tmrData[0].Temperature.toFixed(1)}°C
                      </div>
                      <div className="mt-1 text-sky-500 font-bold mb-2 bg-gradient-to-r from-sky-300 to-purple-400 bg-clip-text text-transparent text-lg">
                        Humidity: {tmrData[0].Humidity.toFixed(1)}%
                      </div>
                    </>
                  ) : (
                    <div>No data</div>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-300">No data available</p>
            )}
          </div>

          <div className="w-full sm:w-2/3 p-8 flex items-center justify-center">
            <div className="w-full h-full">
              {dataDB.length > 0 ? (
                <Chart data={dataDB} />
              ) : (
                <p className="text-center text-gray-200">No data to display</p>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden w-full max-w-4xl p-8 flex flex-col items-center">
          {displayedData.length > 0 ? (
            <div className="mb-4 w-full">
              <h2 className="text-xl font-bold mb-2">
                List of Data
              </h2>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Time
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Temperature (°C)
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Humidity (%)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paginatedData.map((item, index) => {
                    const [date, time] = item.TimeString.split(' ');
                    return (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{formatDate(date)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{time}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Temperature.toFixed(1)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.Humidity.toFixed(1)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div className="flex flex-col sm:flex-row justify-between mt-4">
                <button
                  onClick={() => exportToCSV(displayedData)}
                  className="px-4 py-2 bg-gradient-to-r from-purple-200 to-rose-200 text-pink-300 rounded mb-2 sm:mb-0"
                >
                  Export to CSV
                </button>
                <div className="flex justify-between w-full sm:w-auto">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gradient-to-r from-purple-200 to-rose-200 text-pink-300 rounded disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <span className="text-gray-600">
                    Page {currentPage} of {Math.ceil(displayedData.length / rowsPerPage)}
                  </span>
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(displayedData.length / rowsPerPage)}
                    className="px-4 py-2 bg-gradient-to-r from-purple-200 to-rose-200 text-pink-300 rounded disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-200">No data to display</p>
          )}
        </div>
        {/* Spotify Player */}
        <div className="fixed bottom-20 left-4 w-64">
          <iframe
            src="https://open.spotify.com/embed/track/6AI3ezQ4o3HUoP6Dhudph3?utm_source=generator"
            width="100%"
            height="80"
            allow="encrypted-media"
            className="rounded-lg drop-shadow"
          ></iframe>
        </div>
      </div>

    </div>
  );
}
