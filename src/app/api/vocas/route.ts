import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '@/app/db/firebaseConfig';
import { fetchPaginatedData } from '@/share/firebase/firebase';
import { formDataToObject } from '@/share/utils/converter';

dayjs.extend(utc);
dayjs.extend(timezone);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const { thumbnail } = Object.fromEntries(formData);

    const { voca } = formDataToObject(formData);
    const vocaText = await voca.text();
    const vocaObject = JSON.parse(vocaText);
    const timestamp = Timestamp.fromDate(new Date());

    if (thumbnail) {
      // 고유한 파일명을 생성
      const fileName = `${uuidv4()}.png`;
      const storageRef = ref(storage, `/vocas/${fileName}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, thumbnail as Blob);
      const imagePath = await getDownloadURL(storageRef);
      const imageName = await getDownloadURL(storageRef);

      const res = await addDoc(collection(db, 'vocas'), {
        ...vocaObject,
        createdDate: timestamp,
        imagePath,
        imageName,
      });

      return NextResponse.json({ data: { id: res.id } }, { status: 201 });
    } else {
      const res = await addDoc(collection(db, 'vocas'), {
        ...vocaObject,
        createdDate: timestamp,
      });

      return NextResponse.json({ data: { id: res.id } }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = searchParams.get('page');
  const pageSize = searchParams.get('page_size');

  try {
    const data = await fetchPaginatedData(
      searchParams,
      +pageSize!,
      +pageNumber!,
    );
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({
      data: { error: 'Failed to fetch paginated data' },
    });
  }
}
