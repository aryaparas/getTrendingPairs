import mongoose from 'mongoose';

const DataSchema = new mongoose.Schema({
 id: {
    type: String,
    required: true,
 },
 top_3_coins: [String]
 // Add more fields as needed
});

export default mongoose.model('Data', DataSchema);
