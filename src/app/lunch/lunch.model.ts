export class Lunch{
    public name: string;
    public description: string;
    public value: number;
    public imagePath: string;
    constructor(name: string, description: string, value: number, imagePath: string){
        this.name = name;
        this.description = description;
        this.value = value;
        this.imagePath = imagePath;
    }
}