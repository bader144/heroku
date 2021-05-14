require('dotenv').config();
const app = require("./src/app");


const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`listening on port http://localhost:${port}...`));

//------------------------------------------function of validate----------------------//
