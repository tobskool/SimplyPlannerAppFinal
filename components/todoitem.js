import React, { useState } from 'react';
import { Checkbox, TextInput, IconButton, Text, View } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import { Picker } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker';

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

const CREATE_TODO = gql`
  mutation createTodo($task: String!, $dueDate: Date, $urgency: Int!, $projectId: ID!) {
    createTodo(task: $task, dueDate: $dueDate, urgency: $urgency, projectId: $projectId) {
      _id
      task
      completed
      dueDate
      urgency
    }
  }
`;

const TodoItem = ({ todo, onUserAssign }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(todo.task);

  const [isAdding, setIsAdding] = useState(false); 
  const [newTask, setNewTask] = useState('');
  const [newDueDate, setNewDueDate] = useState(new Date()); 
  const [newUrgency, setNewUrgency] = useState(1);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [updateTodo, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_TODO);
  const [DELETE_TODO, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: GET_TODOS }] // Update UI after delete
  }); 
  const [createTodo] = useMutation(CREATE_TODO);


  const handleAddTodo = () => {
    createTodo({ variables: { task: newTask, dueDate: newDueDate, urgency: newUrgency, projectId } }); // Pass projectId
    setNewTask('');
    setNewDueDate(new Date());
    setNewUrgency(1);
    setIsAdding(false);
  };

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
          autoFocus={true}
        />
      ) : (
        <Text onPress={toggleEditing}>{todo.task}</Text>
      )}

      {onUserAssign && (
        <IconButton icon="account" onPress={() => onUserAssign(todo)} />
      )}

      <IconButton icon="pencil" onPress={toggleEditing} disabled={updateLoading} />
      <IconButton icon="delete" onPress={handleDelete} disabled={deleteLoading} />

      {!isAdding && ( 
        <IconButton icon="plus" onPress={() => setIsAdding(true)} />
      )}

      {isAdding && (
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextInput
            placeholder="Task Name"
            value={newTask}
            onChangeText={setNewTask}
          />
          <Button title="Set Due Date" onPress={() => setShowDatePicker(true)} />
          {showDatePicker && (
            <DateTimePicker
              value={newDueDate}
              mode="date" 
              onChange={(_event, newDate) => {
                setShowDatePicker(false);
                setNewDueDate(newDate || newDueDate); 
              }}
            />
          )}
          <Picker selectedValue={newUrgency} onValueChange={setNewUrgency}>
            <Picker.Item label="Low" value={1} />
            <Picker.Item label="Medium" value={2} />
            <Picker.Item label="High" value={3} />
         </Picker>
          <IconButton icon="check" onPress={handleAddTodo} />
          <IconButton icon="close" onPress={() => setIsAdding(false)} /> 
        </View>
      )}
    </View> 
  );
};

export default TodoItem;
