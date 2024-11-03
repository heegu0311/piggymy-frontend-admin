import dayjs from 'dayjs';
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/members/login', () => {
    return HttpResponse.json(
      { data: { accessToken: '1231', refreshToken: '1231' } },
      {
        headers: {
          'Set-Cookie': 'connect.sid=msw-cookie;HttpOnly;Path=/',
        },
      },
    );
  }),
  http.post('/api/greetings', () => {
    return HttpResponse.json({
      data: {
        message: 'string',
        exposureStartDate: dayjs(),
        exposureEndDate: dayjs(),
      },
    });
  }),
];
