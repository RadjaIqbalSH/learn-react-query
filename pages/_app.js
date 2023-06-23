import "@/styles/globals.css";
import { QueryClient, QueryClientProvider, Hydrate } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const defaultQueryFn = async(payload) => {
  const URL = `http://localhost:3000/api${payload.queryKey[0]}`
	const response = await fetch(URL)
  
  if(!response.ok) return Promise.reject(await response.json())
	
  return await response.json()
}

const defaultMutationFn = async(payload) => {
  const URL = `http://localhost:3000/api/product`
  const response = await fetch(URL,{
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(payload)
  })
  if(!response.ok) return Promise.reject(await response.json())
  return await response.json()
}

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			queryFn: defaultQueryFn,
		},
		mutations: {
			mutationFn: defaultMutationFn,
			onError: () => {
				alert("ERROR FETCH DATA")
			},
		}
	}
})

// const queryClient = new QueryClient()

export default function App({ Component, pageProps }) {
	return (
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}/>
				<Component {...pageProps} />
				<ReactQueryDevtools initialIsOpen={false}/>
			</QueryClientProvider>
	);
}
