import { useEffect, useState } from 'react';
import { Card } from './Card.jsx';

export function Events({ onEventClick }) {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    fetch('http://localhost:3000/events')
      .then((response) => response.json())
      .then((data) => {
        setEvents(data);
        setFilteredEvents(data);
      })
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  useEffect(() => {
    let filtered = [...events];

    if (search.trim() !== '') {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category !== 'all') {
      filtered = filtered.filter(event => event.category === category);
    }

    const now = new Date();
    if (dateFilter === 'past') {
      filtered = filtered.filter(event => new Date(event.date) < now);
    } else if (dateFilter === 'upcoming') {
      filtered = filtered.filter(event => new Date(event.date) >= now);
    }

    if (sortBy === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredEvents(filtered);
  }, [search, category, sortBy, dateFilter, events]);

  return (
    <div className="m-10">
      <div className="mb-6 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Rechercher un événement..."
          className="border px-4 py-2 rounded-lg shadow-sm w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg shadow-sm"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">Toutes les catégories</option>
          <option value="Concert">Concert</option>
          <option value="Conférence">Conférence</option>
        </select>

        <select
          className="border px-4 py-2 rounded-lg shadow-sm"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
        >
          <option value="all">Toutes les dates</option>
          <option value="past">Événements passés</option>
          <option value="upcoming">Événements à venir</option>
        </select>

        <select
          className="border px-4 py-2 rounded-lg shadow-sm"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="default">Tri par défaut</option>
          <option value="asc">Prix croissant</option>
          <option value="desc">Prix décroissant</option>
        </select>
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 gap-6">
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <Card key={event.id} event={event} onClick={onEventClick} />
          ))
        ) : (
          <p className="text-gray-600 text-lg">Aucun événement ne correspond aux critères.</p>
        )}
      </ul>
    </div>
  );
}
