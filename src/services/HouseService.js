import { AppState } from "../AppState.js";
import { api } from "./AxiosService.js";
import { House } from "../Models/House.js";



class HousesService{ 
    async editHouse(houseData){ 
        let res = await api.put(`/houses/${houseData.id}`, houseData)
        let house = new House(res.data)
        let houseIndex = AppState.houses.findIndex(h => h.id == houseData.id)
        AppState.houses.splice(houseIndex, 1, house)
        AppState.houses = AppState.houses
    }

    async getHouses(){
        let res = await api.get('/houses')
        AppState.houses = res.data.map(h => new House(h))
    }

    async createHouse(houseFormData){
        let res = await api.post(`/houses`, houseFormData)
        let house = new House(res.data)
        AppState.houses = [...AppState.houses, house]
    }

    async deleteHouse(houseId){
        let url = `/houses/${houseId}`
        await api.delete(url)
        AppState.houses = AppState.houses.filter(h => h.id != houseId)
    }
}

export const houseService = new HousesService()