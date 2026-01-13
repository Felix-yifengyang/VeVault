import request from '@/utils/request';

export interface AnalyzeResponse {
  message: string;
  url: string;
}

export const analyzeMusicUrl = (url: string) => {
  return request.post<any, AnalyzeResponse>('/music/analyze', { url });
};