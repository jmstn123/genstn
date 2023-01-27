import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import handleBarsExpress from "express-handlebars";
import path from "path";

//import { getScript } from "./controllers/sketches.js";
import { saveImage } from "./controllers/images.js";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const app = express();
const port = process.env.PORT || 8000;

const handleBars = handleBarsExpress.create({
  layoutsDir: path.dirname(".") + "/views/layouts",
  extname: "hbs",
  defaultLayout: "index",
});

app.engine("hbs", handleBars.engine);
app.set("view engine", "hbs");

app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(express.static("public"));

const storage = new ThirdwebStorage();
const tokenImages = {};

app.get("/token/:tokenId", async (req, res) => {
  
  if (req.params.tokenId < 64){
  //const hash = await getScript(req.params.tokenId);
  
  res.render("piece", {
    scriptName: `mySketch`+req.params.tokenId+`.js`,
  });}
  else{res.status(404).send("Not found");}
});

app.get("*", (req, res) => {
  res.status(404).send("Not found");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
