import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

import { db } from '@/app/db/firebaseConfig';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bannerId: string }> },
) {
  const bannerId = (await params).bannerId;
  const docRef = doc(db, 'banners', bannerId);
  const docSnap = await getDoc(docRef);

  return NextResponse.json({
    data: docSnap.data(),
  });
}
