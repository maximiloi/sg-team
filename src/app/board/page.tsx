import RequestsByStatusList from '@/components/RequestsByStatusList';
import { RequestStatus } from '@/generated/prisma';
import { getRequestsByStatus } from '../actions/requests';

export default async function Page() {
  const newReq = await getRequestsByStatus(RequestStatus.NEW);
  const inProgress = await getRequestsByStatus(RequestStatus.IN_PROGRESS);
  const postponed = await getRequestsByStatus(RequestStatus.POSTPONED);
  const confirmed = await getRequestsByStatus(RequestStatus.CONFIRMED);
  const done = await getRequestsByStatus(RequestStatus.DONE);
  const cancelled = await getRequestsByStatus(RequestStatus.CANCELLED);

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
      <RequestsByStatusList status={RequestStatus.DONE} requests={done} />
      <RequestsByStatusList
        status={RequestStatus.CANCELLED}
        requests={cancelled}
      />
    </>
  );
}
