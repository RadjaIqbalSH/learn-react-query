import { QueryProduct } from "@/components/Query/QueryProduct";
import { CardProduct } from "@/components/CardProduct";

const ComponentUseQuery = () => {
	return (
    <div className="w-full flex items-center gap-x-8">
      <QueryProduct>
        {
          (product) => (
            <CardProduct
              name={product.data?.product_name}
              imageUrl={product.data?.image_url}
              category={product.data?.category}
              price={product.data?.price}
              stock={product.data?.stock}
              isLoading={product.isLoading || product.isFetching}
              isError={product.isError}
            />
          )
        }
      </QueryProduct>
    </div>
	);
}

export default ComponentUseQuery
