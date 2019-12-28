import React from "react";
import { APIGet } from "../api/api";
class Comics extends React.Component {
  componentDidMount = async () => {
    try {
      const results = await APIGet("comic");
      this.props.setComics(results);
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <select onChange={this.props.setActiveComic}>
        <option>Select Comic</option>
        {this.props.comics.map((item, i) => {
          const { id, issue, notes, series, volume } = item;
          return (
            <option
              key={i}
              value={id}
            >{`${series} (${volume}) ${issue} ${notes}`}</option>
          );
        })}
      </select>
    );
  }
}

export default Comics;
