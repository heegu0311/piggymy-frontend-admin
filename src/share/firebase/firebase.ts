import {
  collection,
  getCountFromServer,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore';

const db = getFirestore();

export const fetchPaginatedData = async (
  searchParams: URLSearchParams,
  pageSize: number,
  pageNumber: number,
) => {
  const collectionRef = collection(db, 'vocas');
  let q = query(collectionRef, orderBy('createdDate'), limit(Number(pageSize)));

  // 특정 페이지로 이동하기 위해 필요한 커서를 계산
  const cursors = [];
  for (let i = 1; i < +pageNumber!; i++) {
    const snapshot = await getDocs(q);
    const lastVisible = snapshot.docs[snapshot.docs.length - 1];
    if (!lastVisible) break; // 더 이상 데이터가 없으면 종료
    cursors.push(lastVisible);
    q = query(
      collectionRef,
      orderBy('createdDate'),
      where('createdDate', '>=', searchParams.get('start_date')),
      where('createdDate', '<=', searchParams.get('end_date')),
      startAfter(lastVisible),
      limit(Number(pageSize)),
    );
  }

  // 최종 쿼리 실행
  const snapshot = await getDocs(q);
  const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const countSnapShot = await getCountFromServer(collectionRef);

  return {
    data: { list: data, totalCount: countSnapShot.data().count },
    lastCursor: lastVisible ? JSON.stringify(lastVisible) : null,
    currentPage: Number(pageNumber),
  };
};
