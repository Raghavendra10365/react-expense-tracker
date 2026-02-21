function ExpenseItem({ expense, onDelete }) {
  return (
    <div className="expense-item">
      <div className="expense-details">
        <h3>{expense.category}</h3>
        <p>{expense.note}</p>
        <span>{expense.date}</span>
      </div>

      <div className="expense-right">
        <strong>₹{expense.amount}</strong>
        <button
          className="delete-btn"
          onClick={() => onDelete(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseItem;