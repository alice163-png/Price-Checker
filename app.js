import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = 3000;
const API_URL = "https://api.coingecko.com/api/v3/simple/price";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Define your list of cryptocurrencies
const cryptocurrencies = [
    { code: 'BTC', name: 'Bitcoin' },
    { code: 'ETH', name: 'Ethereum' },
    { code: 'USDT', name: 'Tether' },
    // { code: 'BNB', name: 'Binance Coin' },
    // { code: 'XRP', name: 'XRP' },
    { code: 'ADA', name: 'Cardano' },
    { code: 'SOL', name: 'Solana' },
    { code: 'DOGE', name: 'Dogecoin' },
    { code: 'DOT', name: 'Polkadot' },
    { code: 'LTC', name: 'Litecoin' },
    // Add more cryptocurrencies as needed
];

app.get("/", (req, res) => {
  res.render("index.ejs", { cryptocurrencies });
});

app.post('/submit', async (req, res) => {
    const selectedCrypto = req.body.cryptocurrency.toLowerCase();
    try {
        const response = await axios.get(`${API_URL}?ids=${selectedCrypto}&vs_currencies=usd`);
        const price = response.data[selectedCrypto].usd;
        res.render("price.ejs", { cryptocurrencies, selectedCrypto, price});
      } catch (error) {
        res.status(500).send(error.message);
      }
    
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});