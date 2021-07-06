# **n-app**

Vue.js based application framework

## **Description**

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## **Prerequisites**

- Vue.js
- Node.js
- Typescript (Recommended)
- SCSS (Recommended)

## **Installation**

Via npm

```bash
npm i @nivin-joseph/n-app --save
```

## **Documentation**

### **Content**

- What is n-app?
  - Introduction
  - Getting Started
- Structure of Pages
- Structure of Components
- Services
  - Component Service
  - Dialog Service
  - Display Service
  - Event Aggregator
  - Navigation Service
  - Storage Service

## What is n-app?

### **Introduction**

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### **Getting Started**

Here's an example of an simple counter.  

Let's create a UI for our Simple Counter. Start by creating a HTML **view** file by naming `counter-view.html` and adding a button which a click event that calls `incrementByOne` method and display it inside a `p` tag:

```html
<div class="counter">
    <button @click="incrementByOne">Add One</button>
    <p class="is-blue">{{ count }}</p>
</div>
```

Now let's make the `p` tag blue by creating a SCSS **view** file naming it `counter-view.scss`:

```scss
.counter
{
    .is-blue
    {
        color: blue;
    }
}
```

We need some functionality. Let's create a TypeScript **view model** file naming it `counter-view-model.ts` and importing **n-app** into our application and making our view model class a **subclass** of the `PageViewModel`. We'll also route our page and add a method called `incrementByOne` that increments a `private number` prop called `_count` by 1 and we'll expose that prop using a **getter** to our **view**:

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { Routes } from "./routes";
import "./counter-view.scss"; // Importing our styles.

@template(require("./counter-view.html")) // The HTML template we are using.
@route(Routes.counter) // We'll link our route to a counter property in the Routes class, more on this below.
export class CounterViewModel extends PageViewModel // The CounterViewModel is a subclass of PageViewModel.
{
    private _count = 0;

    public get count(): number { return this._count; }

    public incrementByOne(): void
    {
        this._count++;
    }
}
```

Now let's link our previous **route** by creating a `Routes` class which contains the `counter` route. Let's name this file `routes.ts`:

```typescript
export class Routes
{
    public static counter = "/counter"; // The path of the URL

    public static readonly default = Routes.counter; // Let's set our default path to our counter page.
}
```

Now in our `index.ts`, we'll import our **View Model**:

```typescript
import { CounterViewModel } from "./counter-view-model.ts";

export const pages = [
    CounterViewModel
];
```

Now we're done! Running the page with the path `/counter` (without the path will work because we've set it as the `default` path) will bring up our simple counter.


<!-- - What is n-app?
  - Introduction
  - Getting Started
- Page Structure
- Component Structure
- Services
  - Component Service
  - Dialog Service
  - Display Service
  - Event Aggregator
  - Navigation Service
  - Storage Service -->

