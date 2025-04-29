export async function apiFetch(url: string, options: RequestInit = {}) {
  const accessToken = localStorage.getItem('accessToken');

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };
  options.credentials = 'include';

  let res = await fetch(url, options);

  if (res.status === 401) {
    const refreshRes = await fetch(
      `${import.meta.env.VITE_API_URL}/auth/refresh`,
      {
        method: 'POST',
        credentials: 'include',
      }
    );

    if (refreshRes.ok) {
      const { accessToken: newAccessToken } = await refreshRes.json();
      localStorage.setItem('accessToken', newAccessToken);

      options.headers = {
        Authorization: `Bearer ${newAccessToken}`,
        'Content-Type': 'application/json',
      };
      res = await fetch(url, options);
    } else {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
      throw new Error('Session expired');
    }
  }

  return res;
}
