'use client'

import React, { useState, useEffect } from "react";
import EventCard from "@/components/EventCard";
import { useSearchParams } from "next/navigation";

function NoSSREventPage() {
  const searchParams = useSearchParams();
  const tagQuery = searchParams.get('tag');
  const artistQuery = searchParams.get('artist');
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      let eventData = [];
      try {
        const res = await fetch('https://qevent-backend.labs.crio.do/api/events');
        if (res.ok) {
          eventData = await res.json();
        }
      } catch (e) {
        console.error("Backend not reachable, skipping...");
      }

      let filteredEvents = [];

      if (tagQuery) {
        filteredEvents = eventData.filter(event => event.tags.includes(tagQuery));
      } else if (artistQuery) {
        filteredEvents = eventData.filter(event => 
          event.artist.toLowerCase() === artistQuery.toLowerCase()
        );
      } else {
        filteredEvents = eventData;
      }

      setEvents(filteredEvents);
    };

    fetchEvents();
  }, [tagQuery, artistQuery]);

  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {events.map((eventData) => (
        <EventCard key={eventData.id} eventData={eventData} />
      ))}
    </div>
  );
}

const EventPage = dynamic(() => Promise.resolve(NoSSREventPage), {
  ssr: false,
});

export default EventPage;
