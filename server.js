const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 5800;

// Enable CORS for development
app.use(cors());
app.use(express.json());

// Proxy for fetching restaurant listings
app.get('/api/restaurants', async (req, res) => {
    const { lat, lng } = req.query;
    const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lng}&page_type=DESKTOP_WEB_LISTING`;
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching restaurant data:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Proxy for fetching restaurant menu
app.get('/api/menu', async (req, res) => {
    const { lat, lng, restaurantId } = req.query;
    const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lng}&restaurantId=${restaurantId}`;
    
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching menu data:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});

// Proxy for fetching search suggestions
app.get('/api/search', async (req, res) => {
    const { searchString } = req.query;
    const url = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${searchString}`;
    console.log("ADITYA993 checking url" ,  url)
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching search data:', error.response ? error.response.data : error.message);
        res.status(error.response ? error.response.status : 500).json({ error: error.message });
    }
});



app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
