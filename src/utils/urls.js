const prod = false

console.log(import.meta)
export const API_URL = prod ? import.meta.env.URL: import.meta.env.VITE_API_URL;