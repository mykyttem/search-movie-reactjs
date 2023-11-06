const parseSearch = async (inputValue) => {
	const url = `https://imdb-com.p.rapidapi.com/auto-complete?q=${inputValue}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': 'your_token',
			'X-RapidAPI-Host': 'imdb-com.p.rapidapi.com'
		}
	};
  
	try {
	  const response = await fetch(url, options);
	  const result = await response.text();
	  
	  return result; 
	} catch (error) {
	  console.error(error);
	  return null;
	}
  };


export default parseSearch;