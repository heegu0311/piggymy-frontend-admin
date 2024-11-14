import { useQuery } from '@tanstack/react-query';

import axiosInstance from '../axios';

interface GetGreetingResponse {
  message: string;
  exposureDuration: string[];
}

export const getGreeting = async () => {
  const response =
    await axiosInstance.get<GetGreetingResponse>(`/api/greetings`);

  return response;
};

export function useGetGreeting() {
  return useQuery({
    queryKey: ['greetings'],
    queryFn: () => getGreeting(),
  });
}
