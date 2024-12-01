export function buildQueryString(params: {
  [key: string]: string | boolean | number;
}) {
  return Object.keys(params)
    .filter(
      (key) =>
        params[key] !== undefined && params[key] !== null && params[key] !== '',
    )
    .map(
      (key) => encodeURIComponent(key) + '=' + encodeURIComponent(params[key]),
    )
    .join('&');
}

export function buildQueryStringForIds(ids: number[]) {
  return ids.map((id) => `id=${id}`).join('&');
}
