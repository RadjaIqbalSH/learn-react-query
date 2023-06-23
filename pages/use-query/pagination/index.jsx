import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { CardProduct } from "@/components/CardProduct";

const fetchProducts = async(page) => {
  const URL = `http://localhost:3000/api/product?page=${page}`
	const response = await fetch(URL)
  
  if(!response.ok) return Promise.reject(await response.json())
	
  return await response.json()
}

const PaginationUseQuery = () => {

  const [ page, setPage ] = useState(1)

	const products = useQuery(["PRODUCTS", page], () => fetchProducts(page), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

	return (
    <>
      <div className="w-full flex items-center gap-x-8">
        {
          products.data?.data.map((product) => {
            return (
              <CardProduct
                name={product.product_name}
                imageUrl={product.image_url}
                category={product.category}
                price={product.price}
                stock={product.stock}
                isLoading={false}
                isError={false}
              />
            )
          }) 
        }
        
      </div>
      <div className="w-fit flex items-center mx-auto mt-8">
        <button 
          className="p-2 border-2 border-black rounded-md mr-4" 
          onClick={() => setPage(current => current - 1)} disabled={page === 1}
        >Prev</button>
        <p>{page}</p>
        <button 
          className="p-2 border-2 border-black rounded-md ml-4" 
          onClick={() => setPage(current => current + 1)}
        >Next</button>
      </div>
    </>
	);
}

export default PaginationUseQuery
