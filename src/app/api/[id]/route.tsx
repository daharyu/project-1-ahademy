import { axiosAuth } from '@/api/axiosClientInstance';
import { NextRequest, NextResponse } from 'next/server';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const res = await axiosAuth.get(`/api/books/${id}`);
    return NextResponse.json(res.data);
  } catch (error: unknown) {
    console.error('Error fetching product:', error);
    return NextResponse.error();
  }
}
