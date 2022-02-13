export class Pokemon{
    id?: string;
    name?: string;
    url?: string;
    imageURL?: string;

    static parse(data: any) {
        let pokemon = Object.assign(new Pokemon(), data);
        pokemon.getId();
        pokemon.getImageUrl();
        return pokemon;
    }

    // getId() {
    //     const url = this.url;
    //     if (this.url) {
    //     const reg = this.url.match('([0-9]+)\/$');
    //     this.id = reg[1];
    //     }
    // }

    getImageUrl() {
        this.imageURL = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + this.id + ".png";
    }
}