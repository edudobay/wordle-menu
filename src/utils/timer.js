import { computed, onMounted, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

/**
 * @param {dayjs.Dayjs} resetTime
 */
export function useTimer(resetTime) {
  const now = ref(dayjs());

  onMounted(() => {
    const timer = setInterval(() => {
      now.value = dayjs();
    }, 1000);

    onUnmounted(() => {
      clearInterval(timer);
    });
  });

  function formatted(diff) {
    return dayjs.duration(diff, 'seconds').format('HH:mm:ss');
  }

  return computed(() => formatted(resetTime.diff(now.value, 'seconds')));
}
