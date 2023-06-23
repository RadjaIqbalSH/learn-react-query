import { useInfiniteQuery } from "@tanstack/react-query";
import { CardProduct } from "@/components/CardProduct";

const fetchProducts = async({pageParam = 1}) => {
  const URL = `http://localhost:3000/api/product?page=${pageParam}&per_page=3`
	const response = await fetch(URL)

  if(!response.ok) return Promise.reject(await response.json())
	
  return await response.json()
}

const PagginationUseQuery = () => {

  const products = useInfiniteQuery(["PRODUCTS"], fetchProducts, {
    getNextPageParam: (lastPage, pages) => {
      if(pages.length <= lastPage.pagination.total_page) {
        return pages.length + 1
      } else {
        return undefined
      }
    },
  })

	return (
    <>
      <div className="w-full grid grid-cols-3 gap-4">
        {
          products.data?.pages?.map((items) => (
            items?.data?.map((product) => (
              <CardProduct
                name={product.product_name}
                imageUrl={product.image_url}
                category={product.category}
                price={product.price}
                stock={product.stock}
                isLoading={false}
                isError={false}
              />
            ))
          )) 
        }
        
      </div>
      <div className="w-fit flex items-center mx-auto mt-8">
        <button className="p-2 border-2 border-black rounded-md mr-4 disabled:bg-gray-400" onClick={products.fetchNextPage} disabled={!products.hasNextPage}>Load More</button>
        <button className="p-2 border-2 border-black rounded-md mr-4" onClick={products.refetch} >Refetch</button>
      </div>
    </>
	);
}

export default PagginationUseQuery
