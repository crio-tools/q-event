'use client';

import Tag from "@/components/Tag";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const TagsPage = () => {
  const router = useRouter();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch('https://qevent-backend.labs.crio.do/api/tags');
        if (res.ok) {
          const data = await res.json();
          setTags(data);
        }
      } catch (e) {
        console.error("Backend not reachable, skipping...");
      }
    }

    fetchTags();
  }, []);

  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="basis-3/4 p-4 flex justify-center flex-wrap gap-4">
        {tags.map((tag) => (
          <div key={tag.id} onClick={() => router.push(`/events?tag=${tag.name}`)}>
            <Tag text={tag.name} id={tag.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsPage;


export default TagsPage;
