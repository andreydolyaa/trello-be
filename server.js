const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const app = express()
const http = require('http').createServer(app);

app.use(cookieParser())
app.use(express.json());
app.use(session({
    secret: '',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


const userRoutes = require('./api/user/user.routes');
const boardRoutes = require('./api/board/board.routes');
app.use('/api/user', userRoutes);
app.use('/api/board', boardRoutes);

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})


const port = process.env.PORT || 3001;
http.listen(port, () => {
    console.log(`server running on port ${port}`);
});
