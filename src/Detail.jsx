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

  // Fonction pour mettre à jour la capacité après réservation
  const handleUpdateCapacity = (newCapacity) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      capacity: newCapacity
    }));
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex w-full p-6 bg-white shadow-md rounded-lg">
      {/* Image et description */}
      <div className="w-1/3 p-4">
        <img 
          src={event.image} 
          alt={event.title} 
          className="object-cover w-full h-64 rounded-lg"
        />
        <p className="text-gray-700 mt-4">{event.description}</p>
      </div>

      {/* Détails de l'événement */}
      <div className="ml-10 w-2/3">
        <h2 className="text-xl font-bold text-gray-900">{event.title}</h2>
        <p className="text-sm text-gray-600 font-sans font-bold mt-2">
          {new Date(event.date).toLocaleDateString("fr-FR")} à {event.time}
        </p>
        <p className="text-gray-800 font-medium mt-1">📍 {event.location}</p>
        <p className="text-gray-800 font-medium mt-1">🎟️ {event.capacity} places disponibles</p>
        <p className="text-lg font-bold text-green-600 mt-2">
          💰 {event.price} {event.symbol} ({event.currency})
        </p>
        
        {/* Formulaire de réservation */}
        <div className="mt-4">
          <Form event={event} onUpdate={handleUpdateCapacity} />
        </div>
      </div>
    </div>
  );
}
