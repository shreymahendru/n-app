# **n-app**

Vue.js based application framework

## **Description**

<!-- TODO: ADD DESCRIPTION -->
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## **Prerequisites**

<!-- n-app webpack.config loader -->
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
- Convention & File Structure
- Structure of Pages & Individual Page
  - Pages
  - Individual Page
    - Interaction between View and View-Model
      - Click Handler
      - v-bind
      - v-model
    - Page's Lifecycle Methods
      - onCreate
      - onMount
      - onEnter
      - onLeave
      - onDestroy
- Structure of Components & Individual Component
  - Components
    - Top-level Components
    - Page-level Components
  - Individual Component
    - v-bind
    - v-model
    - Events
- Services
  - Dialog Service
  - Event Aggregator
  - Navigation Service
  - Storage Service
- Examples
  - Simple Counter
  - n-app-todo

## **What is n-app?**

### **Introduction**

<!-- TODO: ADD INTRODUCTION -->
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

### **Getting Started**

<!-- TODO: ADD GETTING STARTED -->
#### **Hello World**

If used correctly, **n-app** offers **separation of concern**, **ease of readability** and also **scalability**.

```html
<div class="hello-page">
    {{ message }}
</div>
```

```scss
.hello-page {  }
```

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app";
import { Routes } from "../routes";
import "./hello-page-view.scss";

@template(require("./hello-page-view.html"))
@route(Routes.helloPage)
export class Page1ViewModel extends PageViewModel 
{
    public get message(): string { return "Hello, World!" }
}
```

We've create our very first application that uses **Vue's** binding, with separation of concern between the **view** and **view-model** and while maintaining readability, and scalability.

This is just the very start of what **n-app** has to offer.

## **Convention & File Structure**

<!-- TODO: Explain how n-app uses MVVM -->

Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

```bash
n-test-app
    |-- client
        |-- components
            |-- component-1
                |-- # component-1 view and view-models
            |-- component-2
                |-- # component-2 view and view-models
            ...
            |-- index.ts
        |-- pages
            |-- page-1
                |-- components
                    |-- page-1-component
                        |-- # page-1-component view and view-models
                    ...
                |-- # page-1 view and view-models
            |-- page-2
                |-- # page-2 view and view-models
            ...
            |-- routes.ts
            |-- index.ts
    |-- controllers
        |-- index-controller.ts
        |-- index-view.html
```

## **Structure of Pages & Individual Page**

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

Now we have setup the routes for the pages, we now need to link it to the corresponding **view-models**.

Before we can do this, we need to understand how each individual pages is structured.

Inside the `page-1` folder, it consist of 3 main parts, the **HTML**, **SCSS** and **TypeScript** files. The HTML and the SCSS files are responsible for the **view** of the page while the TypeScript file handles the **view-model**.

Inside, the `page-1` folder, we have `page-1-view.html`, `page-1-view.scss` and `page-1-view-model.ts`.

The `page-1-view.html` and all **html** pages should follow this structure. It'll have a top level `div` element with the class name as the page.

```html
<div class="page-1">
    <!-- Page Content -->
</div>
```

The `page-1-view.scss` and all **SCSS** for pages should follow this structure. It'll have a top level class with the same name as the div from the **HTML** file.

```scss
.page-1
{
    // Styles
}
```

And finally, the `page-1-view-model.ts` should follow this structure. It should contain the **view-model's** class which inherits from the `PageViewModel` class given by the **n-app** framework. The **view-model** should also import the corresponding **SCSS** file and have multiple decorators to determine the **template** and the **route**; this is all provided by the **n-app** framework.

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app"; // Default Imports
import { Routes } from "../routes"; // Import all the possible Routes
import "./page-1-view.scss"; // Importing the Styles

@template(require("./page-1-view.html")) // Linking the Template to this View-Model
@route(Routes.page1) // Linking the Corresponding Routes to the correct one
export class Page1ViewModel extends PageViewModel // Inheriting the PageViewModel class
{
    // View-Model Logic
}
```

Now, we've successfully create and routed a page. This page is now **accessible** to the user.

Although, the creation of pages are a bit lengthy, **n-app** offers **separation of concern**, **ease of readability** and also **scalability**, if used correctly.

### **Interaction between View and View-Model**

**n-app** allows for Vue operations with the DOM with **separation of concern**. Instead of writing the methods, data and template inside one file, you are able to separate it into a template file (**HTML**), and a **view-model** file (**TypeScript**).

#### **Click Handler**

Inside your **HTML** file:

```html
<button @click="foo()">Click Me</button>
```

Inside your **TypeScript** view-model file and inside the class, you'll create a method:

```typescript
public foo(): void
{
    // Method Body
}
```

Now whenever you click the button, it'll call the method `doSomething`.

#### **v-bind**

You can easily incorporate **Vue's** data binding like this:

Inside your **HTML** file:

```html
<div>{{ foo }}</div>
```

That's it! Now we've exposed `foo` data to the **view**.

Inside your **TypeScript view-model** file and inside the class, you'll create a getter for the property:

```typescript
public get foo(): string { return "bar"; }
```

#### **v-model**

You can easily incorporate **Vue's** two-way data binding like this:

Inside your **HTML** file:

```html
<input v-model="message" >
```

Now inside your **TypeScript view-model** file, you can create a setter and a getter to dynamically two-way bind the data.

```typescript
private _message: string;

public get message(): string { return this._message; }
public set message(value: string) { this._message = value; }
```

Now when the message in the input updates, it'll update the _message property inside the **view-model** class.

### **Page's Lifecycle Methods**

**Note:** The following methods are inherited from the `PageViewModel` class.

#### **onCreate**

This method is executed when the **view-model** is created, but when the template is not yet mounted to the **DOM**.

```typescript
protected onCreate(): void
{
    super.onCreate();
    
    // Method Body
}
```

#### **onMount**

This method is executed when the page template is mounted on the **DOM**, you'll get the HTML element as a parameter here to manipulate it, like using JQuery for example.

```typescript
protected onMount(element: HTMLElement): void
{
    super.onCreate(element);
    
    // Method Body + Manipulation of the HTML element
}
```

#### **onEnter**

This method is executed when the page has appeared and is usually used to fetch data to show on the page. The parametrs for this function would be any **query/path params** of the url defined in the **route**.

```typescript
protected onEnter(): void
{
    super.onEnter();
    
    // Method Body
}
```

#### **onLeave**

This method is executed when the user is about to **leave** the page.

```typescript
protected onLeave(): void
{
    super.onLeave();
    
    // Method Body
}
```

#### **onDestroy**

This method is executed when the page is **removed** from the **DOM**.

```typescript
protected onDestroy(): void
{
    super.onDestroy();
    
    // Method Body
}
```

## **Structure of Components & Individual Component**

### **Components**

For components, we recommend using a similar file structure to pages.

There are two cases to incorporate components into your pages.

- **Top-level** Components (Components that are visible to all pages).
- **Page-level** Components (Components that are visible to a certian pages).

#### **Top-level Components**

To create a **top-level** component, you could create a `components` folder on the same level as pages.

```bash
client
    |-- components
        |-- component-1
            |-- component-1-view-model.ts
            |-- component-1-view.html
            |-- component-1-view.scss
    |-- pages
```

In order to register **top-level** components you have to create a `index.ts` file inside the `components` folder.

```bash
components
    |-- component-1
        |-- component-1-view-model.ts
        |-- component-1-view.html
        |-- component-1-view.scss
    |-- index.ts
```

Like the `index.ts` file in pages, you'll create `index.ts` file here, though the registering process is a bit different.

```typescript
import { Component1ViewModel } from "./component-1/component-1-view-model";

export const components: Array<Function> = [
    Component1ViewModel
];
```

Now, we've created and registered our **top-level** component.

#### **Page-level Components**

To create a **page-level** component, you could create a `components` folder on the individual page.

```bash
client
    |-- pages
        |-- page-1
            |-- components
                |-- component-1
                    |-- component-1-view-model.ts
                    |-- component-1-view.html
                    |-- component-1-view.scss
            |-- # page-1 view and view-model
```

To register our component we'll use `@components` decorator inside our page **view-model** and register the component's **view-model**.

```typescript
import { PageViewModel, route, template } from "@nivinjoseph/n-app"; 
import { Routes } from "../routes"; 
import "./page-1-view.scss"; 
import { Component1ViewModel } from "./components/component-1/component-1-view-model"; // Importing the Component's View Model

@template(require("./page-1-view.html")) 
@route(Routes.page1) 
@components(Component1ViewModel)
export class Page1ViewModel extends PageViewModel 
{
    // View-Model Logic
}
```

Now, our component has been registered.

### **Individual Component**

<!-- TODO: Component -->

Let's look into the structure of each individual components.

Just like the how the **pages** are structured, **components** uses a very similar structuring as pages minus the route.

Inside, the `components` folder we'll make a component and each of these component will contain a **view** and **view-model**.

```bash
components
    |-- component-1
        |-- component-1-view-model.ts
        |-- component-1-view.html
        |-- component-1-view.scss
```

The component-1's **views** follow the same format as pages. Though it's **view-model** is a little bit different.

Components inherits from the `ComponentViewModel` class and removes the concept of routes which is replaced by a decorator, `@element`, which contains the name of the component (the **element name** exposed to the DOM).

```typescript
import { ComponentViewModel, element, template } from "@nivinjoseph/n-app";
import "./component-1-view.scss";

@template(require("./component-1-view.html"))
@element("component-1")
export class Component1ViewModel extends ComponentViewModel
{
    
}
```

With creating the **view and view-model** and registering it, we've created a component.

## **Examples**

### **Simple Counter**

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
import { Routes } from "../routes";
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

### **n-app-todo**

<!-- FIXME: Add the link for n-app-todo -->

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