import axios from "axios"

const apiUrl = "****";
const authenticateData = {
    "appkey":"****",
    "appsecret": "****"
};
const config = {
    headers : {
        "Content-Type" : "application/json",
        "Authorization" : localStorage.getItem("tokens")
    }
};

const api = {
    getToken() {
        return new Promise((resolve,reject) => {
            axios.post(apiUrl+"****",authenticateData,config)
                .then(response => resolve(response))
                .catch(err => reject(err));
        });
    },
    getPoilist() {
        const venueId = 75;
        const lang = "TR";
        
        return new Promise((resolve,reject) => {
            api.checkToken()
                .then(response => {
                    axios.get(apiUrl+`****`,config)
                        .then(response => resolve(response))
                        .catch(err => reject(err));
                })
                .catch(err => {
                    console.log(err);
                });
        });
    },
    async checkToken(){
        let date = new Date();
        let expireTime = localStorage.getItem("tokenExpire");

        console.log(date.getTime(),expireTime);

        if(!expireTime || date.getTime() < expireTime) {
            return;
        }else {
            this.getToken()
                .then(function(response){
                    console.log("geçersiz token");

                    localStorage.setItem("tokens",response.data.data);

                    let date = new Date();
                    date.setMinutes(date.getMinutes() + 10);
                    localStorage.setItem("tokenExpire",date.getTime());

                    api.checkToken();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};

export default api;