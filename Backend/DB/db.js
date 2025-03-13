import mongoose from "mongoose";

const DB_NAME = "Book&Go" ; 

const connectDB = async()=>{
    try {
       
        const conninstance =  await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`Connected to database ${conninstance.connection.host}`);
        
    } catch (error) {
        console.error('Database connection failed', err);
        server.close(() => {
            process.exit(1); // Exit with failure code
        });
    }
}

export default connectDB ;