
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Poll({ data }) {
  const [vote, setVote] = useState(-1);
  const [winner, setWinner] = useState(null);
  const [pollEnded, setPollEnded] = useState(false);
  const [pollResults, setPollResults] = useState([]);
  const [canVote, setCanVote] = useState(false);
  const pollStartTime = new Date(data.Start_Time);
  const pollEndTime = new Date(data.End_Time);
  const currentTime = new Date();
  async function handleDelete() {
    try {
      const response = await axios.delete(`http://localhost:2222/api/poll/${data._id}`);
      alert(response.data.message); // Show success message
    } catch (error) {
      console.error('Error deleting poll:', error);
      alert('Failed to delete poll');
    }
  }
  // useEffect(() => {
  //   // const currentTime = new Date();

  //   if (currentTime > pollEndTime) {
  //     setPollEnded(true);
  //     fetchPollResults();
  //   }
  // }, [pollEndTime]);
  useEffect(() => {
    // Check if current time is between start and end time
    const isActive = currentTime > pollStartTime && currentTime < pollEndTime;
    setCanVote(isActive);
    setPollEnded(currentTime > pollEndTime);

    if (currentTime > pollEndTime) {
      fetchPollResults();
    }
  }, [pollStartTime, pollEndTime, currentTime]);

  async function handleVoteSubmit(e) {
    e.preventDefault();
    if (!canVote) {
      alert('You have already voted or voting is not allowed at this time.');
      return;
    }
    if (vote !== -1) {
      const selectedCandidate = data.Options[vote];
      //console.log('selectedCandidate', selectedCandidate);
      const candidateID = selectedCandidate._id;
      //console.log('candidateID', candidateID);
      try {
        
        await axios.post('http://localhost:2222/api/vote', {
          pollID: data._id,
          candidateID
        });

        alert('Vote submitted successfully');
      } catch (error) {
        console.error('Error submitting vote:', error);
        alert('Failed to submit vote');
      }
    } else {
      alert('Select a candidate first');
    }
  }

  async function fetchPollResults() {
    try {
      const response = await axios.get(`http://localhost:2222/api/results/${data._id}`);
      const { Result } = response.data;

      setPollResults(Result);

      const maxVotes = Math.max(...Result);
      const winningIndex = Result.indexOf(maxVotes);

      setWinner(data.Options[winningIndex]);
    } catch (error) {
      console.error('Error fetching poll results:', error);
    }
  }
  const handleChange = (e) => {
    const selectedIndex = e.target.value;
    setVote(Number(selectedIndex));
    console.log('selectedIndex', selectedIndex);
  }

  return (
    <div className='my-6 py-4 px-8 bg-white rounded shadow'>
      <h1 className='text-3xl'>{data.Name}</h1>

      <div>
        <span>Start Time: {pollStartTime.toLocaleString()}</span>
        <br />
        <span>End Time: {pollEndTime.toLocaleString()}</span>
      </div>

      {pollEnded ? (
        <div>
          {winner ? (
            <div className='winner-message'>
              <h2>Winner: {winner.Name}</h2>
              <p>{winner.Party}</p>
            </div>
          ) : (
            <p>No winner declared yet.</p>
          )}
        </div>
      ) : (
        <form className='flex gap-2 items-center' onChange={handleChange} onSubmit={handleVoteSubmit}>
          <select
            name="poll"
            id="poll"
            className='w-1/2 max-w-md min-w-fit py-2 px-4 bg-[#3bb19b] text-white rounded'
            value={vote}
            onChange={(e) => setVote(Number(e.target.value))}
          >
            <option value={-1}>Choose your candidate</option>
            {data.Options.map(({ Name, Party }, index) => (
              <option key={index} value={index}>
                {Party}: {Name}
              </option>
            ))}
          </select>
          <button className='py-1 px-4 border bg-[#3bb19b] rounded hover:bg-blue-100'>
            Give Vote
          </button>
        </form>
      )}
 <button onClick={handleDelete} className='py-1 px-4 border bg-red-500 text-white rounded hover:bg-red-600'>
        Delete Poll
      </button>
      <div>
        <span>Total Vote: {data.Total_Vote}</span>
      </div>

      {pollResults.length > 0 && (
        <div>
          <h2>Poll Results</h2>
          <ul>
            {data.Options.map(({ Name, Party }, index) => (
              <li key={index}>
                {Party}: {Name} - {pollResults[index]} votes
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Poll;

