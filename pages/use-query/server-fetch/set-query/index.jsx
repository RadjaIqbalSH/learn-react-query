import { QueryClient, dehydrate, useQuery } from "@tanstack/react-query";
import { CardProduct } from "@/components/CardProduct";

const doFetch = async() => {
  const URL = "http://localhost:3000/api/product/1687091006450"
	const response = await fetch(URL)
  if(!response.ok) return Promise.reject(await response.json())
  return await response.json()
}

const BasicUseQuery = () => {
	const product = useQuery(["PRODUCT"], doFetch, {
    refetchOnMount: false,
  })

	return (
    <div className="w-full flex items-center gap-x-8">
      <CardProduct
        name={product.data?.product_name}
        imageUrl={product.data?.image_url}
        category={product.data?.category}
        price={product.data?.price}
        stock={product.data?.stock}
        isLoading={product.isLoading || product.isFetching}
        isError={product.isError}
      />
    </div>
	);
}

export const getServerSideProps = async () => {
  const queryClient = new QueryClient()
  queryClient.setQueryData(["PRODUCT"], {
    "id": 1687091006450,
    "product_name": "Revitaluxe Beauty Serum",
    "image_url": "https://m.media-amazon.com/images/I/51uGkKaCieL.jpg",
    "category": "Body",
    "price": 40000,
    "stock": 332
  })
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    }
  }
}

export default BasicUseQuery
