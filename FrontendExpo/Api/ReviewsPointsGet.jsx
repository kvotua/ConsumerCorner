import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";

export default GetCountPoints = async() =>{
    try {
        const jwt = await AccessGetToken();
        const response = await fetch(`https://consumer-corner.kvotua.ru/points/`, {
            method: 'GET',
            headers: {
              'accept': 'application/json',
              'Authorization': `Bearer ${jwt}`
            },
          });
        const data = await response.json();
        const filteredData = data.map(item => ({
            id: item.id,
            title: item.title
        }));
        return filteredData;
    } catch (error) {
      console.error(error.message);
    }
}