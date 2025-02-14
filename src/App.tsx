import { useState } from 'react';
import './App.css';
// import { Title } from './Title.tsx';
import { Events } from './Events.tsx';
import { Detail } from './Detail.tsx';
import { Header } from './Header.tsx';

function App() {
  const [page, setPage] = useState('events');
  const [selectedEventId, setSelectedEventId] = useState(null);

  const handleEventClick = (eventId) => {
    setSelectedEventId(eventId);
    setPage('detail');
  };

  return (
    <div>
      <Header setPage={setPage}/>
      <div className='place-content-top'>
        {/* <Title setPage={setPage}/> */}
        {page === 'events' && <Events onEventClick={handleEventClick} />}
        {page === 'detail' && <Detail eventId={selectedEventId} />}
      </div>
    </div>
  );
}

export default App;
