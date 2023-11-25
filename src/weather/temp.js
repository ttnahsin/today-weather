import React, {useEffect,useState} from 'react';
import Weathercard from './weathercard';
import "./style.css"

const Temp = () => {
  const[searchValue, setSearchValue] = useState("Kathmandu");
  const[tempInfo,setTempInfo] = useState({});

  const getWeatherInfo = async () =>{
    try {
      let url = 
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=66755bc6b41a15d0a0573714a791ffa7`;

        const res = await fetch(url);
        const data= await res.json();

      const{ temp,humidity,pressure }= data.main;  
      const{main: weathermood} = data.weather[0];
      const{name}= data;
      const{speed}= data.wind;
      const{ country,sunset } = data.sys;
      const myNewWeatherInfo = {
        temp,
        humidity,
        pressure,
        weathermood,
        name,country,
        speed,sunset,
      };

     setTempInfo(myNewWeatherInfo);
    } catch (error) {
      console.log(error);
      
    }
  };
    useEffect(() => {
      getWeatherInfo();
    }, []);  

  return (
    <>
    <div className='wrap'>
      <div className='search'>
        <input 
        type='search' 
        placeholder='search...'
        autoFocus
        id='search'
        className='searchTerm'
        value= {searchValue}
        onChange={(e) =>setSearchValue(e.target.value)}
        />

          <button className='searchButton'
           type='button' onClick={getWeatherInfo}>
            Search
          </button>
      </div>      
    </div>
      {/* <article className='widget'>
        <div className='weatherIcon'>
          <i className={"wi wi-day-sunny"}></i>
        </div>

        <div className='weatherInfo'>
          <div className='temperature'>
            <span>25.6&deg;</span>
          </div>
          <div className='describtion'>
            <div className='weatherCondition'>Sunny</div>
            <div className='place'>Kathmandu,Nepal</div>
          </div>
        </div>

        <div className='date'>{new Date().toLocaleString()} </div>

        <div className='extra-temp'>
          <div className='temp-info-minmax'>
            <div className="two-sided-section">
            <p>
              <i className={"wi wi-sunset"}></i>
              </p>
              <p className='extra-info-leftside'>
                19:29 PM<br/>Sunset </p>
            </div>


            <div className="two-sided-section">
            <p>
              <i className={"wi wi-humidity"}></i>
              </p>
              <p className='extra-info-leftside'>
                19<br/>Humidity </p>
            </div>
          </div>

          <div className='weather-extra-info'>
          <div className="two-sided-section">
            <p>
              <i className={"wi wi-rain"}></i>
              </p>
              <p className='extra-info-leftside'>
                190 MM<br/>Pressure </p>
            </div>
          

          <div className="two-sided-section">
            <p>
              <i className={"wi wi-strong-wind"}></i>
              </p>
              <p className='extra-info-leftside'>
                198<br/>speed </p>
            </div>
          
         </div>
        </div>
      </article> */}

        <Weathercard tempInfo={tempInfo} />
    </>
  );
};

export default Temp;
