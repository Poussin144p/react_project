import { useState } from 'react';
import './App.css';
import { Events } from './Events.jsx';
import { Detail } from './Detail.jsx';
import { Header } from './Header.jsx';
import { Checkout } from './Checkout.jsx';

function App() {
    const [page, setPage] = useState('events');
    const [selectedEventId, setSelectedEventId] = useState(null);

    const handleEventClick = (eventId) => {
        console.log('handleEventClick called with eventId:', eventId);
        setSelectedEventId(eventId);
        setPage('detail');
    };

    return (
        <div>
            <Header setPage={setPage} />
            <div className='place-content-top'>
                {page === 'events' && <Events onEventClick={handleEventClick} />}
                {page === 'detail' && <Detail eventId={selectedEventId} />}
                {page === 'checkout' && <Checkout />}
            </div>
        </div>
    );
}

export default App;