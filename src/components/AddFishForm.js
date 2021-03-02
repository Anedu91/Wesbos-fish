import React from "react";

class AddFishForm extends React.Component {
  nameRef = React.createRef();
  priceRef = React.createRef();
  statusRef = React.createRef();
  descRef = React.createRef();
  imageRef = React.createRef();
  createFish = (event) => {
    event.preventDefault();

    const fish = {
      name: this.nameRef.current.value,
      price: parseFloat(this.priceRef.current.value),
      status: this.statusRef.current.value,
      desc: this.descRef.current.value,
      image: this.imageRef.current.value,
    };

    this.props.addFish(fish);

    // refresh the form
    event.currentTarget.reset();
  };
  render() {
    return (
      <div className="inventory">
        <form className="fish-edit" onSubmit={this.createFish}>
          <input
            type="text"
            name="name"
            ref={this.nameRef}
            placeholder="Name"
          />
          <input
            type="text"
            name="price"
            ref={this.priceRef}
            placeholder="Price"
          />
          <select name="status" ref={this.statusRef}>
            <option value="avaliable">Fresh</option>
            <option value="unavaliable">Sold Out</option>
          </select>
          <textarea
            name="desc"
            ref={this.descRef}
            placeholder="Desc"
          ></textarea>
          <input
            type="text"
            name="image"
            ref={this.imageRef}
            placeholder="Image"
          />

          <button type="submit">+ Add Fish</button>
        </form>
      </div>
    );
  }
}

export default AddFishForm;
