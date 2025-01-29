import React, { useState } from "react";

const ExpenseList = ({ expenses, editExpense, deleteExpense }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedExpense, setEditedExpense] = useState({});

  const startEditing = (expense) => {
    setEditingId(expense.id);
    setEditedExpense({ ...expense });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditedExpense({});
  };

  const saveChanges = () => {
    editExpense(editingId, editedExpense);
    setEditingId(null);
  };

  return (
    <div className="list-group">
      {expenses.map((expense) => (
        <div className="list-group-item d-flex justify-content-between align-items-center" key={expense.id}>
          {editingId === expense.id ? (
            <div className="d-flex flex-column flex-md-row align-items-md-center">
              <input
                type="text"
                className="form-control me-2"
                value={editedExpense.name}
                onChange={(e) => setEditedExpense({ ...editedExpense, name: e.target.value })}
              />
              <input
                type="text"
                className="form-control me-2"
                value={editedExpense.category}
                onChange={(e) => setEditedExpense({ ...editedExpense, category: e.target.value })}
              />
              <input
                type="number"
                className="form-control me-2"
                value={editedExpense.amount}
                onChange={(e) => setEditedExpense({ ...editedExpense, amount: parseFloat(e.target.value) })}
              />
            </div>
          ) : (
            <div>
              <strong>{expense.name}</strong> - {expense.category} - ${expense.amount.toFixed(2)}
            </div>
          )}

          <div>
            {editingId === expense.id ? (
              <>
                <button className="btn btn-success me-2" onClick={saveChanges}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={cancelEditing}>
                  Cancel
                </button>
              </>
            ) : (
              <>
                <button className="btn btn-primary me-2" onClick={() => startEditing(expense)}>
                  Edit
                </button>
                <button className="btn btn-danger" onClick={() => deleteExpense(expense.id)}>
                  Delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
