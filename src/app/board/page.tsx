import RequestsList from '@/components/RequestsList';
import { getRequests } from '../actions/requests';

export default async function Page() {
  const requests = await getRequests();

  if (requests.length === 0) {
    return null;
  }

  return <RequestsList requests={requests} />;
}
