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

const PORT = process.env.PORT || 3001;
const secretSession = process.env.PORT || 'secretSession';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: secretSession,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, //  24 hours
    },
  })
);
app.use(passport.initialize());

initializePassport(passport);

app.use('/api', routes);

const start = async (): Promise<void> => {
  try {
    mongoose.connection.once('open', () => {
      checkFullnessDB();
    });

    const mongoURI = process.env.mongoURI;
    if (mongoURI) await mongoose.connect(mongoURI);
    else throw new Error('[mongoDB] Отсутствует файл env или  значение mongoURI в нём');

    app.listen(PORT, () => console.log(`[server] server has been started on port ${PORT}`));
  } catch (error) {
    if (error instanceof Error) console.log(error.message);
    else console.log(`[server] error connection: ${error}`);
    process.exit(1);
  }
};

start();
