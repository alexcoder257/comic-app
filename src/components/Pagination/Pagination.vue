<template>
  <div class="pagination">
    <ul>
      <li :class="['prev', { disabled: showLeft }]">
        <button type="button" @click="clickLeft">prev</button>
      </li>
      <template v-for="number in pageNumbers" :key="number">
        <li :class="isCurrentPage(number)">
          <button type="button" @click="clickPage(number)">
            {{ number }}
          </button>
        </li>
      </template>
      <li :class="['next', { disabled: showRight }]">
        <button type="button" @click="clickRight">next</button>
      </li>
    </ul>
  </div>
</template>
  <script setup lang="ts">
import { useVModel } from "@vueuse/core";
import { computed } from "vue";

const props = withDefaults(
  defineProps<{
    modelValue: number;
    totalPages: number;
    displayPageNum?: number;
  }>(),
  { modelValue: 1, totalPages: 10, displayPageNum: 10 }
);

const emits = defineEmits<{
  (e: "update:modelValue", v: number): void;
}>();

const modelData = useVModel(props, "modelValue", emits);

const showLeft = computed((): boolean => modelData.value <= 1);

const showRight = computed((): boolean => modelData.value >= props.totalPages);

const startPage = computed(
  (): number =>
    Math.floor((modelData.value - 1) / props.displayPageNum) *
      props.displayPageNum +
    1
);

const pageNumbers = computed((): number[] => {
  const numbers: number[] = [];
  for (
    let i = startPage.value;
    i < startPage.value + props.displayPageNum && props.totalPages >= i;
    i++
  ) {
    numbers.push(i);
  }
  return numbers;
});

function isCurrentPage(number: number): string {
  return number === modelData.value ? "active" : "";
}

function clickPage(pageNum: number): void {
  modelData.value = pageNum;
}

function clickLeft(): void {
  if (modelData.value > 1) {
    modelData.value--;
  }
}

function clickRight(): void {
  if (modelData.value < props.totalPages) {
    console.log("data", modelData.value);
    console.log("total page", props.totalPages);
    modelData.value++;
  }
}
</script>
  