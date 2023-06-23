import { useQuery } from "@tanstack/react-query";

const doFetch = async() => {
	const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
	return await response.json()
}

export default function Home() {

	const todo = useQuery(["TODO"], doFetch)

	return (
		<div className="">
			{/* <div className="w-full flex items-center justify-center mb-10">
				<h1 className="text-black font-black text-4xl">
					COBA COBA REACT QUERY
				</h1>
			</div>
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
							<tr className="border-black border-2">
								<td className="border-black border-2 p-2 text-center">
									Pond's
								</td>
								<td className="border-black border-2 p-2 text-center">
									Wajah
								</td>
								<td className="border-black border-2 p-2 text-center">
									2000
								</td>
								<td className="border-black border-2 p-2 text-center">
									1256 pcs
								</td>
							</tr>
						</tbody>
					</table>
					<div className="w-full flex items-center justify-center bg-red-100 p-12 border-2 border-black">
						<p className="">LOADING ...</p>
					</div>
				</div>
				<div className="w-fit border-black border-2 p-8">
					<p className="mb-8 font-semibold">Tambah Product</p>
					<form>
						<div className="w-full flex items-center gap-2 mb-4">
							<span className="w-20">Nama product</span>
							<input
								className="border-2 border-black p-2"
								type="text"
								name="product_name"
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
								name="stoc"
							/>
						</div>
						<button className="w-full p-4 rounded-md border-2 border-black hover:bg-black hover:text-white">
							Kirim
						</button>
					</form>
				</div>
			</div> */}
		</div>
	);
}
