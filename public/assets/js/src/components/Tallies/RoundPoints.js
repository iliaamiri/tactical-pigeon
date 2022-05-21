import Component from "../../core/component.js";

// Helpers
import Round from "../../helpers/Round.js";

const RoundPoints = {
  ...Component,

  exhibit(roundResult, pointText) {
    this.roundResult = roundResult;
    this.pointText = pointText;

    this.curtainsUp();

    this.curtainsClose();
  },

  curtainsUp() {
    setTimeout(() => {
      let span = document.createElement("span");

      span.innerHTML = this.pointText;
      span = this.decorateSpan(span);

      let roundPoints = document.querySelector(`table > tbody > tr:nth-child(1) > td:nth-child(${Round.tdCounter + 2})`);

      roundPoints.appendChild(span);
      Round.tdCounter++;
    }, 350);
  },

  curtainsClose() {
    setTimeout(() => {
      document.querySelector("span.roundResult").remove();
    }, 1500);
  },

  decorateSpan(span) {
    switch (this.roundResult) {
      case "win":
        span.classList.add("roundResult", "roundWin");
        break;
      case "lose":
        span.classList.add("roundResult", "roundLose");
        break;
      case "draw":
        span.style.fontSize = "1.4vw";
        span.style.webkitTextStrokeWidth = "0.1vw";
        span.classList.add("roundResult", "roundDraw");
        break;
      default:
        break;
    }

    return span;
  }
};

export default RoundPoints;