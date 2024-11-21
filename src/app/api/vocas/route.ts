import { collection, getDocs } from 'firebase/firestore';
import { NextResponse } from 'next/server';

import { db } from '@/app/db/firebaseConfig';

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'vocas'));
  const vocas = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({ data: { list: vocas } });
}
