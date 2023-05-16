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

// export const FoodService = {
//   async getAll(): Promise<ApiResponse | ApiError> {
//     try {
//       const { data } = await axios.get<ApiResponse>(basicUrl, {
//         headers: {
//           'Content-type': 'application/json',
//         },
//       });

//       return data;
//     } catch (error) {
//       return {
//         message: error.message,
//         status: error.response.status,
//       };
//     }
//   },
// };
