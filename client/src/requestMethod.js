import axios from 'axios';

const BASE = 'http://localhost:5000/api';
const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZTkyNGQ2MTI0ZTc2MzVjYmM5ZWNiZiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NjgzNjgzNiwiZXhwIjoxNjc3NDQxNjM2fQ.Ku8oGRnLt0Jg2mD1GI2MXeo4t2Nx_dMk0InMz8tReg4';

export const publicRequest = axios.create({
  baseURL: BASE,
});

export const userRequest = axios.create({
  baseURL: BASE,
  header: {
    token: `Bearer ${TOKEN}`
  }
})