const product= require('./models/product')
const mongoose = require("mongoose");
const mongoDB = "mongodb+srv://vijay940:20211a05k3@library.js0ewb2.mongodb.net/?retryWrites=true&w=majority";

mongoose.set("strictQuery", false);

async function main() {
    await mongoose.connect(mongoDB);
    console.log("Successfully connected to MongoDB");
  
    try {
      await addproducts();
      console.log("Debug: Closing Mongoose");
     // mongoose.connection.close();
      console.log("Mongoose connection closed successfully");
    } catch (error) {
      console.error("Error:", error);
    }
  }

const addproducts=async()=>{
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        console.log(data); // Assuming you want to log the fetched data
        for(i=0;i<data.length;i++){
            const item={id:i,title:data[i].title,price:data[i].price,description:data[i].description,category:data[i].category}
            const adding_item =new product(item);
            await  adding_item.save()
             console.log(`${i} :added`)
        }

    } catch (error) {
        console.log(`Error while fetching the data: ${error}`);
    } 
}


main()