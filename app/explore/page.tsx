"use client";

import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Activity = {
  activity: string;
  type: string;
  participants: number;
};

export default function ExplorePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchActivities = async (count: number = 5) => {
    try {
      setLoading(true);
      setError(null);

      const results: Activity[] = [];
      for (let i = 0; i < count; i++) {
        const res = await fetch("https://www.boredapi.com/api/activity");
        if (!res.ok) throw new Error("Gagal fetch API");
        const data = (await res.json()) as Activity;
        results.push(data);
      }

      setActivities(results);
    } catch (err) {
      setError("Terjadi kesalahan saat mengambil data hobi dari API.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities(5);
  }, []);

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm">
        <h2 className="fw-bold mb-3 text-center">Explore Hobi dari External API</h2>
        <p className="text-center text-muted mb-4">
          Ide aktivitas/hobi random dari Bored API
        </p>

        <div className="text-center mb-4">
          <button
            className="btn btn-primary"
            onClick={() => fetchActivities(5)}
            disabled={loading}
          >
            {loading ? "Loading..." : "Refresh Ide Hobi"}
          </button>
        </div>

        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row">
          {activities.map((item, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <div className="card h-100 p-3">
                <h5 className="fw-semibold">{item.activity}</h5>
                <p className="mb-1">
                  <span className="badge bg-info me-2">Tipe: {item.type}</span>
                  <span className="badge bg-secondary">
                    Peserta: {item.participants}
                  </span>
                </p>
              </div>
            </div>
          ))}

          {!loading && activities.length === 0 && !error && (
            <p className="text-center text-muted">Tidak ada data.</p>
          )}
        </div>
      </div>
    </div>
  );
}
