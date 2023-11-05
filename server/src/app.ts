import cors from 'cors';
import env from 'dotenv';
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from 'passport';

import initializePassport from '@/lib/passport';
import routes from '@/routes';
import checkFullnessDB from '@/utils/helpers/checkFullnessDB';

env.config();

const PORT = process.env.PORT;
const SECRET_SESSION = process.env.PORT || '123321';
const CLIENT_URL = process.env.CLIENT_URL;
const NODE_ENV = process.env.NODE_ENV;
const VERSION = process.env.npm_package_version;
const DESCRIPTION = process.env.npm_package_description;

const app = express();

app.use(express.json());
app.use(cors({ origin: CLIENT_URL, credentials: true }));
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
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport);

app.use('/api', routes);

app.get('/', (_, res) => {
  res.send({
    mode: NODE_ENV,
    version: VERSION,
    description: DESCRIPTION,
  });
});

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
