import { useQuery } from "@tanstack/react-query";
import { CardProduct } from "@/components/CardProduct";

const DefaultFetchUseQuery = () => {

	const product = useQuery({queryKey: ["/product/1687091006450"]})

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

export default DefaultFetchUseQuery
