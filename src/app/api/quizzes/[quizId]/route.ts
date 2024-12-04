import dayjs from 'dayjs';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { NextResponse } from 'next/server';

import { db } from '@/app/db/firebaseConfig';
import { formDataToObject } from '@/share/utils/converter';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> },
) {
  try {
    const quizId = (await params).quizId;
    const docRef = doc(db, 'quizzes', quizId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data() || {};

    return NextResponse.json({
      data: {
        ...docData,
        createdDate: dayjs(docData.createdDate.toDate()).utc().format(),
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> },
) {
  try {
    const quizId = (await params).quizId;
    const formData = await request.formData();

    const { quiz } = formDataToObject(formData);
    const quizText = await quiz.text();
    const quizObject = JSON.parse(quizText);

    const quizRef = doc(db, 'quizzes', quizId);

    await updateDoc(quizRef, {
      ...quizObject,
    });

    return NextResponse.json({ data: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ quizId: string }> },
) {
  try {
    const quizId = (await params).quizId;

    await deleteDoc(doc(db, 'quizzes', quizId));

    return NextResponse.json({ data: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
