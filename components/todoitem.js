import React from 'react';
import { Checkbox } from 'react-native-paper';

const TodoItem = ({ todo }) => {
  return (
    <View>
      <Checkbox status={todo.completed ? 'checked' : 'unchecked'} />
      <Text>{todo.task}</Text>
    </View>
  );
};

export default TodoItem;