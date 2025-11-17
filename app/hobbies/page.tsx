"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";

type Hobby = {
  id: number;
  name: string;
  createdAt: string;
};

export default function HobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  const fetchHobbies = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/hobbies");
      const data: Hobby[] = await res.json();
      setHobbies(data);
    } catch (err) {
      console.error("Gagal mengambil hobi:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHobbies();
  }, []);

  const addItem = async () => {
    if (inputValue.trim() === "") return;

    try {
      setSaving(true);
      const res = await fetch("/api/hobbies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: inputValue }),
      });
      if (!res.ok) {
        console.error("Gagal menambah hobi");
        return;
      }
      setInputValue("");
      await fetchHobbies();
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (hobby: Hobby) => {
    setEditId(hobby.id);
    setEditValue(hobby.name);
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditValue("");
  };

  const saveEdit = async () => {
    if (editId == null || editValue.trim() === "") return;
    try {
      setSaving(true);
      const res = await fetch(`/api/hobbies/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editValue }),
      });
      if (!res.ok) {
        console.error("Gagal update hobi");
        return;
      }
      setEditId(null);
      setEditValue("");
      await fetchHobbies();
    } finally {
      setSaving(false);
    }
  };

  const deleteItem = async (id: number) => {
    if (!confirm("Yakin ingin menghapus hobi ini?")) return;
    try {
      const res = await fetch(`/api/hobbies/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        console.error("Gagal menghapus hobi");
        return;
      }
      await fetchHobbies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm">
        <h2 className="mb-4 fw-bold text-center">Daftar Hobi (Database)</h2>

        {/* Input create */}
        <div className="input-group mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Tambahkan hobi..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button
            onClick={addItem}
            className="btn btn-success btn-lg px-4"
            disabled={saving}
          >
            {saving ? "Saving..." : "Add"}
          </button>
        </div>

        {loading && <p className="text-center text-muted">Loading...</p>}

        {!loading && hobbies.length === 0 && (
          <p className="text-muted text-center">
            Belum ada hobi. Tambahkan dulu ya 😊
          </p>
        )}

        <ul className="list-group">
          {hobbies.map((item) => (
            <li key={item.id} className="list-group-item border-0 p-0 mb-3">
              <div className="card p-3 d-flex flex-row justify-content-between align-items-center shadow-sm">
                <div>
                  {editId === item.id ? (
                    <input
                      type="text"
                      className="form-control"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                    />
                  ) : (
                    <Link
                      href={`/hobbies/${item.id}`}
                      className="fw-semibold text-decoration-none"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>

                <div className="d-flex gap-2">
                  {editId === item.id ? (
                    <>
                      <button
                        className="btn btn-sm btn-success"
                        onClick={saveEdit}
                        disabled={saving}
                      >
                        Save
                      </button>
                      <button
                        className="btn btn-sm btn-secondary"
                        onClick={cancelEdit}
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => startEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => deleteItem(item.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center mt-4">
          <Link href="/" className="btn btn-secondary px-4 py-2">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
