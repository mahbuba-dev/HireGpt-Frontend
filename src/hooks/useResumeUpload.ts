import { useMutation } from '@tanstack/react-query';
import { uploadResume } from '@/src/services/resume.service';

export function useResumeUpload() {
  return useMutation({
    mutationFn: (formData: FormData) => uploadResume(formData).then(res => res.data),
  });
}
