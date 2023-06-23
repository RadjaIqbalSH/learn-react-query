import { createContext } from "react"
import { QueryClient, useQuery, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const doFetch = async() => {
  const URL = "https://jsonplaceholder.typicode.com/users/1"
	const response = await fetch(URL)
  
  if(!response.ok) return Promise.reject(await response.json())
	
  return await response.json()
}

const context = createContext(undefined)


export const useUserContext = () => {
  return useQuery(["USER","CONTEXT"], doFetch, {context})
}

export const UserProvider = ({
  children,
}) => {
  return (
    <QueryClientProvider client={queryClient} context={context}>
      {children}
    </QueryClientProvider>
  )
}