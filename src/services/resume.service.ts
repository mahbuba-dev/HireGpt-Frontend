import { httpClient } from '@/src/lib/axious/httpClient';

// Upload resume (Cloudinary endpoint)
export async function uploadResume(formData: FormData) {
  return httpClient.post('/jobs/applications/upload-resume', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
}
