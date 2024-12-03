import dayjs from 'dayjs';
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
  { params }: { params: Promise<{ vocaId: string }> },
) {
  try {
    const vocaId = (await params).vocaId;
    const docRef = doc(db, 'vocas', vocaId);
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
  { params }: { params: Promise<{ vocaId: string }> },
) {
  try {
    const vocaId = (await params).vocaId;
    const formData = await request.formData();

    const { thumbnail } = Object.fromEntries(formData);

    const { voca } = formDataToObject(formData);
    const vocaText = await voca.text();
    const vocaObject = JSON.parse(vocaText);

    const vocaRef = doc(db, 'vocas', vocaId);

    if (thumbnail) {
      if (vocaObject.imagePath && vocaObject.imageName) {
        // Delete the file
        const storageRef = ref(storage, `/vocas/${vocaObject.imageName}`);
        await deleteObject(storageRef);
      }

      // 고유한 파일명을 생성
      const fileName = `${uuidv4()}.png`;
      const storageRef = ref(storage, `/vocas/${fileName}`);

      // 'file' comes from the Blob or File API
      await uploadBytes(storageRef, thumbnail as Blob);
      const imagePath = await getDownloadURL(storageRef);

      await updateDoc(vocaRef, {
        ...vocaObject,
        imagePath,
        imageName: fileName,
      });

      return NextResponse.json({ data: null }, { status: 200 });
    } else {
      if (!vocaObject.imagePath && !!vocaObject.imageName) {
        const storageRef = ref(storage, `/vocas/${vocaObject.imageName}`);
        await deleteObject(storageRef);

        await updateDoc(vocaRef, {
          ...vocaObject,
          imagePath: '',
          imageName: '',
        });
      } else {
        await updateDoc(vocaRef, {
          ...vocaObject,
        });
      }

      return NextResponse.json({ data: null }, { status: 200 });
    }
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ vocaId: string }> },
) {
  try {
    const vocaId = (await params).vocaId;

    await deleteDoc(doc(db, 'vocas', vocaId));

    return NextResponse.json({ data: null }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
