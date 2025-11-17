"use client";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="container py-5">
      <div className="card p-4 shadow">
        <h1 className="text-center">Jeremias Devano</h1>
        <h4 className="text-center">NIM: 535240088</h4>
        <p className="text-center mt-3">Topik : List Hobi</p>

        <div className="text-center mt-4">
          <Link href="/hobbies" className="btn btn-primary">
          <Link href="/explore" className="btn btn-outline-primary ms-2">
            explore Hobi (API)
          </Link>
            Lihat Daftar Hobi
          </Link>
        </div>
      </div>
    </div>
  );
}
