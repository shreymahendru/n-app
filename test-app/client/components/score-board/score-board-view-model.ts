import { element, view, bind, ComponentViewModel } from "./../../../../src/index";


@element("score-board")
@view("score-board-view.html")  
@bind("score", "increment")    
export class ScoreBoardViewModel extends ComponentViewModel
{
    private _playerFirstName: string = "Nivin";
    private _playerLastName: string = "Joseph";


    // public get score(): number { return this.ctx["score"]; }

    public get playerFirstName(): string { return this._playerFirstName; }
    public set playerFirstName(value: string) { this._playerFirstName = value; }

    public get playerLastName(): string { return this._playerLastName; }
    public set playerLastName(value: string) { this._playerLastName = value; }

    public get playerFullName(): string { return this._playerFirstName + " " + this._playerLastName; }


    // public incrementScore(): void
    // {
    //     // console.log(this);
    //     // console.log("current score", currentScore);
    //     // console.log("name", this.playerFullName);
    //     // this.ctx["score"] += 1;
        
    //     this.ctx["increment"]();
    // }
}  