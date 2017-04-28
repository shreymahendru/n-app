import { ClientApp } from "./../../src/index";
import { ScoreBoardViewModel } from "./components/score-board/score-board-view-model";
import { ComponentInstaller, Registry } from "n-ject";
import { InmemoryTodoRepository } from "./services/todo-repository/inmemory-todo-repository";
import { HomeViewModel } from "./pages/home/home-view-model";
import { ManageViewModel } from "./pages/manage/manage-view-model";


class Installer implements ComponentInstaller
{
    public install(registry: Registry): void
    {
        registry.registerSingleton("TodoRepository", InmemoryTodoRepository);
    }
}    


const app = new ClientApp("#app")
    .useInstaller(new Installer())    
    .registerComponents(ScoreBoardViewModel)
    .registerPages(HomeViewModel, ManageViewModel);
    
app.bootstrap();











// import Vue from "vue";
// import "./../../node_modules/vue/dist/vue";

// declare var Vue: any;
// const Vue = require("./vue.js");


// class PropertyInfo
// {
//     private _name: string;
//     private _descriptor: PropertyDescriptor;
    
    
//     public get name(): string { return this._name; }
//     public get descriptor(): PropertyDescriptor { return this._descriptor; }
    
    
//     public constructor(name: string, descriptor: PropertyDescriptor)
//     {
//         this._name = name;
//         this._descriptor = descriptor;
//     }
// }    


// function getPropertyNames(val: any): Array<string>
// {
//     let propertyNames = new Array<string>();
//     let prototype = Object.getPrototypeOf(val);
//     if (prototype === undefined || prototype === null)  // we are dealing with Object
//         return propertyNames;

//     propertyNames.push(...Object.getOwnPropertyNames(val));
//     propertyNames.push(...getPropertyNames(prototype));
//     return propertyNames;
// }

// function prepareVm(vm: any): void
// {
//     let propertyNames = getPropertyNames(vm);
//     for (let name of propertyNames)
//     {
//         if (name === "constructor" || name.indexOf("_") === 0)
//             continue;

//         let value = vm[name];
//         if (typeof (value) !== "function")
//             continue;

//         vm[name] = (<Function>value).bind(vm);
//     }
// }

// function getPropertyInfos(val: any): Array<PropertyInfo>
// {
//     let propertyInfos = new Array<PropertyInfo>();
//     let prototype = Object.getPrototypeOf(val);
//     if (prototype === undefined || prototype === null)  // we are dealing with Object
//         return propertyInfos;
        
//     let propertyNames = Object.getOwnPropertyNames(val);
//     for (let name of propertyNames)
//     {
//         if (name === "constructor" || name.indexOf("_") === 0)
//             continue;
        
//         let descriptor = Object.getOwnPropertyDescriptor(val, name);
//         propertyInfos.push(new PropertyInfo(name, descriptor));
//     }    
    
//     propertyInfos.push(...getPropertyInfos(prototype));
//     return propertyInfos;
// }





  

// Vue.component("root", {
//     template: "#root",
//     data: function()
//     {
//         let vm = new ViewModel(5);
//         let data = { vm: vm };
//         let methods = {};
//         let computed = {};
        
//         let propertyInfos = getPropertyInfos(vm);
//         for (let info of propertyInfos)
//         {
//             if (typeof (info.descriptor.value) === "function")
//                 methods[info.name] = info.descriptor.value.bind(vm);
//             else if (info.descriptor.get || info.descriptor.set)
//             {
//                 computed[info.name] = {
//                     get: info.descriptor.get ? info.descriptor.get.bind(vm) : undefined,
//                     set: info.descriptor.set ? info.descriptor.set.bind(vm) : undefined
//                 };
//             }
//         } 
        
//         this.$options.methods = methods;
//         this.$options.computed = computed;
        
//         return data;
//     }
// });

// console.log("c", c);
// let cinstance = new c();
// console.log("cinstacne", cinstance);


// const app = new Vue({
//     el: "#app"
// });

