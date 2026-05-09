import React, { useState } from "react";
import { useUpdateRecruiter } from "@/src/hooks/useRecruiters";
import type { Recruiter, UpdateRecruiterPayload } from "@/src/types/recruiter.types";

interface RecruiterEditFormProps {
  recruiter: Recruiter;
  onSuccess?: () => void;
}

export const RecruiterEditForm: React.FC<RecruiterEditFormProps> = ({ recruiter, onSuccess }) => {
  const [form, setForm] = useState<UpdateRecruiterPayload>({
    fullName: recruiter.fullName,
    email: recruiter.email,
    phone: recruiter.phone,
    bio: recruiter.bio,
    companyName: recruiter.companyName,
    designation: recruiter.designation,
    experience: recruiter.experience,
    hiringBudget: recruiter.hiringBudget,
    profilePhoto: recruiter.profilePhoto || undefined,
  });
  const { mutate, isPending } = useUpdateRecruiter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(
      { recruiterId: recruiter.id, payload: form },
      { onSuccess }
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg mx-auto">
      <input
        name="fullName"
        value={form.fullName || ""}
        onChange={handleChange}
        placeholder="Full Name"
        className="input input-bordered w-full"
      />
      <input
        name="email"
        value={form.email || ""}
        onChange={handleChange}
        placeholder="Email"
        className="input input-bordered w-full"
        type="email"
      />
      <input
        name="phone"
        value={form.phone || ""}
        onChange={handleChange}
        placeholder="Phone"
        className="input input-bordered w-full"
      />
      <input
        name="companyName"
        value={form.companyName || ""}
        onChange={handleChange}
        placeholder="Company Name"
        className="input input-bordered w-full"
      />
      <input
        name="designation"
        value={form.designation || ""}
        onChange={handleChange}
        placeholder="Designation"
        className="input input-bordered w-full"
      />
      <input
        name="experience"
        value={form.experience?.toString() || ""}
        onChange={handleChange}
        placeholder="Experience (years)"
        className="input input-bordered w-full"
        type="number"
      />
      <input
        name="hiringBudget"
        value={form.hiringBudget?.toString() || ""}
        onChange={handleChange}
        placeholder="Hiring Budget"
        className="input input-bordered w-full"
        type="number"
      />
      <textarea
        name="bio"
        value={form.bio || ""}
        onChange={handleChange}
        placeholder="Bio"
        className="textarea textarea-bordered w-full"
      />
      <button
        type="submit"
        className="btn btn-primary w-full"
        disabled={isPending}
      >
        {isPending ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default RecruiterEditForm;
