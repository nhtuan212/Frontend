export class Pokemon{
    id?: string;
    name?: string;
    url?: string;
    imageURL?: string;

    getImageUrl() {
        this.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png";
    }
}