import React from "react";

class Vendor extends React.Component {
  componentDidMount = async () => {
    this.props.getVendors();
  };

  render() {
    return (
      <select onChange={this.props.setActiveVendor}>
        <option>Select Vendor</option>
        {this.props.vendors.map((item, i) => {
          const { id, name } = item;
          return <option key={i} value={id}>{`${name} `}</option>;
        })}
      </select>
    );
  }
}

export default Vendor;
