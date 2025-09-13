const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const pkg = require('../package.json');

const tasksRoutes = require('./routes/tasks.routes');

const port = process.env.PORT || 3000;

const app = express();

app.set('pkg', pkg);
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    })
})

app.use(tasksRoutes);

app.use((err, req, res, next) => {
    return res.status(400).json({
        message: err.message
    })
});

// Only start the server if this file is run directly (not when imported)
if (require.main === module) {
    async function main() {
        try {
            app.listen(port, (err) => {
                if (err) console.error(err);
                console.log("Server on port " + port);
            });
        } catch (e) {
            console.error('Unable to connect to the server:', e)
        }
    }
    main();
}

// Export the app for testing
module.exports = app;