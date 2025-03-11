import { useState } from "react";

export function Form({ availableSeats, event }: { availableSeats: number, event: any }) {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [seats, setSeats] = useState(1); 

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        // Créer l'objet de réservation
        const reservation = {
            eventId: event.id,
            title: event.title,
            date: event.date,
            time: event.time,
            location: event.location,
            seats: seats,
            price: event.price * seats,
            currency: event.currency,
        };

        // Récupérer les réservations existantes depuis localStorage
        const storedReservations = localStorage.getItem("cart");
        const reservations = storedReservations ? JSON.parse(storedReservations) : [];

        // Ajouter la nouvelle réservation
        reservations.push(reservation);

        // Sauvegarder dans localStorage
        localStorage.setItem("cart", JSON.stringify(reservations));

        alert("Réservation ajoutée au panier !");
    };

    return (
      <div className="w-1/2 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out">
        <h2 className="text-lg font-bold mb-4">Réserver votre place</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Nom Complet
            </label>
            <input
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="seats">
              Nombre de places (max {availableSeats})
            </label>
            <select
              id="seats"
              className="w-full shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={seats}
              onChange={(e) => setSeats(Number(e.target.value))}
              required
              disabled={availableSeats === 0}
            >
              {[...Array(availableSeats).keys()].map(i => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>

          <button
            className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
            type="submit"
            disabled={availableSeats === 0}
          >
            {availableSeats > 0 ? "Réserver" : "Complet"}
          </button>
        </form>
      </div>
    );
}
