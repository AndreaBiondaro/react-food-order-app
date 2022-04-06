const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/api/data', (request, response) => {
    return response.send([
        {
            id: 'm1',
            name: 'Sushi',
            description: 'Finest fish and veggies',
            price: 22.99,
        },
        {
            id: 'm2',
            name: 'Schnitzel',
            description: 'A german specialty!',
            price: 16.5,
        },
        {
            id: 'm3',
            name: 'Barbecue Burger',
            description: 'American, raw, meaty',
            price: 12.99,
        },
        {
            id: 'm4',
            name: 'Green Bowl',
            description: 'Healthy...and green...',
            price: 18.99,
        }
    ]);
});

app.post('/api/data', (request, response) => {
    console.log(request.body);
    // If 1 then the response is OK, otherwise it returns 500 KO
    if (Math.round(Math.random())) {
        return response.send(request.body);
    } else {
        return response.status(500).send('Internal Server Error');
    }
});

app.listen(3002, () => console.log('Server running on port 3002'));