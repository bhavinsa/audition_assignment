import "./App.css";
import { useState } from "react";

function App() {
  // TODO - Get data from API using useEffect.
  const [list, setList] = useState([
    {
      name: "Foundation",
      status: false,
      id: 1,
      childs: [
        { childName: "Setup virtual office", status: false, id: 11 },
        { childName: "Set mission & vision", status: false, id: 12 },
        { childName: "Select business name", status: false, id: 13 },
        { childName: "Buy domains", status: false, id: 14 },
      ],
    },
    {
      name: "Discovery",
      status: false,
      id: 2,
      childs: [
        { childName: "Create roadmap", status: false, id: 21 },
        { childName: "Competitor analysis", status: false, id: 22 },
      ],
    },
    {
      name: "Delivery",
      status: false,
      id: 3,
      childs: [
        { childName: "Release marketing website", status: false, id: 31 },
        { childName: "Release MVP", status: false, id: 32 },
      ],
    },
  ]);

  function handleChecked(event, parentItem, childItem) {
    let parentSelected = true;
    list.forEach((item) => {
      if (parentItem.id > item.id && item.status === false) {
        parentSelected = false;
      }
    });

    if (!parentSelected) {
      // TODO - Replace alert with better UI popup.
      alert("Kindly complete previous phase.");
      return;
    }
    const updateData = list.filter((item) => {
      if (item.id === parentItem.id) {
        let flag = true;
        item.childs.filter((subItem) => {
          if (subItem.id === parseInt(childItem.id)) {
            subItem.status = event.target.checked;
          }
          if (!subItem.status) {
            flag = false;
          }
          return true;
        });
        if (flag) {
          item.status = true;
        } else {
          item.status = false;
        }
      }
      return true;
    });

    const isCompleted = list.find((item) => item.status === false);
    if (!isCompleted) {
      var requestOptions = {
        method: "GET",
      };
      // TODO - API call separation
      fetch("https://uselessfacts.jsph.pl/random.json", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // TODO - Replace alert with better UI popup.
          alert(result.text + " " + result.source_url);

          // TODO - Pass data to backend for persistent storage.
        })
        .catch((error) => console.log("error", error));
    }
    setList(updateData);
  }

  return (
    // TODO - UI component for list element
    <div className="main-wrapper">
      <h2>My startup progress</h2>
      {list.map((item) => (
        <ul key={item.id}>
          <h2>
            <span>{item.id} </span> {item.name}{" "}
            {item.status === true ? (
              <i className="fa fa-check" aria-hidden="true"></i>
            ) : (
              ""
            )}
          </h2>
          {item.childs.map((subItem) => (
            <li style={{ listStyleType: "none" }} key={subItem.id}>
              <input
                type="checkbox"
                disabled={item.status}
                checked={subItem.status}
                value={subItem.id}
                onChange={(e) => {
                  handleChecked(e, item, subItem);
                }}
              />{" "}
              <label className="sub-child">{subItem.childName}</label>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

export default App;
