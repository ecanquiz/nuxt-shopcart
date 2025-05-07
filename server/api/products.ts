type product = {
  "name": string;
  "image": string;
  "price": number;
}



export default defineEventHandler(async (event) => {      
  const products: product[] = await $fetch(`${process.env.APP_API_URL}/api/sales-catalog`,{
    headers: {
        Authorization: `Bearer ${process.env.APP_API_SHARED_TOKEN}`
    }
  });

  return products;

  /*return [{
    "name": "Plain Ol' Pineapple",
    "image": "pineapple-original.jpg",
    "price" : 4
  }, {
    "name": "Dried Pineapple",
    "image": "pineapple-dried.jpg",
    "price": 5
  }, {
    "name": "Pineapple Gum",
    "image": "pineapple-gum.jpg",
    "price" : 3
  }, {
    "name": "Pineapple T-Shirt",
    "image": "pineapple-tshirt.jpg",
    "price" : 12
  }, {
    "name": "PPlain Ol' Pineapple",
    "image": "pineapple-original.jpg",
    "price" : 44
  }, {
    "name": "DDried Pineapple",
    "image": "pineapple-dried.jpg",
    "price": 55
  }, {
    "name": "PPineapple Gum",
    "image": "pineapple-gum.jpg",
    "price" : 33
  }, {
    "name": "PPineapple T-Shirt",
    "image": "pineapple-tshirt.jpg",
    "price" : 123
  },{
    "name": "PPPlain Ol' Pineapple",
    "image": "pineapple-original.jpg",
    "price" : 444
  }, {
    "name": "DDDried Pineapple",
    "image": "pineapple-dried.jpg",
    "price": 555
  }, {
    "name": "PPPineapple Gum",
    "image": "pineapple-gum.jpg",
    "price" : 333
  }, {
    "name": "PPPineapple T-Shirt",
    "image": "pineapple-tshirt.jpg",
    "price" : 321
  }]*/

})