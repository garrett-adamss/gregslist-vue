

export class House {
    constructor({data}){
        this.id = data.data.id,
        this.bedrooms =data.bedrooms || ''
        this.bathrooms = data.bathrooms || ''
        this.year = data.year || ''
        this.price = data.price || ''
        this.description = data.description || ''
        this.img = data.imgUrl || ''
    }
}