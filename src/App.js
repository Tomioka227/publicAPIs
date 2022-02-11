import "./App.css";
import React, { useState } from "react";

function MyCard(props) {
  return (
    <div className="card">
      <div>{props.text}</div>
    </div>
  );
}

function characSum(str) {
  let sum = 0;
  for (var i = 0, len = str.length; i < len; ++i) {
    let ch = str.at(i);
    if (ch >= "0" && ch <= "9") {
      sum += ch.charCodeAt() + 9999;
    } else sum += ch.charCodeAt();
  }
  return sum;
}

function containsNum(str) {
  for (var i = 0; i < str.length; ++i) {
    let ch = str.at(i);
    if (ch >= "0" && ch <= "9") return true;
  }
  return false;
}

function setList(data) {
  debugger;
  let resData = data;
  let tempData = [];
  for (var i = 0; i < data.length; ) {
    if (containsNum(data.at(i).API)) {
      tempData.push(data.at(i));
      resData.splice(i, 1);
    } else ++i;
  }
  for (var i = 0, len = tempData.length; i < len; ++i) {
    for (var j = 0; j < len - 1; ++j) {
      if (characSum(tempData.at(i).API) < characSum(tempData.at(j).API)) {
        var temp = tempData[i];
        tempData[i] = tempData[j];
        tempData[j] = temp;
      }
    }
  }
  debugger;
  resData.push(...tempData);
  return resData;
}

const baseUrl = "https://api.publicapis.org/entries";
function Component(props) {
  let result;

  const [category, setCategory] = useState("");

  const onChangeCategory = (event) => {
    const { name, value } = event.target;
    setCategory(value);
  };

  const handleSubmit = () => {
    fetch(baseUrl + "?category=" + category)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        let data = res;
        data = res.entries;
        console.log(result);
        setList(data);
        for (var i = 0; i < data.length; ++i) {
          // let resString =
          //   '"API":' +
          //   data.at(i).API +
          //   "\n" +
          //   '"Description:"' +
          //   data.at(i).Description +
          //   "\n" +
          //   '"Auth:"' +
          //   data.at(i).Description +
          //   "\n" +
          //   '"Cors:"' +
          //   data.at(i).Description +
          //   "\n" +
          //   '"Link:"' +
          //   data.at(i).Description +
          //   "\n" +
          //   '"Category:"' +
          //   data.at(i).Description;
          // props.handleClick(resString);
          props.handleClick(
            (i + 1).toString() + "." + '"API": ' + data.at(i).API,
            i
          );
        }
      });
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
    </div>
  );
}

function List({ list }) {
  return (
    <div>
      {list.length > 0 &&
        list.map((item, index) => <MyCard key={index} text={item} />)}
    </div>
  );
}

function App() {
  const [list, setList] = useState([]);

  const handleClick = (retVal, flag) => {
    !flag && setList([null]);
    setList((state) => [...state, retVal]);
  };

  return (
    <div>
      <Component handleClick={handleClick} />
      <List list={list} />
    </div>
  );
}

export default App;
