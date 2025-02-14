import { useState, useEffect } from 'react';
import { Form } from './Form';

export function Detail({ eventId }) {
  const [event, setEvent] = useState(null);


  useEffect(() => {
    if (eventId) {
      fetch(`http://localhost:3000/events/${eventId}`)
        .then((response) => response.json())
        .then((data) => setEvent(data))
        .catch((error) => console.error('Error fetching event:', error));
    }
  }, [eventId]);

  if (!event) {
    return <div>Loading...</div>;
  }
 

  return (
    <div className="flex w-full">
      <div className=" p-4">
        <img src={event.image} alt={event.title} className="object-conver h-full w-full" />
        <p className="text-gray-600">{event.description}</p>
      </div>
      <div className="ml-20 w-full">
        <h2 className="font-bold">{event.title}</h2>
        <p className="font-bold">{event.date} à {event.time}</p>
        <p className="font-bold">{event.location}</p>
        <Form />
      </div>
    </div>
  );
}
