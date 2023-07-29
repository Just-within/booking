import { getAccessToken } from '@/utils';

export const queryHeaders = { 
  'Access-Control-Allow-Origin': '*',
  Authorization: `Bearer ${getAccessToken()}`
};