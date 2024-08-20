const mongoose = require('mongoose');

const PollSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Start_Time: { type: Date, required: true },
  End_Time: { type: Date, required: true },
  WhoCan: { type: [String], required: true },
  Options: [
    {
      Party: { type: String, required: true },
      Name: { type: String, required: true },
     Vote: { type: Number, default: 0 }
    }
  ],
  WhoGave: { type: [String], default: [] },
  Result: { type: [Number], default: [] },
  Total_Vote: { type: Number, default: 0 }
});

const Poll = mongoose.model('Poll', PollSchema);
module.exports = Poll;
