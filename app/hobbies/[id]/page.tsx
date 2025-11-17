"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

type DetailProps = {
  params: { id: string };
};

export default function DetailPage({ params }: DetailProps) {
  const { id } = params;
  const [hobby, setHobby] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("hobbies");

    if (saved) {
      const list: string[] = JSON.parse(saved);
      setHobby(list[Number(id)] ?? null);
    }
  }, [id]);

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg" style={{ maxWidth: "500px", width: "100%" }}>
        <h2 className="fw-bold text-center mb-4">Detail Hobi</h2>

        <div className="text-center mb-4">
          <p className="fs-3 fw-semibold text-primary">
            {hobby ?? "Hobi tidak ditemukan"}
          </p>
        </div>

        <div className="text-center">
          <Link href="/hobbies" className="btn btn-primary px-4 py-2">
            Kembali ke List
          </Link>
        </div>
      </div>
    </div>
  );
}
