import React from "react";
import Counter from "../Counter";
import { render, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

let getByTestId;

beforeEach(() => {
  const component = render(<Counter />);
  getByTestId = component.getByTestId;
});

afterEach(() => {
  cleanup()
})

// Vérification de la présence d'un titre (My counter)
test("header renders with correct text", () => {
  const headerEl = getByTestId("header");

  expect(headerEl.textContent).toBe("My counter");
});

// Vérifie si la vleur initiale du compteur est 0
test("counter initially start with text of 0", () => {
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");
});

// vérifie si l'input a comme valeur initiale 1
test("input contains initial value of 1", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1");
});

// Vérifie si le bouton ajouter a le text +
test("add button renders with +", () => {
  const addBtn = getByTestId("add-btn");

  expect(addBtn.textContent).toBe("+");
});

// Vérifie si le bouton soustraire a le text -
test("substract button renders with -", () => {
  const subtractBtn = getByTestId("subtract-btn");

  expect(subtractBtn.textContent).toBe("-");
});

// Vérifie si le changement des valeurs à l\'input se fait correctement
test("Change value of input works correctly", () => {
  const inputEl = getByTestId("input");

  expect(inputEl.value).toBe("1");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  expect(inputEl.value).toBe("5");
});

// Vérifie si le click sur le bouton plus (+) ajoute 1 au compteur

test("click on plus btn adds 1 to counter", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("1");
});
// Vérifie si le click sur le bouton moins (-) enlève 1 au compteur

test("click on subtract btn subtracts 1 from counter", () => {
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");

  expect(counterEl.textContent).toBe("0");

  fireEvent.click(subtractBtnEl);

  expect(counterEl.textContent).toBe("-1");
});

// Vérifie si le click sur le bouton plus (+) ajoute quelque chose au compteur si la valeur d\'input change

test("changing input value then clicking on add btn works correctly", () => {
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtnEl);

  expect(counterEl.textContent).toBe("5");
});

// Vérifie si le click sur le bouton plus (-) soustrait quelque chose au compteur si la valeur d\'input change

test("changing input value then clicking on subtract btn works correctly", () => {
  const subtractBtnEl = getByTestId("subtract-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(subtractBtnEl);

  expect(counterEl.textContent).toBe("-5");
});

// Vérifie si le bouton plus et moins fonctionnent bien ensemble
test("adding and then subtracting leads to the correct counter number", () => {
  const subtractBtnEl = getByTestId("subtract-btn");
  const addBtnEl = getByTestId("add-btn");
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");

  fireEvent.change(inputEl, {
    target: {
      value: "10",
    },
  });

  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);

  expect(counterEl.textContent).toBe("20");

  fireEvent.change(inputEl, {
    target: {
      value: "5",
    },
  });

  fireEvent.click(addBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);

  expect(counterEl.textContent).toBe("15");
});

// Vérifie si le conpteur contient la classe css .green ou .red
test("counter contains correct className", () => {
  const counterEl = getByTestId("counter");
  const inputEl = getByTestId("input");
  const subtractBtnEl = getByTestId("subtract-btn");
  const addBtnEl = getByTestId("add-btn");

  expect(counterEl.className).toBe("");

  fireEvent.change(inputEl, {
    target: {
      value: "50",
    },
  });

  fireEvent.click(addBtnEl);

  expect(counterEl.className).toBe("");

  fireEvent.click(addBtnEl);

  expect(counterEl.className).toBe("green");

  fireEvent.click(addBtnEl);

  expect(counterEl.className).toBe("green");

  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);

  expect(counterEl.className).toBe("");

  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);
  fireEvent.click(subtractBtnEl);

  expect(counterEl.className).toBe("red");
});
