import dayjs from 'dayjs';
import {
  collection,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore';

const db = getFirestore();

export const fetchPaginatedData = async (
  searchParams: URLSearchParams,
  pageSize: number,
  pageNumber: number,
) => {
  const startDate = searchParams.get('start_date');
  const endDate = searchParams.get('end_date');
  const isUse = searchParams.get('is_use');

  const filters = [
    orderBy('createdDate'),
    ...(startDate
      ? [where('createdDate', '>=', Timestamp.fromDate(new Date(startDate)))]
      : []),
    ...(endDate
      ? [where('createdDate', '<=', Timestamp.fromDate(new Date(endDate)))]
      : []),
    ...(isUse ? [where('isUse', '==', isUse === 'true')] : []),
    limit(Number(pageSize)),
  ];

  const collectionRef = collection(db, 'vocas');
  let q = query(collectionRef, ...filters, limit(Number(pageSize)));

  // 특정 페이지로 이동하기 위해 필요한 커서를 계산
  const cursors = [];
  for (let i = 1; i < +pageNumber!; i++) {
    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    if (!lastVisible) break; // 더 이상 데이터가 없으면 종료
    cursors.push(lastVisible);
    q = query(
      collectionRef,
      ...filters,
      limit(Number(pageSize)),
      startAfter(lastVisible),
    );
  }

  // 최종 쿼리 실행
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => {
    const docData = doc.data();
    return {
      id: doc.id,
      ...docData,
      createdDate: dayjs(docData.createdDate.toDate()).utc().format(),
    };
  });
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const countSnapShot = await getCountFromServer(collectionRef);

  return {
    data: { list: data, totalCount: countSnapShot.data().count },
    lastCursor: lastVisible ? JSON.stringify(lastVisible) : null,
    currentPage: Number(pageNumber),
  };
};
