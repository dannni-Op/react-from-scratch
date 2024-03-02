const react = require("react");
const ReactDom = require("react-dom/client");
const { RouterProvider } = require("react-router-dom");
const { router } = require("./router/router");
require("./style/style.css");
require("./style/tailwind.css");

const container = document.querySelector("#root");
const root = ReactDom.createRoot(container);

root.render(
<react.StrictMode>
    <RouterProvider router={router} />
</react.StrictMode>
);