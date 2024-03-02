const react = require("react");
const img = require("../img/op.png");

// export const Msg = () => react.createElement("h1", null, "Hello World");
const App = () => {
    return (
        <div className="wrapper">
            <h1 className="text-center text-4xl text-slate-800 my-5">Hello World</h1>
            <img src={img} alt="..." className="pict"/>
        </div>
    )
}
const Home = () => <h1 className="text-center">Home</h1>;
const Contact = () => <h1 className="text-center">Contact</h1>;

export {
    App,
    Home,
    Contact,
}