import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 20, // number of virtual users
  duration: '10s', // test duration
};

export default function () {
  const url = 'https://reqres.in/api/users?page=1';
  const headers = { 'x-api-key': 'reqres-free-v1' };
  let res = http.get(url, { headers });
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response has data': (r) => JSON.parse(r.body).data !== undefined,
  });
  sleep(1);
}
