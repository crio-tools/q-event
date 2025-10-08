'use client';
import React, { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

export const dynamic = "force-dynamic";

export default function EventPage() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get('tag');
  const artistQuery = searchParams.get('artist');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch('https://qevent-backend.labs.crio.do/api/events');
        if (!res.ok) throw new Error("Failed to fetch events");
        const eventData = await res.json();

        const filteredEvents = tagQuery
          ? eventData.filter(event => event.tags.includes(tagQuery))
          : artistQuery
          ? eventData.filter(event => event.artist.toLowerCase() === artistQuery.toLowerCase())
          : eventData;

        setEvents(filteredEvents);
      } catch (err) {
        console.error("Backend not reachable, skipping...");
        setEvents([]); // fallback
      }
    };

    fetchEvents();
  }, [tagQuery, artistQuery]);

  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {events.map(eventData => (
        <EventCard key={eventData.id} eventData={eventData} />
      ))}
    </div>
  );
}
