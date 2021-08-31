import { config } from 'dotenv';
import { join } from 'path';
config({ path: join(__dirname, '../../.env') });

export default {
  PORT: process.env.PORT || '3000' ,
  DB_HOST: process.env.DB_HOST || '27017'
};
