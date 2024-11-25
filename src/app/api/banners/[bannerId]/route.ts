import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

import { db, storage } from '@/app/db/firebaseConfig';
import { formDataToObject } from '@/share/utils/converter';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ bannerId: string }> },
) {
  try {
    const bannerId = (await params).bannerId;
    const docRef = doc(db, 'banners', bannerId);
    const docSnap = await getDoc(docRef);

    return NextResponse.json({
      data: docSnap.data(),
    });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ bannerId: string }> },
) {
  try {
    const bannerId = (await params).bannerId;
    const formData = await request.formData();

    const { thumbnail } = Object.fromEntries(formData);

    const { banner } = formDataToObject(formData);
    const bannerText = await banner.text();
    const bannerObject = JSON.parse(bannerText);

    const bannersRef = doc(db, 'banners', bannerId);

    console.log(thumbnail);
    if (thumbnail) {
      console.log('unage;', bannerObject.imagePath, bannerObject.imageName);
      if (bannerObject.imagePath && bannerObject.imageName) {
        // Delete the file
        const storageRef = ref(storage, `/banners/${bannerObject.imageName}`);
        await deleteObject(storageRef);
      }

      // 고유한 파일명을 생성
      const fileName = `${uuidv4()}.png`;
      const storageRef = ref(storage, `/banners/${fileName}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, thumbnail as Blob);
      const imagePath = await getDownloadURL(storageRef);

      await updateDoc(bannersRef, {
        ...bannerObject,
        imagePath,
        imageName: fileName,
      });

      return NextResponse.json({ data: null }, { status: 200 });
    } else {
      await updateDoc(bannersRef, {
        ...bannerObject,
      });

      return NextResponse.json({ data: null }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ bannerId: string }> },
) {
  try {
    const bannerId = (await params).bannerId;

    await deleteDoc(doc(db, 'banners', bannerId));

    return NextResponse.json({ data: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
