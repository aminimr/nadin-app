<template>
    <div class="shadow wheather-card">
        <div class="wheather-city">
            <span>Tehran</span>
            <div> {{ date }} mostly sunny</div>
        </div>
        <div>
            <div style="font-size: 64px">{{ temp }}c</div>
        </div>
    </div>
</template>

<script setup>
import dayjs from "dayjs";

const date = dayjs().format('DDMMMM H:MMa ')
defineProps({
    temp: {
        type: Number,
        default: 13
    }
})
</script>

<style scoped lang="scss">
.wheather-card {
  max-width: 240px;
  min-height: 240px;
  padding: 20px;
  border-radius: 6px;

  .wheather-city {
    span {
      font-size: 24px;
    }

    div {

    }
  }

  p {
    font-size: 24px;
    font-weight: bold;
  }
}
</style>