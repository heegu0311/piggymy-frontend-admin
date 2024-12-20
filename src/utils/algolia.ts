import { searchClient } from '@algolia/client-search';

const client = searchClient(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY as string,
);

export async function searchByKeyword(
  index: string,
  keyword: string,
): Promise<any> {
  return await client.search({
    requests: [
      {
        indexName: index,
        query: keyword,
      },
    ],
  });
}
