import { element, view } from "./../../../../src/index";


@element("score-board")
@view("score-board-view.html")    
export class ScoreBoardViewModel
{
    private _playerFirstName: string = "Nivin";
    private _playerLastName: string = "Joseph";
    private _score: number = 5;


    public get score(): number { return this._score; }

    public get playerFirstName(): string { return this._playerFirstName; }
    public set playerFirstName(value: string)
    {
        this._playerFirstName = value;
        console.log(this);
    }

    public get playerLastName(): string { return this._playerLastName; }
    public set playerLastName(value: string) { this._playerLastName = value; }

    public get playerFullName(): string { return this._playerFirstName + " " + this._playerLastName; }


    public incrementScore(currentScore: number): void
    {
        console.log(this);
        console.log("current score", currentScore);
        console.log("name", this.playerFullName);
        this._score += 1;
    }
}  