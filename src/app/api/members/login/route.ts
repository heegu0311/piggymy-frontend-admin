import { doc, getDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

import { db } from '@/app/db/firebaseConfig';

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const docRef = doc(db, 'users', 'hopArS03qml5yphJJfar');
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    if (data.id === userData?.id && data.pw === userData?.pw) {
      return NextResponse.json({ message: 'logged in', data: userData });
    }
  } catch (e) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
