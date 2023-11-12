const base = 'http://5.189.177.199:5000';

export const getUrl = (path: string) => `${base}${path}`;

export const localFetch = (path: string) => {
  const url = getUrl(path);
  console.log(url);
  return fetch(getUrl(path), {
    method: 'GET',
    headers: {
      Authorization: 'jurgisCodesMobile',
    },
  });
};
