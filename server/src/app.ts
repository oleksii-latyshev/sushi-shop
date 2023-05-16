import express from 'express';
import mongoose from 'mongoose';
import env from 'dotenv';

import checkFullnessDB from './helpers/checkFullnessDB';
import routes from './routes';

env.config();

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', routes);
// app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));

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
