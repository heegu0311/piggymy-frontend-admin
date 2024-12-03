import { addDoc, collection, getDocs } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '@/app/db/firebaseConfig';
import { formDataToObject } from '@/share/utils/converter';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const { thumbnail } = Object.fromEntries(formData);

    const { banner } = formDataToObject(formData);
    const bannerText = await banner.text();
    const bannerObject = JSON.parse(bannerText);

    if (thumbnail) {
      // 고유한 파일명을 생성
      const fileName = `${uuidv4()}.png`;
      const storageRef = ref(storage, `/banners/${fileName}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, thumbnail as Blob);
      const imagePath = await getDownloadURL(storageRef);
      const imageName = fileName;

      const res = await addDoc(collection(db, 'banners'), {
        ...bannerObject,
        imagePath,
        imageName,
      });

      return NextResponse.json({ data: { id: res.id } }, { status: 201 });
    } else {
      const res = await addDoc(collection(db, 'banners'), {
        ...bannerObject,
      });

      return NextResponse.json({ data: { id: res.id } }, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

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
