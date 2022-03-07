/* eslint-disable */
declare global {
  interface Window {
      remote:any;
  }
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
