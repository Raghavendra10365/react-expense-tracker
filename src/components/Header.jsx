function Header({ selectedMonth, setSelectedMonth, months }) {
  return (
    <div className="header">
      <h1 className="app-title">Personal Expense Tracker</h1>

      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="month-filter"
      >
        <option value="">All Months</option>

        {months.map(month => {
          const [year, m] = month.split("-");
          const dateObj = new Date(year, m - 1);

          const formatted = dateObj.toLocaleString("default", {
            month: "long",
            year: "numeric"
          });

          return (
            <option key={month} value={month}>
              {formatted}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Header;