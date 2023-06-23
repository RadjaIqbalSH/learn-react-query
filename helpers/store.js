const fs = require("fs");

const getStore = (path) => {
	return JSON.parse(fs.readFileSync(path));
};

const updateStore = (path, payload) => {
	fs.writeFileSync(path, JSON.stringify(payload));
};

export const store = (payload) => {
	const { path, res } = payload;
	return {
		list: (payload) => {
			const { page = 1, perPage = 10 } = payload;
			const max = page * perPage;
			const min = max - perPage;
			const currentData = getStore(path);

			// DELAY
			// setTimeout(() => {
			// 	res.status(200).json({
			// 		data: currentData.slice(min, max),
			// 		pagination: {
			// 			page: +page,
			// 			per_page: +perPage,
			// 			total_page: Math.ceil((currentData.length - 1) / +perPage),
			// 			total: currentData.length - 1,
			// 		},
			// 	});
			// }, 5 * 1000);

			// NORMAL
			res.status(200).json({
				data: currentData.slice(min, max),
				pagination: {
					page: +page,
					per_page: +perPage,
					total_page: Math.ceil((currentData.length - 1) / +perPage),
					total: currentData.length - 1,
				},
			});

			return;
		},
		show: (id) => {
			let currentData = getStore(path);
			const pointer = currentData.findIndex(
				(element) => element.id == id
			);

			if (pointer < 0) {
				res.status(404).json("Data tidak ditemukan");
				return;
			}

			// Delay
			// setTimeout(() => {
			// 	res.status(200).json(currentData[pointer]);
			// }, 5 * 1000);

			// Normal
			res.status(200).json(currentData[pointer]);
			return;
		},
		post: (payload) => {
			let currentData = getStore(path);
			const newPayload = {
				id: Date.now(),
				...payload,
			};
			const newData = [newPayload, ...currentData ];
			updateStore(path, newData);

			// Delay
			// setTimeout(() => {
			// 	res.status(200).json({
			// 		id: Date.now(),
			// 		...payload,
			// 	});
			// }, 15 * 1000);

			// Normal
			res.status(200).json({
				id: Date.now(),
				...payload,
			});
			return;
		},
		update: (payload, id) => {
			let currentData = getStore(path);
			const pointer = currentData.findIndex(
				(element) => element.id == id
			);

			if (pointer < 0) {
				res.status(404).json("Data tidak ditemukan");
				return;
			}

			currentData[pointer] = {
				id: +id,
				...payload,
			};

			updateStore(path, currentData);

			// Delay
			// setTimeout(() => {
			// 	res.status(200).json({
			// 		id: +id,
			// 		...payload,
			// 	});
			// }, 5 * 1000);

			// Normal
			res.status(200).json({
				id: +id,
				...payload,
			});
			return;
		},
		delete: (id) => {
			let currentData = getStore(path);

			const pointer = currentData.findIndex(
				(element) => element.id == id
			);

			if (pointer < 0) {
				res.status(404).json("Data tidak ditemukan");
				return;
			}

			for (var i = 0; i < currentData.length; i++) {
				if (currentData[i].id == id) {
					currentData.splice(i, 1);
				}
			}

			updateStore(path, currentData);

			// Delay
			// setTimeout(() => {
			// 	res.status(200).json("Delete data success");
			// }, 5 * 1000);

			// Normal
			res.status(200).json("Delete data success");
			return;
		},
	};
};
