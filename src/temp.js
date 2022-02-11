import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
//https://api.publicapis.org/entries?category=Cryptocurrency

function httpGet(url) {
  var request = new XMLHttpRequest();
  request.open("GET", url, false);
  request.send(null);
  return request.responseText;
}

function MyCard(props) {
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}
//let cards = [];
function Component(props) {
  let result;

  const [cards, setCards] = useState();
  const [category, setCategory] = useState("");

  const onChangeCategory = (event) => {
    const { name, value } = event.target;
    setCategory(value);
  };

  const handleSubmit = () => {
    // result = httpGet("https://api.publicapis.org/entries?category=Cryptocurrency");
    // let data = [];
    // data = JSON.parse(result);

    // for(var i = 0; i < result.length; ++i)
    //   cards.push(<MyCard text={result.at(0)} />)
    // setCards(cards);

    props.handleClick(category);
  };

  return (
    <div>
      <input
        name="category"
        value={category}
        type="text"
        onChange={onChangeCategory}
      />
      <button onClick={handleSubmit}>Submit</button>
      {cards}
    </div>
  );
}

function List({ list }) {
  return (
    <div>
      {list.length > 0 && list.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
}

function App() {
  const [list, setList] = useState([]);

  const handleClick = (retVal) => {
    setList((state) => [...state, retVal]);
    console.log("retVal: ", list);
  };

  return (
    <div>
      <Component handleClick={handleClick} />
      <List list={list} />
    </div>
  );
}

export default App;
