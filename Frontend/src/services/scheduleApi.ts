import axios from 'axios';

export const generateSchedule = async (userInput: any) => {
  // Call your backend endpoint that uses DeepSeek
  const { data } = await axios.post(
    process.env.EXPO_PUBLIC_BACKEND_URL + '/api/schedule/generate',
    userInput
  );
  return data;
};
