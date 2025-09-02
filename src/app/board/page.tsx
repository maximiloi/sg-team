import RequestsByStatusList from '@/components/RequestsByStatusList';
import { RequestStatus } from '@/generated/prisma';
import { getRequestsByStatus } from '../../actions/requests';

export default async function Page() {
  const newReq = await getRequestsByStatus(RequestStatus.NEW);
  const inProgress = await getRequestsByStatus(RequestStatus.IN_PROGRESS);

  return (
    <>
      <RequestsByStatusList status={RequestStatus.NEW} requests={newReq} />
      <RequestsByStatusList
        status={RequestStatus.IN_PROGRESS}
        requests={inProgress}
      />
    </>
  );
}
