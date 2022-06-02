import { useRoute } from 'vue-router';

export const a = () => {
  const route = useRoute();
  route.params.clockId;
};
