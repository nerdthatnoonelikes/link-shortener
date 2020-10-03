import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import mongoose, {Schema, model} from "mongoose";
import Link from "./models/Link";

const app = express();

app.use(helmet());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        status: 200,
        message: "My HackTober Project"
    })
})



app.post("/api/v1/shorten", (req, res) => {
    Link.create({
        id: req.body.id,
        redirect: req.body.redirect
    }).then(() => res.send("saved to db"))
})

app.get("/:id", async (req, res) => {
    const data = await Link.findOne({
        id: req.params.id,
      });

      if (!data)
        return res.send({
          message: "Invalid redirect URL",
        });


        // @ts-ignore
      res.redirect(`https://${data.redirect}`);
      console.log(data)
})

const port = process.env.PORT || 1234
const baseurl = process.env.BASEURL || "localhost"


app.listen(port, () => {
    console.log(`Listening at http://${baseurl}:${port}`)
    mongoose.connect("mongodb://127.0.0.1:27017").then(() => console.log("connected to db"))
})