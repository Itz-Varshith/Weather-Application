
 function toLocalTime(time,offset){
    console.log('hi');
    const unixTimestamp = time; 
    const timezoneOffset = offset;      
    const adjustedTimestamp = (unixTimestamp + timezoneOffset) * 1000;
    const date = new Date(adjustedTimestamp);
    const formattedTime = date.toLocaleTimeString("en-US", { timeZone: "UTC" });
    const [hours, minutes] = formattedTime.split(':');
    console.log(`${hours}:${minutes}`)   
    return `${hours}:${minutes}`;
}
function toDataAndTime(input){
        const date = new Date(input * 1000);
        const day = date.getDate();
        const month = date.toLocaleString("default", { month: "long" });
        const year = date.getFullYear();
        return `${day} ${month}-${year}`;
      }
      
function getDayFromDate(dateString) {
    // console.log("inside the function")
    const date = new Date(dateString);  
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayIndex = date.getDay();
    return daysOfWeek[dayIndex];
  }

function backgroundSelector(num){
    // console.log("inside the background selector function");
    if(num==0){
        document.body.style.backgroundImage='url("background2.jpg")';
        document.body.style.backgroundSize='cover';
    }
    else if(num==1){
        document.body.style.backgroundImage='url("background2.jpg")';
        document.body.style.backgroundSize='cover';
    }
    else if(num==2){
        document.body.style.backgroundImage='url("Thunderstorm_background.jpg")';
        document.body.style.backgroundSize='cover';
    }
}

const url_template='https://api.openweathermap.org/data/2.5/weather?q={city name}&appid=f36afb367ee2dda25880aa9f43b4e1ce';

const form=document.querySelector('.form');


form.addEventListener('submit',async (event)=>{
    event.preventDefault();

    const cityName=document.querySelector('.city-name').value;
    const url=url_template.replace('{city name}',encodeURIComponent(cityName));

    // console.log(url);
    let output=await fetch(url);
    final_output=output.json();
    console.log(final_output)
    final_output.then((res)=>{
        if(res.cod!=200){
            alert("Enter a valid city name");
        }
        else{
        let backSelector=((Math.random())*2).toFixed(0);
        backgroundSelector(backSelector);
        document.querySelector('.temp_num').innerHTML=`${(res.main.temp-273).toFixed(0)}<sup>o</sup>C`;
        let date=toDataAndTime(res.dt);
        document.querySelector('.date').innerHTML=`${toDataAndTime(res.dt)}<br>${getDayFromDate(date)}<br>`;
        document.querySelector('.city-name-display').innerText=res.name;
        document.querySelector('.city-name-display').style.fontSize='5rem';
        document.querySelector('.Weather-description').innerText=res.weather[0].description;
        document.querySelector('.wind-speed-value').innerText=res.wind.speed;
        document.querySelector('.wind-speed-value').style.fontSize='3rem';
        document.querySelector('.humidity-value').innerHTML=`${res.main.humidity}%`;
        document.querySelector('.humidity-value').style.fontSize='3rem';
        document.querySelector('.Feels-like-value').innerHTML=`${(res.main.feels_like-273).toFixed(0)}<sup>o</sup>C`;
        document.querySelector('.Feels-like-value').style.fontSize='3rem';
        document.querySelector('.visibility-value').innerText=res.visibility/1000;
        document.querySelector('.visibility-value').style.fontSize='3rem';
        document.querySelector('.pressure-value').innerText=res.main.pressure/1000;
        document.querySelector('.pressure-value').style.fontSize='3rem';
        document.querySelector('.cloudiness-value').innerText=res.clouds.all;
        document.querySelector('.cloudiness-value').style.fontSize='3rem';
        document.querySelector('.max-temp').innerHTML=`Max: ${(res.main.temp_max-273).toFixed(0)}<sup>o</sup>C`;
        document.querySelector('.max-temp').style.fontSize='1.5rem';
        document.querySelector('.min-temp').innerHTML=`Min: ${(res.main.temp_min-273).toFixed(0)}<sup>o</sup>C`;
        document.querySelector('.min-temp').style.fontSize='1.5rem';
        document.querySelector('.rise-time').innerHTML=`Up- ${toLocalTime(res.sys.sunrise,res.timezone)}AM`;
        document.querySelector('.rise-time').style.fontSize='1.4rem';
        document.querySelector('.set-time').innerText=`Set-${toLocalTime(res.sys.sunset,res.timezone)}PM`;
        document.querySelector('.set-time').style.fontSize='1.4rem';
        document.querySelector('.city-name').value='';
        }
    })



})
