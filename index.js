import express from "express"
import 'dotenv/config'
import cookieParser from "cookie-parser"
import schoolRoutes from "./routes/school.routes.js"
import sequelize from "./config/database.cjs";

const app =express()

const port=process.env.PORT || 6000

app.use(express.json({ limit: "16kb" }));
app.use("/api/v1", schoolRoutes);
app.use(cookieParser());


app.get("/",(req,res)=>{
    res.send("Hi from backend");
})

app.listen(port, async () => {
  console.log(`Server Listening at PORT ${port}`);
  await sequelize.authenticate();
});