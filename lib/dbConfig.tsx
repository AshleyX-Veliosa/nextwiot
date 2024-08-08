import mongoose from 'mongoose';

const dbConfig = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log(`เชื่อมต่อแล้วดีบีแล้วจ้าาาาาาาาา 👍`);
  } catch (error) {
    console.error(`ERROR: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default dbConfig;