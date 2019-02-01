var express = require('express');
var router = express.Router();
const axios = require('axios');

// gets the elements searched based on the query
router.get('/api/items', function(req, res) {
	const query = req.query.search
	axios.get('https://api.mercadolibre.com/sites/MLA/search?q=' + query + '&limit=4')
		.then(result => {
			const prods = result.data.results.map(function(prod) {
				return{
					id: prod.id,
					title: prod.title,
					price: {
						currency: prod.currency_id,
						amount: String(prod.price).split('.')[0],
						decimals: String(prod.price).split('.')[1] || '0'
					},
					picture: prod.thumbnail,
					condition: prod.condition,
					free_shipping: prod.shipping.free_shipping,
					location: prod.address.state_name
				}
			})

			let mostResultsCat = result.data.available_filters[0].values[0]

			const list = {
				categories: mostResultsCat,
				items: prods
			}

			res.json(list)
		})
})

// gets the item based on the id param
router.get('/api/items/:id', function (req, res) {
	const id = req.params.id

	let resultProduct = {};
	let resultDescription = {};
	
	axios.get('https://api.mercadolibre.com/items/' + id)
	.then(result => {
		resultProduct = result;
		return axios.get('https://api.mercadolibre.com/items/' + id + '/description')
	})
	.then(result => {
		resultDescription = result;
		const category = resultProduct.data.category_id;
		return axios.get('https://api.mercadolibre.com/categories/' + category)
	})
	.then(resultCategory => {
		resultProduct = resultProduct.data
		
		let cat = resultCategory.data.path_from_root.map(function(c) {
			return c.name
		})

		const prodDetail = {
			categories: cat,
			item: {
				id: resultProduct.id,
				title: resultProduct.title,
				price: {
					currency: resultProduct.currency_id,
					amount: String(resultProduct.price).split('.')[0],
					decimals: String(resultProduct.price).split('.')[1] || '00'
				},
				picture: resultProduct.pictures[0].url,
				condition: resultProduct.condition,
				free_shipping: resultProduct.shipping.free_shipping,
				sold_quantity: resultProduct.sold_quantity,
				description: resultDescription.data.plain_text
			}	
		}

		res.json(prodDetail)
	})
})

module.exports = router;
