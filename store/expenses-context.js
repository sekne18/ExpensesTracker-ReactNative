import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
   {
      id: 'e1',
      description: 'A pair of shoes',
      amount: 59.99,
      date: new Date('2022-08-15'),
   },
   {
      id: 'e2',
      description: 'A pair of bananas',
      amount: 549.99,
      date: new Date('2022-08-23'),
   },
   {
      id: 'e3',
      description: 'A MacBook Pro 16"',
      amount: 29.69,
      date: new Date('2022-08-13'),
   },
   {
      id: 'e4',
      description: 'An iPhone',
      amount: 5.99,
      date: new Date('2022-06-02'),
   },
   {
      id: 'e5',
      description: 'Three candies',
      amount: 11.49,
      date: new Date('2022-09-02'),
   },
   {
      id: 'e6',
      description: 'A pair of apples',
      amount: 16.29,
      date: new Date('2022-09-02'),
   },
   {
      id: 'e7',
      description: 'Three candies',
      amount: 11.49,
      date: new Date('2022-09-02'),
   },
   {
      id: 'e8',
      description: 'A pair of apples',
      amount: 16.29,
      date: new Date('2022-09-02'),
   },
];

export const ExpensesContext = createContext({
   expenses: [],
   addExpense: ({description, amount, date}) => {},
   deleteExpense: (id) => {},
   updateExpense: (id, {description, amount, date}) => {},
});

function expensesReducer(state, action) {
   switch (action.type) {
      case "ADD":
         const id = new Date().toString() + Math.random().toString();
         return [{...action.payload}, ...state];
      case "UPDATE":
         const updatableExpenseIndex = state.findIndex(
            (expense) => expense.id === action.payload.id
         );
         const updatableExpense = state[updatableExpenseIndex];
         const updatedItem = {...updatableExpense, ...action.payload.data};
         const updatedExpenses = [...state];
         updatedExpenses[updatableExpenseIndex] = updatedItem;
         return updatedExpenses;
      case "DELETE":
         return state.filter((expense) => expense.id !== action.payload);
      default: 
         return state;
   }
}

function ExpensesContextProvider({children}) {
   const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

   function addExpense(expenseData) {
      dispatch({ type: 'ADD', payload: expenseData }); //type here affects action.type in the switch above 
   }

   function deleteExpense(id) {
      dispatch({ type: 'DELETE', payload: id});
   }

   function updateExpense(id, expenseData) {
      dispatch({ type: "UPDATE", payload: {id: id, data: expenseData} });
   }

   const value = {
      expenses: expensesState,
      addExpense: addExpense,
      deleteExpense: deleteExpense,
      updateExpense: updateExpense,
   };

   return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>;
}

export default ExpensesContextProvider;
