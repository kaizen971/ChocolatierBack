import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import mongoose from 'mongoose';
import session from 'express-session';
import flash from 'connect-flash';
import MongoStore from 'connect-mongo';
import bodyParser from "body-parser";
import route from './routes/routes.js';
import cors from 'cors';
// ==========
// App initialization
// ==========

dotenv.config();
const { APP_HOSTNAME, APP_PORT, NODE_ENV, MONGODB_URI } = process.env;
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.set('view engine', 'pug');
app.locals.pretty = NODE_ENV !== 'production'; // Indente correctement le HTML envoyé au client (utile en dev, mais inutile en production)

// ==========
// App middlewares
// ==========


app.use(morgan(NODE_ENV !== 'production' ? 'dev' : 'tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    name: 'Chocolatier_yams',
    secret: 'chocolatier_yams',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: MONGODB_URI }),
    cookie: { maxAge: 24 * 3600 * 1000 },
  })
);
app.use(express.static('public'));
app.use(cors({
  origin: '*',
  credentials:true
}));
app.use(express.json({limit:'1mb'}));
app.use(flash());
app.use((req, res, next) => {
  res.locals.flash = {
    success: req.flash('success'),
    error: req.flash('error'),
  };
  res.locals.currentRoute = req.url;
  res.locals.loggedUser = null;
  next();
});

// ==========
// App routers
// ==========

app.use('/', route);

// ==========
// App start
// ==========

mongoose.connect(MONGODB_URI).then(() => {
  app.listen(APP_PORT, () => {
    console.log(`App listening at http://${APP_HOSTNAME}:${APP_PORT}`);
  });
});
