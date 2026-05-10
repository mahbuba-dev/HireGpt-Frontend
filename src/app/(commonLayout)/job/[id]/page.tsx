
import { notFound } from "next/navigation";


import JobDetails from "@/components/modules/JobsAction/JobDetails";
import { getUserInfo } from "@/src/services/auth.services";
import { getJobById } from "@/src/services/job.service";


export const dynamic = "force-dynamic";
export const revalidate = 0;


const JobDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  try {
    const [jobResponse, currentUser] = await Promise.all([
      getJobById(id),
      getUserInfo(),
    ]);

    return (
      <JobDetails
        job={jobResponse.data}
        isLoggedIn={Boolean(currentUser)}
        userRole={currentUser?.role ?? null}
      />
    );
  } catch {
    notFound();
  }
};

export default JobDetailsPage;