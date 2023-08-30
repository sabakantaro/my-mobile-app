const products = [
  {
    id: 1,
    barcode: 'ACAAP451004IBAZ001123',
    bookingNo: '',
    connoteNo: 'CAAP451004',
    jobDate: '23/8/2023',
    service: 'KG',
    pickup: {
      company: 'SAMPSON EXPRESS',
      name: '',
      contatctNo: '',
      address: '413 Francis St, , BROOKLYN, VIC, 3012',
      email: 'melops@sampsonexpress.com.au',
      pickupDate: '23/08/2023',
      additionalService: 'Tailgate',
    },
    delivery: {
      company: 'Maria Peter',
      name: 'Maria Peter',
      contatctNo: '0405 203 293',
      address: '7 Morant Street , , EDENSOR PARK, NSW, 2176',
      email: '',
      deliveryDate: '',
      attachment: '',
    },
    items: [
      {
        id: 1,
        reference: 'aef',
        description: 'Palletr	',
        length: 400,
        width: 200,
        height: 100,
        weight: 1000,
        qty: 1,
      },
    ],
    deliveryDate: '',
    reference: '',
    timeslotDelivery: '',
    notes: '',
  },
  {
    id: 2,
    barcode: 'ACAAP451000IBAZ001117',
    bookingNo: '',
    connoteNo: 'CAAP451004',
    jobDate: '23/8/2023',
    service: 'KG',
    pickup: {
      company: 'SAMPSON EXPRESS',
      name: '',
      contatctNo: '',
      address: '25 George Street, , GREEN FIELDS, SA, 5107',
      email: 'adelops@sampsonexpress.com.au',
      pickupDate: '17/07/2023',
      additionalService: '',
    },
    delivery: {
      company: 'SAMPSON Express',
      name: '',
      contatctNo: '',
      address: '31-35 Heathcote Road, , Moorebank, NSW, 2170',
      email: '',
      deliveryDate: '',
      attachment: '',
    },
    items: [
      {
        id: 1,
        reference: 'Return PDA',
        description: 'BOX	',
        length: 45,
        width: 45,
        height: 50,
        weight: 5,
        qty: 1,
      },
    ],
    deliveryDate: '',
    reference: '',
    timeslotDelivery: '',
    notes: 'Attention: It`s for Mehdi',
  },
  {
    id: 3,
    bookingNo: '',
    barcode: 'ACAAP450999IBAZ001116',
    bookingNo: '',
    connoteNo: 'CAAP450999',
    jobDate: '23/8/2023',
    service: 'KG',
    pickup: {
      company: 'SAMPSON EXPRESS',
      name: '',
      contatctNo: '',
      address: '31 HEATHCOTE RD, , MOOREBANK, NSW, 2170',
      email: 'melops@sampsonexpress.com.au',
      pickupDate: '14/07/2023',
      additionalService: '',
    },
    delivery: {
      company: 'SAMPSON Express',
      name: '',
      contatctNo: '',
      address: '413 Francis St, , BROOKLYN DEPOT, VIC, 3012',
      email: 'melops@sampsonexpress.com.au',
      deliveryDate: '',
      attachment: '',
    },
    items: [
      {
        id: 1,
        reference: 'ENVELOPE',
        description: 'other',
        length: 1,
        width: 1,
        height: 1,
        weight: 1,
        qty: 1,
      },
    ],
    deliveryDate: '',
    reference: '',
    timeslotDelivery: '',
    notes: 'ATT : TRAVIS',
  },
];

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.post('/signature', (req, res) => {
  const signature = req.body.signature;

  console.log('Received signature:', signature);

  res.send(`success \n signature: ${signature}`);

  return signature;
});

app.get('/products', (req, res) => {
  const barcode = req.query.barcode;
  const product = products.find((product) => product.barcode === barcode);

  if (product) {
    res.send(product);
  } else {
    res.status(404).send('Product not found');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
