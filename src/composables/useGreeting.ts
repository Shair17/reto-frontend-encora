// core
import { ref, onMounted, onUnmounted } from 'vue';

export function useGreeting() {
  const today = ref(new Date());
  const greeting = ref(getGreeting(today.value));

  let intervalId: ReturnType<typeof setInterval>;

  function updateDate() {
    today.value = new Date();
    greeting.value = getGreeting(today.value);
  }

  function getGreeting(date: Date): string {
    const hour = date.getHours();
    if (hour < 12) return 'Buenos días';
    if (hour < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  onMounted(() => {
    intervalId = setInterval(updateDate, 60 * 60 * 1000);
  });

  onUnmounted(() => {
    clearInterval(intervalId);
  });

  return greeting;
}
