import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

export default function NotFoundPage() {
  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card p-5 shadow-lg text-center" style={{ maxWidth: "600px", width: "100%" }}>
        <h1 className="display-4 fw-bold mb-3">404</h1>
        <h3 className="mb-3">Halaman Tidak Ditemukan</h3>
        <p className="text-muted mb-4">
          Sepertinya halaman yang kamu cari tidak ada.  
          Mungkin URL salah, atau hobinya sudah dihapus.
        </p>
        <Link href="/" className="btn btn-primary px-4 py-2">
          Kembali ke Home
        </Link>
      </div>
    </div>
  );
}
