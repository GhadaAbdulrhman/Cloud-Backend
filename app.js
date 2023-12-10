const express = require("express");

const cors = require("cors");

const productsRouter = require("./routes/products");
const usersRouter = require("./routes/users");
const authRouter = require("./routes/auth");
const cartRouter = require("./routes/cart");
const orderRouter = require('./routes/orders');
const paypalRouter = require('./routes/paypal');

const initiateDBConnection = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/products", productsRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/cart", cartRouter);
app.use('/orders', orderRouter);
app.use('/paypal', paypalRouter);

app.use('/uploads', express.static('uploads'));

const PORT = process.env.PORT;


app.get('/', (req, res) => {
  res.send('Deployment Test!');
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  await initiateDBConnection();
});
