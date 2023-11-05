import config from "./config";
const api_url=config.api_url

export  async function get_all_members(){

    try{
        let access_token=sessionStorage.getItem("ACCESS8TOKEN")
        let response= await fetch(api_url,{
            method:'GET',
            headers: {Authorization: 'Bearer '+ access_token}
        });
        console.log(response.status)
        const data= await response.json()

        return data;
    }catch (e) {
        let data={
            "status":404,
            "data":"Error requesting API"
        }
        return data
    }

}