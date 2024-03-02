const {App, Home, Contact } = require("../components/components");
const { Error } = require("../errors/error-page");
const {createBrowserRouter} = require("react-router-dom");

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <Error />,
    },
    {
        path: "home",
        element: <Home />,
    },
    {
        path: "contact",
        element: <Contact />,
    },
]);

export {
    router
};
