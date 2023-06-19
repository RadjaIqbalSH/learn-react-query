// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { store } from "@/helpers/store";

export default function handler(req, res) {
	const STORE = store({
		path: "db/product.json",
		res,
	});

	if (req.method === "GET") {
		STORE.show(req.query.id);
	}

	if (req.method === "PUT") {
		STORE.update(req.body, req.query.id);
	}

	if (req.method === "DELETE") {
		STORE.delete(req.query.id);
	}
}
