import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
   category: String,
   id: String,
   link: String,
   symbol: String,
   name: String,
   current_price: Number,
   counter: Number,
   market_cap: Number,
   fully_diluted_valuation: Number,
   total_volume: Number,
   high_24h: Number,
   low_24h: Number,
   price_change_24h: Number,
   price_change_percentage_24h: Number,
   market_cap_change_24h: Number,
   market_cap_change_percentage_24h: Number,
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Data', DataSchema);
