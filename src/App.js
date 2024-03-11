import React, { useRef, useState } from "react";
import ArrowIcon from "./assets/images/icon-arrow.svg";

const App = () => {
  const [result, setResult] = useState({ day: "--", month: "--", year: "--" });
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);

  const setError = (el, errmsg) => {
    const parEl = el.parentElement;
    parEl.classList.add("error");
    parEl.children[2].innerText = errmsg;
    setTimeout(() => {
      parEl.classList.remove("error");
      parEl.children[2].innerText = "";
    }, 3000);
  };

  const isLeap = (y) => {
    return y % 100 === 0
      ? y % 400 === 0
        ? true
        : false
      : y % 4 === 0
      ? true
      : false;
  };

  function findAge(
    current_date,
    current_month,
    current_year,
    birth_date,
    birth_month,
    birth_year
  ) {
    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (birth_date > current_date) {
      current_date = current_date + month[birth_month - 1];
      current_month = current_month - 1;
    }

    if (birth_month > current_month) {
      current_year = current_year - 1;
      current_month = current_month + 12;
    }

    var calculated_date = current_date - birth_date;
    var calculated_month = current_month - birth_month;
    var calculated_year = current_year - birth_year;

    setResult({
      day: calculated_date,
      month: calculated_month,
      year: calculated_year,
    });
  }
  const handleSubmit = () => {
    let d = parseInt(dayRef.current.value);
    let m = parseInt(monthRef.current.value);
    let y = parseInt(yearRef.current.value);

    if (dayRef.current.value === "") {
      setError(dayRef.current, "This field is required");
    }
    if (monthRef.current.value === "") {
      setError(monthRef.current, "This field is required");
    }
    if (yearRef.current.value === "") {
      setError(yearRef.current, "This field is required");
    }
    if (d && m && y) {
      let f = 0;
      if (d < 1 || d > 31) {
        setError(dayRef.current, "Must be a valid day");
        f = 1;
      }
      if (m < 1 || m > 12) {
        setError(monthRef.current, "Must be a valid month");
        f = 1;
      }
      if (y < 100) {
        setError(yearRef.current, "Must be a valid year");
        f = 1;
      }
      if (!isLeap(y) && m === 2 && d === 29) {
        setError(dayRef.current, `Must be a valid day`);
        f = 1;
      } else if (m === 2 && d > 29) {
        setError(dayRef.current, `Enter valid date`);
        f = 1;
      }
      if (f === 0) {
        const d1 = new Date();
        const d2 = new Date(`${y}-${m}-${d}`);
        if (d1 < d2) {
          setError(yearRef.current, "Must be in the past");
        } else {
          findAge(d1.getDate(), d1.getMonth() + 1, d1.getFullYear(), d, m, y);
        }
      }
    } else {
      if (!d) {
        setError(dayRef.current, "Must be a valid day");
      }
      if (!m) {
        setError(monthRef.current, "Must be a valid month");
      }
      if (!y) {
        setError(yearRef.current, "Enter valid value");
      }
    }
  };

  return (
    <div className="container">
      <form>
        <div className="input-container">
          <label htmlFor="day">Day</label>
          <input
            type="text"
            maxLength="2"
            ref={dayRef}
            name="day"
            id="day"
            placeholder="DD"
          />
          <p className="error-msg"></p>
        </div>
        <div className="input-container">
          <label htmlFor="month">Month</label>
          <input
            type="text"
            maxLength="2"
            ref={monthRef}
            name="month"
            id="month"
            placeholder="MM"
          />
          <p className="error-msg"></p>
        </div>
        <div className="input-container">
          <label htmlFor="day">Year</label>
          <input
            type="text"
            maxLength="4"
            ref={yearRef}
            name="year"
            id="year"
            placeholder="YYYY"
          />
          <p className="error-msg"></p>
        </div>
      </form>
      <button className="eval" onClick={handleSubmit}>
        <img src={ArrowIcon} alt="calculate" />
      </button>
      <div className="result-container">
        <h1>
          <span className="accent">{result.year}</span> year{result.year === "--"? "s" : (result.year === 1 ? "" : "s")}
        </h1>
        <h1>
          <span className="accent">{result.month}</span> month{result.month === "--"? "s" : (result.month === 1 ? "" : "s")}        </h1>
        <h1>
          <span className="accent">{result.day}</span> day{result.day === "--"? "s" : (result.day === 1 ? "" : "s")}  
 </h1>
      </div>
    </div>
  );
};

export default App;
