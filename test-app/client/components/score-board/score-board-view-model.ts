import { element, bind, ComponentViewModel, template, events } from "./../../../../src/index";
import "./score-board-view.scss";
import { inject } from "@nivinjoseph/n-ject";
import { ScopedService } from "../../services/scoped-service";


@template(require("./score-board-view.html"))
@element("score-board")
@bind("score")
@events("incremented")
@inject("ScopedService")    
export class ScoreBoardViewModel extends ComponentViewModel
{
    // @ts-ignore
    private readonly _scopedService: ScopedService;
    private _playerFirstName: string = "Nivin";
    private _playerLastName: string = "Joseph";
    private readonly _time: number;


    public get playerScore(): number { return this.getBound<number>("score"); }

    public get playerFirstName(): string { return this._playerFirstName; }
    public set playerFirstName(value: string) { this._playerFirstName = value; }

    public get playerLastName(): string { return this._playerLastName; }
    public set playerLastName(value: string) { this._playerLastName = value; }

    public get playerFullName(): string { return this._playerFirstName + " njj" + this._playerLastName; }


    public constructor(scopedService: ScopedService)
    {
        super();
        this._scopedService = scopedService;
        
        this._time = Date.now();
        
        console.log("scoreboard construct", this._time);
    }
    
    
    protected onCreate(): void
    {
        console.log("scoreboard created", this._time);
        
        super.onCreate();
        
        this.watch<number>("playerScore", (val, old) =>
        {
            console.log(val, old);
        });
    }
    
    protected onDestroy(): void
    {
        console.log("scoreboard destroyed", this._time);
    }

    public incrementScore(): void
    {
        // console.log(this);
        // console.log("current score", currentScore);
        // console.log("name", this.playerFullName);
        // this.ctx["score"] += 1;
        
        // this.ctx["increment"]();
        
        console.log("incrementing");
        this.emit("incremented");
    }
    
    // protected onMount(element: HTMLElement): void
    // { 
    //     console.log("el", element);
    //     let hasChildren = element.hasChildNodes();
    //     console.log("hasChildren", hasChildren);
        
    //     jquery(element).html("<span>replaced</span>");
    // }
}  