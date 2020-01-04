import React from "react";

class Grade extends React.Component {
  componentDidMount = async () => {
    this.props.getGrades();
  };

  render() {
    return (
      <select onChange={this.props.setActiveGrade}>
        <option>Select Grade</option>
        {this.props.grades
          .sort((a, b) => a.grade - b.grade)
          .map((item, i) => {
            const { id, grade, grader } = item;
            return <option key={i} value={id}>{`${grade.toFixed(1)} - ${grader}`}</option>;
          })}
      </select>
    );
  }
}

export default Grade;
