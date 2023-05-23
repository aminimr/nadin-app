<script setup>
import {useThemeStore} from "@/stores/theme.js";
import {useAuthStore} from "@/stores/auth.js";
import {computed, ref} from "vue";
import TimeStatus from '@/components/TimeStatus.vue'
import dayjs from "dayjs";

const authStore = useAuthStore()
const username = authStore.userInfo?.username
const time = dayjs().format('H:mm')

const date = new Date;
let hours = date.getHours();
let dayStatus =
    (hours < 12) ? "Morning" :
        ((hours <= 18 && hours >= 12) ? "Afternoon" :
            "Evening");

</script>

<template>
    <div class="content-page">
        <div class="center dashboard">
            <div class="time">{{ time }}</div>
            <div class="greeting">
                <TimeStatus/>&nbsp;{{ $t('messages.greeting', {status: $t(`common.${dayStatus}`), username}) }}
            </div>
        </div>
    </div>

  <!--    <div>-->
  <!--        <a-button type="primary" @click="changeTheme('dark')">DARK</a-button>-->
  <!--        &nbsp;|&nbsp;-->
  <!--        <a-button type="primary" @click="changeTheme('blue')">BLUE</a-button>-->
  <!--        &nbsp;|&nbsp;-->
  <!--        <a-button type="primary" @click="changeTheme('light')">LIGHT</a-button>-->
  <!--    </div>-->
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

    .time-format {

    }
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