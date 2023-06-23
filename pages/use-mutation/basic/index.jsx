import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SpinnerIcon } from "@/components/Icons/Spinner";

const fetchProducts = async(page = 1) => {
  const URL = `http://localhost:3000/api/product?page=${page}&per_page=5`
	const response = await fetch(URL)
  
  if(!response.ok) return Promise.reject(await response.json())
	
  return await response.json()
}

const postProduct = async(payload) => {
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

const BasicMutation = () => {
  const [ page, setPage ] = useState(1)
  const queryClient = useQueryClient()
  const products = useQuery(["PRODUCTS", page], () => fetchProducts(page), {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  })

  const mutation = useMutation({
    mutationFn: postProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({queryKey: ["PRODUCTS"]})
    },
  })

  const handleSubmit = (evt) => {
    evt.preventDefault()
    mutation.mutate({
      product_name: evt.target["product_name"].value,
      image_url: evt.target["image_url"].value,
      category: evt.target["category"].value,
      price: evt.target["price"].value,
      stock: evt.target["stock"].value
    })
  }

	return (
    <div className="w-full flex justify-between gap-8">
      <div className="w-full">
        <table className="border-black border-2 h-fit w-full">
          <thead>
            <tr className="border-black border-2 bg-gray-300">
              <th className="border-black border-2 p-2 font-semibold">
                Nama Produk
              </th>
              <th className="border-black border-2 p-2 font-semibold">
                Kategori
              </th>
              <th className="border-black border-2 p-2 font-semibold">
                Harga
              </th>
              <th className="border-black border-2 p-2 font-semibold">
                Stok
              </th>
            </tr>
          </thead>
          <tbody>
            {
              products.data?.data?.map((product, idx) => (
                <tr className="border-black border-2" key={idx}>
                  <td className="border-black border-2 p-2 text-center">
                    {product.product_name}
                  </td>
                  <td className="border-black border-2 p-2 text-center">
                    {product.category}
                  </td>
                  <td className="border-black border-2 p-2 text-center">
                    {product.price}
                  </td>
                  <td className="border-black border-2 p-2 text-center">
                    {product.stock}
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          (products.isFetching || products.isLoading) && (
            <div className="w-full flex items-center justify-center bg-red-100 p-12 border-2 border-black">
              <p className="">LOADING ...</p>
            </div>
          )
        }
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
      </div>
      <div className="w-fit border-black border-2 p-8">
        <p className="mb-8 font-semibold">Tambah Product</p>
        <form onSubmit={handleSubmit}>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="w-20">Nama product</span>
            <input
              className="border-2 border-black p-2"
              type="text"
              name="product_name"
            />
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="w-20">Product Image</span>
            <input
              className="border-2 border-black p-2"
              type="text"
              name="image_url"
            />
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="w-20">Kateogri</span>
            <input
              className="border-2 border-black p-2"
              type="text"
              name="category"
            />
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="w-20">Harga</span>
            <input
              className="border-2 border-black p-2"
              type="text"
              name="price"
            />
          </div>
          <div className="w-full flex items-center gap-2 mb-4">
            <span className="w-20">Stok</span>
            <input
              className="border-2 border-black p-2"
              type="text"
              name="stock"
            />
          </div>
          <button 
            className="w-full p-4 rounded-md border-2 border-black hover:bg-black hover:text-white flex items-center justify-center gap-x-2 disabled:bg-gray-200"
            disabled={mutation.isLoading}
          >
            Kirim
            {
              mutation.isLoading && (
                <SpinnerIcon/>
              )
            }
          </button>
        </form>
      </div>
    </div>
	);
}

export default BasicMutation
