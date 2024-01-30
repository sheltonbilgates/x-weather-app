import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Weather = () => {
   
    const[weatherDetail, setWeatherDetail] = useState(false)
    const [inputCity, setInputCity] = useState("")
    const [temp, setTemp] = useState("")
    const [humid, setHumid] = useState("")
    const [condi, setCondi] = useState("")
    const [windSpeed, setWindSpeed] = useState("")
    const [city, setCity] =useState("")
    const [isLoading, setIsLoading] = useState(false);


    

    const handleInput = (e) => {
        setInputCity(e.target.value);
    }
    

    let alertTimeout;

    const clearAlert = () => {
        if (alertTimeout) {
            clearTimeout(alertTimeout);
        }
    };

    const getWeatherData = () => {
        try {
            setIsLoading(true);
            clearAlert();

            let apiKey = 'e0ed026973c74c8b8af60748232811';  
            let api = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

            axios.get(api)
                .then((response) => {
                 
                    setTemp(response.data.current.temp_c);
                    setHumid(response.data.current.humidity);
                    setCondi(response.data.current.condition.text);
                    setWindSpeed(response.data.current.wind_kph);
                    setWeatherDetail(true);
                })
                .catch((error) => {
                    console.log(error);
                    setWeatherDetail(false);
                    alertTimeout = setTimeout(() => {
                        alert("Failed to fetch data");
                    }, 3000);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (e) {
            console.log(e);
            
        }
    };

    const handleSubmit = (ev) => {
        ev.preventDefault();
        if (inputCity.trim() !== "") { 
            setCity(inputCity.toLowerCase());
        } else {
            clearAlert(); 
            alert("Please enter a city name");
        }
    };

    

    useEffect(()=>{
        if(inputCity){
            getWeatherData()
        }
    },)


  return (
    <div className='h-screen w-full bg-blue-100 flex flex-col'>

        {/* input and serach buttons */}

        <div className='text-center pt-20'>
            <input type="text" placeholder='Enter city name' className='w-30 h-8 p-2 rounded' onChange={(e) => handleInput(e)}/>
            <button className='bg-green-500 w-20 h-8 rounded ml-2' type='submit' onClick={(ev)=>handleSubmit(ev)}>Search</button>
        </div>

        {/* loading */}


        {isLoading && <p className="text-center pt-2">Loading data...</p>}

        
        {/* weather-card */}

        {
            weatherDetail ? (
                <div className='w-full flex mt-10 gap-4 justify-center flex-wrap'>
            <div className='w-52 h-24 bg-white shadow rounded-xl weather-card flex justify-center '>
                <div className='flex flex-col justify-center items-center'>
                <h3 className='font-bold text-xl'>Temperature</h3>
                <p className='text-[16px] pt-1'>{temp}°c</p>
                </div>
            </div>
            <div className='w-52 h-24 bg-white shadow rounded-xl weather-card flex justify-center '>
                <div className='flex flex-col justify-center items-center'>
                <h3 className='font-bold text-xl'>Humidity</h3>
                <p className='text-[16px] pt-1'>{humid}%</p>
                </div>
            </div>
            <div className='w-52 h-24 bg-white shadow rounded-xl weather-card flex justify-center '>
                <div className='flex flex-col justify-center items-center'>
                <h3 className='font-bold text-xl'>Condition</h3>
                <p className='text-[16px] pt-1'>{condi}</p>
                </div>
            </div>
            <div className='w-52 h-24 bg-white shadow rounded-xl weather-card flex justify-center '>
                <div className='flex flex-col justify-center items-center'>
                <h3 className='font-bold text-xl'>Wind Speed</h3>
                <p className='text-[16px] pt-1'>{windSpeed}kph</p>
                </div>
            </div>
            
        </div>
            ) : (
                  ""
            )
        }
        
    </div>
  )
}

export default Weather