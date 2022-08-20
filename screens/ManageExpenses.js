import { useContext, useLayoutEffect } from "react";
import { StyleSheet, View } from "react-native";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";

function ManageExpense({route, navigation}) {
   const expensesCtx = useContext(ExpensesContext);

   const editedExpenseId = route.params?.expenseId;
   const isEditing = !!editedExpenseId;

   useLayoutEffect(() => {
      navigation.setOptions({
         title: isEditing ? 'Edit Expense' : 'Add Expense',
      });
   }, [navigation, isEditing]);

   function deleteExpenseHandler() {
      expensesCtx.deleteExpense(editedExpenseId);
      navigation.goBack();
   }

   function cancelHandler() {
      navigation.goBack();
   }
   
   function confirmHandler() {
      if (isEditing) {
         expensesCtx.updateExpense(
            editedExpenseId,
            {
               description: "Test!!!!", 
               amount: 29.99, 
               date: new Date("2022-08-18"),
            }
         );
      } else {
         expensesCtx.addExpense({
            description: "Test", 
            amount: 19.99, 
            date: new Date("2022-08-19"),
         });
      }
      navigation.goBack();
   }

   return (
      <View style={styles.container}>
         <ExpenseForm onCancel={cancelHandler} submitButtonLabel={isEditing ? "Update" : "Add"} />
         {isEditing && (
            <View style={styles.deleteContainer}>
               <IconButton 
                  icon="trash" 
                  color={GlobalStyles.colors.error500} 
                  size={36}
                  onPress={deleteExpenseHandler}
               />
            </View>
         )}
      </View>
   );
}

export default ManageExpense;

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 24,
      backgroundColor: GlobalStyles.colors.primary800,
   },
   deleteContainer: {
      marginTop: 16,
      paddingTop: 8,
      borderTopWidth: 2,
      borderTopColor: GlobalStyles.colors.primary200,
      alignItems: "center",
   },
});
