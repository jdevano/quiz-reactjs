"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

type DetailProps = {
  params: { id: string };
};

type Hobby = {
  id: number;
  name: string;
  createdAt: string;
};

export default function DetailPage({ params }: DetailProps) {
  const { id } = params;
  const [hobby, setHobby] = useState<Hobby | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/hobbies/${id}`);
        if (!res.ok) {
          setHobby(null);
        } else {
          const data: Hobby = await res.json();
          setHobby(data);
        }
      } catch (err) {
        console.error(err);
        setHobby(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!hobby) {
    return (
      <div className="container py-5 d-flex justify-content-center">
        <div className="card p-5 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
          <h2 className="fw-bold text-center mb-3">Detail Hobi</h2>
          <p className="text-center text-muted mb-4">
            Hobi tidak ditemukan.
          </p>
          <div className="text-center">
            <Link href="/hobbies" className="btn btn-primary px-4 py-2">
              Kembali ke List
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="fw-bold text-center mb-3">Detail Hobi</h2>

        <p className="fs-3 fw-semibold text-primary text-center mb-3">
          {hobby.name}
        </p>
        <p className="text-center text-muted">
          Dibuat pada: {new Date(hobby.createdAt).toLocaleString()}
        </p>

        <div className="text-center mt-4">
          <Link href="/hobbies" className="btn btn-primary px-4 py-2">
            Kembali ke List
          </Link>
        </div>
      </div>
    </div>
  );
}
