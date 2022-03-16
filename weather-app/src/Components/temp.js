// https://api.openweathermap.org/data/2.5/weather?q=pune&appid=9a13022fdd19000a1ad551cf1495868c
import React from 'react';
import "./style.css";
import Weathercard from './weathercard';
const Temp = () => {
    const [searchValue, setSearchValue] = React.useState("Mumbai");
    const [tempInfo, setTempInfo] = React.useState({});
    const getWeatherInfo = async() => { 
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=9a13022fdd19000a1ad551cf1495868c`;
            const res = await fetch(url);
            const data = await res.json();
            const {temp, humidity, pressure} = data.main;
            const {main:weathermood} = data.weather[0];
            const {name} = data;
            const {speed} = data.wind;
            const{country, sunset} = data.sys;
            const myNewWeatherInfo = {
                temp, humidity, pressure, weathermood, name, speed, country, sunset, 
            };
            setTempInfo(myNewWeatherInfo)
        }catch(error){
            console.log(error);
        }
    };
    React.useEffect(() => {
        getWeatherInfo();
    }, [])
    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="search" 
                        placeholder="Search..."
                        autoFocus id="search"
                        className="searchTerm"
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="searchButton" type="button" onClick={getWeatherInfo}>
                        Search
                    </button>
                </div>
            </div> 

            <Weathercard tempInfo = {tempInfo}/>
        </>
    )
}

export default Temp;
