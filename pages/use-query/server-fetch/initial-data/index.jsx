import { useQuery } from "@tanstack/react-query";
import { CardProduct } from "@/components/CardProduct";

const fetchProduct = async() => {
  const URL = "http://localhost:3000/api/product/1687091006450"
	const response = await fetch(URL)
  if(!response.ok) return Promise.reject(await response.json())
  return await response.json()
}

const InitialDataUseQuery = (props) => {

	const product = useQuery(["PRODUCT"], fetchProduct, {
    initialData: props.product,
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
  const product = await fetchProduct()
  return {
    props: {
      product,
    }
  }
}

export default InitialDataUseQuery
