import { collection, doc, getDocs, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

import { db } from '@/app/db/firebaseConfig';

export const dynamic = 'force-dynamic';

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'greetings'));
  const greetings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json(greetings[0]);
}

export async function PUT(request: Request) {
  const { id, exposureDuration, message } = await request.json();

  const userDocRef = doc(db, 'greetings', id);

  await updateDoc(userDocRef, {
    exposureDuration,
    message,
  });

  return NextResponse.json({
    id,
    exposureDuration,
    message,
  });
}
