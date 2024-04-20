import React from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Todo from "./Todo/todo";


const Page = (props) => {
  const { t } = props;
  let localCount = 0;
  const [stateCount, setStateCount] = React.useState(0);

  React.useEffect(() => {
    console.log("from useEffet", stateCount);
    setStateCount(JSON.parse(window.localStorage.getItem("count")));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("count", stateCount);
  }, [stateCount]);

  const ref = React.useRef(null);

  const syncIncrement = () => {
    // ref.current.innerHTML = "from ref - localCount: " + stateCount;
    setStateCount((prev) => {
      console.log("stateCount", stateCount);
      //   ref.current.innerHTML = "from ref - localCount: " + (prev + 1);
      return prev + 1;
    });
  };

  console.log("rendering...", ref);

  return (
    <div>
      {/* <p ref={ref}>localCount:</p> */}
      <p>stateCount: {stateCount}</p>
      <button onClick={syncIncrement}>Increment</button>

      {stateCount == 1 ? <div>I am 1</div> : <div>Not 1</div>}
    </div>
  );
};

/**
 * state
 *  -> props
 *  -> context API
 *  -> redux | mobx | recoil
 * 
 * 
 * 
 * React - Render
    * reconciliation 
    * diffing algo
*
--> hooks
* - useEffect - helps to subscribe a state varible

* - useMemo
* - useCallback
* - useRef
 *  */

function App() {
  const memObj = React.useMemo(() => ({ name: "hello" }), []);
  const memFunction = React.useCallback(() => {
    console.log("hello");
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Hello World</div>}></Route>
        <Route path="/page/:page" element={<Page t={memObj} />}></Route>
        <Route path="/todo" element={<Todo />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
