import RequestsByStatusList from '@/components/RequestsByStatusList';
import { RequestStatus } from '@/generated/prisma';
import { getRequestsByStatus } from '../actions/requests';

export default async function Page() {
  const newReq = await getRequestsByStatus(RequestStatus.NEW);
  const inProgress = await getRequestsByStatus(RequestStatus.IN_PROGRESS);
  const postponed = await getRequestsByStatus(RequestStatus.POSTPONED);
  const confirmed = await getRequestsByStatus(RequestStatus.CONFIRMED);

  return (
    <>
      <RequestsByStatusList status={RequestStatus.NEW} requests={newReq} />
      <RequestsByStatusList
        status={RequestStatus.IN_PROGRESS}
        requests={inProgress}
      />
      <RequestsByStatusList
        status={RequestStatus.POSTPONED}
        requests={postponed}
      />
      <RequestsByStatusList
        status={RequestStatus.CONFIRMED}
        requests={confirmed}
      />
    </>
  );
}
