import { AccessGetToken } from "@/app/AsyncStore/StoreTokens";


export const GetIdEnterprise = async (token) =>{
    const url = 'http://localhost:8765/enterprises/enterprises-info';
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Authorization" : `Bearer ${token}` 
        },
        body: JSON.stringify({ 
        }),
      });
      const data = await response.json();
      return data.id;
    }
    catch(error){
      console.log(error.message)
    }
}

export const RegNewPointServer = async (NamePoint, adress, StartTime, EndTime, Phone) => {
    const token = await AccessGetToken();
    const id = await GetIdEnterprise(token)
    const url = ""
    try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Accept": "application/json",
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
          },
          body: JSON.stringify({ 
            "name": `${NamePoint}`,
            "enterprise_id": `${id}`,
            "address": `${adress}`,
            "opening_time": `${StartTime}`,
            "closing_time": `${EndTime}`,
            "phone": `${Phone}`,
            "type_activity": "Продажа" // поменять
          }),
        });
        console.log(1)
        if(!response.ok)
          return false;
        console.log(123)
        return true;
    }
    catch(error){
      console.log(error.message)
    }
}