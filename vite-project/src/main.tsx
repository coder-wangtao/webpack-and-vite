import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

// import env from "virtual:env";
// console.log(env);
createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

// import { render } from "./render";
// import { initState } from "./state";
// render();
// initState();
// if (import.meta.hot) {
//   import.meta.hot.accept(["./render.ts", "./state.ts"], (modules) => {
//     // 自定义更新
//     const [renderModule, stateModule] = modules;
//     if (renderModule) {
//       renderModule.render();
//     }
//     if (stateModule) {
//       stateModule.initState();
//     }
//   });
// }
