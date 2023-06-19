// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { store } from "@/helpers/store";

export default function handler(req, res) {
	const STORE = store({
		path: "db/product.json",
		res: res,
	});

	if (req.method === "GET") {
		STORE.list({
			page: req.query.page || 1,
			perPage: req.query.per_page || 10,
		});
	}

	if (req.method === "POST") {
		STORE.post(req.body);
	}
}
