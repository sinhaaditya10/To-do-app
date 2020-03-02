import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import logo from "./logos.png";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: [],
      strikeThrough: []
    };
  }

  addItem(todoValue) {
    if (todoValue !== "") {
      const newItem = {
        id: Date.now(),
        value: todoValue,
        isDone: false
      };
      const list = [...this.state.list];
      list.push(newItem);
      this.setState({
        list,
        newItem: ""
      });
    }
  }

  deleteItem(id) {
    const list = [...this.state.list];
    const updatedList = list.filter(item => item.id !== id);
    this.setState({ list: updatedList });
  }

  updatedInput(input) {
    this.setState({ newItem: input });
  }

  itemChecked(itemId) {
    const checkedItems = this.state.list.map(c => {
      if (itemId === c.id) {
        c.isDone = !c.isDone;
      }
      return c;
    });
    this.setState({
      list: [].concat(checkedItems)
    });
  }

  render() {
    return (
      <div>
        <img src={logo} className="logo" width="100" height="100" />

        <div className="container">
          <h1 className="app-title">To-Do App</h1>
          Add an item
          <br />
          <input
            type="text"
            className="input-text"
            placeholder="Whats on your mind?"
            value={this.state.newItem}
            onChange={e => this.updatedInput(e.target.value)}
          />
          <button
            className="btn btn-primary btn-sm m-3"
            onClick={() => this.addItem(this.state.newItem)}
            disabled={!this.state.newItem.length}
          >
            Save
          </button>
          <div className="list">
            <ul style={{ listStyleType: "none" }}>
              {this.state.list.map(item => {
                return (
                  <li key={item.id}>
                    <div className="row">
                      <div className="column1">
                        <input
                          type="checkbox"
                          checked={item.isDone}
                          onChange={() => this.itemChecked(item.id)}
                        />
                        <span style={{ marginLeft: "10px" }}>{item.value}</span>
                      </div>
                      <div className="column2">
                        <button
                          className="btn btn-danger btn-sm m-2"
                          onClick={() => this.deleteItem(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
