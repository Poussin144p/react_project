import { useState, useEffect } from 'react';
import { TicketCard } from './TicketCard.jsx';

export function Checkout() {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        const cart = storedCart ? JSON.parse(storedCart) : {};
        setTickets(Object.values(cart));
    }, []);

    const updateTicketSeats = (eventId, newSeats) => {
        const updatedTickets = tickets.map(ticket =>
            ticket.eventId === eventId ? { ...ticket, seats: newSeats } : ticket
        );
        setTickets(updatedTickets);
        localStorage.setItem("cart", JSON.stringify(updatedTickets.reduce((acc, ticket) => {
            acc[ticket.eventId] = ticket;
            return acc;
        }, {})));
    };

    const removeTicket = (eventId) => {
        const updatedTickets = tickets.filter(ticket => ticket.eventId !== eventId);
        setTickets(updatedTickets);
        localStorage.setItem("cart", JSON.stringify(updatedTickets.reduce((acc, ticket) => {
            acc[ticket.eventId] = ticket;
            return acc;
        }, {})));
    };

    const calculateTotal = () => {
        return tickets.reduce((total, ticket) => total + (ticket.price * ticket.seats), 0);
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Checkout</h2>
            <div className="bg-white shadow-md rounded-lg p-4">
                {tickets.length === 0 ? (
                    <p>No tickets in the cart.</p>
                ) : (
                    tickets.map(ticket => (
                        <TicketCard key={ticket.eventId} ticket={ticket} onUpdate={updateTicketSeats} onRemove={removeTicket} />
                    ))
                )}
                <div className="text-right font-bold mt-4">
                    Global Total: {calculateTotal().toFixed(2)}€
                </div>
            </div>
        </div>
    );
}