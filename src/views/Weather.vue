<script setup lang="ts">
import cities from '@/models/locations.json'
import {ref, computed, watch} from 'vue'
import axios from "axios";
import dayjs from "dayjs";

const searchTerm = ref('')
const optimizedOptions = computed(() => cities
    .map(c => c.city)
    .filter(city => {
        if (searchTerm.value !== '') return true

        const label = `${city}`.toUpperCase()
        return label.indexOf(`${searchTerm.value}`.toUpperCase()) > -1
    }))
const selectedCity = ref(null)
const selectedCityObject = computed(() => {
    if (!selectedCity.value) return null

    return cities.find(c => c.city === selectedCity.value)
})
const currentWeather = ref(null)
const weatherDateFormat = computed(() => {
    if (!currentWeather.value) return ''

    const dt = currentWeather.value.time
    return dayjs(new Date(dt)).format('LLLL')
})

async function doSearch(term: string) {
    searchTerm.value = term
}

watch(selectedCity, async () => {
    if (!selectedCityObject.value) return
    try {
        const {lng, lat} = selectedCityObject.value
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true`
        const {data} = await axios.get(url)
        currentWeather.value = data.current_weather
    } catch (ex) {
        console.log(ex)
    }
})

</script>

<template>
    <div class="content-page">
        <div style="width: 700px; max-width: 100%;">
            <div>
                <a-select
                        v-model:value="selectedCity"
                        :placeholder="$t('weather.placeholder')"
                        style="width: 200px"
                        show-arrow
                        show-search
                        @search="doSearch"
                >
                    <a-select-option
                            v-for="city in optimizedOptions"
                            :key="city"
                            :value="city"
                    />
                </a-select>
            </div>
            <a-divider v-if="!!selectedCityObject && !!currentWeather"/>
            <div v-if="!!selectedCityObject && !!currentWeather">
                <div class="ant-statistic weather-widget">
                    <div class="ant-statistic-title">
                        {{ `${selectedCityObject.country} / ${selectedCityObject.city}` }}
                    </div>
                    <div class="ant-statistic-content">
                        <span
                                class="ant-statistic-content-value"><span class="content-temperature">
                            {{
                            currentWeather.temperature
                            }}<small class="suffix">°C</small>
                        </span></span>
                        <p class="content-info">
                            wind:&nbsp;{{ currentWeather.windspeed }}&nbsp;km/h
                        </p>
                        <p class="content-info">
                            {{ weatherDateFormat }}
                        </p>
                        <p class="content-info">
                            <a-switch :checked="currentWeather.is_day===1" checked-children="Day"
                                      un-checked-children="Night"/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.weather-widget {
  .ant-statistic-title {
    display: block;
    font-size: 36px;
  }

  .content-temperature {
    display: inline-flex;
    font-size: 48px;
    font-weight: bold;
    align-items: center;
    line-height: normal;
    margin-bottom: 8px;

    .suffix {
      font-size: 22px;
      line-height: 1;
      color: #777;
      margin-top: -10px;
      font-weight: normal;
    }
  }

  .content-info {
    display: block;
    width: 100%;
    margin-top: 2px;
    margin-bottom: 8px;
    font-size: 16px;
    color: #777;
    line-height: normal;
    letter-spacing: 1px;
  }
}
</style>