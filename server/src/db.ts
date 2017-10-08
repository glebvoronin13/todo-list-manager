import * as mongoose from 'mongoose';

const init = async () => {
  return new Promise((resolve, reject) => {
    mongoose.connect('mongodb://user:user@ds131914.mlab.com:31914/todo-list-manager', {
      useMongoClient: true,
    });
    const db = mongoose.connection;
    db.on('error', (err) => {
      reject(err);
    });
    db.once('open', () => {
      resolve(true);
    });
  });
};

export default {
  init
};
