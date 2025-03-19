import { useState, useEffect } from "react";

export function Cart() {
    const [cart, setCart] = useState<[]>([]);

    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    const handleRemove = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
    };

    return (
      <div className="w-full p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-4">🛒 Mon Panier</h2>
        
        {cart.length === 0 ? (
          <p className="text-gray-600">Votre panier est vide.</p>
        ) : (
          <ul>
            {cart.map((item, index) => (
              <li key={index} className="flex justify-between items-center p-4 border-b">
                <div>
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="text-gray-700">{item.date} à {item.time}</p>
                  <p className="text-gray-700">📍 {item.location}</p>
                  <p className="text-gray-700">🎟️ {item.seats} places</p>
                  <p className="text-lg font-bold text-green-600">
                    💰 {item.price} {item.currency}
                  </p>
                </div>
                <button 
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleRemove(index)}
                >
                  Supprimer
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    );
}
    