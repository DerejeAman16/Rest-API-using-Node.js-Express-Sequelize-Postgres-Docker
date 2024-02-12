const express = require('express');
const app = express();

const Sequelize = require('./util/database');
const User = require('./models/users');
const sequelize = require('./util/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
 
app.use('/dev', require('./routes/dev'));
app.use('/users', require('./routes/users'));

(async () => {
    try {
        await sequelize.sync(
            { force: false });
        app.listen(process.env.PORT || 3001, () => {
            console.log('Server is running on port 3001');
        });
        
    } catch (error) {
        console.error(error);
    }
}
)();
