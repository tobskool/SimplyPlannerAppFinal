import React, { useState } from 'react';
import { Checkbox, TextInput, IconButton, Text, View } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const UPDATE_TODO = gql`
  mutation updateTodo($id: ID!, $task: String, $completed: Boolean) {
    updateTodo(id: $id, task: $task, completed: $completed) {
      _id
      task
      completed
    }
  }
`;

const DELETE_TODO = gql`
  mutation DELETE_TODO($id: ID!) {
    DELETE_TODO(id: $id) 
  }
`;

const TodoItem = ({ todo, onUserAssign }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const [updateTodo, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TODO);
  const [DELETE_TODO, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }] // Update UI after delete
  }); 

  const toggleEditing = () => setIsEditing(!isEditing);

  const handleUpdate = () => {
    updateTodo({ 
      variables: { id: todo._id, task: updatedTask, completed: todo.completed } 
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    DELETE_TODO({ variables: { id: todo._id } });
  };

  // Handle potential errors (e.g., display feedback to the user)
  if (updateError || deleteError) {
    // Handle errors appropriately, e.g., using Alerts
  }

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Checkbox 
        status={todo.completed ? 'checked' : 'unchecked'} 
        onPress={() => {
          updateTodo({ variables: { id: todo._id, task: todo.task, completed: !todo.completed } });
      }}
      />

      {isEditing ? (
        <TextInput
          value={updatedTask}
          onChangeText={setUpdatedTask}
          onBlur={handleUpdate}
          autoFocus={true} // Focus on edit 
        />
      ) : (
        <Text onPress={toggleEditing}>{todo.task}</Text>
      )}

      {/* Consider adding a small area to display assigned user's initials */}
      {onUserAssign && (
        <IconButton icon="account" onPress={() => onUserAssign(todo)} />
      )}

      <IconButton icon="pencil" onPress={toggleEditing} disabled={updateLoading} />
      <IconButton icon="delete" onPress={handleDelete} disabled={deleteLoading} />
    </View>
  );
};

export default TodoItem;