
export default function Task (obj){
    this.id = obj.id,
    this.name = obj.name,
    this.description = obj.description,
    this.categoryId = + obj.categoryId
}