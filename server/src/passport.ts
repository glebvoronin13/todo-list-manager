import * as passport from 'passport';
import * as mongoose from 'mongoose';

const init = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect('mongodb://user:user@ds131914.mlab.com:31914/todo-list-manager');
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        // reject(false);
        db.once('open', function() {
            // we're connected!
            resolve(true);
            console.log('connected');
        });
    });
};

export default {
    init
};
