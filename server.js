const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const port = 3000;
const hostname = "localhost";
//On lui dit que app prend express. App va nous permettre de faire les liens avec les autres élement et donc pas affinité créer notre application
const app = express();
//Appel cors et le met en activiter pour que le serveur puisse communiquer avec d'autres élements
app.use(cors());
//On lui demande de vérifier que les donner qu'on échange soit bien en json 
app.use(bodyparser.json());
//Les informations sur la manière dont est coder le tout se trouve dans le header. Cette ligne permet de vérifier le header et accepte ou non le fichier
app.use(bodyparser.urlencoded({extended: false}));

app.use("/user", require("./router/user"));
app.use("/article", require("./router/article"));
app.use("/post", require("./router/post"));
app.use("/nodemailer", require("./router/nodemailer"));

app.listen(port, () => {
    console.log(`App listening on port http://${hostname}:${port}`);
});