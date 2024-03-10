import React, { useState } from 'react'
import invalid from '../assets/invalid.png'
import { FaSearch } from "react-icons/fa";
import { WiDaySunny } from "react-icons/wi"; // sunny/clear
import { BsCloudSun } from "react-icons/bs"; //haze
import { BsClouds } from "react-icons/bs"; //clouds
import { WiHumidity } from "react-icons/wi"; //humudity
import { IoRainy } from "react-icons/io5"; //rainy
import { FaSnowflake } from "react-icons/fa"; //snow
import { WiDayWindy } from "react-icons/wi"; //wind
import { WiDust } from "react-icons/wi"; //dust
import { CiCloudDrizzle } from "react-icons/ci"; //drizzle
import { BsCloudFog2 } from "react-icons/bs"; //fog


function Weather() {
    const key = import.meta.env.VITE_API_KEY
    const [city, setCity] = useState("")
    const [description, setDescription] = useState("")
    const [humidity, setHumudity] = useState("0")
    const [wind, setWind] = useState("0")
    const [temp, setTemp] = useState("0")
    const [cityName, setCityName] = useState("Enter Location")
    const [icon, setIcon] = useState(<img src={invalid} alt="invalid" className='w-[128px]' />)

    const handleSearch = async (e) => {
        e.preventDefault()
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.trim()}&units=metric&appid=${key}`
        if (city === "") {
            return null
        } else {
            await fetch(url)
                .then((e) => e.json())
                .then((data) => {
                    
                    if (data.cod === "404") {
                        setCityName("Invalid City")
                        setHumudity("0")
                        setWind("0")
                        setTemp("0")
                        setIcon(<img src={invalid} alt="invalid" className='w-[128px]' />)
                        setDescription("")
                        setCity("")
                    } else {
                        setHumudity(Math.floor(data.main.humidity))
                        setWind(Math.floor(data.wind.speed))
                        setTemp(Math.floor(data.main.temp))
                        setDescription(data.weather[0].main)
                        setCityName(data.name)

                        switch (data.weather[0].main) {
                            case "Clear":
                                setIcon(<WiDaySunny />);
                                break;
                            case "Haze":
                                setIcon(<BsCloudSun />);
                                break;
                            case "Clouds":
                                setIcon(<BsClouds />);
                                break;
                            case "Rain":
                                setIcon(<IoRainy />);
                                break;
                            case "Snow":
                                setIcon(<FaSnowflake />);
                                break;
                            case "Dust":
                                setIcon(<WiDust />);
                                break;
                            case "Fog":
                                setIcon(<BsCloudFog2 />);
                                break;
                            case "Mist":
                                setIcon(<CiCloudDrizzle />);
                                break;
                            default:
                                setIcon(<img src={invalid} alt="invalid" className='w-[128px]' />);
                        }
                        setCity("")
                    }
                })
                .catch((error) => {
                    console.error('Error fetching data:', error)
                    setCity("");
                });
        }
    }


    return (
        <div className=' w-[350px] bg-white bg-opacity-15 border-2 border-white border-opacity-20 backdrop-blur-lg h-[555px] rounded-2xl p-5 font-sans'>

            <form onSubmit={handleSearch} className='w-full relative flex items-center h-[55px]'>
                <input
                    type="text"
                    placeholder='Search'
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='w-full h-full absolute bg-transparent border-2 border-white border-opacity-20 text-xl outline-none text-white rounded-xl pl-5 pr-10' />
                <button type="submit" className='text-white absolute right-0 h-full w-[40px] text-xl pr-5 pl-2'>
                    <FaSearch />
                </button>
            </form>

            <div className='mt-8 text-white font-normal flex flex-col items-center'>
                <div className='text-9xl' >
                    {icon}
                </div>
                <div className='mt-6 text-6xl font-bold  '>
                    {temp}<span className='absolute text-2xl'>°C</span>
                </div>
                <div className='mt-5 text-2xl font-medium'>
                    {cityName}{description? ' - ' + description : null}
                </div>
            </div>

            <div className='w-full mt-8 text-white flex justify-center items-center'>
                
                <div className='flex items-center pl-5 w-1/2'>
                    <WiHumidity className=' h-full text-white text-6xl ' />
                    <div className='font-medium' >
                        <div className='text-xl'>{humidity} %</div>
                        <div className='text-sm'>Humidity</div>
                    </div>
                </div>
                
                <div className='flex items-center gap-3 w-1/2'>
                    <WiDayWindy className='h-full text-white text-6xl' />
                    <div className='font-medium'>
                        <div className='text-xl'>{wind} km/h</div>
                        <div className=' text-sm'>Wind Speed</div>
                    </div>
                </div>
            
            </div>

        </div>
    )
}

export default Weather