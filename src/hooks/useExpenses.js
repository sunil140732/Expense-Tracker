import { useState,useCallback,useMemo, useEffect } from "react";


const useExpensesManager = ( initialBudget = 1000 ) => {
    const [budget,setBudget]=useState(
        ()=>parseFloat(localStorage.getItem("budget")) || initialBudget // initialize from localStorage or use the default
    )  // used for tracking the budget
    const [expenses, setExpenses] = useState(() => {
        try {
          const storedExpenses = localStorage.getItem("expenses");
          return storedExpenses ? JSON.parse(storedExpenses) : [];
        } catch (error) {
          console.error("Failed to parse expenses:", error);
          return [];
        }
      });
    
     // used for tracking the Expenses dynamically
    const [searchQuery,setSearchQuery]=useState('')  // used for tracking the values given by user
    const [filter,setFilter]=useState('all')  // used for tracking the select dropdown filter
    console.log(searchQuery)

    // save budget to localstorage whenever it changes
    useEffect(()=>{
        localStorage.setItem("budget",budget)
    },[budget])

    // save expenses to localstorage whenever they change
    useEffect(()=>{
        localStorage.setItem("expenses",JSON.stringify(expenses))
    },[expenses])

    // add a new expense
    const addExpense=useCallback((name,category,amount)=>{
        setExpenses((prev)=>[
            ...prev,
            {id:Date.now(),name,category,amount:parseFloat(amount)}
        ])

    },[])

    // edit an expense
    const editExpense = useCallback((id,updatedExpense)=>{
        setExpenses((prev)=>
        prev.map((expense)=>(expense.id === id ? {...expense,...updatedExpense}:expense))
        )
    },[])

    // delete an expense
    const deleteExpense=useCallback((id)=>{
        setExpenses((prev)=>prev.filter((expense)=>expense.id!==id))
    },[])

    // Filter expenses based on search query and filter category
    let filterExpenses=useMemo(()=>{
        return expenses
        .filter((expense)=>
            expense.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
        .filter((expense)=>(filter=='all'?true:expense.category===filter))
    },[expenses,filter,searchQuery])

    // calculating the total expenses
    let TotalExpenses=useMemo(()=>{
        return expenses.reduce((total,expense)=>total+expense.amount,0)
    },[expenses])


  return {
    budget,setBudget,
    searchQuery,setSearchQuery,
    filter,setFilter,
    expenses,setExpenses,
    addExpense,editExpense,
    deleteExpense,
    filterExpenses,TotalExpenses}
}

export default useExpensesManager
