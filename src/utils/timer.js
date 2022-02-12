import { computed, onMounted, onUnmounted, ref } from 'vue';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import countdown from 'countdown';

dayjs.extend(duration);

/**
 * @param {dayjs.Dayjs} resetTime
 */
export function useTimer(resetTime) {
  const timeLeft = ref();

  onMounted(() => {
    const timer = countdown(
      (timespan) => {
        timeLeft.value = timespan;
      },
      resetTime.toDate(),
      countdown.HOURS | countdown.MINUTES,
      1
    )

    onUnmounted(() => {
      clearInterval(timer);
    });
  });

  return computed(() => timeLeft.value?.toString());
}
