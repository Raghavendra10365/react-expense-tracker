function ExpenseForm({
  amount,
  setAmount,
  category,
  setCategory,
  note,
  setNote,
  date,
  setDate,
  onSubmit,
  error
}) {
  return (
    <>
      {error && (
        <div className="error">{error}</div>
      )}

      <form onSubmit={onSubmit} className="form">
        <input
          className="input"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="input"
          type="text"
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <input
          className="input"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <button className="button" type="submit">
          Add Expense
        </button>
      </form>
    </>
  );
}

export default ExpenseForm;