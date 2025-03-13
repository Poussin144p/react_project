import { useState } from "react";

export function Form({ event, onUpdate }) {
    const [seats, setSeats] = useState(1);
    const [availableSeats, setAvailableSeats] = useState(event.capacity);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (seats > availableSeats) {
            alert("Il n'y a pas assez de places disponibles !");
            return;
        }

        // Récupérer le panier existant dans localStorage
        const storedCart = localStorage.getItem("cart") ;
        const cart = storedCart ? JSON.parse(storedCart) : {};

        // Vérifier si l'événement est déjà dans le panier
        if (cart[event.id]) {
            cart[event.id].seats += seats; // Ajouter les places réservées à l'existant
        } else {
            cart[event.id] = {
                eventId: event.id,
                title: event.title,
                date: event.date,
                time: event.time,
                location: event.location,
                seats: seats,
                price: event.price,
                image: event.image
            };
        }

        // Sauvegarder le panier mis à jour
        localStorage.setItem("cart", JSON.stringify(cart));

        // Calculer le nouveau nombre de places disponibles
        const newCapacity = availableSeats - seats;

        // Mettre à jour `db.json` via l'API REST
        try {
            const response = await fetch(`http://localhost:3000/events/${event.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ capacity: newCapacity })
            });

            if (!response.ok) {
                throw new Error("Échec de la mise à jour de la capacité.");
            }

            // Mettre à jour l'état local après succès
            setAvailableSeats(newCapacity);
            onUpdate(newCapacity); // Met à jour le `Detail`
            alert("Réservation ajoutée au panier !");
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'événement :", error);
        }
    };

    return (
      <div className=" w-1/2 bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out">
        <h2 className="text-lg font-bold text-gray-700">Réservez votre place</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de places (max {availableSeats})
            </label>
            <select
              className="w-full shadow border rounded py-2 px-3 text-gray-700"
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
