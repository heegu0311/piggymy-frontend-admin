import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '@/app/db/firebaseConfig';

export async function GET() {
  const querySnapshot = await getDocs(collection(db, 'banners'));
  const banners = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return NextResponse.json({
    data: { list: banners, totalCount: banners.length },
  });
}

function formDataToObject(formData: FormData): Record<string, any> {
  const obj: Record<string, any> = {};

  formData.forEach((value, key) => {
    if (obj[key]) {
      if (Array.isArray(obj[key])) {
        obj[key].push(value);
      } else {
        obj[key] = [obj[key], value];
      }
    } else {
      obj[key] = value;
    }
  });

  return obj;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const { thumbnail } = Object.fromEntries(formData);

    const { banner } = formDataToObject(formData);
    const bannerText = await banner.text();
    const bannerObject = JSON.parse(bannerText);

    // 고유한 파일명을 생성
    const fileName = `${uuidv4()}.png`;
    const storageRef = ref(storage, `/banners/${fileName}`);

    // 'file' comes from the Blob or File API
    const snapshot = await uploadBytes(storageRef, thumbnail as Blob);
    const imagePath = await getDownloadURL(storageRef);

    await addDoc(collection(db, 'banners'), {
      ...bannerObject,
      imagePath,
    });

    return NextResponse.json({ data: snapshot }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
