const Datetime = () => {
  var daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var monthsList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var dateObj = new Date();
  var month = monthsList[dateObj.getUTCMonth()]; //months from 1-12
  var day = dateObj.getUTCDate();
  var year = dateObj.getUTCFullYear();
  var days = daysList[dateObj.getDay()];

  // var newdate = days + " " + "," + day + "," + month + "," + year;
  var newdate = days + " " + " " + day + "," + month;
  return <div>{newdate}</div>;
};

export default Datetime;
