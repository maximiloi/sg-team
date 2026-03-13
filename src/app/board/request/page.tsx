import { getRequestsByStatus } from '@/actions/requests';
import RequestsByStatusList from '@/components/RequestsByStatusList';
import { RequestStatus } from '@/generated/prisma';

export default async function Page() {
  const newReq = await getRequestsByStatus(RequestStatus.NEW);
  const inProgress = await getRequestsByStatus(RequestStatus.IN_PROGRESS);
  const callbackClient = await getRequestsByStatus(RequestStatus.CALLBACK);
  const rejection = await getRequestsByStatus(RequestStatus.REJECTION);
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
        status={RequestStatus.CALLBACK}
        requests={callbackClient}
      />
      <RequestsByStatusList status={RequestStatus.DONE} requests={done} />
      <RequestsByStatusList
        status={RequestStatus.REJECTION}
        requests={rejection}
      />
      <RequestsByStatusList
        status={RequestStatus.CANCELLED}
        requests={cancelled}
      />
    </>
  );
}
