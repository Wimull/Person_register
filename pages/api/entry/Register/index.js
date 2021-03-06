const Person = require("../../person_model");

export default function handler(req, res) {
	if (req.method === "GET") {
		let request = {};
		for (let key in req.query) request[key] = { $regex: req.query[key] }; //Implementation of non-exact match
		Person.find(request, (err, data) => {
			if (err)
				return res
					.status(500)
					.json({ error: "Coundn't get data", errorMessage: err });
			return res.status(200).json(data);
		});
	}
	if (req.method === "POST") {
		try {
			let data = new Person(req.body);
			Person.init()
				.then(() => {
					data.save((err, data) => {
						if (!err) return res.status(200).json(data);
						if (err.message.indexOf("duplicate key error") !== -1) {
							return res.status(406).json({
								error: "Duplicate key error",
								errorMesage: err.message,
							});
						}
						if (err.message.indexOf("Person validation failed") !== -1) {
							return res.status(406).json({
								error: "Missing required paramethers",
								errorMesage: err.message,
							});
						}
						if (err) {
							return res.status(503).json({
								error: "failed to save data",
								errorMessage: err.message,
							});
						}

						//If successfull
					});
				})
				.catch((error) => {
					if (error.message.indexOf("duplicate key error") !== -1)
						return res.status(406).json({
							error: "Duplicate key error",
							errorMesage: error.message,
						});
				});
		} catch (err) {
			return res
				.status(400)
				.json({ error: "Input invalid", errorMessage: err.message });
		}
	}
}
