import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import { useState, useEffect, useRef } from "react"
import { Sun, Moon } from "lucide-react"
import Header from "./components/Header";

function App() {

  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState("")
  const [note, setNote] = useState("")
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem("darkMode")
    return saved ? JSON.parse(saved) : false
  })
  const [selectedMonth, setSelectedMonth] = useState("")
  const [date, setDate] = useState("")
  const [error, setError] = useState("")
  const rippleRef = useRef(null)

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem("expenses")
    return saved ? JSON.parse(saved) : []
  })

  const months = [...new Set(expenses.map(exp => exp.date.slice(0, 7)))]

  const filteredExpenses = (
    selectedMonth
      ? expenses.filter(exp => exp.date.startsWith(selectedMonth))
      : expenses
  ).sort((a, b) => new Date(b.date) - new Date(a.date))

  const total = filteredExpenses.reduce(
    (sum, exp) => sum + Number(exp.amount),
    0
  )

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
  }, [darkMode])

  const toggleDarkMode = () => {
    if (rippleRef.current) {
      rippleRef.current.style.animation = "none"
      rippleRef.current.offsetHeight
      rippleRef.current.style.animation = "rippleEffect 0.6s ease-out"
    }
    setDarkMode(prev => !prev)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!amount || Number(amount) <= 0) {
      setError("Amount must be greater than 0")
      return
    }

    if (!category) {
      setError("Category is required")
      return
    }

    if (!date) {
      setError("Date is required")
      return
    }

    setError("")

    const newExpense = {
      id: Date.now(),
      amount,
      category,
      note,
      date
    }

    setExpenses([...expenses, newExpense])

    setAmount("")
    setCategory("")
    setNote("")
    setDate("")
  }

  const handleDelete = (id) => {
    setExpenses(expenses.filter(exp => exp.id !== id))
  }

  return (
    <div className={`app-container ${darkMode ? "dark" : ""}`}>

      <style>{`
        @keyframes glowPulse {
          0% { box-shadow: 0 0 12px rgba(255,255,255,0.25); }
          50% { box-shadow: 0 0 22px rgba(255,255,255,0.45); }
          100% { box-shadow: 0 0 12px rgba(255,255,255,0.25); }
        }

        @keyframes rippleEffect {
          0% { transform: scale(0); opacity: 0.6; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>

      {/* Floating Toggle */}
      <button
        onClick={toggleDarkMode}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "45px",
          height: "45px",
          borderRadius: "50%",
          border: "none",
          cursor: "pointer",
          backgroundColor: darkMode ? "#333" : "#e0e0e0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          zIndex: 1000,
          boxShadow: darkMode ? "0 0 12px rgba(255,255,255,0.25)" : "none",
          animation: darkMode ? "glowPulse 2.5s infinite ease-in-out" : "none"
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "scale(1.08)"
          if (darkMode) {
            e.currentTarget.style.boxShadow = "0 0 20px rgba(255,255,255,0.5)"
          } else {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "scale(1)"
          e.currentTarget.style.boxShadow = darkMode
            ? "0 0 12px rgba(255,255,255,0.25)"
            : "none"
        }}
      >
        <Sun
          size={22}
          style={{
            position: "absolute",
            transition: "opacity 0.3s ease, transform 0.4s ease",
            opacity: darkMode ? 0 : 1,
            transform: darkMode ? "rotate(90deg)" : "rotate(0deg)"
          }}
        />
        <Moon
          size={22}
          style={{
            position: "absolute",
            transition: "opacity 0.3s ease, transform 0.4s ease",
            opacity: darkMode ? 1 : 0,
            transform: darkMode ? "rotate(0deg)" : "rotate(-90deg)"
          }}
        />

        <span
          ref={rippleRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: darkMode
              ? "rgba(255,255,255,0.4)"
              : "rgba(0,0,0,0.2)",
            transform: "scale(0)",
            pointerEvents: "none"
          }}
        />
      </button>

      {/* Card */}
      <div
        style={{
          ...styles.card,
          backgroundColor: darkMode ? "#1e1e1e" : "white",
          color: darkMode ? "white" : "black"
        }}
      >

        <h1 style={styles.title}>Expense Tracker</h1>

        <ExpenseForm
          amount={amount}
          setAmount={setAmount}
          category={category}
          setCategory={setCategory}
          note={note}
          setNote={setNote}
          date={date}
          setDate={setDate}
          onSubmit={handleSubmit}
          error={error}
        />

        <Header 
          selectedMonth={selectedMonth}
          setSelectedMonth={setSelectedMonth}
          months={months}
        />

        <h2 style={styles.total}>Total: ₹{total}</h2>
        <hr />

        <ExpenseList 
          expenses={filteredExpenses}
          onDelete={handleDelete}
        />
      </div>
    </div>
  )
}

const styles = {
  
  
  title: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "10px",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    cursor: "pointer"
  },
  total: {
    marginTop: "20px"
  },
  empty: {
    textAlign: "center",
    color: "#888"
  },
  error: {
    backgroundColor: "#ffdddd",
    color: "#d8000c",
    padding: "8px",
    borderRadius: "6px",
    marginBottom: "10px",
    fontSize: "14px"
  }
  
}

export default App