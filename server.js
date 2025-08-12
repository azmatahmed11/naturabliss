require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Serve static frontend files if any (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:3000', 'https://naturabliss.netlify.app'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));


// Load environment variables
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT || 465),
  secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

// Your products list (replace with your real products or DB)
const PRODUCTS = [
      {
        id: 's1',
        category: 'Soaps',
        name: 'Lavender Oat Soap',
        rating: 4.6,
        price: 24.99,
        origPrice: 32.00,
        images: [
          'im1.jpeg',
          'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Gentle lavender & oats to calm and exfoliate. Handmade with olive oil & shea butter.'
      },
      {
        id: 's2',
        category: 'Soaps',
        name: 'Charcoal Detox Soap',
        rating: 4.3,
        price: 26.99,
        origPrice: 34.00,
        images: [
          'https://images.unsplash.com/photo-1536305030012-7f9999d8b0a6?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Activated charcoal & sea clay to detoxify and refine pores.'
      },
      {
        id: 'sh1',
        category: 'Shampoos',
        name: 'Herbal Mint Shampoo',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
      {
        id: 'sh2',
        category: 'Shampoos',
        name: 'Coconut Argan Conditioner',
        rating: 4.7,
        price: 35.99,
        origPrice: 44.00,
        images: [
          'https://images.unsplash.com/photo-1505678261036-a3fcc5e884ee?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1522337360788-0c1e9d05df3b?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Rich conditioning with coconut & argan oil for smooth, shiny hair.'
      },

 {
        id: 'o1',
        category: 'Oils',
        name: 'onion oil',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },

       {
        id: 'c1',
        category: 'Creams',
        name: 'Herbal cream',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c2',
        category: 'Creams',
        name: 'Herbal crearm',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
 {
        id: 'c3',
        category: 'Creams',
        name: 'Herbaddl cream',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c4',
        category: 'Creams',
        name: 'Herbal creeeeeam',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c5',
        category: 'Creams',
        name: 'Herbal crearrm',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c6',
        category: 'Creams',
        name: 'Herbal crerrram',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c7',
        category: 'Creams',
        name: 'Herbal creeeam',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c8',
        category: 'Creams',
        name: 'Herbal crsseam',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c9',
        category: 'Creams',
        name: 'Herbal crggeam',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c10',
        category: 'Creams',
        name: 'Herbal creaiim',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      },
       {
        id: 'c11',
        category: 'Creams',
        name: 'Herbal creaoom',
        rating: 4.4,
        price: 32.99,
        origPrice: 42.00,
        images: [
          'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
          'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
        ],
        desc: 'Refreshing mint & tea tree shampoo for a clean, balanced scalp.'
      }



    ];

// Enrich cart items with name and price
function enrichCartItems(cart) {
  return cart.map(item => {
    const product = PRODUCTS.find(p => p.id === item.id);
    return {
      id: item.id,
      qty: item.qty,
      name: product ? product.name : 'Unknown product',
      price: product ? product.price : 0
    };
  });
}

// Build the order HTML email content
async function buildOrderHtml(order) {
  const itemsRows = order.cart.map(it => `
    <tr>
      <td style="padding:6px;border:1px solid #ddd">${it.id}</td>
      <td style="padding:6px;border:1px solid #ddd">${it.name || 'N/A'}</td>
      <td style="padding:6px;border:1px solid #ddd;text-align:right">${it.qty}</td>
      <td style="padding:6px;border:1px solid #ddd;text-align:right">₨${it.price?.toFixed(2) || '0.00'}</td>
      <td style="padding:6px;border:1px solid #ddd;text-align:right">₨${(it.price * it.qty).toFixed(2)}</td>
    </tr>
  `).join('');

  return `
    <h2>New Order — ${new Date(order.orderDate).toLocaleString()}</h2>
    
    <h3>Customer Details</h3>
    <p>
      <strong>Name:</strong> ${order.personalDetails.name}<br/>
      <strong>Email:</strong> ${order.personalDetails.email}<br/>
      <strong>Phone:</strong> ${order.personalDetails.phone}<br/>
      <strong>Address:</strong> ${order.personalDetails.streetAddress}<br/>
      <strong>District:</strong> ${order.personalDetails.district}<br/>
      <strong>City:</strong> ${order.personalDetails.city}<br/>
      <strong>Province:</strong> ${order.personalDetails.province}<br/>
      ${order.personalDetails.additionalDetails ? `<strong>Additional Details:</strong> ${order.personalDetails.additionalDetails}<br/>` : ''}
    </p>

    <h3>Shipping Details</h3>
    <p>
      <strong>Name:</strong> ${order.shippingDetails.name}<br/>
      <strong>Email:</strong> ${order.shippingDetails.email}<br/>
      <strong>Phone:</strong> ${order.shippingDetails.phone}<br/>
      <strong>Address:</strong> ${order.shippingDetails.streetAddress}<br/>
      <strong>District:</strong> ${order.shippingDetails.district}<br/>
      <strong>City:</strong> ${order.shippingDetails.city}<br/>
      <strong>Province:</strong> ${order.shippingDetails.province}<br/>
      ${order.shippingDetails.additionalDetails ? `<strong>Additional Details:</strong> ${order.shippingDetails.additionalDetails}<br/>` : ''}
    </p>

    <h3>Ordered Items</h3>
    <table style="border-collapse:collapse;width:100%;max-width:700px">
      <thead>
        <tr>
          <th style="padding:6px;border:1px solid #ddd">SKU</th>
          <th style="padding:6px;border:1px solid #ddd">Product</th>
          <th style="padding:6px;border:1px solid #ddd">Qty</th>
          <th style="padding:6px;border:1px solid #ddd">Price</th>
          <th style="padding:6px;border:1px solid #ddd">Subtotal</th>
        </tr>
      </thead>
      <tbody>${itemsRows}</tbody>
      <tfoot>
        <tr>
          <td colspan="4" style="padding:6px;border:1px solid #ddd;text-align:right"><strong>Items Total</strong></td>
          <td style="padding:6px;border:1px solid #ddd;text-align:right">₨${order.subtotal.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="4" style="padding:6px;border:1px solid #ddd;text-align:right"><strong>Delivery</strong></td>
          <td style="padding:6px;border:1px solid #ddd;text-align:right">${order.deliveryCharge === 0 ? 'Free' : '₨' + order.deliveryCharge.toFixed(2)}</td>
        </tr>
        <tr>
          <td colspan="4" style="padding:6px;border:1px solid #ddd;text-align:right"><strong>Grand Total</strong></td>
          <td style="padding:6px;border:1px solid #ddd;text-align:right">₨${order.totalPrice.toFixed(2)}</td>
        </tr>
      </tfoot>
    </table>

    <h3>Payment Method</h3>
    <p>${order.paymentMethod}</p>
  `;
}


// API route to handle order submission
app.post('/api/order', async (req, res) => {
  try {
    console.log('--- /api/order received at', new Date().toISOString());
    console.log('req.body:', JSON.stringify(req.body, null, 2));

    const order = req.body;

    // Basic validation
    if (
      !order ||
      !order.cart ||
      !Array.isArray(order.cart) ||
      order.cart.length === 0 ||
      !order.personalDetails ||
      !order.shippingDetails
    ) {
      console.warn('Invalid order payload:', order);
      return res.status(400).json({ message: "Invalid order payload" });
    }

    // Enrich cart with product details before email
    order.cart = order.cart.map(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      return {
        id: item.id,
        qty: item.qty,
        name: product ? product.name : 'Unknown product',
        price: product ? product.price : 0
      };
    });

    // Build the email HTML
    const html = await buildOrderHtml(order);

    // Mail options
    const mailOptions = {
      from: `"${process.env.SENDER_NAME || 'Shop'}" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Order — ${order.personalDetails.name} — ₨${order.totalPrice.toFixed(2)}`,
      html
    };

    // Send the email
    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent to', ADMIN_EMAIL);

    return res.json({ success: true, message: "Order sent to admin" });

  } catch (err) {
    console.error("❌ Send mail error:", err);
    return res.status(500).json({ success: false, message: "Failed to send email" });
  }
});


// Health check route
app.get('/', (req, res) => res.send('OK'));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
