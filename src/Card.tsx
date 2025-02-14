export function Card( {event, onClick}) {
    console.log(event.image)
    return (
    //     <div
    //   className="bg-white shadow-md rounded-lg p-4 cursor-pointer m-10" 
    //   onClick={() => onClick(event.id)}
    // >
    //   <h2 className="text-lg font-bold">{event.title}</h2>
    //   <p className="text-sm text-gray-600">{event.date} à {event.time}</p>
    //   <p className="text-sm text-gray-600">{event.location}</p>
    //   <img src={event.image} alt={event.title} className="w-full object-cover" />
    // </div>
    <div
      className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition duration-300 ease-in-out"
    >
      <h2 className="text-lg font-bold text-gray-900 font-mono">{event.title}</h2>
      <p className="text-sm text-gray-600 font-sans font-bold ml-2">{event.date} à {event.time}</p>
      <p className="text-sm text-gray-600 font-sans font-bold ml-2">{event.location}</p>
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover rounded-lg"
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