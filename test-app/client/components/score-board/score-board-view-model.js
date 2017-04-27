"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./../../../../src/index");
class BaseViewModel {
    baseMethod() {
        console.log("calling base method");
    }
}
let ScoreBoardViewModel = class ScoreBoardViewModel extends BaseViewModel {
    constructor() {
        super();
        this._playerFirstName = "Nivin";
        this._playerLastName = "Joseph";
        this._score = 5;
        // this._score = initialScore;
        // setInterval(() => this._score++, 2000);
    }
    get score() { return this._score; }
    get playerFirstName() { return this._playerFirstName; }
    set playerFirstName(value) {
        this._playerFirstName = value;
        console.log(this);
    }
    get playerLastName() { return this._playerLastName; }
    set playerLastName(value) { this._playerLastName = value; }
    get playerFullName() { return this._playerFirstName + " " + this._playerLastName; }
    incrementScore(currentScore) {
        console.log(this);
        console.log("current score", currentScore);
        console.log("name", this.playerFullName);
        this._score += 1;
    }
};
ScoreBoardViewModel = __decorate([
    index_1.element("score-board"),
    index_1.view("score-board-view.html"),
    __metadata("design:paramtypes", [])
], ScoreBoardViewModel);
exports.ScoreBoardViewModel = ScoreBoardViewModel;
//# sourceMappingURL=score-board-view-model.js.map