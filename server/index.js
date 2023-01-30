const express = require('express');
const PORT = process.env.PORT || 8000;
const mainRoute = require('./api/routes/routes');
const app = express();

app.use(express.json());
app.use('/api', mainRoute);

app.listen(PORT, () => {
	console.log(`Server running at port:${PORT}`);
});
