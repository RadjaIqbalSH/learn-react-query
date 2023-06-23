import { useProduct } from "@/hooks/useProduct";
import { CardProduct } from "@/components/CardProduct";

const BasicUseQuery = () => {

	const product = useProduct()

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

export default BasicUseQuery
