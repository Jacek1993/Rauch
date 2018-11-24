const mongoose=require('mongoose');

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://test:040993jrula@ds145563.mlab.com:45563/todoapp');
//mongoose.connect('mongodb://localhost:27017/Booking');

module.exports={mongoose};