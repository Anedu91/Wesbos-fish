import React from "react";

import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import Fish from "./Fish";
import base from "../base";
import samplefishes from "../sample-fishes";

class App extends React.Component {
  state = {
    fishes: {},
    order: {},
  };
  componentDidMount() {
    //estos props que tengo en app vienen del react-router e instancias superiores.
    //dentro de match (uno de los objetos que es prop) encuentro los parametros de la url
    const { params } = this.props.match;

    // reinstate our localStore
    const localStorageRef = localStorage.getItem(params.storeId);
    if (localStorageRef) {
      this.setState({ order: JSON.parse(localStorageRef) });
    }
    //este ref es la referencia en la base de datos de firebase
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }

  componentDidUpdate() {
    localStorage.setItem(
      this.props.match.params.storeId,
      JSON.stringify(this.state.order)
    );
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  addFish = (fish) => {
    // 1. Take a copy of the existing state
    const fishes = { ...this.state.fishes };
    // 2. Add our new fish to that fieshes object
    fishes[`fish${Date.now()}`] = fish;
    // 3. Set the new fishes object to state
    this.setState({
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    // 1.Take a copy of the current state
    const fishes = { ...this.state.fishes };

    // 2. Update the state
    fishes[key] = updatedFish;

    // 3. Set that to state
    this.setState({ fishes });
  };

  deleteFish = (key) => {
    // 1. Take a copy of the state
    const fishes = { ...this.state.fishes };

    // 2. update the state (lo igualo a null porque este estado está reflejado en firebase y tiene que ser null en la db)
    fishes[key] = null;
    // 3. update state
    this.setState({ fishes });
  };
  loadSampleFishes = () => {
    this.setState({ fishes: samplefishes });
  };

  addToOrder = (key) => {
    // 1. Take a copy of state
    const order = { ...this.state.order };
    // 2. Either add to the order, or update the number in our order
    order[key] = order[key] + 1 || 1;
    // 3. Call setState to update our state object
    this.setState({ order });
  };
  removeFromOrder = (key) => {
    const order = { ...this.state.order };
    // Aqui lo elimino con delete porque order está refleado en mi localstorage y no en db
    delete order[key];

    this.setState({ order });
  };
  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                addToOrder={() => this.addToOrder(key)}
              />
            ))}
          </ul>
        </div>
        <Order
          fishes={this.state.fishes}
          order={this.state.order}
          removeFromOrder={this.removeFromOrder}
        />
        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
        />
      </div>
    );
  }
}

export default App;
