export function Card({ event, onClick }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mr-5 hover:shadow-lg transition duration-300 ease-in-out">
      
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-gray-900 font-mono">{event.title}</h2>
      </div>
      
      <p className="text-sm text-gray-600 font-sans font-bold">{new Date(event.date).toLocaleDateString("fr-FR")} à {event.time}</p>

      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-600 font-sans font-bold">📍 {event.location}</p>
        <p className="text-sm text-gray-900 font-bold text-right">
          💰 {event.price} {event.symbol}
        </p>
      </div>

      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg mt-2"
      />

      <div className="flex justify-center mt-4">
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => onClick(event.id)}
        >
          <span className="font-mono text-xm">Découvrir</span>
        </button>
      </div>
      
    </div>
  );
}
