import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import rateLimit from 'express-rate-limit';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';
import path from 'path';

import initializePassport from '@/lib/passport';
import routes from '@/routes';
import checkFullnessDB from '@/utils/helpers/checkFullnessDB';

env.config();

const PORT = process.env.PORT || 8080;
const SECRET_SESSION = process.env.COOKIE_KEY || '123321';
const MAX_REQUEST_PER_WINDOW = process.env.MAX_REQUEST_PER_WINDOW || 200;

const app = express();
app.set('trust proxy', 1 /* number of proxies between user and server */);

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: SECRET_SESSION,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //  24 hours
    },
  })
);
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    limit: Number(MAX_REQUEST_PER_WINDOW), // per 1 minutes
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client')));

  const indexPath = path.join(__dirname, 'client', 'index.html');

  app.get('*', (_, res) => {
    res.sendFile(indexPath);
  });
}

const start = async (): Promise<void> => {
  try {
    mongoose.connection.once('open', () => {
      checkFullnessDB();
    });

    const mongoURI = process.env.mongoURI;
    if (mongoURI) await mongoose.connect(mongoURI);
    else throw new Error('[mongoDB] Env file or mongoURI value is missing');

    app.listen(PORT, () => console.log(`[server] server has been started on port ${PORT}`));
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log(`[server] error connection: ${error}`);
    process.exit(1);
  }
};

start();
