import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1";

export interface TestimonialPayload {
  userId: string;
  userRole: "CANDIDATE" | "RECRUITER";
  content: string;
  rating: number;
  meta?: string;
}

export async function getAllTestimonials() {
  const res = await axios.get(`${API_BASE_URL}/testimonials`);
  return res.data.data;
}

export async function postTestimonial(payload: TestimonialPayload) {
  const res = await axios.post(`${API_BASE_URL}/testimonials`, payload);
  return res.data.data;
}
