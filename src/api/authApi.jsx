const baseUrl = import.meta.env.VITE_APP_SERVER_URL + "auth/"
const DEAFULHEADER = { "Content-Type": "application/json", dataType: "json" }


//file for all auth related api data calls
export const Login =  (data, success, error) => {
  console.log('data', data)
  fetch(baseUrl + "login", {
    method :'POST',
    headers: { ...DEAFULHEADER },
    body: JSON.stringify(data)

  }).then(res => {

   return res.json()

  }).then((data)=>{
    if(data.ok){
      console.log('data', data)
      success(data)
    }else{
      error(data)
    }
  })


}


export const Register =  (data, success, error) => {
  console.log('data', data)
  fetch(baseUrl + "register", {
    method :'POST',
    headers: { ...DEAFULHEADER },
    body: JSON.stringify(data)

  }).then(res => {

   return res.json()

  }).then((data)=>{
    if(data.ok){
      console.log('data', data)
      success(data)
    }else{
      error(data)
    }
  })


}