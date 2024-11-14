import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    exposureDuration: [dayjs().format(), dayjs().add(1, 'M').format()],
    message: '안녕하세요 피기미입니다!',
  });
}

export async function POST(request: Request) {
  const { exposureDuration, message } = await request.json();

  return NextResponse.json({
    message,
    exposureDuration,
  });
}
