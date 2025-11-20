import { axiosAuth } from '@/api/axiosClientInstance';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const res = await axiosAuth.get(`/api/authors`);
    return NextResponse.json(res.data);
  } catch (error: unknown) {
    console.error('Error fetching product:', error);
    return NextResponse.error();
  }
}
