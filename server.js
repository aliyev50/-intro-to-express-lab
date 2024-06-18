const express = require('express');
const app = express();

app.get('/greetings/:username', (req, res) => {
    const username = req.params.username;
    res.send(`Hello there, ${username}! What a delight it is to see you once more, ${username}.`);
  });

app.get('/roll/:number', (req, res) => {
    const number = req.params.number;
  if(isNaN(number)) {

    res.send(`You must specify a number`)

  }  else {

    res.send(`You rolled a ${number}.`);
  }
   
})

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
  ];


app.get('/collectibles/:index', (req, res) => {
    const index = req.params.index;
    if (isNaN(index) || index < 0 || index >= collectibles.length) {
      res.send("This item is not yet in stock. Check back soon!");
    } else {
      const item = collectibles[index];
      res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`);
    }
  });

  const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

app.get('/shoes', (req, res) => {
    let filteredShoes = shoes;
  
    const { 'min-price': minPrice, 'max-price': maxPrice, type } = req.query;
  

    if (minPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price >= minPrice);
    }
  
    
    if (maxPrice) {
      filteredShoes = filteredShoes.filter(shoe => shoe.price <= maxPrice);
    }
  
    
    if (type) {
      filteredShoes = filteredShoes.filter(shoe => shoe.type === type);
    }
  

    res.json(filteredShoes);
  });

app.listen(3000, () => {
    console.log('Listening on port 3000')
  })