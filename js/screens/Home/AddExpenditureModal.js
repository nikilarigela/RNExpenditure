import React from "react";
import {
  Portal,
  Dialog,
  TextInput,
  Button,
  Subheading
} from "react-native-paper";

class AddExpenditure extends React.Component {
  render() {
    return (
      <Portal>
        <Dialog visible={this.props.visible} onDismiss={this.props.hideModal}>
          <Dialog.Title>Add Expense</Dialog.Title>
          <Dialog.Content>
            <Subheading>{this.props.date}</Subheading>
            <TextInput
              style={{ marginVertical: 6 }}
              label="For What"
              mode="flat"
              value={this.props.expenseLabel}
              onChangeText={this.props.onChangeExpenseLabel}
            />
            <TextInput
              style={{ marginVertical: 6 }}
              label="How much?"
              mode="flat"
              value={this.props.expenseAmount}
              onChangeText={this.props.onChangeExpenseAmount}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this.props.addExpense}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

export default AddExpenditure;
