// // // // // const express = require('express');
// // // // // const { ObjectId, Timestamp } = require('mongodb');
// // // // // const pollRouter = express.Router()
// // // // // const PollDB = require('../models/Poll_schema') 
// // // // // // const { PollDB } = require('../DB');

// // // // // pollRouter.get('/search', async (req, res) => {
// // // // // 	try {
// // // // // 	  const { poll_name } = req.query;
// // // // // 	  if (typeof poll_name !== 'string' || poll_name.trim() === '') {
// // // // // 		return res.status(400).send("Invalid poll name");
// // // // // 	  }
// // // // // 	  const selector = {
// // // // // 		$or: [
// // // // // 		  { Name: { $regex: poll_name, $options: 'i' } },
// // // // // 		  { _id: ObjectId.isValid(poll_name) ? ObjectId(poll_name) : null },
// // // // // 		],
// // // // // 	  };
      
  
// // // // // 	  const dateNow = new Date();
// // // // // 	  const data = await PollDB.find(selector)
// // // // // 		.sort({ "Start_Time": -1 })
// // // // // 		.lean(); // Use lean() to get a plain JavaScript object instead of Mongoose Document
 
// // // // // 	  if (data.length > 0) {
// // // // // 		const arr = data.map(d => {
// // // // // 		  if (dateNow < d.End_Time)
// // // // // 			delete d.Result;
  
// // // // // 		  delete d.WhoGave;
// // // // // 		  d.Upcoming = (dateNow < d.Start_Time);
// // // // // 		  return d;
// // // // // 		});
		
// // // // // 		res.json(arr);
// // // // // 	  } else {
// // // // // 		res.status(404).send("Poll Not Found");
// // // // // 	  }
// // // // // 	} catch (error) {
// // // // // 	  console.error("Error fetching polls:", error);
// // // // // 	  res.status(500).send("Error fetching polls");
// // // // // 	}
// // // // //   });
  

// // // // // pollRouter.post('/vote', async (req, res) => {
// // // // // 	try {
// // // // // 	  const { poll_id, vote } = req.body;
// // // // // 	  const { Roles, _id } = req.user;
	 
  
// // // // // 	  if (!ObjectId.isValid(poll_id)) {
// // // // // 		return res.status(400).send("Invalid Poll ID");
// // // // // 	  }
  
// // // // // 	  const findQuery = {
// // // // // 		"_id": ObjectId(poll_id),
// // // // // 		"WhoCan": { $elemMatch: { $in: Roles } },
// // // // // 		"WhoGave": { $nin: [_id] }
// // // // // 	  };
  
// // // // // 	  const poll = await PollDB.findOne(findQuery);
// // // // // 	  console.log(poll)
  
// // // // // 	  if (!poll) {
// // // // // 		return res.status(400).send("You cannot vote for this poll");
// // // // // 	  }
  
// // // // // 	  const selector = {};
// // // // // 	  selector['Result.' + vote] = 1;
// // // // // 	  selector["Total_Vote"] = 1;
  
// // // // // 	  const updateQuery = {
// // // // // 		$push: { "WhoGave": _id },
// // // // // 		$inc: selector
// // // // // 	  };
  
// // // // // 	  const updatedPoll = await PollDB.updateOne(findQuery, updateQuery);
  
// // // // // 	  if (updatedPoll.matchedCount === 0) {
// // // // // 		return res.status(400).send("You cannot vote for this poll");
// // // // // 	  }
  
// // // // // 	  res.status(200).send("Your vote has been recorded");
// // // // // 	} catch (error) {
// // // // // 	  console.error("Error while voting:", error);
// // // // // 	  res.status(500).send("Error while voting");
// // // // // 	}
// // // // //   });
  

// // // // // module.exports = pollRouter
// // // // const express = require('express');
// // // // const { ObjectId } = require('mongodb');
// // // // const Poll = require('../models/Poll_schema');
// // // // const pollRouter = express.Router();

// // // // pollRouter.get('/search', async (req, res) => {
// // // //   try {
// // // //     const { poll_name } = req.query;

// // // //     // Ensure poll_name is a non-empty string before using it in the query
// // // //     if (!poll_name || typeof poll_name !== 'string') {
// // // //       return res.status(400).send("Invalid poll name");
// // // //     }

// // // //     const selector = {
// // // //       $or: [
// // // //         { Name: { $regex: new RegExp(poll_name, 'i') } },
// // // //         { _id: ObjectId.isValid(poll_name) ? ObjectId(poll_name) : null },
// // // //       ],
// // // //     };

// // // //     const dateNow = new Date();
// // // //     const data = await Poll.find(selector)
// // // //       .sort({ "Start_Time": -1 })
// // // //       .lean();

// // // //     if (data.length > 0) {
// // // //       const arr = data.map(d => {
// // // //         if (dateNow < d.End_Time)
// // // //           delete d.Result;

// // // //         delete d.WhoGave;
// // // //         d.Upcoming = (dateNow < d.Start_Time);
// // // //         return d;
// // // //       });

// // // //       res.json(arr);
// // // //     } else {
// // // //       res.status(404).send("Poll Not Found");
// // // //     }
// // // //   } catch (error) {
// // // //     console.error("Error fetching polls:", error);
// // // //     res.status(500).send("Error fetching polls");
// // // //   }
// // // // });

// // // // module.exports = pollRouter;
// // // const express = require('express');
// // // const { ObjectId, Timestamp } = require('mongodb');
// // // const pollRouter = express.Router()
// // // const PollDB = require('../models/Poll_schema') 
// // // // const { PollDB } = require('../DB');

// // // pollRouter.get('/search', async (req, res) => {
// // // 	try {
// // // 	  const { poll_name } = req.query;
	  
// // // 	  const selector = {
// // // 		$or: [
// // // 		  { Name: { $regex: poll_name, $options: 'i' } },
// // // 		  { _id: ObjectId.isValid(poll_name) ? ObjectId(poll_name) : null },
// // // 		],
// // // 	  };
  
// // // 	  const dateNow = new Date();
// // // 	  const data = await PollDB.find(selector)
// // // 		.sort({ "Start_Time": -1 })
// // // 		.lean(); // Use lean() to get a plain JavaScript object instead of Mongoose Document
 
// // // 	  if (data.length > 0) {
// // // 		const arr = data.map(d => {
// // // 		  if (dateNow < d.End_Time)
// // // 			delete d.Result;
  
// // // 		  delete d.WhoGave;
// // // 		  d.Upcoming = (dateNow < d.Start_Time);
// // // 		  return d;
// // // 		});
		
// // // 		res.json(arr);
// // // 	  } else {
// // // 		res.status(404).send("Poll Not Found");
// // // 	  }
// // // 	} catch (error) {
// // // 	  console.error("Error fetching polls:", error);
// // // 	  res.status(500).send("Error fetching polls");
// // // 	}
// // //   });
  
// // // // pollRouter.post('/vote', (req, res) => {
// // // // 	const { poll_id, vote } = req.body;
// // // // 	const { Roles, _id } = req.user;


// // // // 	if (ObjectId.isValid(poll_id)) {
// // // // 		const findQuery = {
// // // // 			"_id": ObjectId(poll_id),
// // // // 			"WhoCan": { $elemMatch: { $in: Roles } },
// // // // 			"WhoGave": { $nin: [_id] }
// // // // 		};
// // // // 		selector = {};
// // // // 		selector['Result.' + vote] = 1;
// // // // 		selector["Total_Vote"] = 1;
// // // // 		const updateQuery = {
// // // // 			$push: { "WhoGave": _id },
// // // // 			$inc: selector
// // // // 		};

// // // // 		PollDB.updateOne(findQuery, updateQuery)
// // // // 			.then(data => {
// // // // 				if (data.matchedCount == 0) res.status(400).send("you can not vote for this poll");
// // // // 				else res.status(200).send("Your vote has been recorded");
// // // // 			});
// // // // 	}
// // // // 	else res.status(400).send("Invalid Poll ID or Vote");
// // // // })
// // // pollRouter.post('/vote', async (req, res) => {
// // // 	try {
// // // 	  const { poll_id, vote } = req.body;
// // // 	  const { Roles, _id } = req.user;
	 
  
// // // 	  if (!ObjectId.isValid(poll_id)) {
// // // 		return res.status(400).send("Invalid Poll ID");
// // // 	  }
  
// // // 	  const findQuery = {
// // // 		"_id": ObjectId(poll_id),
// // // 		"WhoCan": { $elemMatch: { $in: Roles } },
// // // 		"WhoGave": { $nin: [_id] }
// // // 	  };
  
// // // 	  const poll = await PollDB.findOne(findQuery);
// // // 	  console.log(poll)
  
// // // 	  if (!poll) {
// // // 		return res.status(400).send("You cannot vote for this poll");
// // // 	  }
  
// // // 	  const selector = {};
// // // 	  selector['Result.' + vote] = 1;
// // // 	  selector["Total_Vote"] = 1;
  
// // // 	  const updateQuery = {
// // // 		$push: { "WhoGave": _id },
// // // 		$inc: selector
// // // 	  };
  
// // // 	  const updatedPoll = await PollDB.updateOne(findQuery, updateQuery);
  
// // // 	  if (updatedPoll.matchedCount === 0) {
// // // 		return res.status(400).send("You cannot vote for this poll");
// // // 	  }
  
// // // 	  res.status(200).send("Your vote has been recorded");
// // // 	} catch (error) {
// // // 	  console.error("Error while voting:", error);
// // // 	  res.status(500).send("Error while voting");
// // // 	}
// // //   });
  

// // // module.exports = pollRouter
// // const express = require('express');
// // const { ObjectId } = require('mongoose').Types;
// // const Poll = require('../models/Poll_schema');
// // const pollRouter = express.Router();

// // pollRouter.get('/search', async (req, res) => {
// //   try {
// //     const { poll_name } = req.query;

// //     if (!poll_name || typeof poll_name !== 'string') {
// //       return res.status(400).send("Invalid poll name");
// //     }

// //     const selector = {
// //       $or: [
// //         { Name: { $regex: new RegExp(poll_name, 'i') } },
// //         { _id: ObjectId.isValid(poll_name) ? ObjectId(poll_name) : null },
// //       ],
// //     };

// //     const dateNow = new Date();
// //     const polls = await Poll.find(selector)
// //       .sort({ "Start_Time": -1 })
// //       .lean();

// //     if (polls.length > 0) {
// //       const updatedPolls = polls.map(poll => {
// //         if (dateNow < poll.End_Time) {
// //           delete poll.Result;
// //         }
// //         delete poll.WhoGave;
// //         poll.Upcoming = (dateNow < poll.Start_Time);
// //         return poll;
// //       });

// //       res.json(updatedPolls);
// //     } else {
// //       res.status(404).send("Polls Not Found");
// //     }
// //   } catch (error) {
// //     console.error("Error fetching polls:", error);
// //     res.status(500).send("Error fetching polls");
// //   }
// // });

// // module.exports = pollRouter;
// const express = require('express');
// const { ObjectId, Timestamp } = require('mongodb');
// const pollRouter = express.Router()
// const PollDB = require('../models/Poll_schema') 
// // const { PollDB } = require('../DB');

// pollRouter.get('/search', async (req, res) => {
// 	try {
// 	  const { poll_name } = req.query;
	  
// 	  const selector = {
// 		$or: [
// 		  { Name: { $regex: poll_name, $options: 'i' } },
// 		  { _id: ObjectId.isValid(poll_name) ? ObjectId(poll_name) : null },
// 		],
// 	  };
  
// 	  const dateNow = new Date();
// 	  const data = await PollDB.find(selector)
// 		.sort({ "Start_Time": -1 })
// 		.lean(); // Use lean() to get a plain JavaScript object instead of Mongoose Document
 
// 	  if (data.length > 0) {
// 		const arr = data.map(d => {
// 		  if (dateNow < d.End_Time)
// 			delete d.Result;
  
// 		  delete d.WhoGave;
// 		  d.Upcoming = (dateNow < d.Start_Time);
// 		  return d;
// 		});
		
// 		res.json(arr);
// 	  } else {
// 		res.status(404).send("Poll Not Found");
// 	  }
// 	} catch (error) {
// 	  console.error("Error fetching polls:", error);
// 	  res.status(500).send("Error fetching polls");
// 	}
//   });
  
// // pollRouter.post('/vote', (req, res) => {
// // 	const { poll_id, vote } = req.body;
// // 	const { Roles, _id } = req.user;


// // 	if (ObjectId.isValid(poll_id)) {
// // 		const findQuery = {
// // 			"_id": ObjectId(poll_id),
// // 			"WhoCan": { $elemMatch: { $in: Roles } },
// // 			"WhoGave": { $nin: [_id] }
// // 		};
// // 		selector = {};
// // 		selector['Result.' + vote] = 1;
// // 		selector["Total_Vote"] = 1;
// // 		const updateQuery = {
// // 			$push: { "WhoGave": _id },
// // 			$inc: selector
// // 		};

// // 		PollDB.updateOne(findQuery, updateQuery)
// // 			.then(data => {
// // 				if (data.matchedCount == 0) res.status(400).send("you can not vote for this poll");
// // 				else res.status(200).send("Your vote has been recorded");
// // 			});
// // 	}
// // 	else res.status(400).send("Invalid Poll ID or Vote");
// // })
// pollRouter.post('/vote', async (req, res) => {
// 	try {
// 	  const { poll_id, vote } = req.body;
// 	  const { Roles, _id } = req.user;
	 
  
// 	  if (!ObjectId.isValid(poll_id)) {
// 		return res.status(400).send("Invalid Poll ID");
// 	  }
  
// 	  const findQuery = {
// 		"_id": ObjectId(poll_id),
// 		"WhoCan": { $elemMatch: { $in: Roles } },
// 		"WhoGave": { $nin: [_id] }
// 	  };
  
// 	  const poll = await PollDB.findOne(findQuery);
// 	  console.log(poll)
  
// 	  if (!poll) {
// 		return res.status(400).send("You cannot vote for this poll");
// 	  }
  
// 	  const selector = {};
// 	  selector['Result.' + vote] = 1;
// 	  selector["Total_Vote"] = 1;
  
// 	  const updateQuery = {
// 		$push: { "WhoGave": _id },
// 		$inc: selector
// 	  };
  
// 	  const updatedPoll = await PollDB.updateOne(findQuery, updateQuery);
  
// 	  if (updatedPoll.matchedCount === 0) {
// 		return res.status(400).send("You cannot vote for this poll");
// 	  }
  
// 	  res.status(200).send("Your vote has been recorded");
// 	} catch (error) {
// 	  console.error("Error while voting:", error);
// 	  res.status(500).send("Error while voting");
// 	}
//   });
  

// module.exports = pollRouter
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Poll = require('../models/Poll_schema'); // Your Poll model/schema

// Route to fetch all polls
router.get('/polls', async (req, res) => {
  try {
    const polls = await Poll.find({});
    res.status(200).json({ polls });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route for user voting
// router.post('/vote', async (req, res) => {
// 	try {
// 	  const { pollID, candidateID } = req.body;
//   //console.log(candidateID);
// 	  const poll = await Poll.findById(pollID);
// 	  if (!poll) {
// 		return res.status(404).json({ error: 'Poll not found' });
// 	  }
  
// 	  // Find the selected option/candidate within the Options array
// 	  const selectedOption = poll.Options.id(candidateID);
// 	  if (!selectedOption) {
// 		return res.status(404).json({ error: 'Candidate not found in the poll' });
// 	  }
  
// 	  // Increment the vote count for the selected candidate
// 	  selectedOption.votes = (selectedOption.votes || 0) + 1;
  
// 	  // Increment the total vote count for the poll (if needed)
// 	  poll.Total_Vote += 1;
  
// 	  // Save the updated poll to the database
// 	  await poll.save();
  
// 	  res.status(200).json({ message: 'Vote submitted successfully' });
// 	} catch (err) {
// 	  res.status(500).json({ error: err.message });
// 	}
//   });
// router.post('/vote', async (req, res) => {
// 	try {
// 	  const { pollID, candidateID } = req.body;
// 	  const poll = await Poll.findById(pollID);
  
// 	  if (!poll) {
// 		return res.status(404).json({ error: 'Poll not found' });
// 	  }
  
// 	  poll.Result[candidateID] += 1;
// 	  poll.Total_Vote += 1;
// 	  poll.WhoGave.push(req.body.userID); // Assuming userID is sent from frontend
// 	  await poll.save();
  
// 	  res.status(200).json({ message: 'Vote submitted successfully' });
// 	} catch (error) {
// 	  res.status(500).json({ error: 'Failed to submit vote' });
// 	}
//   });
  
//   // Get poll results
//   router.get('/results/:pollID', async (req, res) => {
// 	try {
// 	  const poll = await Poll.findById(req.params.pollID);
// 	  if (!poll) {
// 		return res.status(404).json({ error: 'Poll not found' });
// 	  }
// 	  const candidates = poll.Options.map((option, index) => ({
// 		Name: option.Name,
// 		Party: option.Party,
// 		Votes: poll.Result[index], // Fetch vote count for each candidate from Result array
// 	  }));
// 	  res.status(200).json({ Result: poll.Result, Total_Vote: poll.Total_Vote });
// 	} catch (error) {
// 	  res.status(500).json({ error: 'Failed to fetch poll results' });
// 	}
//   });


router.post('/vote', async (req, res) => {
	const { pollID, candidateID } = req.body;
  
	try {
	  const poll = await Poll.findById(pollID);
  
	  if (!poll) {
		return res.status(404).json({ error: 'Poll not found' });
	  }
  
	  const candidateObjectId = mongoose.Types.ObjectId(candidateID);
	  const candidateIndex = poll.Options.findIndex(candidate => candidate._id.equals(candidateObjectId));
  
	  if (candidateIndex !== -1) {
		// Check if the poll has ended or the user has already voted
		const currentTime = new Date();
		if (currentTime > poll.End_Time || poll.WhoGave.includes(req.body.userID)) {
		  return res.status(400).json({ error: 'Voting period ended or user already voted' });
		}
  
		// Update vote count for the selected candidate
		poll.Result[candidateIndex] += 1;
		poll.Total_Vote += 1;
		poll.WhoGave.push(req.body.userID); // Assuming userID is sent from frontend
  
		// Save the updated poll to the database
		await poll.save();
  
		return res.status(200).json({ message: 'Vote submitted successfully' });
	  } else {
		return res.status(400).json({ error: 'Invalid candidate index' });
	  }
	} catch (error) {
	  console.error('Error submitting vote:', error);
	  return res.status(500).json({ error: 'Failed to submit vote' });
	}
  });
  
router.get('/search', async (req, res) => {
	try {
	  const { poll_name } = req.query;
  
	  if (!poll_name || typeof poll_name !== 'string') {
		return res.status(400).send("Invalid poll name");
	  }
  
	  const selector = {
		$or: [
		  { Name: { $regex: new RegExp(poll_name, 'i') } },
		  { _id: ObjectId.isValid(poll_name) ? ObjectId(poll_name) : null },
		],
	  };
  
	  const polls = await Poll.find(selector).sort({ "Start_Time": -1 }).lean();
  
	  if (polls.length > 0) {
		res.json({ polls });
	  } else {
		res.status(404).send("Polls Not Found");
	  }
	} catch (error) {
	  console.error("Error fetching polls:", error);
	  res.status(500).send("Error fetching polls");
	}
  });
  router.delete('/poll/:pollID', async (req, res) => {
	try {
	  const { pollID } = req.params;
  
	  const deletedPoll = await Poll.findByIdAndDelete(pollID);
  
	  if (!deletedPoll) {
		return res.status(404).json({ error: 'Poll not found' });
	  }
  
	  res.status(200).json({ message: 'Poll deleted successfully' });
	} catch (error) {
	  console.error('Error deleting poll:', error);
	  res.status(500).json({ error: 'Failed to delete poll' });
	}
  });
  
module.exports = router;
