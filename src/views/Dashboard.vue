<script setup>
import {useAuthStore} from "@/stores/auth.ts";
import {useI18n} from "vue-i18n";
import TimeStatus from '@/components/TimeStatus.vue'
import dayjs from "dayjs";
import {getCurrentTimeStatus} from "@/utils/DateTimeHelper";
import PageWrapper from "@/components/PageWrapper.vue";

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
    <page-wrapper :title="$t('pages.dashboard')">
        <div class="dashboard">
            <div style="margin-bottom: 24px"><span class="time">{{ time }}</span></div>
            <div>
                <div class="greeting">
                    <TimeStatus/>&nbsp;{{ displayMessage }}
                </div>
            </div>
        </div>
    </page-wrapper>

</template>
<style lang="scss">
.dashboard {

  .time {
    font-size: 64px;
    font-weight: bold;
    line-height: 1;
  }

  .greeting {
    font-size: 28px;
    align-items: center;
    vertical-align: middle;
    display: inline-flex;
    background-color: #eee;
    padding: 8px 16px;
    border-radius: 4px;
    font-weight: 500;
  }
}
</style>