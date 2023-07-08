export function getAccessToken() {
  if (typeof window !== 'undefined') {
    return window?.localStorage?.getItem('ACCESS_TOKEN');
  } else {
    return ''
  }
}