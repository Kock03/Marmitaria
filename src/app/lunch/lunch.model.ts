export class Lunch{
    public name: string;
    public description: string;
    public value: number;
    public imagePath: string;
    public bagAmount: number = 0;
    constructor(name: string, description: string, value: number, imagePath: string, bagAmount: number){
        this.name = name;
        this.description = description;
        this.value = value;
        this.imagePath = imagePath;
        this.bagAmount = bagAmount;
    }
}