// Script to create Stripe prices for the product
// Run this script once to set up your prices in Stripe

// Load environment variables first
require('dotenv').config({ path: '.env.local' });

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

async function createPrices() {
  try {
    // The product ID you provided
    const productId = 'prod_ShzuP97NBRBpIG';
    
    // Create prices for the product
    const prices = [
      {
        nickname: 'Basic Monthly',
        unit_amount: 999, // $9.99
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
      },
      {
        nickname: 'Pro Monthly',
        unit_amount: 2999, // $29.99
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
      },
      {
        nickname: 'Enterprise Monthly',
        unit_amount: 9999, // $99.99
        currency: 'usd',
        recurring: {
          interval: 'month',
        },
      },
    ];
    
    console.log('Creating prices for product:', productId);
    
    const createdPrices = [];
    for (const priceData of prices) {
      const price = await stripe.prices.create({
        product: productId,
        ...priceData,
      });
      createdPrices.push(price);
      console.log(`Created price: ${price.id} - ${priceData.nickname}`);
    }
    
    console.log('\nPrice IDs to update in your code:');
    console.log('Basic Plan:', createdPrices[0].id);
    console.log('Pro Plan:', createdPrices[1].id);
    console.log('Enterprise Plan:', createdPrices[2].id);
    
  } catch (error) {
    console.error('Error creating prices:', error);
  }
}

createPrices();