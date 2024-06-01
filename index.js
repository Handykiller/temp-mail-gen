const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const port = process.env.PORT || 5500;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
