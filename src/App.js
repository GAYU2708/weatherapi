import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=9c5fcd76cecff476acfafa7de49d2351`;



  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((res) => {
          setData(res.data);
          console.log(res.data);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
        });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className='container'>
        <div className='search'>
          <input type='text' value={location} placeholder='Enter Location' onKeyPress={searchLocation} onChange={(e) => setLocation(e.target.value)} />
        </div>
        <div className='top'>
          {/* location */}
          <div className='location'>
            <p>{data?.name}</p>
          </div>
          {/* temperature */}
          <div className='temp'>
            {data?.main && <h1>{data?.main?.temp}°F</h1>}
          </div>
          {/* description */}
          <div className='describe'>
            {data?.weather && <p>{data?.weather[0]?.main}</p>}
          </div>
        </div>
        {data?.name !== undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data?.main && <p className='bold'>{data?.main?.feels_like} °F</p>}
              <p>Feels Like</p>
            </div>
            <div className='humidity'>
              {data?.main && <p className='bold'>{data?.main?.humidity}%</p>}
              <p>Humidity</p>
            </div>
            <div className='wind'>
              {data?.wind && <p className='bold'>{data?.wind?.speed} MPH</p>}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
