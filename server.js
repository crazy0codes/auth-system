const express = require('express')
const app = express();
const authRoute = require('./routes/authRoute')

app.use('/api/auth', authRoute);

app.listen(3000, (err) => {
    if (!err) {
        console.log("Server is running on port 3000")
    }
    else {
        console.error("Server setup Error :",err)
    }
})