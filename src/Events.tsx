import { useEffect, useState } from 'react';
import { Card } from './Card';

export function Events({ onEventClick }) {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then((response) => response.json())
      .then((data) => setEvents(data))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <ul className='m-10 grid grid-cols-2 sm:grid-cols-3'>
        {events.map((event) => (
          <Card key={event.id} event={event} onClick={onEventClick} />
        ))}
    </ul>
  );
}
