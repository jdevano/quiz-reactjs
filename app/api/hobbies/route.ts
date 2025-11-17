import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const hobbies = await prisma.hobby.findMany({
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(hobbies);
}

export async function POST(request: Request) {
  const body = await request.json();
  const name = (body.name as string | undefined)?.trim();

  if (!name) {
    return NextResponse.json(
      { error: "Nama hobi wajib diisi" },
      { status: 400 }
    );
  }

  const hobby = await prisma.hobby.create({
    data: { name },
  });

  return NextResponse.json(hobby, { status: 201 });
}
