import "@nivinjoseph/n-ext";
import { ClientApp } from "./core/client-app.js";
import { element } from "./core/element.js";
import { template } from "./core/template.js";
import { title } from "./core/title.js";
import { meta, type MetaDetail } from "./core/meta.js";
import { route } from "./core/route.js";
import { bind } from "./core/bind.js";
import { events } from "./core/events.js";
import { components } from "./core/components.js";
import { pages } from "./core/pages.js";
import { ComponentViewModel } from "./core/component-view-model.js";
import { PageViewModel } from "./core/page-view-model.js";
import { Utils } from "./core/utils.js";
import { type StorageService } from "./services/storage-service/storage-service.js";
import { type EventAggregator, type EventSubscription } from "./services/event-aggregator/event-aggregator.js";
import { type NavigationService } from "./services/navigation-service/navigation-service.js";
import { type DialogService, type DialogServiceOptions, DialogLocation } from "./services/dialog-service/dialog-service.js";
import { type DisplayService } from "./services/display-service/display-service.js";
import { DisplayType } from "./services/display-service/display-type.js";
import { type ComponentService } from "./services/component-service/component-service.js";
import { type ComponentOptions } from "./services/component-service/component-options.js";
import { resolve, type Resolution, type Resolver } from "./core/resolve.js";
import { type NavRoute } from "./core/nav-route.js";
// import { FileInfo } from "./components/n-file-select/n-file-select-view-model.js";
import { persist } from "./core/persist.js";
import { DefaultDialogService } from "./services/dialog-service/default-dialog-service.js";


export
{
    ClientApp,
    element,
    route,
    template,
    title,
    meta, bind,
    events,
    components,
    pages,
    persist,
    ComponentViewModel,
    PageViewModel,
    Utils, DialogLocation, DefaultDialogService, DisplayType, resolve
};

export type {
    MetaDetail, StorageService,
    EventAggregator, EventSubscription,
    NavigationService,
    DialogService, DialogServiceOptions, DisplayService, ComponentService, ComponentOptions, Resolver, NavRoute, Resolution
    // FileInfo
};
