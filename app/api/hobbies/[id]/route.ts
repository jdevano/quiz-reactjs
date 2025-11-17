import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = { params: { id: string } };

export async function GET(_req: Request, { params }: Params) {
  const id = Number(params.id);
  const hobby = await prisma.hobby.findUnique({ where: { id } });

  if (!hobby) {
    return NextResponse.json({ error: "Hobi tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(hobby);
}

export async function PUT(request: Request, { params }: Params) {
  const id = Number(params.id);
  const body = await request.json();
  const name = (body.name as string | undefined)?.trim();

  if (!name) {
    return NextResponse.json(
      { error: "Nama hobi wajib diisi" },
      { status: 400 }
    );
  }

  const hobby = await prisma.hobby.update({
    where: { id },
    data: { name },
  });

  return NextResponse.json(hobby);
}

export async function DELETE(_req: Request, { params }: Params) {
  const id = Number(params.id);

  await prisma.hobby.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
