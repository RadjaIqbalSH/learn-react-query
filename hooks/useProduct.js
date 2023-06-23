import { useQuery } from "@tanstack/react-query";

const fetchProduct = async() => {
  const URL = "http://localhost:3000/api/product/1687091006450"
	const response = await fetch(URL)
  
  if(!response.ok) return Promise.reject(await response.json())
	
  return await response.json()
}

export const useProduct = () => useQuery(["PRODUCT","HOOKS"], fetchProduct)