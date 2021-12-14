import axios from "axios";

// Pode ser algum servidor executando localmente: 
// http://localhost:3000

const apiCheckout = axios.create({
  baseURL: "https://api-fluents.herokuapp.com/checkout/pagamento",
});

export default apiCheckout;


//  baseURL: "http://d683-2804-d45-9748-3200-75e0-79e9-dd55-7ef7.ngrok.io/checkout/pagamento",