require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const path = require('path');

const app = express();

// Serve static frontend files if any (optional)
app.use(express.static(path.join(__dirname, 'public')));

const fs = require('fs');


// Load logo as base64
const logoPath = path.join(__dirname, 'public', 'logomain.jpg'); // updated filename
const logoBase64 = fs.existsSync(logoPath)
  ? `data:image/jpeg;base64,${fs.readFileSync(logoPath).toString('base64')}`
  : '';

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
  id: 'soap1',
  category: 'Soaps',
  name: 'Whitening Rice Soap',
  rating: 4.6,
  price: 599.00,
  origPrice: 800.00,
  volume: '100g',
  images: [
    'im1.jpeg',
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Benefits:</h3>
<ul class="list-disc pl-5">
  <li>Skin glowing</li>
  <li>Skin lightening & tightening</li>
  <li>Promotes healthy & glowing complexion</li>
  <li>Reduces dark spots, melasma</li>
</ul>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Rice powder, Amla powder, Turmeric, Coffee, Kaolin clay, Pink clay, Aloe vera gel, Niacinamide V-B3, Soap base, Coconut oil, Mulathi, Multani matti, Olive oil, Neem oil, Tea tree oil, Castor oil, Glycerine, Distilled water, Vitamin E oil, Fragrance oil</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100g</p>
`
},


{
  id: 'soap2',
  category: 'Soaps',
  name: 'Charcoal Soap',
  rating: 4.3,
  price: 599.00,
  origPrice: 800.00,
  volume: '100g',
  images: [
    'https://images.unsplash.com/photo-1536305030012-7f9999d8b0a6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Benefits:</h3>
<ul class="list-disc pl-5">
  <li>Helps with pigmentation</li>
  <li>Oily skin</li>
  <li>Dark spots</li>
  <li>White & black heads</li>
  <li>Deep cleaning</li>
  <li>Pimples</li>
</ul>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Charcoal powder, Amla powder, Kaolin clay, Pink clay, Aloe vera gel, Niacinamide V-B3, Soap base, Mulathi, Multani matti, Coconut oil, Olive oil, Neem oil, Tea tree oil, Castor oil, Glycerine, Distilled water, Vitamin E oil, Fragrance oil</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100g</p>
`
},


{
  id: 'soap3',
  category: 'Soaps',
  name: 'Neem Soap',
  rating: 4.3,
  price: 599.00,
  origPrice: 800.00,
  volume: '100g',
  images: [
    'https://images.unsplash.com/photo-1536305030012-7f9999d8b0a6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Benefits:</h3>
<ul class="list-disc pl-5">
  <li>Fights acne & breakouts naturally</li>
  <li>Brightens & evens skin tone</li>
  <li>Helps prevent pimples & breakouts</li>
</ul>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Neem powder, Amla powder, Kaolin clay, Pink clay, Aloe vera gel, Niacinamide V-B3, Mulathi, Multani matti, Soap base, Coconut oil, Olive oil, Neem oil, Tea tree oil, Castor oil, Glycerine, Distilled water, Vitamin E oil, Fragrance oil</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100g</p>
`
},


     
{
  id: 'Shampoo1',
  category: 'Shampoos',
  name: 'Herbal Shampoo',
  rating: 4.4,
  price: 499.00,
  origPrice: 700.00,
  volume: '100ml',
  images: [
    'https://images.unsplash.com/photo-1516685018646-5491f21a7e6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Description:</h3>
<p>This sulfate-free shampoo features a premium anti-dandruff formula designed to remove dandruff and flakes while promoting strong, shiny hair.</p>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Amla, Retha, Shikakai, Rosemary, Flaxseed, Bhringraj, Neem, Rice, Sulfate-free shampoo base, CMC gum, Oil Control, Coconut oil, Olive oil, Almond oil, Coco-betain, Tea-tree oil, Lemon oil, Vitamin E, Aloe vera gel, B-22, Preservatives, Organic Fragrance</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100ml – 200ml</p>
`
},

    
{
  id: 'Shampoo2',
  category: 'Shampoos',
  name: 'Herbal Shampoo',
  rating: 4.4,
  price: 649.00,
  origPrice: 850.00,
  volume: '150ml',
  images: [
    'https://images.unsplash.com/photo-1516685018646-5491f21a7e6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Description:</h3>
<p>This sulfate-free shampoo features a premium anti-dandruff formula designed to remove dandruff and flakes while promoting strong, shiny hair.</p>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Amla, Retha, Shikakai, Rosemary, Flaxseed, Bhringraj, Neem, Rice, Sulfate-free shampoo base, CMC gum, Oil Control, Coconut oil, Olive oil, Almond oil, Coco-betain, Tea-tree oil, Lemon oil, Vitamin E, Aloe vera gel, B-22, Preservatives, Organic Fragrance</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100ml – 200ml</p>
`
},

    
  {
  id: 'Shampoo3',
  category: 'Shampoos',
  name: 'Herbal Shampoo',
  rating: 4.4,
  price: 849.00,
  origPrice: 1050.00,
  volume: '250ml',
  images: [
    'https://images.unsplash.com/photo-1516685018646-5491f21a7e6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Description:</h3>
<p>This sulfate-free shampoo features a premium anti-dandruff formula designed to remove dandruff and flakes while promoting strong, shiny hair.</p>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Amla, Retha, Shikakai, Rosemary, Flaxseed, Bhringraj, Neem, Rice, Sulfate-free shampoo base, CMC gum, Oil Control, Coconut oil, Olive oil, Almond oil, Coco-betain, Tea-tree oil, Lemon oil, Vitamin E, Aloe vera gel, B-22, Preservatives, Organic Fragrance</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100ml – 200ml</p>
`
},
 


{
  id: 'oil1',
  category: 'Oils',
  name: 'Onion Herbal Oil',
  rating: 4.4,
  price: 599.00,
  origPrice: 800.00,
  volume: '100ml',
  images: [
    'https://images.unsplash.com/photo-1516685018646-5491f21a7e6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Description:</h3>
<p>Refreshing herbal oil designed to nourish scalp and promote hair growth.</p>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Coconut oil, Olive oil, Onion extract, Tea-tree oil, Aloe vera, Vitamin E oil, Essential oils, Preservatives</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100ml – 200ml</p>
`
},

      {
  id: 'oil2',
  category: 'Oils',
  name: 'Onion Herbal Oil',
  rating: 4.4,
  price: 799.00,
  origPrice: 1000.00,
  volume: '100ml',
  images: [
    'https://images.unsplash.com/photo-1516685018646-5491f21a7e6?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Description:</h3>
<p>Refreshing herbal oil designed to nourish scalp and promote hair growth.</p>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Coconut oil, Olive oil, Onion extract, Tea-tree oil, Aloe vera, Vitamin E oil, Essential oils, Preservatives</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>100ml – 200ml</p>
`
},


   {
  id: 'cream1',
  category: 'Creams',
  name: '4in1 Night Beauty Cream',
  rating: 4.4,
  price: 899.00,
  origPrice: 1200.00,
  volume: '50g – 100g',
  images: [
    'https://images.unsplash.com/photo-1516685018646-5491f21a7e6c?auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1526406915899-3c0b7f6bd8b4?auto=format&fit=crop&w=800&q=60'
  ],
  desc: `
<h3 class="font-semibold text-lg">Description:</h3>
<p>✨ Advanced Glow Night Cream – Korean Inspired Formula. Enriched with Niacinamide, L-Glutathione, Alpha Arbutin, and Hyaluronic Acid, this powerful blend deeply nourishes, brightens, and hydrates the skin while reducing dark spots and pigmentation. Shea Butter & Coconut Oil restore softness, while Tea Tree Oil purifies and calms. With regular use, skin appears visibly smoother, more even-toned, and naturally radiant.</p>

<h3 class="font-semibold text-lg">Ingredients:</h3>
<p>Olivem 1000, Shea butter, Coconut oil, Cetyl alcohol, Vitamin E oil, Kojic acid, Distilled water, Niacinamide, Hyaluronic acid, Alpha Arbutin, Glutathione, Tea-tree oil, Preservatives, Fragrance oil</p>

<h3 class="font-semibold text-lg">Volume:</h3>
<p>50g – 100g (weight-based)</p>
`
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
// Build the order HTML email content
async function buildOrderHtml(order) {
  const itemsRows = order.cart.map((it, i) => {
    const product = PRODUCTS.find(p => p.id === it.id);
    const bgColor = i % 2 === 0 ? '#f6fff6' : '#ffffff';
    return `
      <tr style="background-color:${bgColor};font-size:12px;">
        <td style="padding:6px;border:1px solid #cfcfcf;word-wrap:break-word;">${it.id}</td>
        <td style="padding:6px;border:1px solid #cfcfcf;word-wrap:break-word;">${it.name || 'N/A'}</td>
        <td style="padding:6px;border:1px solid #cfcfcf;text-align:center;">${it.qty}</td>
        <td style="padding:6px;border:1px solid #cfcfcf;text-align:right;">₨${it.price?.toFixed(2) || '0.00'}</td>
        <td style="padding:6px;border:1px solid #cfcfcf;text-align:center;">${product?.volume || '-'}</td>
        <td style="padding:6px;border:1px solid #cfcfcf;text-align:right;">₨${(it.price * it.qty).toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  return `
    <div style="font-family:Arial,sans-serif;color:#2f4f2f;background-color:#f9fff9;padding:20px;max-width:800px;margin:auto;border-radius:8px;">
      ${logoBase64 ? `<div style="text-align:center;margin-bottom:20px;">
        <img src="${logoBase64}" alt="Natura Bliss" style="max-width:160px;height:auto;display:block;margin:0 auto;">
      </div>` : ''}

      <h2 style="color:#2e7d32;text-align:center;margin-bottom:10px;">🌿 New Order Received</h2>
      <p style="text-align:center;font-size:13px;color:#666;margin-top:0;">
        ${new Date(order.orderDate).toLocaleString()}
      </p>

      <h3 style="color:#1b5e20;border-bottom:2px solid #c8e6c9;padding-bottom:4px;">Customer Details</h3>
      <p style="font-size:13px;line-height:1.5;">
        <strong>Name:</strong> ${order.personalDetails.name}<br/>
        <strong>Email:</strong> ${order.personalDetails.email}<br/>
        <strong>Phone:</strong> ${order.personalDetails.phone}<br/>
        <strong>Address:</strong> ${order.personalDetails.streetAddress}<br/>
        <strong>District:</strong> ${order.personalDetails.district}<br/>
        <strong>City:</strong> ${order.personalDetails.city}<br/>
        <strong>Province:</strong> ${order.personalDetails.province}<br/>
        ${order.personalDetails.additionalDetails ? `<strong>Additional Details:</strong> ${order.personalDetails.additionalDetails}<br/>` : ''}
      </p>

      <h3 style="color:#1b5e20;border-bottom:2px solid #c8e6c9;padding-bottom:4px;">Shipping Details</h3>
      <p style="font-size:13px;line-height:1.5;">
        <strong>Name:</strong> ${order.shippingDetails.name}<br/>
        <strong>Email:</strong> ${order.shippingDetails.email}<br/>
        <strong>Phone:</strong> ${order.shippingDetails.phone}<br/>
        <strong>Address:</strong> ${order.shippingDetails.streetAddress}<br/>
        <strong>District:</strong> ${order.shippingDetails.district}<br/>
        <strong>City:</strong> ${order.shippingDetails.city}<br/>
        <strong>Province:</strong> ${order.shippingDetails.province}<br/>
        ${order.shippingDetails.additionalDetails ? `<strong>Additional Details:</strong> ${order.shippingDetails.additionalDetails}<br/>` : ''}
      </p>

      <h3 style="color:#1b5e20;border-bottom:2px solid #c8e6c9;padding-bottom:4px;">Ordered Items</h3>

      <!-- Responsive table -->
      <table style="border-collapse:collapse;width:100%;margin-bottom:20px;table-layout:fixed;">
        <thead style="background-color:#a5d6a7;color:#1b5e20">
          <tr>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:left;font-size:12px;">SKU</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:left;font-size:12px;">Product</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:center;font-size:12px;">Qty</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:right;font-size:12px;">Price</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:center;font-size:12px;">Volume</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:right;font-size:12px;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
        <tfoot>
          <tr style="background-color:#e8f5e9;font-size:12px;">
            <td colspan="5" style="padding:6px;border:1px solid #cfcfcf;text-align:right"><strong>Items Total</strong></td>
            <td style="padding:6px;border:1px solid #cfcfcf;text-align:right">₨${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr style="background-color:#e8f5e9;font-size:12px;">
            <td colspan="5" style="padding:6px;border:1px solid #cfcfcf;text-align:right"><strong>Delivery</strong></td>
            <td style="padding:6px;border:1px solid #cfcfcf;text-align:right">${order.deliveryCharge === 0 ? 'Free' : '₨' + order.deliveryCharge.toFixed(2)}</td>
          </tr>
          <tr style="background-color:#c8e6c9;font-size:12px;">
            <td colspan="5" style="padding:6px;border:1px solid #cfcfcf;text-align:right"><strong>Grand Total</strong></td>
            <td style="padding:6px;border:1px solid #cfcfcf;text-align:right">₨${order.totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <h3 style="color:#1b5e20;border-bottom:2px solid #c8e6c9;padding-bottom:4px;">Payment Method</h3>
      <p style="font-size:13px;">${order.paymentMethod}</p>

      <p style="text-align:center;margin-top:30px;color:#388e3c;font-style:italic;font-size:13px;">
        Thank you for choosing Natura Bliss 🌿
      </p>
    </div>
  `;
}



async function buildCustomerOrderHtml(order) {
  const itemsRows = order.cart.map(it => {
    const product = PRODUCTS.find(p => p.id === it.id);
    return `
      <tr style="font-size:12px;background-color:#fff;">
        <td style="padding:6px;border:1px solid #ddd;word-wrap:break-word;">${it.id}</td>
        <td style="padding:6px;border:1px solid #ddd;word-wrap:break-word;">${it.name || 'N/A'}</td>
        <td style="padding:6px;border:1px solid #ddd;text-align:center;">${it.qty}</td>
        <td style="padding:6px;border:1px solid #ddd;text-align:right;">₨${it.price?.toFixed(2) || '0.00'}</td>
        <td style="padding:6px;border:1px solid #ddd;text-align:center;">${product?.volume || '-'}</td>
        <td style="padding:6px;border:1px solid #ddd;text-align:right;">₨${(it.price * it.qty).toFixed(2)}</td>
      </tr>
    `;
  }).join('');

  return `
  <div style="font-family:Arial,sans-serif; color:#2E3A2F; background:#f4f7f6; padding:20px;">
    <div style="max-width:700px; margin:auto; background:#fff; border-radius:10px; overflow:hidden; border:1px solid #ddd;">
      
      <!-- Logo -->
      <div style="background:#e6f5ea; text-align:center; padding:20px;">
        ${logoBase64 ? `<img src="${logoBase64}" alt="Natura Bliss" style="max-width:180px; height:auto;"/>` : ''}
      </div>

      <div style="padding:20px;">
        <h2 style="color:#2E7D32; text-align:center; font-size:18px;">🌿 Thank you for your order, ${order.personalDetails.name}! 🌿</h2>
        <p style="text-align:center; font-size:14px; color:#555;">
          We truly appreciate your trust in <strong>Natura Bliss</strong>.<br/>
          Your order has been received and we’ll contact you within 24 hours to confirm delivery.
        </p>

        <h3 style="color:#2E7D32; margin-top:20px; font-size:16px;">🛒 Your Order Summary</h3>

        <!-- Responsive-friendly table -->
        <table style="border-collapse:collapse;width:100%;margin-bottom:20px;table-layout:fixed;">
        <thead style="background-color:#a5d6a7;color:#1b5e20">
          <tr>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:left;font-size:12px;">SKU</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:left;font-size:12px;">Product</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:center;font-size:12px;">Qty</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:right;font-size:12px;">Price</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:center;font-size:12px;">Volume</th>
            <th style="padding:6px;border:1px solid #cfcfcf;text-align:right;font-size:12px;">Subtotal</th>
          </tr>
        </thead>
        <tbody>${itemsRows}</tbody>
        <tfoot>
          <tr style="background-color:#e8f5e9;font-size:12px;">
            <td colspan="5" style="padding:6px;border:1px solid #cfcfcf;text-align:right"><strong>Items Total</strong></td>
            <td style="padding:6px;border:1px solid #cfcfcf;text-align:right">₨${order.subtotal.toFixed(2)}</td>
          </tr>
          <tr style="background-color:#e8f5e9;font-size:12px;">
            <td colspan="5" style="padding:6px;border:1px solid #cfcfcf;text-align:right"><strong>Delivery</strong></td>
            <td style="padding:6px;border:1px solid #cfcfcf;text-align:right">${order.deliveryCharge === 0 ? 'Free' : '₨' + order.deliveryCharge.toFixed(2)}</td>
          </tr>
          <tr style="background-color:#c8e6c9;font-size:12px;">
            <td colspan="5" style="padding:6px;border:1px solid #cfcfcf;text-align:right"><strong>Grand Total</strong></td>
            <td style="padding:6px;border:1px solid #cfcfcf;text-align:right">₨${order.totalPrice.toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>
        <!-- Address -->
        <h3 style="color:#2E7D32; margin-top:20px; font-size:16px;">📦 Shipping Details</h3>
        <p style="line-height:1.6; color:#444; font-size:13px;">
          <strong>${order.shippingDetails.name}</strong><br/>
          ${order.shippingDetails.streetAddress}<br/>
          ${order.shippingDetails.district}, ${order.shippingDetails.city}, ${order.shippingDetails.province}<br/>
          Phone: ${order.shippingDetails.phone}<br/>
        </p>

        <div style="margin-top:20px; text-align:center;">
          <p style="font-size:14px; color:#2E7D32;">
            💚 Thank you for shopping with Natura Bliss!<br/>
            We hope you enjoy your purchase.
          </p>
        </div>

        <p style="margin-top:20px; text-align:center; color:#777; font-size:11px;">
          If you have any questions, reply to this email or contact us at <strong>${ADMIN_EMAIL}</strong>.<br/>
          &copy; ${new Date().getFullYear()} Natura Bliss 🌿
        </p>
      </div>
    </div>
  </div>
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

    // 1️⃣ Build admin email HTML
    const adminHtml = await buildOrderHtml(order);

    // 2️⃣ Send email to admin
    const adminMailOptions = {
      from: `"${process.env.SENDER_NAME || 'Shop'}" <${process.env.SMTP_USER}>`,
      to: ADMIN_EMAIL,
      subject: `New Order — ${order.personalDetails.name} — ₨${order.totalPrice.toFixed(2)}`,
      html: adminHtml
    };
    await transporter.sendMail(adminMailOptions);
    console.log('✅ Email sent to admin:', ADMIN_EMAIL);

    // 3️⃣ Build customer email HTML
    const customerHtml = await buildCustomerOrderHtml(order);

    // 4️⃣ Send confirmation email to customer
    const customerMailOptions = {
      from: `"Natura Bliss" <${process.env.SMTP_USER}>`,
      to: order.personalDetails.email,
      subject: `Your Natura Bliss Order Confirmation — ₨${order.totalPrice.toFixed(2)}`,
      html: customerHtml
    };
    await transporter.sendMail(customerMailOptions);
    console.log('✅ Confirmation email sent to', order.personalDetails.email);

    // 5️⃣ Respond to frontend
    return res.json({ success: true, message: "Order sent to admin and confirmation sent to customer" });

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
