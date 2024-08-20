
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Poll from '../Poll/Poll';

function Home() {
  const [polls, setPolls] = useState([]);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [pollname, setPollName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:2222/api/polls')
      .then(response => {
        setPolls(response.data.polls);
        setFilteredPolls(response.data.polls);
      })
      .catch(error => {
        console.error('Error fetching polls:', error);
      });
  }, []);

  function handleDelete(id) {
    setPolls(prevPolls => prevPolls.filter(poll => poll._id !== id));
    setFilteredPolls(prevFilteredPolls => prevFilteredPolls.filter(poll => poll._id !== id));
  }

  useEffect(() => {
    if (pollname.trim() === '') {
      setFilteredPolls(polls);
    } else {
      const filtered = polls.filter(poll =>
        poll.Name.toLowerCase().includes(pollname.toLowerCase())
      );
      setFilteredPolls(filtered);
    }
  }, [pollname, polls]);

  return (
    <div className='w-full h-full px-14 py-6 flex flex-col items-center gap-y-3 '>
      <input
        className='inp w-96 sticky top-1 shadow-lg'
        type='text'
        name='Poll Name'
        placeholder='Search poll here'
        value={pollname}
        onChange={(e) => setPollName(e.target.value)}
      />
      {filteredPolls.length === 0 ? (
        <div>Poll Not Found</div>
      ) : (
        <ul className='w-full'>
          {filteredPolls.map(p => (
            <Poll key={p._id} data={p} onDelete={handleDelete} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default Home;

