# **n-app**

Vue.js based application framework

## **Description**

<!-- TODO: ADD DESCRIPTION -->
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
- Structure of Pages and Individual Page
- Structure of Components and Individual Component
- Services
  - Component Service
  - Dialog Service
  - Display Service
  - Event Aggregator
  - Navigation Service
  - Storage Service

## What is n-app?

### **Introduction**

<!-- TODO: ADD INTRODUCTION -->
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### **Getting Started**

<!-- TODO: ADD GETTING STARTED -->

## **Convention & File Structure**

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```bash
n-test-app
    |-- client
        |-- pages
            |-- routes.ts
            |-- index.ts
    |-- controllers
        |-- index-controller.ts
        |-- index-view.html
```

## **Structure of Pages and Individual Page**

### **Pages**

We highly recommend that the creation of pages should atleast somewhat follow this generalized structure...

Within the `pages` folder, it should contain all the page's view and view-model seperated into individual folder for each page.

```bash
pages
    |-- page-1
        |-- page-1-view-model.ts
        |-- page-1-view.html
        |-- page-1-view.scss
    |-- page-2
        |-- page-2-view-model.ts
        |-- page-2-view.html
        |-- page-2-view.scss
    ...
```

Within the `pages` folder, we need a place to register our **view-models**, this can be done inside an `index.ts` file.

We also need a place to setup our **routes** and **paths**, this can be done inside a `routes.ts` file.

```bash
pages
    |-- page-1
        |-- page-1-view-model.ts
        |-- page-1-view.html
        |-- page-1-view.scss
    |-- page-2
        |-- page-2-view-model.ts
        |-- page-2-view.html
        |-- page-2-view.scss
    |-- index.ts
    |-- routes.ts
```

Inside `index.ts`, we need to register the page's view-model in order for the pages to be rendered.

```typescript
import { Page1ViewModel } from "./page-1/page-1-view-model";
import { Page2ViewModel } from "./page-2/page-2-view-model";

export const pages = [
    Page1ViewModel,
    Page2ViewModel
];
```

Now we need routes to navigate to our pages. We can create **paths** and **routes** to our pages in `routes.ts`.

```typescript
export class Routes
{
    public static readonly page1 = "/page1";
    public static readonly page2 = "/page2";
    
    public static readonly default = Routes.page1;
}
```

**Note:** we need a default path which is redirected to when the address has a path of `/`.

### **Individual Page**

<!-- TODO: ADD INDIVIDUAL PAGE INFO -->

## **Example**

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

We need some functionality. Let's create a TypeScript **view-model** file naming it `counter-view-model.ts` and importing **n-app** into our application and making our view-model class a **subclass** of the `PageViewModel`. We'll also route our page and add a method called `incrementByOne` that increments a private number property called `_count` by 1 and we'll expose that property using a **getter** which will then be displayed to the **view**:

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { Routes } from "./routes";
import "./counter-view.scss";

@template(require("./counter-view.html")) 
@route(Routes.counter)
export class CounterViewModel extends PageViewModel 
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
    public static readonly counter = "/counter";

    public static readonly default = Routes.counter;
}
```

Now in our `index.ts`, we'll import our **View-Model**:

```typescript
import { CounterViewModel } from "./counter-view-model.ts";

export const pages = [
    CounterViewModel
];
```

Now we're done!

Running the page with the path `/counter` (without the path will work because we've set it as the `default` path) will bring up our simple counter application.

<!-- - What is n-app?
  - Introduction
  - Getting Started
- Convention & File Structure
- Page Structure
- Component Structure
- Services
  - Component Service
  - Dialog Service
  - Display Service
  - Event Aggregator
  - Navigation Service
  - Storage Service -->

