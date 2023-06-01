<template>
    <section id="page-wrapper" :class="{padding}">
        <h1 class="page-title">{{ title }}</h1>
        <div class="page-content">
            <slot/>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps({
    title: String,
    padding: {
        type: Boolean,
        default: true
    }
})
</script>
<style lang="scss">
#page-wrapper {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  max-height: 100%;

  &.padding {
    padding: 24px;
  }

  .page-title {
    font-size: 30px;
    display: block;
    width: 100%;
    text-align: start;
    font-weight: bold;
    margin-bottom: 24px;
    flex: 0 0 auto;
  }

  .page-content {
    flex: 1 1 100%;
    overflow: auto;
    max-height: 100%;
    min-height: 0;
  }
}
</style>