class calendar {
  constructor(target = document.createElement("div")) {
    this.date = new Date();
    this.today = new Date();
    this.daysOfWeek = ["sun", "mon", "tues", "wed", "thur", "fri", "sat"];
    this.target = document.getElementById(target);
  }
  createButton = className => {
    const button = document.createElement("button");
    if (className === "left") {
      button.textContent = "<";
      button.myParameter = -1;
      button.addEventListener("click", this.buttonListener);
    } else {
      button.textContent = ">";
      button.myParameter = 1;
      button.addEventListener("click", this.buttonListener);
    }
    button.classList = `${className} calendar-button`;
    return button;
  };
  renderCalendarHead = () => {
    const tr = document.createElement("tr");
    const leftButtonWrapper = document.createElement("td");
    const rightButtonWrapper = document.createElement("td");
    const leftButton = this.createButton("left");
    const rightButton = this.createButton("right");
    leftButtonWrapper.append(leftButton);
    rightButtonWrapper.append(rightButton);
    const header = document.createElement("td");
    const h2 = document.createElement("h2");
    h2.classList = "calendar-head";
    header.append(h2);
    header.colSpan = 5;
    tr.append(leftButtonWrapper);
    tr.append(header);
    tr.append(rightButtonWrapper);
    return tr;
  };
  renderDaysOfWeek = () => {
    const tr = document.createElement("tr");
    for (let i = 0; i < this.daysOfWeek.length; i++) {
      const td = document.createElement("td");
      td.textContent = this.daysOfWeek[i];
      tr.append(td);
    }
    return tr;
  };
  setCalenderHead = () => {
    this.target.getElementsByClassName(
      "calendar-head"
    )[0].textContent = this.date.toLocaleString("en", {
      month: "long",
      year: "numeric"
    });
  };
  getNumberOfDays = (mounth = 1) => {
    return new Date(
      this.date.getFullYear(),
      this.date.getMonth() + mounth,
      0
    ).getDate();
  };
  getDayOfTheWeek = () => {
    return new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  };
  highlighted = node => {
    node.addEventListener("click", evt => {
      if (evt.target.classList.contains("pressed")) {
        evt.target.classList.remove("pressed");
        return;
      }
      if (this.target.getElementsByClassName("pressed").length) {
        this.target
          .getElementsByClassName("pressed")[0]
          .classList.remove("pressed");
      }
      if (!evt.target.classList.contains("disabled")) {
        evt.target.classList += " pressed";
      }
    });
  };
  buttonListener = event => {
    this.date.setMonth(this.date.getMonth() + event.target.myParameter);
    this.renderData();
  };
  renderData = () => {
    this.setCalenderHead();
    this.fillData();
    this.highlightWeekdends();
  };
  renderBody = () => {
    const tbody = document.createElement("tbody");
    for (let i = 0; i < 6; i++) {
      const row = document.createElement("tr");
      row.classList = "calendar-body";
      for (let j = 0; j < 7; j++) {
        const td = document.createElement("td");
        td.classList.add("date");
        this.highlighted(td);
        row.append(td);
      }
      tbody.append(row);
    }
    return tbody;
  };
  fillData = () => {
    const data = [
      ...this.setPreviousMounth(),
      ...this.setThisMounth(),
      ...this.setNextMounth()
    ];
    const elements = Array.from(this.target.getElementsByClassName("date"));
    elements.map((element, index) => {
      element.textContent = data[index].textContent;
      element.classList = data[index].classList;
    });
  };
  highlightWeekdends = () => {
    const elements = Array.from(this.target.getElementsByClassName("date"));
    elements.map((element, index) => {
      if (index % 7 === 0) {
        element.classList.add("weekend");
      }
    });
  };
  setThisMounth = () => {
    const data = [];
    for (let i = 1; i < this.getNumberOfDays() + 1; i++) {
      data.push({ classList: "date", textContent: i });
      if (
        i === this.today.getDate() &&
        this.date.getMonth() === this.today.getMonth() &&
        this.date.getFullYear() === this.today.getFullYear()
      ) {
        data[i - 1].classList = "date today";
      }
    }
    return data;
  };
  setPreviousMounth = () => {
    const data = [];
    for (let i = 1; i < this.getDayOfTheWeek() + 1; i++) {
      data.push({
        classList: "date disabled",
        textContent: this.getNumberOfDays(0) - this.getDayOfTheWeek() + i
      });
    }
    return data;
  };
  setNextMounth = () => {
    const data = [];
    for (
      let i = 1;
      i < 42 - this.getDayOfTheWeek() + this.getNumberOfDays() + 1;
      i++
    ) {
      data.push({ classList: "date disabled", textContent: i });
    }
    return data;
  };
  render = () => {
    const table = document.createElement("table");
    table.classList.add("calendar");
    table.append(this.renderCalendarHead());
    table.append(this.renderDaysOfWeek());
    table.append(this.renderBody());
    this.target.append(table);
    this.renderData();
  };
}
const cald = new calendar("calendar");
cald.render();
