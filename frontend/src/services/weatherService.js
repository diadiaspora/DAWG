
const apiKey = import.meta.env.VITE_API_KEY;
console.log(apiKey);

const BASE_URL = `http://api.weatherapi.com/v1/current.json?key=${apiKey}`;


const show = async (city) => {
    try {
      const queryString = `&q=${city}`;
      const res = await fetch(BASE_URL + queryString);
      const data = await res.json();
      console.log('Data:', data);
      return data;
    } catch (err) {
      console.log(err);
    }
  };
  
  export { show };
