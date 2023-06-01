import {useApi} from '@/utils/ServiceProvider'

export type Coordinates = {
    latitude: number | string,
    longitude: number | string
}

export async function getWeatherByLatLng(args: Coordinates) {
    const api = useApi()
    return api.http.get(`?latitude=${args.latitude}&longitude=${args.longitude}&current_weather=true`)
}