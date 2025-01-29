import React, { useEffect, useState } from 'react'
import ExpenseInput from './components/ExpenseInput'
import ExpenseList from './components/ExpenseList'
import ExpenseSummary from './components/ExpenseSummary'
import useExpensesManager from './hooks/useExpenses'
import useDebounce from './hooks/useDebounce'



const App = () => {

  // custom hook
  let {budget,setBudget,
    addExpense,editExpense,
    deleteExpense,filterExpenses,
    TotalExpenses,setSearchQuery,setFilter}=useExpensesManager()
  

  // state to hold the search term
  const [searchTerm,setSearchTerm]=useState("")
  let searchDebounce=useDebounce(searchTerm,300)

  // state to check if the budget is being edited
  const [isEditingBudget,setIsEditingBudget]=useState(false)

  // Show alert when expenses reach or exceed the budget
  useEffect(() => {
    if (!isEditingBudget && TotalExpenses >= budget) {
      alert('Budget reached! Please add more budget to continue.')
    }
  }, [TotalExpenses, budget,isEditingBudget])
  
  // useEffect Hooks to handle the sideEffects
  useEffect(()=>{
    setSearchQuery(searchDebounce)
  },[searchDebounce,setSearchQuery])

  // Handler for budget change
  const handleBudgetChange = (e) => {
    setIsEditingBudget(true)  // Mark that we're editing the budget
    const value = parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setBudget(value)
    } else {
      setBudget(0) // Reset to 0 if invalid input
    }
  }


  return (
    <div className='container p-3'>
      {/* budget input start */}
      <div className="form-floating mb-3">
        <input 
          type="text" 
          className="form-control" 
          id="budget"
          value={budget}
          onChange={handleBudgetChange}
        />
        <label htmlFor="floatingInput">BUDGET</label>
      </div>
      {/* budget input start */}

      {/* expense input */}
      <ExpenseInput addExpense={addExpense}/>

      {/* search and filter functionality */}
      <div className="card p-2 my-2">
        <div className="row">
          <div className="col-sm-12 col-md-6 col-lg-6">
            <div className="form-floating my-3">
              <input 
                type="text"  
                className="form-control"  
                id="search" 
                value={searchTerm} 
                placeholder='search...' 
                onChange={(e)=>setSearchTerm(e.target.value)} 
              />
              <label htmlFor="floatingInput">Search</label>
            </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6 my-auto">
            <div className="form-floating">
              <select 
                className="form-select" 
                id="floatingSelect" 
                onChange={(e)=>setFilter(e.target.value)}
              >
                <option value="all" selected>All Categories</option>
                <option value="food">Food</option>
                <option value="entertinment">Entertinment</option>
                <option value="travel">Travel</option>
                <option value="hosiptal">Hosiptal</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      {/* expenses list */}
      <ExpenseList expenses={filterExpenses} editExpense={editExpense} deleteExpense={deleteExpense}/>
      {/* expenses summary */}
      <ExpenseSummary TotalExpenses={TotalExpenses} budget={budget}/>
    </div>
  )
}

export default App
