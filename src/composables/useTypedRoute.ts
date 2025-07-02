// core
import { useRoute } from 'vue-router';

export function useTypedRoute<T>() {
  return useRoute() as ReturnType<typeof useRoute> & { params: T };
}
