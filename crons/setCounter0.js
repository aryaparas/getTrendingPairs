import DataSchema from "../models/dataModel.js"

export async function resetCounterAndUpdateCreatedAt() {
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    await DataSchema.updateMany(
       { updatedAt: { $lt: threeDaysAgo } }, // Find documents created more than 3 days ago
       {
         $set: { counter: 1 }, // Reset counter to 0
         $set: { updatedAt: new Date() } // Update createdAt to current date
       }
    );
   }