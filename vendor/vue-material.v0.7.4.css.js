(function () {
    "non-strict"
    
    const css = `
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-ink-ripple {
  pointer-events: none;
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-mask-image: radial-gradient(circle, white 100%, black 100%);
  transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
}
.md-ripple {
  position: absolute;
  background-color: currentColor;
  border-radius: 50%;
  opacity: .2;
  transform: scale(0) translateZ(0);
  transition: none;
  will-change: background-color, opacity, transform, width, height, top, left;
}
.md-ripple.md-active {
    animation: ripple 1s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}
.md-ripple.md-active.md-fadeout {
      opacity: 0 !important;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition-duration: .6s;
}
@keyframes ripple {
to {
    transform: scale(2.2) translateZ(0);
}
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/*  Text and Titles
   ========================================================================== */
.md-caption {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .02em;
  line-height: 17px; }

.md-body-1, body {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .01em;
  line-height: 20px; }

.md-body-2 {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .01em;
  line-height: 24px; }

.md-subheading {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: .01em;
  line-height: 24px; }

.md-title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: .005em;
  line-height: 26px; }

.md-headline {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px; }

.md-display-1 {
  font-size: 34px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 40px; }

.md-display-2 {
  font-size: 45px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 48px; }

.md-display-3 {
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -.005em;
  line-height: 58px; }

.md-display-4 {
  font-size: 112px;
  font-weight: 300;
  letter-spacing: -.01em;
  line-height: 112px; }

/*  Links & Buttons
   ========================================================================== */
a:not(.md-button):not(.md-bottom-bar-item) {
  text-decoration: none; }
  a:not(.md-button):not(.md-bottom-bar-item):hover {
    text-decoration: underline; }

button:focus {
  outline: none; }

/*  Structure
   ========================================================================== */
html {
  height: 100%;
  box-sizing: border-box; }
  html *,
  html *:before,
  html *:after {
    box-sizing: inherit; }

body {
  min-height: 100%;
  margin: 0;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: rgba(0, 0, 0, 0.87);
  font-family: Roboto, "Noto Sans", Noto, sans-serif; }

/*  Fluid Media
   ========================================================================== */
ul:not(.md-list) > li + li {
  margin-top: 8px; }

/*  Fluid Media
   ========================================================================== */
audio,
img,
svg,
object,
embed,
canvas,
video,
iframe {
  max-width: 100%;
  font-style: italic;
  vertical-align: middle; }
  audio:not(.md-image),
  img:not(.md-image),
  svg:not(.md-image),
  object:not(.md-image),
  embed:not(.md-image),
  canvas:not(.md-image),
  video:not(.md-image),
  iframe:not(.md-image) {
    height: auto; }

/*  Suppress the focus outline on links that cannot be accessed via keyboard.
    This prevents an unwanted focus outline from appearing around elements
    that might still respond to pointer events.
   ========================================================================== */
[tabindex="-1"]:focus {
  outline: none !important; }

/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-scrollbar::-webkit-scrollbar,
.md-scrollbar ::-webkit-scrollbar {
  width: 10px;
  height: 10px;
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.12);
  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
  background-color: rgba(0, 0, 0, 0.05); }
  .md-scrollbar::-webkit-scrollbar:hover,
  .md-scrollbar ::-webkit-scrollbar:hover {
    box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.038);
    background-color: rgba(0, 0, 0, 0.087); }

.md-scrollbar::-webkit-scrollbar-button,
.md-scrollbar ::-webkit-scrollbar-button {
  display: none; }

.md-scrollbar::-webkit-scrollbar-corner,
.md-scrollbar ::-webkit-scrollbar-corner {
  background-color: transparent; }

.md-scrollbar::-webkit-scrollbar-thumb,
.md-scrollbar ::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.26);
  box-shadow: inset 1px 1px 0 rgba(0, 0, 0, 0.054), inset 0 -1px 0 rgba(0, 0, 0, 0.087);
  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1); }

/*  Text and Titles
   ========================================================================== */
.md-caption {
  font-size: 12px;
  font-weight: 400;
  letter-spacing: .02em;
  line-height: 17px; }

.md-body-1, body {
  font-size: 14px;
  font-weight: 400;
  letter-spacing: .01em;
  line-height: 20px; }

.md-body-2 {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: .01em;
  line-height: 24px; }

.md-subheading {
  font-size: 16px;
  font-weight: 400;
  letter-spacing: .01em;
  line-height: 24px; }

.md-title {
  font-size: 20px;
  font-weight: 500;
  letter-spacing: .005em;
  line-height: 26px; }

.md-headline {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 32px; }

.md-display-1 {
  font-size: 34px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 40px; }

.md-display-2 {
  font-size: 45px;
  font-weight: 400;
  letter-spacing: 0;
  line-height: 48px; }

.md-display-3 {
  font-size: 56px;
  font-weight: 400;
  letter-spacing: -.005em;
  line-height: 58px; }

.md-display-4 {
  font-size: 112px;
  font-weight: 300;
  letter-spacing: -.01em;
  line-height: 112px; }

/*  Links & Buttons
   ========================================================================== */
a:not(.md-button):not(.md-bottom-bar-item) {
  text-decoration: none; }
  a:not(.md-button):not(.md-bottom-bar-item):hover {
    text-decoration: underline; }

button:focus {
  outline: none; }
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-avatar {
  width: 40px;
  min-width: 40px;
  height: 40px;
  min-height: 40px;
  margin: auto;
  display: inline-block;
  overflow: hidden;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  position: relative;
  border-radius: 40px;
  vertical-align: middle;
}
.md-avatar.md-large {
    width: 64px;
    min-width: 64px;
    height: 64px;
    min-height: 64px;
    border-radius: 64px;
}
.md-avatar.md-large .md-icon {
      width: 40px;
      min-width: 40px;
      height: 40px;
      min-height: 40px;
      font-size: 40px;
      line-height: 40px;
}
.md-avatar.md-avatar-icon {
    background-color: rgba(0, 0, 0, 0.38);
}
.md-avatar.md-avatar-icon .md-icon {
      color: #fff;
}
.md-avatar .md-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.md-avatar img {
    width: 100%;
    height: 100%;
    display: block;
}
.md-avatar .md-ink-ripple {
    border-radius: 50%;
}
.md-avatar .md-ink-ripple .md-ripple.md-active {
      animation-duration: .9s;
}
.md-avatar-tooltip.md-tooltip-top {
  margin-top: -8px;
}
.md-avatar-tooltip.md-tooltip-right {
  margin-left: 8px;
}
.md-avatar-tooltip.md-tooltip-bottom {
  margin-top: 8px;
}
.md-avatar-tooltip.md-tooltip-left {
  margin-left: -8px;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.54);
  transform: translate3d(0, 0, 0);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
}
.md-backdrop.md-active {
    opacity: 1;
    pointer-events: auto;
}
.md-backdrop.md-transparent {
    background: rgba(0, 0, 0, 0.005);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-bottom-bar {
  width: 100%;
  min-width: 100%;
  height: 56px;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
      justify-content: center;
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-bottom-bar-item {
  max-width: 168px;
  min-width: 80px;
  height: 100%;
  padding: 8px 12px 10px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column nowrap;
      flex-flow: column nowrap;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: justify;
      justify-content: space-between;
  -ms-flex: 1;
      flex: 1;
  position: relative;
  cursor: pointer;
  border: none;
  background: transparent;
  transform: translate3d(0, 0, 0);
  color: currentColor;
  font-family: inherit;
  font-size: 14px;
  line-height: 1em;
  text-decoration: none;
}
.md-bottom-bar-item.md-active {
    padding-top: 6px;
}
.md-bottom-bar-item.md-active .md-text {
      transform: scale(1) translate3d(0, 0, 0);
}
.md-bottom-bar-item.md-active .md-text,
    .md-bottom-bar-item.md-active .md-icon {
      color: currentColor;
}
.md-bottom-bar-item[disabled] {
    opacity: .38;
}
.md-bottom-bar.md-shift .md-bottom-bar-item {
    min-width: 56px;
    max-width: 96px;
    position: static;
    -ms-flex: 1 1 32px;
        flex: 1 1 32px;
    transition: 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-property: flex, min-width, max-width;
    transition-property: flex, min-width, max-width, -ms-flex;
}
.md-bottom-bar.md-shift .md-bottom-bar-item .md-icon {
      transform: translate3d(0, 8px, 0);
}
.md-bottom-bar.md-shift .md-bottom-bar-item .md-text {
      opacity: 0;
      transform: scale(1) translate3d(0, 6px, 0);
}
.md-bottom-bar.md-shift .md-bottom-bar-item.md-active {
      min-width: 96px;
      max-width: 168px;
      -ms-flex: 1 1 72px;
          flex: 1 1 72px;
}
.md-bottom-bar.md-shift .md-bottom-bar-item.md-active .md-icon,
      .md-bottom-bar.md-shift .md-bottom-bar-item.md-active .md-text {
        opacity: 1;
}
.md-bottom-bar.md-shift .md-bottom-bar-item.md-active .md-icon {
        transform: scale(1) translate3d(0, 0, 0);
}
.md-bottom-bar.md-shift .md-bottom-bar-item.md-active .md-text {
        transform: scale(1) translate3d(0, 2px, 0);
}
.md-bottom-bar-item .md-text {
    transform: scale(0.8571) translateY(2px);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.15s linear, opacity 0.15s linear;
}
.md-bottom-bar-item .md-icon {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), color 0.15s linear;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-button {
  min-width: 88px;
  min-height: 36px;
  margin: 6px 8px;
  padding: 0 16px;
  display: inline-block;
  position: relative;
  overflow: hidden;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  cursor: pointer;
  outline: none;
  background: none;
  border: 0;
  border-radius: 2px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: currentColor;
  font-family: inherit;
  font-size: 14px;
  font-style: inherit;
  font-variant: inherit;
  font-weight: 500;
  letter-spacing: inherit;
  line-height: 36px;
  text-align: center;
  text-transform: uppercase;
  text-decoration: none;
  vertical-align: top;
  white-space: nowrap;
}
.md-button:focus {
    outline: none;
}
.md-button::-moz-focus-inner {
    border: 0;
}
.md-button:hover:not([disabled]):not(.md-raised) {
    background-color: rgba(153, 153, 153, 0.2);
    text-decoration: none;
}
.md-button:hover:not([disabled]).md-raised {
    background-color: rgba(0, 0, 0, 0.12);
}
.md-button:active:not([disabled]) {
    background-color: rgba(153, 153, 153, 0.4);
}
.md-button.md-raised:not([disabled]) {
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.md-button.md-dense {
    min-height: 32px;
    line-height: 32px;
    font-size: 13px;
}
.md-button.md-icon-button .md-icon, .md-button.md-fab .md-icon {
    position: absolute;
    top: 1px;
    right: 0;
    bottom: 0;
    left: 0;
}
.md-button.md-icon-button {
    width: 40px;
    min-width: 40px;
    height: 40px;
    margin: 0 6px;
    padding: 8px;
    border-radius: 50%;
    line-height: 24px;
}
.md-button.md-icon-button:not([disabled]):hover {
      background: none;
}
.md-button.md-icon-button.md-dense {
      width: 32px;
      min-width: 32px;
      height: 32px;
      min-height: 32px;
      padding: 4px;
      line-height: 32px;
}
.md-button.md-icon-button .md-ink-ripple {
      border-radius: 50%;
}
.md-button.md-icon-button .md-ink-ripple .md-ripple {
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
}
.md-button.md-icon-button .md-ripple.md-active {
      animation-duration: .9s;
}
.md-button.md-fab {
    width: 56px;
    height: 56px;
    padding: 0;
    min-width: 0;
    overflow: hidden;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
    border-radius: 56px;
    line-height: 56px;
    background-clip: padding-box;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-property: background-color, box-shadow, transform;
}
.md-button.md-fab:hover, .md-button.md-fab:focus {
      box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12);
}
.md-button.md-fab.md-mini {
      width: 40px;
      height: 40px;
      line-height: 40px;
}
.md-button.md-fab .md-ink-ripple {
      border-radius: 56px;
}
.md-button[disabled] {
    color: rgba(0, 0, 0, 0.26);
    cursor: default;
    pointer-events: none;
}
.md-button[disabled].md-raised, .md-button[disabled].md-fab {
      background-color: rgba(0, 0, 0, 0.12);
}
.md-button[disabled].md-fab {
      box-shadow: none;
}
.md-button:after {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-button .md-ink-ripple {
    border-radius: 2px;
    background-clip: padding-box;
    overflow: hidden;
}
.md-button.md-icon-button .md-icon,
.md-button.md-fab .md-icon {
  display: block;
}
.md-fab.md-fab-top-left, .md-fab.md-fab-top-center, .md-fab.md-fab-top-right, .md-fab.md-fab-bottom-left, .md-fab.md-fab-bottom-center, .md-fab.md-fab-bottom-right,
.md-speed-dial.md-fab-top-left,
.md-speed-dial.md-fab-top-center,
.md-speed-dial.md-fab-top-right,
.md-speed-dial.md-fab-bottom-left,
.md-speed-dial.md-fab-bottom-center,
.md-speed-dial.md-fab-bottom-right {
  margin: 0;
  position: absolute;
  z-index: 10;
}
.md-fab.md-fab-top-left,
.md-speed-dial.md-fab-top-left {
  top: 24px;
  left: 24px;
}
.md-fab.md-fab-top-center,
.md-speed-dial.md-fab-top-center {
  top: 24px;
  left: 50%;
  transform: translateX(-50%);
}
.md-fab.md-fab-top-right,
.md-speed-dial.md-fab-top-right {
  top: 24px;
  right: 24px;
}
.md-fab.md-fab-bottom-left,
.md-speed-dial.md-fab-bottom-left {
  bottom: 24px;
  left: 24px;
}
.md-fab.md-fab-bottom-center,
.md-speed-dial.md-fab-bottom-center {
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
}
.md-fab.md-fab-bottom-right,
.md-speed-dial.md-fab-bottom-right {
  right: 24px;
  bottom: 24px;
}
.md-button-tooltip.md-tooltip-top {
  margin-top: -8px;
}
.md-button-tooltip.md-tooltip-right {
  margin-left: 8px;
}
.md-button-tooltip.md-tooltip-bottom {
  margin-top: 8px;
}
.md-button-tooltip.md-tooltip-left {
  margin-left: -8px;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-button-toggle {
  width: auto;
  display: -ms-flexbox;
  display: flex;
}
.md-button-toggle > .md-button {
    margin: 0;
    overflow: hidden;
    border-width: 1px 0 1px 1px;
    border-radius: 0;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.md-button-toggle > .md-button:first-child {
      border-radius: 2px 0 0 2px;
}
.md-button-toggle > .md-button:last-child {
      border-right-width: 1px;
      border-radius: 0 2px 2px 0;
}
.md-button-toggle > .md-button:not([disabled]) {
      color: rgba(0, 0, 0, 0.54);
}
.md-button-toggle > .md-button:not([disabled]):hover:not(.md-toggle):not(.md-raised) {
        background-color: rgba(153, 153, 153, 0.2);
        text-decoration: none;
}
.md-button-toggle > .md-button .md-ink-ripple {
      border-radius: 2px;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/* Image aspect ratio calculator */
/* Responsive breakpoints */
.md-card {
  overflow: auto;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
      flex-direction: column;
  position: relative;
  z-index: 1;
  border-radius: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.md-card.md-with-hover {
    cursor: pointer;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-property: box-shadow;
}
.md-card.md-with-hover:hover {
      z-index: 2;
      box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.md-card .md-card-media {
    position: relative;
}
.md-card .md-card-media.md-16-9 {
      overflow: hidden;
}
.md-card .md-card-media.md-16-9:before {
        width: 100%;
        padding-top: 56.25%;
        display: block;
        content: " ";
}
.md-card .md-card-media.md-16-9 img {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        transform: translateY(-50%);
}
.md-card .md-card-media.md-4-3 {
      overflow: hidden;
}
.md-card .md-card-media.md-4-3:before {
        width: 100%;
        padding-top: 75%;
        display: block;
        content: " ";
}
.md-card .md-card-media.md-4-3 img {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        transform: translateY(-50%);
}
.md-card .md-card-media.md-1-1 {
      overflow: hidden;
}
.md-card .md-card-media.md-1-1:before {
        width: 100%;
        padding-top: 100%;
        display: block;
        content: " ";
}
.md-card .md-card-media.md-1-1 img {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        transform: translateY(-50%);
}
.md-card .md-card-media + .md-card-header {
      padding-top: 24px;
}
.md-card .md-card-media + .md-card-content:last-child {
      padding-bottom: 16px;
}
.md-card .md-card-media img {
      width: 100%;
}
.md-card .md-card-header {
    padding: 16px;
}
.md-card .md-card-header:first-child > .md-title:first-child,
    .md-card .md-card-header:first-child > .md-card-header-text > .md-title:first-child {
      margin-top: 8px;
}
.md-card .md-card-header:last-child {
      margin-bottom: 8px;
}
.md-card .md-card-header.md-card-header-flex {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.md-card .md-card-header + .md-card-content {
      padding-top: 0;
}
.md-card .md-card-header + .md-card-actions:not(:last-child) {
      padding: 0 8px;
}
.md-card .md-card-header .md-avatar {
      margin-right: 16px;
      float: left;
}
.md-card .md-card-header .md-avatar ~ .md-title {
        font-size: 14px;
}
.md-card .md-card-header .md-avatar ~ .md-title,
      .md-card .md-card-header .md-avatar ~ .md-subhead {
        font-weight: 500;
        line-height: 20px;
}
.md-card .md-card-header .md-button {
      margin: 0;
}
.md-card .md-card-header .md-button:last-child {
        margin-right: -4px;
}
.md-card .md-card-header .md-button + .md-button {
        margin-left: 8px;
}
.md-card .md-card-header .md-card-header-text {
      -ms-flex: 1;
          flex: 1;
}
.md-card .md-card-header .md-card-media {
      width: 80px;
      -ms-flex: 0 0 80px;
          flex: 0 0 80px;
      height: 80px;
      margin-left: 16px;
}
.md-card .md-card-header .md-card-media.md-medium {
        width: 120px;
        -ms-flex: 0 0 120px;
            flex: 0 0 120px;
        height: 120px;
}
.md-card .md-card-header .md-card-media.md-big {
        width: 160px;
        -ms-flex: 0 0 160px;
            flex: 0 0 160px;
        height: 160px;
}
.md-card .md-subhead,
  .md-card .md-title,
  .md-card .md-subheading {
    margin: 0;
    font-weight: 400;
}
.md-card .md-subhead {
    opacity: .54;
    font-size: 14px;
    letter-spacing: .01em;
    line-height: 20px;
}
.md-card .md-subhead + .md-title {
      margin-top: 4px;
}
.md-card .md-title {
    font-size: 24px;
    letter-spacing: 0;
    line-height: 32px;
}
.md-card .md-card-media-actions {
    padding: 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: justify;
        justify-content: space-between;
}
.md-card .md-card-media-actions .md-card-media {
      max-width: 240px;
      max-height: 240px;
      -ms-flex: 1;
          flex: 1;
}
.md-card .md-card-media-actions .md-card-actions {
      margin-left: 16px;
      -ms-flex-direction: column;
          flex-direction: column;
      -ms-flex-pack: start;
          justify-content: flex-start;
      -ms-flex-align: center;
          align-items: center;
}
.md-card .md-card-media-actions .md-card-actions .md-button + .md-button {
        margin: 8px 0 0;
}
.md-card .md-card-content {
    padding: 16px;
    font-size: 14px;
    line-height: 22px;
}
.md-card .md-card-content:last-child {
      padding-bottom: 24px;
}
.md-card .md-card-actions {
    padding: 8px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: end;
        justify-content: flex-end;
    -ms-flex-align: center;
        align-items: center;
}
.md-card .md-card-actions .md-button {
      margin: 0;
}
.md-card .md-card-actions .md-button:first-child {
        margin-left: 0;
}
.md-card .md-card-actions .md-button:last-child {
        margin-right: 0;
}
.md-card .md-card-actions .md-button + .md-button {
        margin-left: 4px;
}
.md-card .md-card-area {
    position: relative;
}
.md-card > .md-card-area:not(:last-child) {
    position: relative;
}
.md-card > .md-card-area:not(:last-child):after {
      height: 1px;
      position: absolute;
      bottom: 0;
      content: " ";
}
.md-card > .md-card-area:not(:last-child):not(.md-inset):after {
      right: 0;
      left: 0;
}
.md-card > .md-card-area:not(:last-child).md-inset:after {
      right: 16px;
      left: 16px;
}
.md-card .md-card-media-cover {
    position: relative;
    color: #fff;
}
.md-card .md-card-media-cover.md-text-scrim .md-card-backdrop {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 1;
}
.md-card .md-card-media-cover .md-card-area {
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 2;
}
.md-card .md-card-media-cover .md-card-header + .md-card-actions {
      padding-top: 0;
}
.md-card .md-card-media-cover .md-subhead {
      opacity: 1;
}
.md-card .md-card-expand {
    overflow: hidden;
}
.md-card .md-card-expand.md-active [md-expand-trigger] {
      transform: rotateZ(180deg) translate3D(0, 0, 0);
}
.md-card .md-card-expand.md-active .md-card-content {
      margin-top: 0 !important;
      opacity: 1;
      padding: 4px 16px 24px 16px;
      height: auto;
}
.md-card .md-card-expand .md-card-actions {
      padding-top: 0;
      position: relative;
      z-index: 2;
}
.md-card .md-card-expand [md-expand-trigger] {
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      will-change: transform;
}
.md-card .md-card-expand .md-card-content {
      height: 0;
      padding: 0 16px;
      position: relative;
      z-index: 1;
      opacity: 0;
      transform: translate3D(0, 0, 0);
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      will-change: margin, height;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-checkbox {
  width: auto;
  margin: 16px 8px 16px 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  position: relative;
}
.md-checkbox:not(.md-disabled) {
    cursor: pointer;
}
.md-checkbox:not(.md-disabled) .md-checkbox-label {
      cursor: pointer;
}
.md-checkbox .md-checkbox-container {
    width: 20px;
    min-width: 20px;
    height: 20px;
    position: relative;
    border-radius: 2px;
    border: 2px solid rgba(0, 0, 0, 0.54);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-checkbox .md-checkbox-container:focus {
      outline: none;
}
.md-checkbox .md-checkbox-container:before {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
      content: " ";
}
.md-checkbox .md-checkbox-container:after {
      width: 6px;
      height: 13px;
      position: absolute;
      top: 0;
      left: 5px;
      border: 2px solid #fff;
      border-top: 0;
      border-left: 0;
      opacity: 0;
      transform: rotate(45deg) scale3D(0.15, 0.15, 1);
      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
      content: " ";
}
.md-checkbox .md-checkbox-container input {
      position: absolute;
      left: -999em;
}
.md-checkbox .md-checkbox-container .md-ink-ripple {
      top: -16px;
      right: -16px;
      bottom: -16px;
      left: -16px;
      border-radius: 50%;
      color: rgba(0, 0, 0, 0.54);
}
.md-checkbox .md-checkbox-container .md-ink-ripple .md-ripple {
        width: 48px !important;
        height: 48px !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
}
.md-checkbox .md-checkbox-label {
    height: 20px;
    padding-left: 8px;
    line-height: 20px;
}
.md-checkbox.md-checked .md-checkbox-container:after {
  opacity: 1;
  transform: rotate(45deg) scale3D(1, 1, 1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-chip {
  height: 32px;
  padding: 8px 12px;
  display: inline-block;
  border-radius: 32px;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  font-size: 13px;
  line-height: 16px;
  white-space: nowrap;
}
.md-chip.md-deletable {
    position: relative;
    padding-right: 32px;
}
.md-chip.md-editable .md-chip-container {
    cursor: pointer;
}
.md-chip:focus, .md-chip:active {
    outline: none;
}
.md-chip:focus:not(.md-disabled), .md-chip:active:not(.md-disabled) {
      cursor: pointer;
      box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.md-chip.md-disabled .md-button {
    pointer-events: none;
    cursor: default;
}
.md-chip .md-button.md-delete {
    width: 24px;
    min-width: 24px;
    height: 24px;
    min-height: 24px;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 4px;
    right: 4px;
    border-radius: 24px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-chip .md-button.md-delete .md-icon {
      width: 20px;
      min-width: 20px;
      height: 20px;
      min-height: 20px;
      margin: 0;
      font-size: 20px;
}
.md-chip .md-button.md-delete .md-ink-ripple {
      border-radius: 32px;
}
.md-chip .md-button.md-delete .md-ripple {
      opacity: .54;
}
.md-chips {
  min-height: 54px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
}
.md-chips .md-chip {
    margin-right: 8px;
    margin-bottom: 4px;
}
.md-chips .md-input {
    width: 128px;
    -ms-flex: 1;
        flex: 1;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-dialog-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
      flex-flow: column;
  -ms-flex-pack: center;
      justify-content: center;
  -ms-flex-align: center;
      align-items: center;
  pointer-events: none;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 108;
}
.md-dialog-container.md-active {
    pointer-events: auto;
}
.md-dialog-container.md-active .md-dialog {
      opacity: 1 !important;
      transform: scale(1) !important;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transition-property: opacity, transform;
}
.md-dialog-backdrop {
  position: fixed;
  z-index: 109;
}
.md-dialog {
  min-width: 280px;
  max-width: 80%;
  max-height: 80%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
      flex-flow: column;
  overflow: hidden;
  position: relative;
  z-index: 110;
  outline: none;
  border-radius: 2px;
  opacity: 0;
  box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12);
  transform: scale(0.9, 0.85);
  transform-origin: center center;
  transition: opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.4s 0.05s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: opacity, transform;
}
.md-dialog.md-reference {
    transform-origin: top center;
}
.md-dialog.md-transition-off {
    transition: none !important;
}
.md-dialog p {
    margin: 0;
}
.md-dialog-title {
  margin-bottom: 20px;
  padding: 24px 24px 0;
}
.md-dialog-content {
  padding: 0 24px 24px;
  -ms-flex: 1;
      flex: 1;
  -ms-flex-preferred-size: auto;
      flex-basis: auto;
  overflow: auto;
  position: relative;
}
.md-dialog-content:first-child {
    padding-top: 24px;
}
.md-dialog-content p:first-child:not(:only-child) {
    margin-top: 0;
}
.md-dialog-content p:last-child:not(:only-child) {
    margin-bottom: 0;
}
.md-dialog-body {
  margin: 0 -24px;
  padding: 0 24px;
  overflow: auto;
}
.md-dialog-actions {
  min-height: 52px;
  padding: 8px 8px 8px 24px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-pack: end;
      justify-content: flex-end;
  position: relative;
}
.md-dialog-actions:before {
    height: 1px;
    position: absolute;
    top: -1px;
    right: 0;
    left: 0;
    content: " ";
}
.md-dialog-actions .md-button {
    min-width: 64px;
    margin: 0;
    padding: 0 8px;
}
.md-dialog-actions .md-button + .md-button {
      margin-left: 8px;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-divider {
  height: 1px;
  margin: 0;
  padding: 0;
  display: block;
  border: 0;
  background-color: rgba(0, 0, 0, 0.12);
}
.md-divider.md-inset {
    margin-left: 72px;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-file {
  display: -ms-flexbox;
  display: flex;
  -ms-flex: 1;
      flex: 1;
}
.md-file input[type="file"] {
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    position: absolute;
    clip: rect(0 0 0 0);
    border: 0;
}
.md-file .md-icon {
    cursor: pointer;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-icon {
  width: 24px;
  min-width: 24px;
  height: 24px;
  min-height: 24px;
  font-size: 24px;
  margin: auto;
  display: -ms-inline-flexbox;
  display: inline-flex;
  -ms-flex-align: center;
      align-items: center;
  fill: currentColor;
  text-rendering: optimizeLegibility;
  vertical-align: middle;
}
.md-icon.md-size-2x {
    width: 48px;
    min-width: 48px;
    height: 48px;
    min-height: 48px;
    font-size: 48px;
}
.md-icon.md-size-3x {
    width: 72px;
    min-width: 72px;
    height: 72px;
    min-height: 72px;
    font-size: 72px;
}
.md-icon.md-size-4x {
    width: 96px;
    min-width: 96px;
    height: 96px;
    min-height: 96px;
    font-size: 96px;
}
.md-icon.md-size-5x {
    width: 120px;
    min-width: 120px;
    height: 120px;
    min-height: 120px;
    font-size: 120px;
}
.md-icon svg {
    width: 100%;
    height: 100%;
}
img.md-icon {
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-user-drag: none;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-image {
  opacity: 0;
  -webkit-filter: saturate(20%);
          filter: saturate(20%);
}
.md-image.md-black-output {
    -webkit-filter: brightness(0.4) saturate(20%);
            filter: brightness(0.4) saturate(20%);
}
.md-image.md-loaded {
    opacity: 1;
    -webkit-filter: saturate(100%);
            filter: saturate(100%);
    transition: opacity 1.1s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-filter 2.2s 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition: opacity 1.1s cubic-bezier(0.25, 0.8, 0.25, 1), filter 2.2s 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition: opacity 1.1s cubic-bezier(0.25, 0.8, 0.25, 1), filter 2.2s 0.3s cubic-bezier(0.25, 0.8, 0.25, 1), -webkit-filter 2.2s 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-input-container {
  width: 100%;
  min-height: 48px;
  margin: 4px 0 24px;
  padding-top: 16px;
  display: -ms-flexbox;
  display: flex;
  position: relative;
}
.md-input-container:after {
    height: 1px;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.12);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    content: " ";
}
.md-input-container label {
    position: absolute;
    top: 23px;
    left: 0;
    pointer-events: none;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: .3s;
    color: rgba(0, 0, 0, 0.54);
    font-size: 16px;
    line-height: 20px;
}
.md-input-container input,
  .md-input-container textarea {
    width: 100%;
    height: 32px;
    padding: 0;
    display: block;
    -ms-flex: 1;
        flex: 1;
    border: none;
    background: none;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-property: font-size;
    color: rgba(0, 0, 0, 0.54);
    font-family: inherit;
    font-size: 1px;
    line-height: 32px;
}
.md-input-container input:focus,
    .md-input-container textarea:focus {
      outline: none;
}
.md-input-container input::-webkit-input-placeholder,
    .md-input-container textarea::-webkit-input-placeholder {
      color: rgba(0, 0, 0, 0.54);
      font-size: 16px;
      text-shadow: none;
      -webkit-text-fill-color: initial;
}
.md-input-container input ~ .md-icon:not(.md-icon-delete),
    .md-input-container textarea ~ .md-icon:not(.md-icon-delete) {
      margin-left: 12px;
}
.md-input-container input ~ .md-icon:not(.md-icon-delete):after,
      .md-input-container textarea ~ .md-icon:not(.md-icon-delete):after {
        right: 0;
        left: auto;
}
.md-input-container textarea {
    min-height: 32px;
    max-height: 230px;
    padding: 5px 0;
    resize: none;
    line-height: 1.3em;
}
.md-input-container .md-error,
  .md-input-container .md-count {
    height: 20px;
    position: absolute;
    bottom: -22px;
    font-size: 12px;
}
.md-input-container .md-error {
    display: block !important;
    left: 0;
    opacity: 0;
    transform: translate3d(0, -8px, 0);
    transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
}
.md-input-container .md-count {
    right: 0;
}
.md-input-container .md-icon:not(.md-icon-delete) {
    margin: 4px auto;
    color: rgba(0, 0, 0, 0.54);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-input-container .md-icon:not(.md-icon-delete):after {
      width: 36px;
      height: 2px;
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 2;
      content: "";
}
.md-input-container .md-icon:not(.md-icon-delete) ~ label {
      left: 36px;
}
.md-input-container .md-icon:not(.md-icon-delete) ~ .md-input,
    .md-input-container .md-icon:not(.md-icon-delete) ~ .md-textarea,
    .md-input-container .md-icon:not(.md-icon-delete) ~ .md-file {
      margin-left: 12px;
}
.md-input-container .md-autocomplete,
.md-input-container .md-autocomplete .md-menu,
.md-input-container .md-autocomplete .md-menu .md-input {
  width: 100%;
}
.md-theme-default.md-input-container .md-autocomplete .md-icon:not(.md-icon-search):after {
  height: 0;
}
.md-input-container.md-input-placeholder label {
  pointer-events: auto;
  top: 10px;
  opacity: 0;
  font-size: 12px;
}
.md-input-container.md-input-placeholder input,
.md-input-container.md-input-placeholder textarea {
  font-size: 16px;
}
.md-input-container.md-input-focused label, .md-input-container.md-has-value label {
  pointer-events: auto;
  top: 0;
  opacity: 1;
  font-size: 12px;
}
.md-input-container.md-input-focused input,
.md-input-container.md-input-focused textarea, .md-input-container.md-has-value input,
.md-input-container.md-has-value textarea {
  font-size: 16px;
}
.md-input-container.md-has-value input,
.md-input-container.md-has-value textarea {
  color: rgba(0, 0, 0, 0.87);
}
.md-input-container.md-input-inline label {
  pointer-events: none;
}
.md-input-container.md-input-inline.md-input-focused label {
  top: 23px;
  font-size: 16px;
}
.md-input-container.md-input-inline.md-has-value label {
  opacity: 0;
}
.md-input-container.md-input-disabled:after {
  background: bottom left repeat-x;
  background-image: linear-gradient(to right, rgba(0, 0, 0, 0.38) 0%, rgba(0, 0, 0, 0.38) 33%, transparent 0%);
  background-size: 4px 1px;
}
.md-input-container.md-input-disabled label,
.md-input-container.md-input-disabled input,
.md-input-container.md-input-disabled textarea {
  color: rgba(0, 0, 0, 0.38);
}
.md-input-container.md-has-password.md-input-focused .md-toggle-password {
  color: rgba(0, 0, 0, 0.54);
}
.md-input-container.md-has-password .md-toggle-password {
  margin: 0;
  position: absolute;
  right: 0;
  bottom: -2px;
  color: rgba(0, 0, 0, 0.38);
}
.md-input-container.md-has-password .md-toggle-password .md-ink-ripple {
    color: rgba(0, 0, 0, 0.87);
}
.md-input-container.md-clearable.md-input-focused .md-clear-input {
  color: rgba(0, 0, 0, 0.54);
}
.md-input-container.md-clearable .md-clear-input {
  margin: 0;
  position: absolute;
  right: 0;
  bottom: -2px;
  color: rgba(0, 0, 0, 0.38);
}
.md-input-container.md-clearable .md-clear-input .md-ink-ripple {
    color: rgba(0, 0, 0, 0.87);
}
.md-input-container.md-input-invalid .md-error {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}
.md-input-container.md-input-required label:after {
  position: absolute;
  top: 2px;
  right: 0;
  transform: translateX(calc(100% + 2px));
  content: "*";
  font-size: 12px;
  line-height: 1em;
  vertical-align: top;
}
.md-input-container.md-has-select:hover .md-select:not(.md-disabled):after {
  color: rgba(0, 0, 0, 0.87);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/* Image aspect ratio calculator */
/* Responsive breakpoints */
/* Rows and Columns */
.md-layout {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: row;
      flex-direction: row;
  -ms-flex-wrap: wrap;
      flex-wrap: wrap;
  -ms-flex: 1;
      flex: 1;
}
.md-row {
  -ms-flex-direction: row;
      flex-direction: row;
}
.md-column {
  -ms-flex-direction: column;
      flex-direction: column;
}

/* Container */
.md-layout.md-container {
  width: 100%;
  max-width: 1200px;
}
.md-layout.md-container.md-centered {
    margin: 0 auto;
}

/* Alignments */
.md-align-start {
  -ms-flex-pack: start;
      justify-content: flex-start;
}
.md-align-center {
  -ms-flex-pack: center;
      justify-content: center;
}
.md-align-end {
  -ms-flex-pack: end;
      justify-content: flex-end;
}

/* Vertical Alignments */
.md-vertical-align-start {
  -ms-flex-align: start;
      align-items: flex-start;
  -ms-flex-line-pack: start;
      align-content: flex-start;
}
.md-vertical-align-center {
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-line-pack: center;
      align-content: center;
}
.md-vertical-align-end {
  -ms-flex-align: end;
      align-items: flex-end;
  -ms-flex-line-pack: end;
      align-content: flex-end;
}
.md-vertical-align-stretch {
  -ms-flex-align: stretch;
      align-items: stretch;
  -ms-flex-line-pack: stretch;
      align-content: stretch;
}

/* Gutter Size */
.md-gutter:not(.md-column) {
  margin-right: -12px;
  margin-left: -12px;
}
.md-gutter:not(.md-column) > .md-layout {
    padding-right: 12px;
    padding-left: 12px;
}
.md-gutter .md-column {
  margin-top: -12px;
  margin-bottom: -12px;
}
.md-gutter .md-column > .md-layout {
    padding-top: 12px;
    padding-bottom: 12px;
}
.md-gutter-8:not(.md-column) {
  margin-right: -4px;
  margin-left: -4px;
}
.md-gutter-8:not(.md-column) > .md-layout {
    padding-right: 4px;
    padding-left: 4px;
}
.md-gutter-8 .md-column {
  margin-top: -4px;
  margin-bottom: -4px;
}
.md-gutter-8 .md-column > .md-layout {
    padding-top: 4px;
    padding-bottom: 4px;
}
.md-gutter-16:not(.md-column) {
  margin-right: -8px;
  margin-left: -8px;
}
.md-gutter-16:not(.md-column) > .md-layout {
    padding-right: 8px;
    padding-left: 8px;
}
.md-gutter-16 .md-column {
  margin-top: -8px;
  margin-bottom: -8px;
}
.md-gutter-16 .md-column > .md-layout {
    padding-top: 8px;
    padding-bottom: 8px;
}
.md-gutter-24:not(.md-column) {
  margin-right: -12px;
  margin-left: -12px;
}
.md-gutter-24:not(.md-column) > .md-layout {
    padding-right: 12px;
    padding-left: 12px;
}
.md-gutter-24 .md-column {
  margin-top: -12px;
  margin-bottom: -12px;
}
.md-gutter-24 .md-column > .md-layout {
    padding-top: 12px;
    padding-bottom: 12px;
}
.md-gutter-40:not(.md-column) {
  margin-right: -20px;
  margin-left: -20px;
}
.md-gutter-40:not(.md-column) > .md-layout {
    padding-right: 20px;
    padding-left: 20px;
}
.md-gutter-40 .md-column {
  margin-top: -20px;
  margin-bottom: -20px;
}
.md-gutter-40 .md-column > .md-layout {
    padding-top: 20px;
    padding-bottom: 20px;
}

/* Flex Size */
.md-flex {
  -ms-flex: 1 1;
      flex: 1 1;
}
.md-flex-33 {
  min-width: 33.33333%;
  -ms-flex: 0 1 33.33333%;
      flex: 0 1 33.33333%;
}
.md-flex-66 {
  min-width: 33.33333%;
  -ms-flex: 0 1 66.66666%;
      flex: 0 1 66.66666%;
}
.md-flex-offset-33 {
  margin-left: 33.33333%;
}
.md-flex-offset-66 {
  margin-left: 66.66666%;
}
.md-flex-5 {
  min-width: 5%;
  -ms-flex: 0 1 5%;
      flex: 0 1 5%;
}
.md-flex-offset-5 {
  margin-left: 5%;
}
.md-flex-10 {
  min-width: 10%;
  -ms-flex: 0 1 10%;
      flex: 0 1 10%;
}
.md-flex-offset-10 {
  margin-left: 10%;
}
.md-flex-15 {
  min-width: 15%;
  -ms-flex: 0 1 15%;
      flex: 0 1 15%;
}
.md-flex-offset-15 {
  margin-left: 15%;
}
.md-flex-20 {
  min-width: 20%;
  -ms-flex: 0 1 20%;
      flex: 0 1 20%;
}
.md-flex-offset-20 {
  margin-left: 20%;
}
.md-flex-25 {
  min-width: 25%;
  -ms-flex: 0 1 25%;
      flex: 0 1 25%;
}
.md-flex-offset-25 {
  margin-left: 25%;
}
.md-flex-30 {
  min-width: 30%;
  -ms-flex: 0 1 30%;
      flex: 0 1 30%;
}
.md-flex-offset-30 {
  margin-left: 30%;
}
.md-flex-35 {
  min-width: 35%;
  -ms-flex: 0 1 35%;
      flex: 0 1 35%;
}
.md-flex-offset-35 {
  margin-left: 35%;
}
.md-flex-40 {
  min-width: 40%;
  -ms-flex: 0 1 40%;
      flex: 0 1 40%;
}
.md-flex-offset-40 {
  margin-left: 40%;
}
.md-flex-45 {
  min-width: 45%;
  -ms-flex: 0 1 45%;
      flex: 0 1 45%;
}
.md-flex-offset-45 {
  margin-left: 45%;
}
.md-flex-50 {
  min-width: 50%;
  -ms-flex: 0 1 50%;
      flex: 0 1 50%;
}
.md-flex-offset-50 {
  margin-left: 50%;
}
.md-flex-55 {
  min-width: 55%;
  -ms-flex: 0 1 55%;
      flex: 0 1 55%;
}
.md-flex-offset-55 {
  margin-left: 55%;
}
.md-flex-60 {
  min-width: 60%;
  -ms-flex: 0 1 60%;
      flex: 0 1 60%;
}
.md-flex-offset-60 {
  margin-left: 60%;
}
.md-flex-65 {
  min-width: 65%;
  -ms-flex: 0 1 65%;
      flex: 0 1 65%;
}
.md-flex-offset-65 {
  margin-left: 65%;
}
.md-flex-70 {
  min-width: 70%;
  -ms-flex: 0 1 70%;
      flex: 0 1 70%;
}
.md-flex-offset-70 {
  margin-left: 70%;
}
.md-flex-75 {
  min-width: 75%;
  -ms-flex: 0 1 75%;
      flex: 0 1 75%;
}
.md-flex-offset-75 {
  margin-left: 75%;
}
.md-flex-80 {
  min-width: 80%;
  -ms-flex: 0 1 80%;
      flex: 0 1 80%;
}
.md-flex-offset-80 {
  margin-left: 80%;
}
.md-flex-85 {
  min-width: 85%;
  -ms-flex: 0 1 85%;
      flex: 0 1 85%;
}
.md-flex-offset-85 {
  margin-left: 85%;
}
.md-flex-90 {
  min-width: 90%;
  -ms-flex: 0 1 90%;
      flex: 0 1 90%;
}
.md-flex-offset-90 {
  margin-left: 90%;
}
.md-flex-95 {
  min-width: 95%;
  -ms-flex: 0 1 95%;
      flex: 0 1 95%;
}
.md-flex-offset-95 {
  margin-left: 95%;
}
.md-flex-100 {
  min-width: 100%;
  -ms-flex: 0 1 100%;
      flex: 0 1 100%;
}
.md-flex-offset-100 {
  margin-left: 100%;
}

/* Responsive Breakpoints */

@media (max-width: 944px) {
  .md-gutter:not(.md-column) {
    margin-right: -8px;
    margin-left: -8px;
  }
  .md-gutter:not(.md-column) > .md-layout {
    padding-right: 8px;
    padding-left: 8px;
  }
  .md-gutter .md-column {
    margin-top: -8px;
    margin-bottom: -8px;
  }
  .md-gutter .md-column > .md-layout {
    padding-top: 8px;
    padding-bottom: 8px;
  }
  .md-row-small {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-small {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-small {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-small-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-small-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-small-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-small-66 {
    margin-left: 66.66666%;
  }
  .md-flex-small-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-small-5 {
    margin-left: 5%;
  }
  .md-flex-small-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-small-10 {
    margin-left: 10%;
  }
  .md-flex-small-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-small-15 {
    margin-left: 15%;
  }
  .md-flex-small-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-small-20 {
    margin-left: 20%;
  }
  .md-flex-small-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-small-25 {
    margin-left: 25%;
  }
  .md-flex-small-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-small-30 {
    margin-left: 30%;
  }
  .md-flex-small-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-small-35 {
    margin-left: 35%;
  }
  .md-flex-small-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-small-40 {
    margin-left: 40%;
  }
  .md-flex-small-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-small-45 {
    margin-left: 45%;
  }
  .md-flex-small-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-small-50 {
    margin-left: 50%;
  }
  .md-flex-small-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-small-55 {
    margin-left: 55%;
  }
  .md-flex-small-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-small-60 {
    margin-left: 60%;
  }
  .md-flex-small-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-small-65 {
    margin-left: 65%;
  }
  .md-flex-small-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-small-70 {
    margin-left: 70%;
  }
  .md-flex-small-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-small-75 {
    margin-left: 75%;
  }
  .md-flex-small-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-small-80 {
    margin-left: 80%;
  }
  .md-flex-small-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-small-85 {
    margin-left: 85%;
  }
  .md-flex-small-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-small-90 {
    margin-left: 90%;
  }
  .md-flex-small-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-small-95 {
    margin-left: 95%;
  }
  .md-flex-small-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-small-100 {
    margin-left: 100%;
  }
  .md-align-small-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-small-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-small-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-small {
    display: none;
  }
}

@media (min-width: 1904px) {
  .md-row-xlarge {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-xlarge {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-xlarge {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-xlarge-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-xlarge-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-xlarge-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-xlarge-66 {
    margin-left: 66.66666%;
  }
  .md-flex-xlarge-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-xlarge-5 {
    margin-left: 5%;
  }
  .md-flex-xlarge-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-xlarge-10 {
    margin-left: 10%;
  }
  .md-flex-xlarge-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-xlarge-15 {
    margin-left: 15%;
  }
  .md-flex-xlarge-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-xlarge-20 {
    margin-left: 20%;
  }
  .md-flex-xlarge-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-xlarge-25 {
    margin-left: 25%;
  }
  .md-flex-xlarge-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-xlarge-30 {
    margin-left: 30%;
  }
  .md-flex-xlarge-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-xlarge-35 {
    margin-left: 35%;
  }
  .md-flex-xlarge-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-xlarge-40 {
    margin-left: 40%;
  }
  .md-flex-xlarge-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-xlarge-45 {
    margin-left: 45%;
  }
  .md-flex-xlarge-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-xlarge-50 {
    margin-left: 50%;
  }
  .md-flex-xlarge-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-xlarge-55 {
    margin-left: 55%;
  }
  .md-flex-xlarge-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-xlarge-60 {
    margin-left: 60%;
  }
  .md-flex-xlarge-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-xlarge-65 {
    margin-left: 65%;
  }
  .md-flex-xlarge-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-xlarge-70 {
    margin-left: 70%;
  }
  .md-flex-xlarge-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-xlarge-75 {
    margin-left: 75%;
  }
  .md-flex-xlarge-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-xlarge-80 {
    margin-left: 80%;
  }
  .md-flex-xlarge-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-xlarge-85 {
    margin-left: 85%;
  }
  .md-flex-xlarge-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-xlarge-90 {
    margin-left: 90%;
  }
  .md-flex-xlarge-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-xlarge-95 {
    margin-left: 95%;
  }
  .md-flex-xlarge-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-xlarge-100 {
    margin-left: 100%;
  }
  .md-align-xlarge-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-xlarge-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-xlarge-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-xlarge {
    display: none;
  }
}

@media (max-width: 1903px) {
  .md-row-large {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-large {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-large {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-large-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-large-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-large-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-large-66 {
    margin-left: 66.66666%;
  }
  .md-flex-large-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-large-5 {
    margin-left: 5%;
  }
  .md-flex-large-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-large-10 {
    margin-left: 10%;
  }
  .md-flex-large-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-large-15 {
    margin-left: 15%;
  }
  .md-flex-large-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-large-20 {
    margin-left: 20%;
  }
  .md-flex-large-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-large-25 {
    margin-left: 25%;
  }
  .md-flex-large-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-large-30 {
    margin-left: 30%;
  }
  .md-flex-large-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-large-35 {
    margin-left: 35%;
  }
  .md-flex-large-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-large-40 {
    margin-left: 40%;
  }
  .md-flex-large-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-large-45 {
    margin-left: 45%;
  }
  .md-flex-large-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-large-50 {
    margin-left: 50%;
  }
  .md-flex-large-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-large-55 {
    margin-left: 55%;
  }
  .md-flex-large-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-large-60 {
    margin-left: 60%;
  }
  .md-flex-large-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-large-65 {
    margin-left: 65%;
  }
  .md-flex-large-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-large-70 {
    margin-left: 70%;
  }
  .md-flex-large-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-large-75 {
    margin-left: 75%;
  }
  .md-flex-large-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-large-80 {
    margin-left: 80%;
  }
  .md-flex-large-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-large-85 {
    margin-left: 85%;
  }
  .md-flex-large-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-large-90 {
    margin-left: 90%;
  }
  .md-flex-large-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-large-95 {
    margin-left: 95%;
  }
  .md-flex-large-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-large-100 {
    margin-left: 100%;
  }
  .md-align-large-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-large-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-large-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-large {
    display: none;
  }
}

@media (max-width: 1264px) {
  .md-row-medium {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-medium {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-medium {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-medium-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-medium-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-medium-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-medium-66 {
    margin-left: 66.66666%;
  }
  .md-flex-medium-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-medium-5 {
    margin-left: 5%;
  }
  .md-flex-medium-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-medium-10 {
    margin-left: 10%;
  }
  .md-flex-medium-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-medium-15 {
    margin-left: 15%;
  }
  .md-flex-medium-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-medium-20 {
    margin-left: 20%;
  }
  .md-flex-medium-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-medium-25 {
    margin-left: 25%;
  }
  .md-flex-medium-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-medium-30 {
    margin-left: 30%;
  }
  .md-flex-medium-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-medium-35 {
    margin-left: 35%;
  }
  .md-flex-medium-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-medium-40 {
    margin-left: 40%;
  }
  .md-flex-medium-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-medium-45 {
    margin-left: 45%;
  }
  .md-flex-medium-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-medium-50 {
    margin-left: 50%;
  }
  .md-flex-medium-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-medium-55 {
    margin-left: 55%;
  }
  .md-flex-medium-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-medium-60 {
    margin-left: 60%;
  }
  .md-flex-medium-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-medium-65 {
    margin-left: 65%;
  }
  .md-flex-medium-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-medium-70 {
    margin-left: 70%;
  }
  .md-flex-medium-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-medium-75 {
    margin-left: 75%;
  }
  .md-flex-medium-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-medium-80 {
    margin-left: 80%;
  }
  .md-flex-medium-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-medium-85 {
    margin-left: 85%;
  }
  .md-flex-medium-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-medium-90 {
    margin-left: 90%;
  }
  .md-flex-medium-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-medium-95 {
    margin-left: 95%;
  }
  .md-flex-medium-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-medium-100 {
    margin-left: 100%;
  }
  .md-align-medium-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-medium-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-medium-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-medium {
    display: none;
  }
}

@media (max-width: 600px) {
  .md-row-xsmall {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-xsmall {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-xsmall {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-xsmall-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-xsmall-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-xsmall-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-xsmall-66 {
    margin-left: 66.66666%;
  }
  .md-flex-xsmall-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-xsmall-5 {
    margin-left: 5%;
  }
  .md-flex-xsmall-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-xsmall-10 {
    margin-left: 10%;
  }
  .md-flex-xsmall-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-xsmall-15 {
    margin-left: 15%;
  }
  .md-flex-xsmall-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-xsmall-20 {
    margin-left: 20%;
  }
  .md-flex-xsmall-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-xsmall-25 {
    margin-left: 25%;
  }
  .md-flex-xsmall-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-xsmall-30 {
    margin-left: 30%;
  }
  .md-flex-xsmall-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-xsmall-35 {
    margin-left: 35%;
  }
  .md-flex-xsmall-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-xsmall-40 {
    margin-left: 40%;
  }
  .md-flex-xsmall-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-xsmall-45 {
    margin-left: 45%;
  }
  .md-flex-xsmall-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-xsmall-50 {
    margin-left: 50%;
  }
  .md-flex-xsmall-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-xsmall-55 {
    margin-left: 55%;
  }
  .md-flex-xsmall-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-xsmall-60 {
    margin-left: 60%;
  }
  .md-flex-xsmall-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-xsmall-65 {
    margin-left: 65%;
  }
  .md-flex-xsmall-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-xsmall-70 {
    margin-left: 70%;
  }
  .md-flex-xsmall-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-xsmall-75 {
    margin-left: 75%;
  }
  .md-flex-xsmall-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-xsmall-80 {
    margin-left: 80%;
  }
  .md-flex-xsmall-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-xsmall-85 {
    margin-left: 85%;
  }
  .md-flex-xsmall-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-xsmall-90 {
    margin-left: 90%;
  }
  .md-flex-xsmall-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-xsmall-95 {
    margin-left: 95%;
  }
  .md-flex-xsmall-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-xsmall-100 {
    margin-left: 100%;
  }
  .md-align-xsmall-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-xsmall-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-xsmall-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-xsmall {
    display: none;
  }
}

@media (min-width: 1264px) {
  .md-row-large-and-up {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-large-and-up {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-large-and-up {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-large-and-up-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-large-and-up-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-large-and-up-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-large-and-up-66 {
    margin-left: 66.66666%;
  }
  .md-flex-large-and-up-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-large-and-up-5 {
    margin-left: 5%;
  }
  .md-flex-large-and-up-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-large-and-up-10 {
    margin-left: 10%;
  }
  .md-flex-large-and-up-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-large-and-up-15 {
    margin-left: 15%;
  }
  .md-flex-large-and-up-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-large-and-up-20 {
    margin-left: 20%;
  }
  .md-flex-large-and-up-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-large-and-up-25 {
    margin-left: 25%;
  }
  .md-flex-large-and-up-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-large-and-up-30 {
    margin-left: 30%;
  }
  .md-flex-large-and-up-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-large-and-up-35 {
    margin-left: 35%;
  }
  .md-flex-large-and-up-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-large-and-up-40 {
    margin-left: 40%;
  }
  .md-flex-large-and-up-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-large-and-up-45 {
    margin-left: 45%;
  }
  .md-flex-large-and-up-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-large-and-up-50 {
    margin-left: 50%;
  }
  .md-flex-large-and-up-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-large-and-up-55 {
    margin-left: 55%;
  }
  .md-flex-large-and-up-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-large-and-up-60 {
    margin-left: 60%;
  }
  .md-flex-large-and-up-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-large-and-up-65 {
    margin-left: 65%;
  }
  .md-flex-large-and-up-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-large-and-up-70 {
    margin-left: 70%;
  }
  .md-flex-large-and-up-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-large-and-up-75 {
    margin-left: 75%;
  }
  .md-flex-large-and-up-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-large-and-up-80 {
    margin-left: 80%;
  }
  .md-flex-large-and-up-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-large-and-up-85 {
    margin-left: 85%;
  }
  .md-flex-large-and-up-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-large-and-up-90 {
    margin-left: 90%;
  }
  .md-flex-large-and-up-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-large-and-up-95 {
    margin-left: 95%;
  }
  .md-flex-large-and-up-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-large-and-up-100 {
    margin-left: 100%;
  }
  .md-align-large-and-up-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-large-and-up-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-large-and-up-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-large-and-up {
    display: none;
  }
}

@media (min-width: 944px) {
  .md-row-medium-and-up {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-medium-and-up {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-medium-and-up {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-medium-and-up-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-medium-and-up-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-medium-and-up-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-medium-and-up-66 {
    margin-left: 66.66666%;
  }
  .md-flex-medium-and-up-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-medium-and-up-5 {
    margin-left: 5%;
  }
  .md-flex-medium-and-up-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-medium-and-up-10 {
    margin-left: 10%;
  }
  .md-flex-medium-and-up-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-medium-and-up-15 {
    margin-left: 15%;
  }
  .md-flex-medium-and-up-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-medium-and-up-20 {
    margin-left: 20%;
  }
  .md-flex-medium-and-up-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-medium-and-up-25 {
    margin-left: 25%;
  }
  .md-flex-medium-and-up-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-medium-and-up-30 {
    margin-left: 30%;
  }
  .md-flex-medium-and-up-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-medium-and-up-35 {
    margin-left: 35%;
  }
  .md-flex-medium-and-up-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-medium-and-up-40 {
    margin-left: 40%;
  }
  .md-flex-medium-and-up-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-medium-and-up-45 {
    margin-left: 45%;
  }
  .md-flex-medium-and-up-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-medium-and-up-50 {
    margin-left: 50%;
  }
  .md-flex-medium-and-up-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-medium-and-up-55 {
    margin-left: 55%;
  }
  .md-flex-medium-and-up-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-medium-and-up-60 {
    margin-left: 60%;
  }
  .md-flex-medium-and-up-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-medium-and-up-65 {
    margin-left: 65%;
  }
  .md-flex-medium-and-up-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-medium-and-up-70 {
    margin-left: 70%;
  }
  .md-flex-medium-and-up-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-medium-and-up-75 {
    margin-left: 75%;
  }
  .md-flex-medium-and-up-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-medium-and-up-80 {
    margin-left: 80%;
  }
  .md-flex-medium-and-up-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-medium-and-up-85 {
    margin-left: 85%;
  }
  .md-flex-medium-and-up-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-medium-and-up-90 {
    margin-left: 90%;
  }
  .md-flex-medium-and-up-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-medium-and-up-95 {
    margin-left: 95%;
  }
  .md-flex-medium-and-up-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-medium-and-up-100 {
    margin-left: 100%;
  }
  .md-align-medium-and-up-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-medium-and-up-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-medium-and-up-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-medium-and-up {
    display: none;
  }
}

@media (min-width: 660px) {
  .md-row-small-and-up {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-small-and-up {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-small-and-up {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-small-and-up-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-small-and-up-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-small-and-up-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-small-and-up-66 {
    margin-left: 66.66666%;
  }
  .md-flex-small-and-up-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-small-and-up-5 {
    margin-left: 5%;
  }
  .md-flex-small-and-up-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-small-and-up-10 {
    margin-left: 10%;
  }
  .md-flex-small-and-up-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-small-and-up-15 {
    margin-left: 15%;
  }
  .md-flex-small-and-up-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-small-and-up-20 {
    margin-left: 20%;
  }
  .md-flex-small-and-up-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-small-and-up-25 {
    margin-left: 25%;
  }
  .md-flex-small-and-up-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-small-and-up-30 {
    margin-left: 30%;
  }
  .md-flex-small-and-up-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-small-and-up-35 {
    margin-left: 35%;
  }
  .md-flex-small-and-up-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-small-and-up-40 {
    margin-left: 40%;
  }
  .md-flex-small-and-up-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-small-and-up-45 {
    margin-left: 45%;
  }
  .md-flex-small-and-up-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-small-and-up-50 {
    margin-left: 50%;
  }
  .md-flex-small-and-up-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-small-and-up-55 {
    margin-left: 55%;
  }
  .md-flex-small-and-up-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-small-and-up-60 {
    margin-left: 60%;
  }
  .md-flex-small-and-up-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-small-and-up-65 {
    margin-left: 65%;
  }
  .md-flex-small-and-up-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-small-and-up-70 {
    margin-left: 70%;
  }
  .md-flex-small-and-up-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-small-and-up-75 {
    margin-left: 75%;
  }
  .md-flex-small-and-up-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-small-and-up-80 {
    margin-left: 80%;
  }
  .md-flex-small-and-up-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-small-and-up-85 {
    margin-left: 85%;
  }
  .md-flex-small-and-up-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-small-and-up-90 {
    margin-left: 90%;
  }
  .md-flex-small-and-up-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-small-and-up-95 {
    margin-left: 95%;
  }
  .md-flex-small-and-up-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-small-and-up-100 {
    margin-left: 100%;
  }
  .md-align-small-and-up-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-small-and-up-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-small-and-up-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-small-and-up {
    display: none;
  }
}

@media (min-width: 300px) {
  .md-row-xsmall-and-up {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .md-column-xsmall-and-up {
    -ms-flex-direction: column;
    flex-direction: column;
  }
  .md-flex-xsmall-and-up {
    -ms-flex: 1 1;
    flex: 1 1;
  }
  .md-flex-xsmall-and-up-33 {
    min-width: 33.33333%;
    -ms-flex: 0 1 33.33333%;
    flex: 0 1 33.33333%;
  }
  .md-flex-xsmall-and-up-66 {
    min-width: 33.33333%;
    -ms-flex: 0 1 66.66666%;
    flex: 0 1 66.66666%;
  }
  .md-flex-offset-xsmall-and-up-33 {
    margin-left: 33.33333%;
  }
  .md-flex-offset-xsmall-and-up-66 {
    margin-left: 66.66666%;
  }
  .md-flex-xsmall-and-up-5 {
    min-width: 5%;
    -ms-flex: 0 1 5%;
    flex: 0 1 5%;
  }
  .md-flex-offset-xsmall-and-up-5 {
    margin-left: 5%;
  }
  .md-flex-xsmall-and-up-10 {
    min-width: 10%;
    -ms-flex: 0 1 10%;
    flex: 0 1 10%;
  }
  .md-flex-offset-xsmall-and-up-10 {
    margin-left: 10%;
  }
  .md-flex-xsmall-and-up-15 {
    min-width: 15%;
    -ms-flex: 0 1 15%;
    flex: 0 1 15%;
  }
  .md-flex-offset-xsmall-and-up-15 {
    margin-left: 15%;
  }
  .md-flex-xsmall-and-up-20 {
    min-width: 20%;
    -ms-flex: 0 1 20%;
    flex: 0 1 20%;
  }
  .md-flex-offset-xsmall-and-up-20 {
    margin-left: 20%;
  }
  .md-flex-xsmall-and-up-25 {
    min-width: 25%;
    -ms-flex: 0 1 25%;
    flex: 0 1 25%;
  }
  .md-flex-offset-xsmall-and-up-25 {
    margin-left: 25%;
  }
  .md-flex-xsmall-and-up-30 {
    min-width: 30%;
    -ms-flex: 0 1 30%;
    flex: 0 1 30%;
  }
  .md-flex-offset-xsmall-and-up-30 {
    margin-left: 30%;
  }
  .md-flex-xsmall-and-up-35 {
    min-width: 35%;
    -ms-flex: 0 1 35%;
    flex: 0 1 35%;
  }
  .md-flex-offset-xsmall-and-up-35 {
    margin-left: 35%;
  }
  .md-flex-xsmall-and-up-40 {
    min-width: 40%;
    -ms-flex: 0 1 40%;
    flex: 0 1 40%;
  }
  .md-flex-offset-xsmall-and-up-40 {
    margin-left: 40%;
  }
  .md-flex-xsmall-and-up-45 {
    min-width: 45%;
    -ms-flex: 0 1 45%;
    flex: 0 1 45%;
  }
  .md-flex-offset-xsmall-and-up-45 {
    margin-left: 45%;
  }
  .md-flex-xsmall-and-up-50 {
    min-width: 50%;
    -ms-flex: 0 1 50%;
    flex: 0 1 50%;
  }
  .md-flex-offset-xsmall-and-up-50 {
    margin-left: 50%;
  }
  .md-flex-xsmall-and-up-55 {
    min-width: 55%;
    -ms-flex: 0 1 55%;
    flex: 0 1 55%;
  }
  .md-flex-offset-xsmall-and-up-55 {
    margin-left: 55%;
  }
  .md-flex-xsmall-and-up-60 {
    min-width: 60%;
    -ms-flex: 0 1 60%;
    flex: 0 1 60%;
  }
  .md-flex-offset-xsmall-and-up-60 {
    margin-left: 60%;
  }
  .md-flex-xsmall-and-up-65 {
    min-width: 65%;
    -ms-flex: 0 1 65%;
    flex: 0 1 65%;
  }
  .md-flex-offset-xsmall-and-up-65 {
    margin-left: 65%;
  }
  .md-flex-xsmall-and-up-70 {
    min-width: 70%;
    -ms-flex: 0 1 70%;
    flex: 0 1 70%;
  }
  .md-flex-offset-xsmall-and-up-70 {
    margin-left: 70%;
  }
  .md-flex-xsmall-and-up-75 {
    min-width: 75%;
    -ms-flex: 0 1 75%;
    flex: 0 1 75%;
  }
  .md-flex-offset-xsmall-and-up-75 {
    margin-left: 75%;
  }
  .md-flex-xsmall-and-up-80 {
    min-width: 80%;
    -ms-flex: 0 1 80%;
    flex: 0 1 80%;
  }
  .md-flex-offset-xsmall-and-up-80 {
    margin-left: 80%;
  }
  .md-flex-xsmall-and-up-85 {
    min-width: 85%;
    -ms-flex: 0 1 85%;
    flex: 0 1 85%;
  }
  .md-flex-offset-xsmall-and-up-85 {
    margin-left: 85%;
  }
  .md-flex-xsmall-and-up-90 {
    min-width: 90%;
    -ms-flex: 0 1 90%;
    flex: 0 1 90%;
  }
  .md-flex-offset-xsmall-and-up-90 {
    margin-left: 90%;
  }
  .md-flex-xsmall-and-up-95 {
    min-width: 95%;
    -ms-flex: 0 1 95%;
    flex: 0 1 95%;
  }
  .md-flex-offset-xsmall-and-up-95 {
    margin-left: 95%;
  }
  .md-flex-xsmall-and-up-100 {
    min-width: 100%;
    -ms-flex: 0 1 100%;
    flex: 0 1 100%;
  }
  .md-flex-offset-xsmall-and-up-100 {
    margin-left: 100%;
  }
  .md-align-xsmall-and-up-start {
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .md-align-xsmall-and-up-center {
    -ms-flex-pack: center;
    justify-content: center;
  }
  .md-align-xsmall-and-up-end {
    -ms-flex-pack: end;
    justify-content: flex-end;
  }
  .md-hide-xsmall-and-up {
    display: none;
  }
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-list {
  margin: 0;
  padding: 8px 0;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column nowrap;
      flex-flow: column nowrap;
  position: relative;
  list-style: none;
}
.md-list.md-dense {
    padding: 4px 0;
}
.md-list.md-dense .md-list-item.md-inset .md-list-item-container {
      padding-left: 72px;
}
.md-list.md-dense .md-list-item .md-list-item-container {
      min-height: 40px;
      font-size: 13px;
}
.md-list.md-dense .md-list-item .md-list-item-container .md-avatar:first-child,
      .md-list.md-dense .md-list-item .md-list-item-container .md-list-action:first-child {
        margin-right: 24px;
}
.md-list.md-dense .md-avatar {
      width: 32px;
      min-width: 32px;
      height: 32px;
      min-height: 32px;
}
.md-list.md-dense .md-list-item-expand {
      min-height: 40px;
}
.md-list.md-double-line.md-dense .md-list-item .md-list-item-container {
    min-height: 60px;
}
.md-list.md-double-line.md-dense .md-list-item .md-avatar {
    width: 36px;
    min-width: 36px;
    height: 36px;
    min-height: 36px;
}
.md-list.md-double-line.md-dense .md-list-item .md-avatar .md-avatar:first-child,
    .md-list.md-double-line.md-dense .md-list-item .md-avatar .md-list-action:first-child {
      margin-right: 20px;
}
.md-list.md-double-line.md-dense .md-list-text-container > :nth-child(1) {
    font-size: 13px;
}
.md-list.md-double-line.md-dense .md-list-text-container > :nth-child(2) {
    font-size: 13px;
}
.md-list.md-double-line .md-list-item .md-list-item-container {
    min-height: 72px;
}
.md-list.md-triple-line.md-dense .md-list-item .md-list-item-container {
    min-height: 76px;
}
.md-list.md-triple-line.md-dense .md-list-item .md-avatar {
    width: 36px;
    min-width: 36px;
    height: 36px;
    min-height: 36px;
}
.md-list.md-triple-line.md-dense .md-list-item .md-avatar .md-avatar:first-child,
    .md-list.md-triple-line.md-dense .md-list-item .md-avatar .md-list-action:first-child {
      margin-right: 20px;
}
.md-list.md-triple-line.md-dense .md-list-text-container > :nth-child(1) {
    font-size: 13px;
}
.md-list.md-triple-line.md-dense .md-list-text-container > :nth-child(2) {
    font-size: 13px;
}
.md-list.md-triple-line .md-list-item .md-list-item-container {
    min-height: 88px;
}
.md-list.md-triple-line .md-avatar {
    margin: 0;
}
.md-list .md-subheader.md-inset {
    padding-left: 72px;
}
.md-list > .md-subheader:first-of-type {
    margin-top: -8px;
}
.md-list-item {
  height: auto;
  position: relative;
  z-index: 2;
}
.md-list-item.md-disabled {
    cursor: default;
    pointer-events: none;
}
.md-list-item.md-inset .md-list-item-container {
    padding-left: 72px;
}
.md-list-item .md-button-ghost {
    width: 100%;
    margin: 0;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    border-radius: 0;
}
.md-list-item .md-button:not(.md-button-ghost):not(.md-list-item-container) {
    position: relative;
    z-index: 2;
}
.md-list-item .md-button:not(.md-button-ghost):not(.md-list-item-container) .md-icon {
      position: relative;
}
.md-list-item .md-list-item-container {
    min-height: 48px;
    margin: 0;
    padding: 0 16px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: row nowrap;
        flex-flow: row nowrap;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-pack: justify;
        justify-content: space-between;
    -ms-flex: 1;
        flex: 1;
    position: relative;
    font-size: 16px;
    font-weight: 400;
    text-align: left;
    text-transform: none;
}
.md-list-item .md-list-item-container:hover {
      text-decoration: none;
}
.md-list-item .md-list-item-container > .md-icon:first-child {
      margin-right: 32px;
}
.md-list-item .md-list-item-container .md-avatar:first-child,
    .md-list-item .md-list-item-container .md-list-action:first-child {
      margin-right: 16px;
}
.md-list-item .md-list-item-container .md-list-action {
      margin: 0 -10px 0 0;
}
.md-list-item .md-list-item-container .md-list-action:nth-child(3) {
        margin: 0 -10px 0 16px;
}
.md-list-item .md-divider {
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
}
.md-list-item .md-icon,
  .md-list-item .md-avatar,
  .md-list-item .md-list-action:first-child {
    margin: 0;
}
.md-list-item .md-icon:first-of-type + *,
    .md-list-item .md-avatar:first-of-type + *,
    .md-list-item .md-list-action:first-child:first-of-type + * {
      -ms-flex: 1 1 auto;
          flex: 1 1 auto;
}
.md-list-item .md-avatar {
    margin-top: 8px;
    margin-bottom: 8px;
}
.md-list-item .md-icon {
    color: rgba(0, 0, 0, 0.54);
}
.md-list-item .md-ink-ripple {
    border-radius: 0;
}
.md-list-item-expand {
  min-height: 48px;
  -ms-flex-flow: column wrap;
      flex-flow: column wrap;
  overflow: hidden;
  transform: translate3D(0, 0, 0);
}
.md-list-item-expand:before, .md-list-item-expand:after {
    height: 1px;
    position: absolute;
    right: 0;
    left: 0;
    z-index: 3;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    content: " ";
}
.md-list-item-expand:before {
    top: 0;
}
.md-list-item-expand:after {
    bottom: 0;
}
.md-list-item-expand.md-active {
    position: relative;
}
.md-list-item-expand.md-active:before, .md-list-item-expand.md-active:after {
      background-color: rgba(0, 0, 0, 0.12);
}
.md-list-item-expand.md-active:first-of-type:before {
      background: none;
}
.md-list-item-expand.md-active:last-of-type:after {
      background: none;
}
.md-list-item-expand.md-active.md-active + .md-active:before {
      background: none;
}
.md-list-item-expand.md-active > .md-list-item-container .md-list-expand-indicator {
      transform: rotateZ(180deg) translate3D(0, 0, 0);
}
.md-list-item-expand.md-active > .md-list-expand {
      margin-bottom: 0 !important;
}
.md-list-item-expand .md-expansion-indicator,
  .md-list-item-expand .md-list-item-container,
  .md-list-item-expand .md-icon {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-list-item-expand .md-list-expand {
    position: relative;
    z-index: 1;
    transform: translate3D(0, 0, 0);
    will-change: margin-bottom;
    transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
}
.md-list-item-expand .md-list-expand.md-transition-off {
      transition: none !important;
}
.md-list-item-expand .md-list-expand .md-list {
      padding: 0;
}
.md-list-text-container {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column nowrap;
      flex-flow: column nowrap;
  -ms-flex: 1;
      flex: 1;
  overflow: hidden;
  line-height: 1.25em;
  white-space: normal;
}
.md-list-text-container > * {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.md-list-text-container > :nth-child(1) {
    font-size: 16px;
}
.md-list-text-container > :nth-child(2),
  .md-list-text-container > :nth-child(3) {
    margin: 0;
    color: rgba(0, 0, 0, 0.54);
    font-size: 14px;
}
.md-list-text-container > :nth-child(2):not(:last-child) {
    color: rgba(0, 0, 0, 0.87);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-menu {
  display: inline-block;
}
.md-menu-content {
  width: 168px;
  min-width: 84px;
  max-width: 392px;
  min-height: 64px;
  max-height: calc(100vh - 32px);
  overflow-x: hidden;
  overflow-y: auto;
  position: absolute;
  z-index: 131;
  transform: scale(0.9, 0.85) translateZ(0);
  border-radius: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  opacity: 0;
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.3s cubic-bezier(0.55, 0, 0.55, 0.2), margin 0.3s cubic-bezier(0.55, 0, 0.55, 0.2), transform 0s 0.4s cubic-bezier(0.55, 0, 0.55, 0.2);
  will-change: transform, opacity, width;
}
.md-menu-content.md-direction-bottom-right {
    margin-top: -20px;
    margin-left: -8px;
    transform-origin: top left;
}
.md-menu-content.md-direction-bottom-right.md-active {
      margin-top: -11px;
}
.md-menu-content.md-direction-bottom-left {
    margin-top: -20px;
    margin-left: 8px;
    transform-origin: top right;
}
.md-menu-content.md-direction-bottom-left.md-active {
      margin-top: -11px;
}
.md-menu-content.md-direction-top-right {
    margin-top: 20px;
    margin-left: -8px;
    transform-origin: bottom left;
}
.md-menu-content.md-direction-top-right.md-active {
      margin-top: 11px;
}
.md-menu-content.md-direction-top-left {
    margin-top: 20px;
    margin-left: 8px;
    transform-origin: bottom right;
}
.md-menu-content.md-direction-top-left.md-active {
      margin-top: 11px;
}
.md-menu-content.md-align-trigger {
    margin: 0;
}
.md-menu-content.md-size-1 {
    width: 84px;
}
.md-menu-content.md-size-2 {
    width: 112px;
}
.md-menu-content.md-size-3 {
    width: 168px;
}
.md-menu-content.md-size-4 {
    width: 224px;
}
.md-menu-content.md-size-5 {
    width: 280px;
}
.md-menu-content.md-size-6 {
    width: 336px;
}
.md-menu-content.md-size-7 {
    width: 392px;
}
.md-menu-content.md-active {
    pointer-events: auto;
    opacity: 1;
    transform: scale(1) translateZ(0);
    transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), opacity 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), transform 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-menu-content.md-active .md-list {
      opacity: 1;
      transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-menu-content .md-list {
    opacity: 0;
    transition: opacity 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-menu-item {
  cursor: pointer;
  font-size: 16px;
  line-height: 1.2em;
}
.md-menu-item[disabled] {
    cursor: default;
}
.md-menu-item .md-list-item-holder {
    overflow: hidden;
    text-overflow: ellipsis;
}
.md-menu-backdrop {
  z-index: 130;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-boards {
  width: 100%;
  height: 100% !important;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
      flex-flow: column;
  position: relative;
}
.md-boards.md-transition-off * {
    transition: none !important;
}
.md-boards.md-dynamic-height .md-boards-content {
    transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-boards .md-boards-navigation {
    bottom: 0;
    width: 100%;
    height: 48px;
    min-height: 48px;
    position: relative;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    -ms-flex-pack: justify;
        justify-content: space-between;
}
.md-boards .md-board-header {
    min-width: 24px;
    max-width: 24px;
    margin: 0;
    padding: 0 12px;
    display: inline-block;
    position: relative;
    cursor: pointer;
    border: 0;
    background: none;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
}
.md-boards .md-board-header.md-disabled {
      cursor: default;
      pointer-events: none;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      -webkit-user-drag: none;
}
.md-boards .md-board-header-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column;
        flex-flow: column;
    -ms-flex-pack: center;
        justify-content: center;
    -ms-flex-align: center;
        align-items: center;
}
.md-boards .md-board-header-container .md-icon {
      margin: 0;
}
.md-boards .md-board-header-container .md-icon:not(.md-control) {
      width: 16px;
      min-width: 16px;
      height: 16px;
      min-height: 16px;
      font-size: 16px;
}
.md-boards .md-boards-content {
    width: 100%;
    position: relative;
    overflow: hidden;
}
.md-boards .md-boards-wrapper {
    width: 9999em;
    height: 100% !important;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translate3d(0, 0, 0);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-boards .md-board {
    padding: 16px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-progress {
  width: 100%;
  height: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-progress.md-indeterminate .md-progress-track {
    right: 0;
}
.md-progress.md-indeterminate .md-progress-track:before, .md-progress.md-indeterminate .md-progress-track:after {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      will-change: left, right;
      content: '';
}
.md-progress.md-indeterminate .md-progress-track:before {
      animation: progress-indeterminate 2.3s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
}
.md-progress.md-indeterminate .md-progress-track:after {
      animation: progress-indeterminate-short 2.3s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
      animation-delay: 1.15s;
}
.md-progress.md-progress-enter, .md-progress.md-progress-leave-active {
    opacity: 0;
    transform: scaleY(0) translateZ(0);
}
.md-progress.md-progress-enter-active {
    transform: scaleY(1) translateZ(0);
}
.md-progress-track {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
@keyframes progress-indeterminate {
0% {
    right: 100%;
    left: -35%;
}
60% {
    right: -100%;
    left: 100%;
}
100% {
    right: -100%;
    left: 100%;
}
}
@keyframes progress-indeterminate-short {
0% {
    right: 100%;
    left: -200%;
}
60% {
    right: -8%;
    left: 107%;
}
100% {
    right: -8%;
    left: 107%;
}
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-radio {
  width: auto;
  margin: 16px 8px 16px 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  position: relative;
}
.md-radio:not(.md-disabled) {
    cursor: pointer;
}
.md-radio:not(.md-disabled) .md-radio-label {
      cursor: pointer;
}
.md-radio .md-radio-container {
    width: 20px;
    height: 20px;
    position: relative;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0.54);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-radio .md-radio-container:before {
      width: 48px;
      height: 48px;
      position: absolute;
      top: 50%;
      left: 50%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
      content: " ";
}
.md-radio .md-radio-container:after {
      position: absolute;
      top: 3px;
      right: 3px;
      bottom: 3px;
      left: 3px;
      border-radius: 50%;
      opacity: 0;
      transform: scale3D(0.38, 0.38, 1);
      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
      content: " ";
}
.md-radio .md-radio-container input {
      position: absolute;
      left: -999em;
}
.md-radio .md-radio-container .md-ink-ripple {
      top: -16px;
      right: -16px;
      bottom: -16px;
      left: -16px;
      border-radius: 50%;
      color: rgba(0, 0, 0, 0.54);
}
.md-radio .md-radio-container .md-ink-ripple .md-ripple {
        width: 48px !important;
        height: 48px !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
}
.md-radio .md-radio-label {
    height: 20px;
    padding-left: 8px;
    line-height: 20px;
}
.md-radio.md-checked .md-radio-container:after {
  opacity: 1;
  transform: scale3D(1, 1, 1);
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-rating-bar {
  width: auto;
  display: -ms-flexbox;
  display: flex;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 3px;
  border-radius: 2px;
}
.md-rating-bar > .md-full-icon {
    overflow-x: hidden;
    display: inherit;
}
.md-rating-bar > .md-empty-icon > .md-icon,
  .md-rating-bar > .md-full-icon > .md-icon {
    margin: 0;
    white-space: nowrap;
    cursor: pointer;
}
.md-rating-bar:not([disabled]):hover {
    background-color: rgba(153, 153, 153, 0.2);
}
.md-rating-bar[disabled] > .md-empty-icon > .md-icon,
  .md-rating-bar[disabled] > .md-full-icon > .md-icon {
    cursor: default;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-select {
  width: 100%;
  min-width: 128px;
  height: 32px;
  position: relative;
}
.md-select:focus {
    outline: none;
}
.md-select:not(.md-select-icon):after {
    margin-top: 2px;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%) scaleY(0.45) scaleX(0.85);
    transition: all 0.15s linear;
    content: "\\25BC";
}
.md-select.md-active .md-select-menu {
    top: -8px;
    pointer-events: auto;
    opacity: 1;
    transform: translateY(-8px) scale3D(1, 1, 1);
    transform-origin: center top;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: .25s;
    transition-property: opacity, transform, top;
}
.md-select.md-active .md-select-menu > * {
      opacity: 1;
      transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
      transition-duration: .15s;
      transition-delay: .1s;
}
.md-select.md-disabled {
    pointer-events: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    user-drag: none;
}
.md-select select {
    position: absolute;
    left: -999em;
}
.md-select .md-menu {
    width: 100%;
    height: 32px;
    display: block;
    position: relative;
}
.md-select .md-select-value {
    width: 100%;
    height: 32px;
    padding-right: 24px;
    display: block;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    z-index: 2;
    font-size: 16px;
    line-height: 33px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.md-select .md-subheader {
    color: rgba(117, 117, 117, 0.87);
    text-transform: uppercase;
}
.md-select .md-subheader:first-child {
      margin-top: -8px;
}
.md-select-content {
  width: auto;
  max-height: 256px;
}
.md-select-content.md-direction-bottom-right {
    margin-top: -15px;
    margin-left: -16px;
}
.md-select-content .md-option[disabled] {
    pointer-events: none;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    user-drag: none;
}
.md-select-content .md-menu-item .md-list-item-holder {
    overflow: visible;
    -ms-flex-pack: start;
        justify-content: flex-start;
}
.md-select-content.md-multiple .md-checkbox {
    margin: 0;
}
.md-select-content.md-multiple .md-checkbox-label {
    padding-left: 16px;
    cursor: pointer;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-sidenav.md-left .md-sidenav-content {
  left: 0;
  transform: translate3D(-100%, 0, 0);
}
.md-sidenav.md-right .md-sidenav-content {
  right: 0;
  transform: translate3D(100%, 0, 0);
}
.md-sidenav.md-fixed .md-sidenav-content,
.md-sidenav.md-fixed .md-sidenav-backdrop {
  position: fixed;
}
.md-sidenav .md-sidenav-content {
  width: 304px;
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 100;
  pointer-events: none;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: transform;
  will-change: transform;
}
.md-sidenav .md-backdrop {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99;
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.54);
  opacity: 0;
  transition: all 0.5s cubic-bezier(0.35, 0, 0.25, 1);
  transition-property: opacity;
  will-change: opacity;
}
.md-sidenav.md-active .md-sidenav-content {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
  pointer-events: auto;
  transform: translate3D(0, 0, 0);
}
.md-sidenav.md-active .md-sidenav-backdrop {
  opacity: 1;
  pointer-events: auto;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/* Image aspect ratio calculator */
/* Responsive breakpoints */
.md-snackbar {
  display: -ms-flexbox;
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  z-index: 120;
  pointer-events: none;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-property: margin-top, margin-bottom;
}
.md-snackbar.md-position-top-center, .md-snackbar.md-position-bottom-center {
    -ms-flex-pack: center;
        justify-content: center;
}
.md-snackbar.md-position-top-right, .md-snackbar.md-position-bottom-right {
    margin-right: 24px;
    -ms-flex-pack: end;
        justify-content: flex-end;
}
.md-snackbar.md-position-top-left, .md-snackbar.md-position-bottom-left {
    margin-left: 24px;
    -ms-flex-pack: start;
        justify-content: flex-start;
}
.md-snackbar.md-position-top-right, .md-snackbar.md-position-top-left, .md-snackbar.md-position-top-center {
    margin-top: 24px;
}
.md-snackbar.md-position-bottom-right, .md-snackbar.md-position-bottom-left {
    margin-bottom: 24px;
}
.md-snackbar.md-position-top-center, .md-snackbar.md-position-top-right, .md-snackbar.md-position-top-left {
    top: 0;
}
.md-snackbar.md-position-top-center .md-snackbar-container, .md-snackbar.md-position-top-right .md-snackbar-container, .md-snackbar.md-position-top-left .md-snackbar-container {
      transform: translate3D(0, calc(-100% - 24px), 0);
}
.md-snackbar.md-position-bottom-center, .md-snackbar.md-position-bottom-right, .md-snackbar.md-position-bottom-left {
    bottom: 0;
}
.md-snackbar.md-position-bottom-center .md-snackbar-container, .md-snackbar.md-position-bottom-right .md-snackbar-container, .md-snackbar.md-position-bottom-left .md-snackbar-container {
      transform: translate3D(0, calc(100% + 24px), 0);
}
.md-snackbar.md-active .md-snackbar-container {
    transform: translate3D(0, 0, 0);
}
.md-snackbar.md-active .md-snackbar-content {
    opacity: 1;
    transition: opacity 0.4s 0.1s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-snackbar .md-snackbar-content {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-pack: justify;
        justify-content: space-between;
    opacity: 0;
    transition: opacity 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
    will-change: opacity;
}
.md-snackbar .md-button {
    min-width: 64px;
    margin: -8px -16px;
}
.md-snackbar .md-button:last-child {
      margin-left: 48px;
}
.md-snackbar-container {
  width: auto;
  min-width: 288px;
  max-width: 568px;
  min-height: 48px;
  padding: 14px 24px;
  overflow: hidden;
  pointer-events: auto;
  border-radius: 2px;
  background-color: #323232;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  color: #fff;
  font-size: 14px;
}
.md-has-toast-top-right .md-fab.md-fab-top-right {
  transform: translate3D(0, 68px, 0);
}
.md-has-toast-top-center .md-fab.md-fab-top-center {
  transform: translate3D(-50%, 68px, 0);
}
.md-has-toast-top-left .md-fab.md-fab-top-left {
  transform: translate3D(0, 68px, 0);
}
.md-has-toast-bottom-right .md-fab.md-fab-bottom-right {
  transform: translate3D(0, -68px, 0);
}
.md-has-toast-bottom-center .md-fab.md-fab-bottom-center {
  transform: translate3D(-50%, -68px, 0);
}
.md-has-toast-bottom-left .md-fab.md-fab-bottom-left {
  transform: translate3D(0, -68px, 0);
}
@media (max-width: 600px) {
  .md-snackbar {
    margin: 0 !important;
  }
  .md-snackbar-container {
    width: 100%;
    max-width: 100%;
    border-radius: 0;
  }
  .md-has-toast-top-right .md-fab.md-fab-top-right {
    transform: translate3D(0, 48px, 0);
  }
  .md-has-toast-top-center .md-fab.md-fab-top-center {
    transform: translate3D(-50%, 48px, 0);
  }
  .md-has-toast-top-left .md-fab.md-fab-top-left {
    transform: translate3D(0, 48px, 0);
  }
  .md-has-toast-bottom-right .md-fab.md-fab-bottom-right {
    transform: translate3D(0, -48px, 0);
  }
  .md-has-toast-bottom-center .md-fab.md-fab-bottom-center {
    transform: translate3D(-50%, -48px, 0);
  }
  .md-has-toast-bottom-left .md-fab.md-fab-bottom-left {
    transform: translate3D(0, -48px, 0);
  }
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-speed-dial {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column-reverse;
      flex-direction: column-reverse;
  -ms-flex-align: center;
      align-items: center;
}
.md-speed-dial.md-direction-top.md-mode-fling [md-fab-trigger] ~ .md-button {
    transform: scale(0.95) translate3D(0, 80%, 0);
}
.md-speed-dial.md-direction-top [md-fab-trigger] {
    margin-top: 8px;
}
.md-speed-dial.md-direction-top [md-fab-trigger] ~ .md-button {
      margin-bottom: 16px;
}
.md-speed-dial.md-direction-right {
    -ms-flex-direction: row;
        flex-direction: row;
    -ms-flex-pack: center;
        justify-content: center;
}
.md-speed-dial.md-direction-right.md-mode-fling [md-fab-trigger] ~ .md-button {
      transform: scale(0.95) translate3D(-80%, 0, 0);
}
.md-speed-dial.md-direction-right [md-fab-trigger] {
      margin-right: 8px;
}
.md-speed-dial.md-direction-right [md-fab-trigger] ~ .md-button {
        margin-left: 16px;
}
.md-speed-dial.md-direction-bottom {
    -ms-flex-direction: column;
        flex-direction: column;
}
.md-speed-dial.md-direction-bottom.md-mode-fling [md-fab-trigger] ~ .md-button {
      transform: scale(0.95) translate3D(0, -80%, 0);
}
.md-speed-dial.md-direction-bottom [md-fab-trigger] {
      margin-bottom: 8px;
}
.md-speed-dial.md-direction-bottom [md-fab-trigger] ~ .md-button {
        margin-top: 16px;
}
.md-speed-dial.md-direction-left {
    -ms-flex-direction: row-reverse;
        flex-direction: row-reverse;
    -ms-flex-pack: center;
        justify-content: center;
}
.md-speed-dial.md-direction-left.md-mode-fling [md-fab-trigger] ~ .md-button {
      transform: scale(0.95) translate3D(80%, 0, 0);
}
.md-speed-dial.md-direction-left [md-fab-trigger] {
      margin-left: 8px;
}
.md-speed-dial.md-direction-left [md-fab-trigger] ~ .md-button {
        margin-right: 16px;
}
.md-speed-dial.md-mode-scale [md-fab-trigger] ~ .md-button {
    transform: scale(0.6);
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button {
    opacity: 1;
    pointer-events: auto;
    transform: translate3D(0, 0, 0) !important;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(2) {
      transition-delay: 0.05s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(3) {
      transition-delay: 0.1s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(4) {
      transition-delay: 0.15s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(5) {
      transition-delay: 0.2s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(6) {
      transition-delay: 0.25s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(7) {
      transition-delay: 0.3s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(8) {
      transition-delay: 0.35s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(9) {
      transition-delay: 0.4s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(10) {
      transition-delay: 0.45s;
}
.md-speed-dial.md-active [md-fab-trigger] ~ .md-button:nth-child(11) {
      transition-delay: 0.5s;
}
.md-speed-dial.md-active [md-fab-trigger] [md-icon-morph] {
    transform: rotateZ(0);
    opacity: 1;
}
.md-speed-dial.md-active [md-fab-trigger] [md-icon-morph] + .md-icon {
      transform: rotateZ(90deg) scale(0.8);
      opacity: 0;
}
.md-speed-dial .md-button {
    margin: 0;
}
.md-speed-dial [md-fab-trigger] {
    position: relative;
    z-index: 2;
}
.md-speed-dial [md-fab-trigger] ~ .md-button {
      position: relative;
      z-index: 1;
      opacity: 0;
      pointer-events: none;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(2) {
        transition-delay: 0.05s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(3) {
        transition-delay: 0.1s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(4) {
        transition-delay: 0.15s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(5) {
        transition-delay: 0.2s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(6) {
        transition-delay: 0.25s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(7) {
        transition-delay: 0.3s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(8) {
        transition-delay: 0.35s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(9) {
        transition-delay: 0.4s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(10) {
        transition-delay: 0.45s;
}
.md-speed-dial [md-fab-trigger] ~ .md-button:nth-last-child(11) {
        transition-delay: 0.5s;
}
.md-speed-dial [md-icon-morph] + .md-icon,
  .md-speed-dial [md-icon-morph] {
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-speed-dial [md-icon-morph] {
    opacity: 0;
    transform: rotateZ(-90deg) scale(0.8);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-spinner {
  display: inline-block;
  position: relative;
  pointer-events: none;
  will-change: transform, opacity;
}
.md-spinner.md-indeterminate .md-spinner-draw {
    animation: spinner-rotate 1.9s linear infinite;
    transform: rotate(0deg) translateZ(0);
}
.md-spinner.md-indeterminate .md-spinner-path {
    stroke-dasharray: 2, 200;
    animation: spinner-dash 1.425s ease-in-out infinite;
}
.md-spinner.md-spinner-leave-active {
    opacity: 0;
    transform: scale(0.8) translateZ(0);
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-spinner:not(.md-indeterminate).md-spinner-enter-active {
    transition-duration: 2s;
}
.md-spinner:not(.md-indeterminate).md-spinner-enter-active .md-spinner-draw {
      animation: spinner-initial-rotate 1.98s cubic-bezier(0.25, 0.8, 0.25, 1) forwards;
}
.md-spinner-draw {
  width: 100%;
  height: 100%;
  margin: auto;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: rotate(270deg) translateZ(0);
  transform-origin: center center;
  will-change: transform, opacity;
}
.md-spinner-path {
  fill: none;
  stroke-dashoffset: 0;
  stroke-miterlimit: 10;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
@keyframes spinner-rotate {
to {
    transform: rotate(360deg) translateZ(0);
}
}
@keyframes spinner-initial-rotate {
0% {
    opacity: 0;
    transform: rotate(-90deg) translateZ(0);
}
20% {
    opacity: 1;
}
100% {
    transform: rotate(270deg) translateZ(0);
}
}
@keyframes spinner-dash {
0% {
    stroke-dasharray: 2, 200;
    stroke-dashoffset: 0;
}
50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35px;
}
100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124px;
}
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/* Image aspect ratio calculator */
/* Responsive breakpoints */
.md-stepper {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
      flex-flow: column;
  position: relative;
  width: 100%;
}
.md-stepper .md-step-header {
    background: none;
    border: 0;
    cursor: pointer;
    -ms-flex-negative: 0;
        flex-shrink: 0;
    font-family: inherit;
    font-size: 12px;
    font-weight: 500;
    margin: 0;
    max-height: 72px;
    padding: 24px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-stepper .md-step-header .md-step-icons, .md-stepper .md-step-header .md-step-titles {
      display: inline-block;
      vertical-align: middle;
}
.md-stepper .md-step-header.md-has-sub-message {
      padding: 15px 24px;
}
.md-stepper .md-step-header.md-has-sub-message .md-step-title {
        margin-bottom: -4px;
}
.md-stepper .md-step-header .md-step-icon {
      border-radius: 50%;
      font-size: 12px;
      height: 24px;
      line-height: 24px;
      margin-right: 8px;
      min-width: 24px;
      padding: 0px 6px;
      pointer-events: none;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      width: 24px;
}
.md-stepper .md-step-header .md-step-number {
      border-radius: 50%;
      display: inline-block;
      font-size: 12px;
      margin-right: 8px;
      width: 24px;
}
.md-stepper .md-step-header .md-step-number span {
        display: block;
        line-height: 24px;
        text-align: center;
}
.md-stepper .md-step-header .md-step-title {
      font-size: inherit;
}
.md-stepper .md-step-header.md-disabled {
      cursor: default;
      pointer-events: none;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      -webkit-user-drag: none;
}
.md-stepper .md-steps-navigation {
    display: -ms-flexbox;
    display: flex;
    height: 72px;
    min-height: 72px;
    overflow: hidden;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    z-index: 1;
}
.md-stepper .md-steps-navigation.md-alternate-labels {
      height: 104px;
      min-height: 104px;
}
.md-stepper .md-steps-navigation .md-steps-navigation-container {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: justify;
          justify-content: space-between;
      width: 100%;
}
.md-stepper .md-steps-navigation .md-steps-navigation-container .md-divider {
        margin: 36px 0;
        position: relative;
        width: 100%;
}
.md-stepper .md-steps-navigation .md-steps-navigation-container .md-step-header.md-alternate-labels {
        max-height: 104px;
        text-align: center;
}
.md-stepper .md-steps-navigation .md-steps-navigation-container .md-step-header.md-alternate-labels.md-has-sub-message {
          padding: 24px;
}
.md-stepper .md-steps-navigation .md-steps-navigation-container .md-step-header.md-alternate-labels .md-step-icons, .md-stepper .md-steps-navigation .md-steps-navigation-container .md-step-header.md-alternate-labels .md-step-titles {
          display: block;
}
.md-stepper .md-steps-navigation .md-steps-navigation-container .md-step-header.md-alternate-labels .md-step-titles {
          margin-top: 10px;
}
.md-stepper .md-steps-container {
    height: 0;
    overflow: hidden;
    position: relative;
    width: 100%;
}
.md-stepper .md-steps-container .md-steps-wrapper {
      bottom: 0;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      transform: translate3d(0, 0, 0);
      transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      width: 9999em;
}
.md-stepper .md-steps-container .md-steps-wrapper .md-step {
        left: 0;
        padding: 16px;
        position: absolute;
        right: 0;
        top: 0;
}
.md-stepper .md-steps-container .md-steps-wrapper .md-step .md-step-content {
          padding: 16px;
          font-size: 14px;
          line-height: 22px;
}
.md-stepper .md-steps-container .md-steps-wrapper .md-step .md-step-content:last-child {
            padding-bottom: 24px;
}
.md-stepper .md-steps-vertical-container .md-step .md-step-header {
    padding-bottom: 8px;
}
.md-stepper .md-steps-vertical-container .md-step:not(:first-of-type) .md-step-header {
    padding-top: 8px;
}
.md-stepper .md-steps-vertical-container .md-step .md-step-content {
    margin: 0 24px 0 34px;
    padding-bottom: 32px;
    padding-left: 24px;
    padding-top: 8px;
}
.md-stepper .md-steps-vertical-container .md-step:not(:last-of-type) .md-step-content {
    border-left: 1px solid #BDBDBD;
}
@media (min-width: 660px) {
  .md-stepper .md-steps-navigation .md-steps-navigation-container {
    margin-bottom: -15px;
  }
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-subheader {
  min-height: 48px;
  padding: 0 16px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-flow: row wrap;
      flex-flow: row wrap;
  color: rgba(0, 0, 0, 0.54);
  font-size: 14px;
  font-weight: 500;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-switch {
  width: auto;
  margin: 16px 8px 16px 0;
  display: -ms-inline-flexbox;
  display: inline-flex;
  position: relative;
}
.md-switch .md-switch-container {
    width: 34px;
    height: 14px;
    position: relative;
    border-radius: 14px;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    background-color: rgba(0, 0, 0, 0.38);
}
.md-switch .md-switch-container .md-switch-thumb {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 0;
      background-color: #fafafa;
      border-radius: 50%;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
      transition: all 0.15s linear;
}
.md-switch .md-switch-container input {
      position: absolute;
      left: -999em;
}
.md-switch .md-switch-container .md-ink-ripple {
      top: -16px;
      right: -16px;
      bottom: -16px;
      left: -16px;
      border-radius: 50%;
      color: rgba(0, 0, 0, 0.54);
}
.md-switch .md-switch-container .md-ink-ripple .md-ripple {
        width: 48px !important;
        height: 48px !important;
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
}
.md-switch .md-switch-container .md-switch-holder {
      width: 40px;
      height: 40px;
      margin: 0;
      padding: 0;
      position: absolute;
      top: 50%;
      left: 50%;
      z-index: 2;
      background: none;
      border: none;
      transform: translate(-50%, -50%);
}
.md-switch .md-switch-container .md-switch-holder:focus {
        outline: none;
}
.md-switch .md-switch-label {
    height: 14px;
    padding-left: 8px;
    line-height: 14px;
}
.md-switch.md-dragging .md-switch-thumb {
  cursor: -webkit-grabbing;
  cursor: grabbing;
}
.md-switch.md-disabled .md-switch-thumb {
  cursor: default;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-table {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column wrap;
      flex-flow: column wrap;
  overflow-x: auto;
}
.md-table.md-transition-off .md-table-cell,
  .md-table.md-transition-off .md-checkbox .md-checkbox-container,
  .md-table.md-transition-off .md-checkbox .md-checkbox-container:after {
    transition: none !important;
}
.md-table table {
    width: 100%;
    border-spacing: 0;
    border-collapse: collapse;
    overflow: hidden;
}
.md-table tbody .md-table-row {
    border-top: 1px solid #e0e0e0;
}
.md-table tbody .md-table-row.md-selected .md-table-cell {
      background-color: #f5f5f5;
}
.md-table tbody .md-table-row:hover .md-table-cell {
      background-color: #eee;
}
.md-table .md-table-head {
    padding: 0;
    position: relative;
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
    line-height: 16px;
    text-align: left;
}
.md-table .md-table-head:last-child .md-table-head-container .md-table-head-text {
      padding-right: 24px;
}
.md-table .md-table-head.md-numeric {
      text-align: right;
}
.md-table .md-table-head .md-icon {
      width: 16px;
      min-width: 16px;
      height: 16px;
      min-height: 16px;
      font-size: 16px;
      color: rgba(0, 0, 0, 0.54);
}
.md-table .md-table-head .md-icon:not(.md-sortable-icon) {
        margin: 0 4px;
}
.md-table .md-table-head .md-icon:first-child {
        margin-left: 0;
}
.md-table .md-table-head .md-icon:last-child {
        margin-right: 0;
}
.md-table .md-table-head-container {
    height: 56px;
    padding: 14px 0;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-table .md-table-head-text {
    height: 28px;
    padding-right: 32px;
    padding-left: 24px;
    display: inline-block;
    position: relative;
    overflow: hidden;
    line-height: 28px;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.md-table .md-sortable {
    cursor: pointer;
}
.md-table .md-sortable:first-of-type .md-sortable-icon {
      left: auto;
      right: 10px;
}
.md-table .md-sortable:hover, .md-table .md-sortable.md-sorted {
      color: rgba(0, 0, 0, 0.87);
}
.md-table .md-sortable:hover .md-sortable-icon, .md-table .md-sortable.md-sorted .md-sortable-icon {
        opacity: 1;
}
.md-table .md-sortable.md-sorted .md-sortable-icon {
      color: rgba(0, 0, 0, 0.87);
}
.md-table .md-sortable.md-sorted-descending .md-sortable-icon {
      transform: translateY(-50%) rotate(180deg);
}
.md-table .md-sortable .md-sortable-icon {
      position: absolute;
      top: 50%;
      left: 2px;
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
      transform: translateY(-50%);
      opacity: 0;
      color: rgba(0, 0, 0, 0.38);
}
.md-table .md-sortable .md-ink-ripple {
      color: rgba(0, 0, 0, 0.87);
}
.md-table .md-table-cell {
    height: 48px;
    position: relative;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    color: rgba(0, 0, 0, 0.87);
    font-size: 13px;
    line-height: 18px;
}
.md-table .md-table-cell:last-child .md-table-cell-container {
      padding-right: 24px;
}
.md-table .md-table-cell.md-numeric {
      text-align: right;
}
.md-table .md-table-cell.md-numeric .md-icon {
        margin: 0;
}
.md-table .md-table-cell.md-numeric .md-table-cell-container {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-pack: center;
            justify-content: center;
        -ms-flex-align: center;
            align-items: center;
}
.md-table .md-table-cell.md-numeric .md-table-cell-container .md-icon,
        .md-table .md-table-cell.md-numeric .md-table-cell-container .md-button .md-icon {
          margin: auto;
}
.md-table .md-table-cell.md-has-action .md-table-cell-container {
      display: -ms-flexbox;
      display: flex;
      -ms-flex-align: center;
          align-items: center;
      -ms-flex-pack: justify;
          justify-content: space-between;
}
.md-table .md-table-cell .md-table-cell-container {
      padding: 6px 32px 6px 24px;
}
.md-table .md-table-cell .md-button {
      width: 36px;
      min-width: 36px;
      height: 36px;
      min-height: 36px;
}
.md-table .md-table-cell .md-button:last-child {
        margin: 0 -10px 0 0;
}
.md-table .md-table-cell .md-button .md-icon {
        margin: auto;
        width: 18px;
        min-width: 18px;
        height: 18px;
        min-height: 18px;
        color: rgba(0, 0, 0, 0.54);
        font-size: 18px;
}
.md-table .md-table-selection {
    width: 60px;
    position: relative;
    vertical-align: middle;
}
.md-table .md-table-selection + .md-table-cell .md-table-cell-container,
    .md-table .md-table-selection + .md-table-head .md-table-head-container .md-table-head-text {
      padding-left: 8px;
}
.md-table .md-table-selection .md-table-cell-container {
      padding-right: 16px;
      padding-left: 24px;
}
.md-table .md-table-selection .md-checkbox {
      margin: 0;
}
.md-table .md-table-selection .md-checkbox-container {
      width: 18px;
      height: 18px;
      margin-top: 1px;
}
.md-table .md-table-selection .md-checkbox-container:after {
        top: -1px;
        left: 4px;
}
.md-table .md-select {
    min-width: 84px;
}
.md-table .md-select-value,
  .md-table .md-option {
    font-size: 13px;
}
.md-table-edit-trigger {
  display: inline-block;
  cursor: pointer;
  color: rgba(0, 0, 0, 0.38);
}
.md-table-edit-trigger.md-edited {
    color: rgba(0, 0, 0, 0.87);
}
.md-table-dialog {
  max-height: 0;
  margin: 0;
  padding: 0 24px 2px;
  position: absolute;
  top: 0;
  right: 0;
  left: 24px;
  z-index: 60;
  overflow: hidden;
  pointer-events: none;
  border-radius: 2px;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
  background-color: #fff;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), max-height 0s 0.5s;
  transition-duration: .3s;
  transform: translate3D(0, -8px, 0);
}
.md-table-dialog.md-active {
    max-height: 400px;
    pointer-events: auto;
    transform: translate3D(#000);
    opacity: 1;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    transition-duration: .3s;
}
.md-table-dialog.md-large {
    padding: 12px 24px 2px;
}
.md-table-dialog .md-input-container {
    margin-top: 0;
    margin-bottom: 16px;
}
.md-table-dialog .md-input-container.md-input-placeholder input {
      font-size: 13px;
}
.md-table-dialog .md-input-container.md-input-placeholder input::-webkit-input-placeholder {
        font-size: 13px;
}
.md-table-dialog .md-char-counter {
    font-size: 13.5px;
    color: rgba(0, 0, 0, 0.54);
}
.md-table-dialog .md-button {
    min-width: 64px;
}
.md-table-card {
  overflow: visible;
}
.md-table-card .md-toolbar {
    padding-left: 16px;
    background-color: #fff;
}
.md-table-card .md-title {
    -ms-flex: 1;
        flex: 1;
    font-size: 20px;
}
.md-table-card .md-table-pagination {
    height: 56px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex: 1;
        flex: 1;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-pack: end;
        justify-content: flex-end;
    border-top: 1px solid #e0e0e0;
    color: rgba(0, 0, 0, 0.54);
    font-size: 12px;
}
.md-table-card .md-table-pagination .md-table-pagination-previous {
      margin-right: 2px;
      margin-left: 18px;
}
.md-table-card .md-table-pagination .md-select {
      width: auto;
      min-width: 36px;
      margin: 0 32px;
}
.md-table-card .md-table-pagination .md-select:after {
        margin-top: 0;
}
.md-table-card .md-table-pagination .md-select .md-select-value {
        padding: 0;
        border: none;
        font-size: 13px;
}
.md-table-card .md-table-pagination .md-button:not([disabled]) {
      color: rgba(0, 0, 0, 0.87);
}
.md-table-card .md-table-pagination .md-button[disabled] .md-icon {
      color: rgba(0, 0, 0, 0.26);
}
.md-pagination-select.md-direction-bottom-right {
  margin-top: -16px;
}
.md-pagination-select .md-list-item-holder {
  font-size: 13px;
}
.md-table-alternate-header {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: 10;
  pointer-events: none;
  opacity: 0;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: .3s;
}
.md-table-alternate-header.md-active {
    pointer-events: auto;
    opacity: 1;
    transform: translate3D(#000);
}
.md-table-alternate-header .md-counter {
    margin-left: 8px;
    -ms-flex: 1;
        flex: 1;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
/* Image aspect ratio calculator */
/* Responsive breakpoints */
.md-tabs {
  width: 100%;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-flow: column;
      flex-flow: column;
  position: relative;
}
.md-tabs.md-transition-off * {
    transition: none !important;
}
.md-tabs.md-dynamic-height .md-tabs-content {
    transition: height 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-tabs .md-tabs-navigation {
    height: 48px;
    min-height: 48px;
    position: relative;
    z-index: 1;
    display: -ms-flexbox;
    display: flex;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    overflow: hidden;
}
.md-tabs .md-tabs-navigation.md-has-navigation-scroll .md-tab-header-navigation-button.md-left {
      -ms-flex-order: 1;
          order: 1;
}
.md-tabs .md-tabs-navigation.md-has-navigation-scroll .md-tabs-navigation-container {
      -ms-flex-order: 2;
          order: 2;
}
.md-tabs .md-tabs-navigation.md-has-navigation-scroll .md-tab-header-navigation-button.md-right {
      -ms-flex-order: 3;
          order: 3;
}
.md-tabs .md-tabs-navigation.md-has-icon.md-has-label {
      min-height: 72px;
}
.md-tabs .md-tabs-navigation.md-has-icon.md-has-label .md-icon {
        margin-bottom: 10px;
}
.md-tabs .md-tabs-navigation.md-centered {
      -ms-flex-pack: center;
          justify-content: center;
}
.md-tabs .md-tabs-navigation.md-fixed .md-tabs-navigation-container,
    .md-tabs .md-tabs-navigation.md-fixed .md-tabs-navigation-scroll-container {
      -ms-flex: 1;
          flex: 1;
}
.md-tabs .md-tabs-navigation.md-fixed .md-tab-header {
      -ms-flex: 1;
          flex: 1;
      max-width: none;
}
.md-tabs .md-tabs-navigation.md-right {
      -ms-flex-pack: end;
          justify-content: flex-end;
}
.md-tabs .md-tabs-navigation-container {
    display: -ms-flexbox;
    display: flex;
    overflow-x: auto;
}
.md-tabs .md-tabs-navigation-scroll-container {
    display: -ms-flexbox;
    display: flex;
}
.md-tabs .md-tab-header {
    min-width: 72px;
    max-width: 264px;
    margin: 0;
    padding: 0 12px;
    position: relative;
    cursor: pointer;
    border: 0;
    background: none;
    transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
    font-family: inherit;
    font-size: 14px;
    font-weight: 500;
    text-transform: uppercase;
    -ms-flex-negative: 0;
        flex-shrink: 0;
}
.md-tabs .md-tab-header.md-disabled {
      cursor: default;
      pointer-events: none;
      -webkit-user-select: none;
         -moz-user-select: none;
          -ms-user-select: none;
              user-select: none;
      -webkit-user-drag: none;
}
.md-tabs .md-tab-header-container {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-flow: column;
        flex-flow: column;
    -ms-flex-pack: center;
        justify-content: center;
    -ms-flex-align: center;
        align-items: center;
}
.md-tabs .md-tab-header-container .md-icon {
      margin: 0;
}
.md-tabs .md-tab-indicator {
    height: 2px;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translate3D(0, 0, 0);
}
.md-tabs .md-tab-indicator.md-transition-off {
      transition: none !important;
}
.md-tabs .md-tab-indicator.md-to-right {
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), left 0.3s cubic-bezier(0.35, 0, 0.25, 1), right 0.15s cubic-bezier(0.35, 0, 0.25, 1);
}
.md-tabs .md-tab-indicator.md-to-left {
      transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1), right 0.3s cubic-bezier(0.35, 0, 0.25, 1), left 0.15s cubic-bezier(0.35, 0, 0.25, 1);
}
.md-tabs .md-tab-header-navigation-button {
    border: none;
    height: 100%;
    cursor: pointer;
    position: relative;
}
.md-tabs .md-tab-header-navigation-button.md-left {
      left: 0;
}
.md-tabs .md-tab-header-navigation-button.md-right {
      right: 0;
}
.md-tabs .md-tab-header-navigation-button.md-disabled {
      pointer-events: none;
      opacity: .4;
}
.md-tabs .md-tabs-content {
    width: 100%;
    height: 0;
    position: relative;
    overflow: hidden;
}
.md-tabs .md-tabs-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transform: translate3d(0, 0, 0);
    transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}
.md-tabs .md-tab {
    padding: 16px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}
@media (min-width: 660px) {
  .md-tabs .md-tabs-navigation.md-has-navigation-scroll .md-tabs-navigation-container {
    margin-bottom: -15px;
  }
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-toolbar {
  min-height: 64px;
  padding: 0 8px;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
      align-items: center;
  -ms-flex-line-pack: center;
      align-content: center;
  -ms-flex-flow: row wrap;
      flex-flow: row wrap;
  position: relative;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translate3D(0, 0, 0);
}
.md-toolbar.md-dense {
    min-height: 48px;
}
.md-toolbar.md-dense.md-medium {
      min-height: 72px;
}
.md-toolbar.md-dense.md-large {
      min-height: 96px;
}
.md-toolbar.md-dense .md-toolbar-container {
      height: 48px;
}
.md-toolbar.md-medium {
    min-height: 88px;
}
.md-toolbar.md-medium .md-toolbar-container:nth-child(2) .md-title:first-child {
      margin-left: 56px;
}
.md-toolbar.md-large {
    min-height: 128px;
    -ms-flex-line-pack: inherit;
        align-content: inherit;
}
.md-toolbar.md-large .md-toolbar-container:nth-child(2) .md-title:first-child {
      margin-left: 56px;
}
.md-toolbar.md-account-header {
    min-height: 164px;
}
.md-toolbar.md-account-header .md-ink-ripple {
      color: #fff;
}
.md-toolbar.md-account-header .md-list-item-container:hover:not([disabled]) {
      background-color: rgba(255, 255, 255, 0.12);
}
.md-toolbar.md-account-header .md-avatar-list {
      margin: 16px 0 8px;
}
.md-toolbar.md-account-header .md-avatar-list .md-list-item-container {
        -ms-flex-align: start;
            align-items: flex-start;
}
.md-toolbar.md-account-header .md-avatar-list .md-avatar + .md-avatar {
        margin-left: 16px;
}
.md-toolbar .md-toolbar-container {
    width: 100%;
    height: 64px;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
        align-items: center;
    -ms-flex-item-align: start;
        align-self: flex-start;
}
.md-toolbar .md-toolbar-container > .md-button:first-child {
      margin-left: 0;
      margin-right: 16px;
}
.md-toolbar .md-toolbar-container > .md-button + .md-button {
      margin-left: 0;
}
.md-toolbar > .md-button:first-child {
    margin-left: 0;
    margin-right: 16px;
}
.md-toolbar > .md-button + .md-button {
    margin-left: 0;
}
.md-toolbar .md-button:hover:not([disabled]):not(.md-raised):not(.md-icon-button):not(.md-fab) {
    background-color: rgba(255, 255, 255, 0.1);
}
.md-toolbar .md-title {
    margin: 0;
    font-size: 20px;
    font-weight: 400;
}
.md-toolbar .md-title:first-child {
      margin-left: 8px;
}
.md-toolbar .md-title + .md-input-container {
      margin-left: 24px;
}
.md-toolbar .md-input-container {
    min-height: 32px;
    margin-top: 0;
    margin-bottom: 0;
    padding-top: 0;
}
.md-toolbar .md-list {
    padding: 0;
    margin: 0 -8px;
    -ms-flex: 1;
        flex: 1;
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-tooltip {
  height: 20px;
  padding: 0 8px;
  position: fixed;
  z-index: 200;
  pointer-events: none;
  background-color: rgba(97, 97, 97, 0.87);
  border-radius: 2px;
  opacity: 0;
  transform-origin: center top;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: .3s;
  transition-delay: 0s;
  color: #fff;
  font-family: Roboto, "Noto Sans", Noto, sans-serif;
  font-size: 10px;
  line-height: 20px;
  text-transform: none;
  white-space: nowrap;
}
.md-tooltip.md-active {
    opacity: 1;
    transition: all 0.3s cubic-bezier(0.55, 0, 0.55, 0.2);
    transition-duration: .3s;
}
.md-tooltip:not(.md-active) {
    transition-delay: 0s !important;
}
.md-tooltip.md-transition-off {
    transition: none !important;
}
.md-tooltip.md-tooltip-top {
    margin-top: -14px;
    transform: translate(-50%, 8px);
}
.md-tooltip.md-tooltip-top.md-active {
      transform: translate(-50%, 0);
}
.md-tooltip.md-tooltip-right {
    margin-left: 14px;
    transform: translate(-8px, 50%);
}
.md-tooltip.md-tooltip-right.md-active {
      transform: translate(0, 50%);
}
.md-tooltip.md-tooltip-bottom {
    margin-top: 14px;
    transform: translate(-50%, -8px);
}
.md-tooltip.md-tooltip-bottom.md-active {
      transform: translate(-50%, 0);
}
.md-tooltip.md-tooltip-left {
    margin-left: -14px;
    transform: translate(8px, 50%);
}
.md-tooltip.md-tooltip-left.md-active {
      transform: translate(0, 50%);
}
/* Common */
/* Responsive Breakpoints */
/* Transitions - Based on Angular Material */
/* Elevation - Based on Angular Material */
.md-whiteframe {
  position: relative;
  z-index: 1;
}
.md-whiteframe-1dp {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2), 0 1px 1px rgba(0, 0, 0, 0.14), 0 2px 1px -1px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-2dp {
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.2), 0 2px 2px rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-3dp {
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.2), 0 3px 4px rgba(0, 0, 0, 0.14), 0 3px 3px -2px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-4dp {
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px rgba(0, 0, 0, 0.14), 0 1px 10px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-5dp {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 5px 8px rgba(0, 0, 0, 0.14), 0 1px 14px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-6dp {
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px rgba(0, 0, 0, 0.14), 0 1px 18px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-7dp {
  box-shadow: 0 4px 5px -2px rgba(0, 0, 0, 0.2), 0 7px 10px 1px rgba(0, 0, 0, 0.14), 0 2px 16px 1px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-8dp {
  box-shadow: 0 5px 5px -3px rgba(0, 0, 0, 0.2), 0 8px 10px 1px rgba(0, 0, 0, 0.14), 0 3px 14px 2px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-9dp {
  box-shadow: 0 5px 6px -3px rgba(0, 0, 0, 0.2), 0 9px 12px 1px rgba(0, 0, 0, 0.14), 0 3px 16px 2px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-10dp {
  box-shadow: 0 6px 6px -3px rgba(0, 0, 0, 0.2), 0 10px 14px 1px rgba(0, 0, 0, 0.14), 0 4px 18px 3px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-11dp {
  box-shadow: 0 6px 7px -4px rgba(0, 0, 0, 0.2), 0 11px 15px 1px rgba(0, 0, 0, 0.14), 0 4px 20px 3px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-12dp {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 12px 17px 2px rgba(0, 0, 0, 0.14), 0 5px 22px 4px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-13dp {
  box-shadow: 0 7px 8px -4px rgba(0, 0, 0, 0.2), 0 13px 19px 2px rgba(0, 0, 0, 0.14), 0 5px 24px 4px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-14dp {
  box-shadow: 0 7px 9px -4px rgba(0, 0, 0, 0.2), 0 14px 21px 2px rgba(0, 0, 0, 0.14), 0 5px 26px 4px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-15dp {
  box-shadow: 0 8px 9px -5px rgba(0, 0, 0, 0.2), 0 15px 22px 2px rgba(0, 0, 0, 0.14), 0 6px 28px 5px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-16dp {
  box-shadow: 0 8px 10px -5px rgba(0, 0, 0, 0.2), 0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-17dp {
  box-shadow: 0 8px 11px -5px rgba(0, 0, 0, 0.2), 0 17px 26px 2px rgba(0, 0, 0, 0.14), 0 6px 32px 5px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-18dp {
  box-shadow: 0 9px 11px -5px rgba(0, 0, 0, 0.2), 0 18px 28px 2px rgba(0, 0, 0, 0.14), 0 7px 34px 6px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-19dp {
  box-shadow: 0 9px 12px -6px rgba(0, 0, 0, 0.2), 0 19px 29px 2px rgba(0, 0, 0, 0.14), 0 7px 36px 6px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-20dp {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 20px 31px 3px rgba(0, 0, 0, 0.14), 0 8px 38px 7px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-21dp {
  box-shadow: 0 10px 13px -6px rgba(0, 0, 0, 0.2), 0 21px 33px 3px rgba(0, 0, 0, 0.14), 0 8px 40px 7px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-22dp {
  box-shadow: 0 10px 14px -6px rgba(0, 0, 0, 0.2), 0 22px 35px 3px rgba(0, 0, 0, 0.14), 0 8px 42px 7px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-23dp {
  box-shadow: 0 11px 14px -7px rgba(0, 0, 0, 0.2), 0 23px 36px 3px rgba(0, 0, 0, 0.14), 0 9px 44px 8px rgba(0, 0, 0, 0.12);
}
.md-whiteframe-24dp {
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, 0.2), 0 24px 38px 3px rgba(0, 0, 0, 0.14), 0 9px 46px 8px rgba(0, 0, 0, 0.12);
}

/*# sourceMappingURL=vue-material.css.map*/
`;
    
    var addCss = function addCss(id, style) {
        var head = document.head;
        var styleElement = head.querySelector('#' + id);

        if (!styleElement) {
            var newTag = document.createElement("style");
            newTag.type = 'text/css';
            newTag.id = id;
            newTag.textContent = style;
            head.appendChild(newTag);
        } else {
            styleElement.textContent = styleElement.textContent + "\n" + style;
        }
    };
    
    addCss("n-app-styles", css);
})();