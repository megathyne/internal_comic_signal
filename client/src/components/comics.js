import React from "react";
class Comics extends React.Component {
  componentDidMount = async () => {
    this.props.getComics();
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
