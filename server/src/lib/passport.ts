import bcrypt from 'bcryptjs';
import { PassportStatic } from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import User from '@/db/schemas/user.schema';
import { IUser } from '@/types/user.types';

const initializePassport = (passport: PassportStatic): void => {
  passport.use(
    new LocalStrategy(
      { usernameField: 'username', session: true },
      async (username: string, password: string, done: any) => {
        try {
          const user: IUser | null = await User.findOne({ username });

          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }

          const passwordMatch = await bcrypt.compare(password, user.password);

          if (!passwordMatch) {
            return done(null, false, { message: 'Incorrect password.' });
          }

          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.serializeUser<any, any>((user: IUser, done: any) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done: any) => {
    try {
      const user = await User.findById(id).exec();
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};

export default initializePassport;
