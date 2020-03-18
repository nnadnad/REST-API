const express = require("express");
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded());

/**
 * endpoints
 */
app.use('/api',
    require('./api/getUser').router,
    require('./api/getUserId').router,
    require('./api/addUser').router,
    require('./api/putUser').router,
    require('./api/patchUser').router,
    require('./api/delUser').router,
    );

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

module.exports = app;
