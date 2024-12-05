import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
  updateDoc,
} from 'firebase/firestore';
import { NextRequest, NextResponse } from 'next/server';

import { db } from '@/app/db/firebaseConfig';
import { fetchPaginatedData } from '@/share/firebase/firebase';
import { formDataToObject } from '@/share/utils/converter';
import { searchByKeyword } from '@/utils/algolia';

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const { quiz } = formDataToObject(formData);
    const quizText = await quiz.text();
    const quizObject = JSON.parse(quizText);
    const timestamp = Timestamp.fromDate(new Date());

    const res = await addDoc(collection(db, 'quizzes'), {
      ...quizObject,
      createdDate: timestamp,
    });

    return NextResponse.json({ data: { id: res.id } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = searchParams.get('page');
  const pageSize = searchParams.get('page_size');
  const searchKeyword = searchParams.get('search_keyword');

  const { results: algoliaResults } = await searchByKeyword(
    searchKeyword as string,
  );

  try {
    const data = await fetchPaginatedData(
      'quizzes',
      searchParams,
      +pageSize!,
      +pageNumber!,
      algoliaResults[0].hits,
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      data: { error: 'Failed to fetch paginated data' },
    });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const ids = url.searchParams.getAll('id');

    if (ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    await Promise.all(
      ids.map(async (id) => {
        await deleteDoc(doc(db, 'quizzes', id));
      }),
    );

    return NextResponse.json(
      { message: 'Resources deleted successfully', ids },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete resources' },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const url = new URL(request.url);
    const ids = url.searchParams.getAll('id');
    const body = await request.json();

    if (ids.length === 0) {
      return NextResponse.json({ error: 'No IDs provided' }, { status: 400 });
    }

    await Promise.all(
      ids.map(async (id) => {
        const quizRef = doc(db, 'quizzes', id);
        await updateDoc(quizRef, {
          [body.attr]: body.value,
        });
      }),
    );

    return NextResponse.json(
      { message: 'Resources deleted successfully', ids },
      { status: 200 },
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to patch resources' },
      { status: 500 },
    );
  }
}
