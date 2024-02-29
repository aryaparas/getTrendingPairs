import fetch from 'node-fetch';

// Function to fetch data from your API
export default async function fetchData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/categories?order=market_cap_change_24h_desc');
        const data = await response.json();
        const slicedArray = data.slice(0, 10);
        return slicedArray;
    } catch (error) {
        console.log("Error from  Fetch Data: ", error);
    }
}

// fetchDataFromAPI();

// export { fetchDataFromAPI };
