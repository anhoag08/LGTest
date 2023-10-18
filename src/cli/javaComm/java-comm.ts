const axios = require('axios').default;

// Define the server URL
const serverUrl = 'http://localhost:1005';

// // GET request
// axios.get(`${serverUrl}`)
//     .then((response: { data: any; }) => {
//         console.log('GET Response:', response.data);
//     })
//     .catch((error: any) => {
//         console.error('GET Error:', error);
//     });

// POST request

export async function locatorSearch(locs: string[]): Promise<string[]> {
    const postData = { key: locs }; // Your POST data

    try {
        const response = await axios.post(`${serverUrl}`, postData);
        const locResponse = response.data as string[];
        return locResponse;
    } catch (error) {
        console.error('POST Error:', error);
        return ['error'];
    }
}


