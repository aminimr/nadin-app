import {useApi} from '@/utils/ServiceProvider'
import {formatDate} from "@/utils/DateTimeHelper";

export type Coordinates = {
    latitude: number | string,
    longitude: number | string
}

export type WeatherModel = {
    temperature: number,
    windspeed: number,
    winddirection: number,
    weathercode: number,
    is_day: number,
    time: string,
    formatTime: string
}

export async function getWeatherByLatLng(args: Coordinates) {
    const api = useApi()
    try {
        const {data} = await api.http.get(`?latitude=${args.latitude}&longitude=${args.longitude}&current_weather=true`)
        const weather = data.current_weather as WeatherModel
        weather.formatTime = formatDate(new Date(weather.time))
        return Promise.resolve(weather)
    } catch (ex) {
        return Promise.reject(ex)
    }
}