const express = require("express");
const app = express();
const moment = require("moment");

const port = 3000;

let expenses = [
  {
    id: 1,
    name: "exp1",
    cost: 10,
    createdAt: moment().format()
  }
];


app.use(express.json());


app.get("/expenses/:id", (req, res) => {
  res.json(expenses);
});

app.post("/expenses", (req, res) => {
  const newExpense = req.body;
  newExpense.id = expenses.length + 1;
  newExpense.createdAt = moment().format();
  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

app.put("/expenses/:id", (req, res) => {
  const expenseId = parseInt(req.params.id);
  const updatedExpense = req.body;
  const index = expenses.findIndex(expense => expense.id === expenseId);
  if (index !== -1) {
    expenses[index] = { ...expenses[index], ...updatedExpense };
    res.json(expenses[index]);
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
});


app.delete("/expenses/:id", (req, res) => {
  const expenseId = parseInt(req.params.id);
  const index = expenses.findIndex(expense => expense.id === expenseId);
  if (index !== -1) {
    expenses.splice(index, 1);
    res.json({ message: "Expense deleted successfully" });
  } else {
    res.status(404).json({ message: "Expense not found" });
  }
});

app.listen(port, () => {
  console.log(`app started at http://localhost:${port}`);
});
