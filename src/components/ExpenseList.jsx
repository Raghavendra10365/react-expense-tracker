import ExpenseItem from "./ExpenseItem";

function ExpenseList({ expenses, onDelete }) {
  if (expenses.length === 0) {
    return <p className="empty">No expenses added yet.</p>;
  }

  return (
    <>
      {expenses.map(exp => (
        <ExpenseItem
          key={exp.id}
          expense={exp}
          onDelete={onDelete}
        />
      ))}
    </>
  );
}

export default ExpenseList;