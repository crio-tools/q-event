'use client';

import React, { useEffect, useState } from "react";
import ArtistCard from "@/components/ArtistCard";

function ArtistsPage() {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    async function fetchArtists() {
      try {
        const res = await fetch('https://qevent-backend.labs.crio.do/api/artists');
        if (res.ok) {
          const data = await res.json();
          setArtists(data);
        }
      } catch (e) {
        console.error("Backend not reachable, skipping...");
      }
    }

    fetchArtists();
  }, []);

  return (
    <div className="h-full w-full flex-wrap flex items-center justify-around mt-8 mb-32">
      {artists.map((artistData) => (
        <ArtistCard key={artistData.id} artistData={artistData} />
      ))}
    </div>
  );
}

export default ArtistsPage;
