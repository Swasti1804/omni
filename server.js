// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Dummy auction data
let auctions = [
  {
    id: 1,
    name: "iPhone 15",
    description: "Latest Apple iPhone with A16 chip",
    currentBid: 50000,
    endTime: Date.now() + 600000, // 10 mins from now
    bids: [
      { user: "User1", amount: 50000, timestamp: new Date() }
    ]
  },
  {
    id: 2,
    name: "MacBook Air M2",
    description: "Apple M2 chip with 256GB SSD",
    currentBid: 80000,
    endTime: Date.now() + 900000, // 15 mins from now
    bids: [
      { user: "User2", amount: 80000, timestamp: new Date() }
    ]
  }
];

// GET /products - List all auctions
app.get('/products', (req, res) => {
  const productList = auctions.map(product => ({
    id: product.id,
    name: product.name,
    description: product.description,
    currentBid: product.currentBid,
    timeLeft: Math.max(0, product.endTime - Date.now())
  }));
  res.json(productList);
});

// GET /products/:id - Product details
app.get('/products/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = auctions.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /bid - Place a new bid manually (optional)
app.post('/bid', (req, res) => {
  const { productId, amount, user } = req.body;
  const product = auctions.find(p => p.id === productId);

  if (!product) return res.status(404).json({ message: "Product not found" });
  if (Date.now() > product.endTime) return res.status(400).json({ message: "Auction has ended" });
  if (amount <= product.currentBid) return res.status(400).json({ message: "Bid must be higher than current bid" });

  product.currentBid = amount;
  product.bids.push({ user, amount, timestamp: new Date() });

  res.json({ message: "Bid placed successfully", currentBid: product.currentBid });
});

// GET /bids/:id - Bidding history of a product
app.get('/bids/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const product = auctions.find(p => p.id === id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.json({ bids: product.bids });
});

// GET /stats - Auction stats
app.get('/stats', (req, res) => {
  const stats = auctions.map(product => ({
    name: product.name,
    highestBid: product.currentBid,
    totalBids: product.bids.length
  }));
  res.json(stats);
});

// ✅ OmniDimension Webhook Route
app.post('/webhook', (req, res) => {
  const { intent, entities = {} } = req.body;
  console.log("🔁 Omni Webhook Triggered:", intent, entities);

  try {
    if (intent === 'list_auctions') {
      const list = auctions.map(p => `${p.name} starting at ₹${p.currentBid}`);
      return res.json({ message: `Current auctions: ${list.join(', ')}` });
    }

    if (intent === 'get_product_info') {
      const name = entities.product_name;
      const product = auctions.find(p => p.name.toLowerCase() === name?.toLowerCase());

      if (!product) return res.json({ message: `Product '${name}' not found.` });

      const timeLeft = Math.max(0, product.endTime - Date.now());
      const secondsLeft = Math.floor(timeLeft / 1000);

      return res.json({
        message: `${product.name}: ${product.description}. Current bid is ₹${product.currentBid}. Time left: ${secondsLeft} seconds.`
      });
    }

    if (intent === 'place_bid') {
      const name = entities.product_name;
      const amount = Number(entities.bid_amount);
      const product = auctions.find(p => p.name.toLowerCase() === name?.toLowerCase());

      if (!product) return res.json({ message: `Product '${name}' not found.` });
      if (Date.now() > product.endTime) return res.json({ message: `Sorry, the auction for ${product.name} has ended.` });
      if (amount <= product.currentBid) return res.json({ message: `Your bid must be higher than ₹${product.currentBid}.` });

      product.currentBid = amount;
      product.bids.push({ user: "VoiceAgent", amount, timestamp: new Date() });

      return res.json({ message: `✅ Your bid of ₹${amount} has been placed on ${product.name}.` });
    }

    // Unknown intent
    return res.json({ message: "I'm not sure how to help with that." });
  } catch (err) {
    console.error("Webhook Error:", err);
    return res.status(500).json({ message: "Something went wrong on the server." });
  }
});
app.get('/', (req, res) => {
  res.send('🎉 Auction backend is running!');
});


// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Auction backend running at http://localhost:${PORT}`);
});
