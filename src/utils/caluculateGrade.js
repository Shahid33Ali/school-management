const calculateGrade = (marks) => {
  switch (true) {
    case marks > 90:
      return "A";
    case marks > 80:
      return "B";
    case marks > 70:
      return "C";
    case marks > 60:
      return "D";
    case marks > 50:
      return "E";
    default:
      return "F";
  }
};
module.exports = calculateGrade;
