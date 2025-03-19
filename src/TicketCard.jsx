import { useState, useEffect } from 'react';

export function TicketCard({ ticket, onUpdate, onRemove }) {
    const [seats, setSeats] = useState(ticket.seats);
    const [maxSeats, setMaxSeats] = useState(ticket.seats);

    useEffect(() => {
        fetch(`http://localhost:3000/events/${ticket.eventId}`)
            .then((response) => response.json())
            .then((data) => setMaxSeats(data.capacity))
            .catch((error) => console.error('Error fetching event:', error));
    }, [ticket.eventId]);

    const handleSeatsChange = (newSeats) => {
        if (newSeats < 1 || newSeats > maxSeats) return;
        setSeats(newSeats);
        onUpdate(ticket.eventId, newSeats);
    };

    const handleRemove = async () => {
        onRemove(ticket.eventId);
        const newCapacity = maxSeats + seats;
        try {
            const response = await fetch(`http://localhost:3000/events/${ticket.eventId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ capacity: newCapacity })
            });

            if (!response.ok) {
                throw new Error("Failed to update capacity.");
            }
        } catch (error) {
            console.error("Error updating event capacity:", error);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 flex items-center">
            <img
                src={ticket.image}
                alt={ticket.title}
                className="w-24 h-24 object-cover rounded-lg mr-4"
            />
            <div className="flex-grow">
                <h3 className="text-xl font-bold">{ticket.title}</h3>
                <p>Date: {ticket.date}</p>
                <p>Time: {ticket.time}</p>
                <p>Location: {ticket.location}</p>
            </div>
            <div className="flex items-center">
                <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() => handleSeatsChange(seats - 1)}
                >
                    -
                </button>
                <span className="mx-2">{seats}</span>
                <button
                    className="bg-gray-300 px-2 py-1 rounded"
                    onClick={() => handleSeatsChange(seats + 1)}
                    disabled={seats >= maxSeats}
                >
                    +
                </button>
            </div>
            <div className="ml-4 text-right">
                <p>Total: {(ticket.price * seats).toFixed(2)}€</p>
                {seats >= maxSeats && (
                    <p className="text-red-500">Il n'y a plus de places disponibles.</p>
                )}
            </div>
            <button
                className="ml-4 bg-red-500 text-white px-2 py-1 rounded"
                onClick={handleRemove}
            >
                🗑️
            </button>
        </div>
    );
}