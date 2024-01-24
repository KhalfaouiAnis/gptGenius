"use client";

import { fetchAllTours } from "@/utils/action";
import { useQuery } from "@tanstack/react-query";
import ToursList from "./ToursList";
import { useState } from "react";

const ToursPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isPending } = useQuery({
    queryKey: ["tours", searchTerm],
    queryFn: () => fetchAllTours(searchTerm),
  });

  if (isPending) {
    return <span className="loading" />;
  }

  return (
    <>
      <form className="max-w-lg mb-12">
        <div className="join w-full">
          <input
            type="text"
            name="searchTerm"
            required
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            placeholder="enter city or country here..."
            className="input input-bordered join-item w-full"
          />
          <button
            onClick={() => setSearchTerm("")}
            className="btn tbn-primary join-item"
            type="button"
            disabled={isPending}
          >
            {isPending ? "please wait..." : "reset"}
          </button>
        </div>
      </form>
      <ToursList data={data} />
    </>
  );
};

export default ToursPage;
