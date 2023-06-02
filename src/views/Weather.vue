<script setup lang="ts">
import cities from '@/models/locations.json'
import {ref, computed, watch} from 'vue'
import {getWeatherByLatLng, WeatherModel} from "@/services/weatherService";

//#regioncity dropdown
const searchTerm = ref('')
const loading = ref(false)
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

async function doSearch(term: string) {
    searchTerm.value = term
}

//#endregion

//#region weather
const currentWeather = ref<WeatherModel | null>(null)

watch(selectedCity, async () => {
    if (!selectedCityObject.value) return
    const {lng, lat} = selectedCityObject.value
    loading.value = true
    getWeatherByLatLng({latitude: lng, longitude: lat}).then(weather => {
        currentWeather.value = weather
    }).finally(()=> {
        loading.value = false
    })
})
//#endregion
</script>

<template>
    <page-wrapper :title="$t('pages.weather')">
        <div style="width: 500px; max-width: 100%">
            <a-form>
                <a-form-item
                        :label="$t('weather.label')"
                        ref="fullName"
                        name="fullName">
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
                </a-form-item>
            </a-form>
            <a-spin v-if="loading" />
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
                            {{ currentWeather.formatTime }}
                        </p>
                        <p class="content-info">
                            <a-switch :checked="currentWeather.is_day===1" checked-children="Day"
                                      un-checked-children="Night"/>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </page-wrapper>
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