<script setup>
import {useAuthStore} from "@/stores/auth.ts";
import {useI18n} from "vue-i18n";
import TimeStatus from '@/components/TimeStatus.vue'
import dayjs from "dayjs";
import {getCurrentTimeStatus} from "@/utils/DateTimeHelper";

const time = dayjs().format('H:mm')
const dayStatus = getCurrentTimeStatus()

const auth = useAuthStore()
const {t} = useI18n()

const displayMessage = t('messages.greeting', {
    status: t(`common.${dayStatus}`),
    username: auth.displayName
})
</script>

<template>
    <div class="content-page">
        <div class="center dashboard">
            <div class="time">{{ time }}</div>
            <div class="greeting">
                <TimeStatus/>&nbsp;{{ displayMessage }}
            </div>
        </div>
    </div>

</template>
<style lang="scss">
.dashboard {
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  max-width: 100%;

  .time {
    font-size: 64px;
    font-weight: bold;
    line-height: 1;
    margin-bottom: 24px;
  }

  .greeting {
    font-size: 28px;
    align-items: center;
    vertical-align: middle;
    display: flex;
    background-color: #eee;
    padding: 4px 8px;
    border-radius: 4px;
    font-weight: 500;
  }
}
</style>