import axios from 'axios';

import type { Sushi } from '../types';

// import instance from './instance';

const basicUrl = 'http://localhost:5173/sushi.json';

interface ApiResponse {
  data: Sushi[];
  status: number;
}

interface ApiError {
  message: string;
  status: number;
}
