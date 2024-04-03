import React, { useState } from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_TODO = gql`
  mutation createTodo($task: String!) {
    createTodo(task: $task) {
      _id
      task
      completed
    }
  }
`;

const AddTodoForm = () => {
  const [task, setTask] = useState('');
  const [createTodo, { loading, error }] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: GET_TODOS }] // Refetch todos after creation
  }); 

  const handleSubmit = () => {
    createTodo({ variables: { task } });
    setTask(''); 
  };

  return (
    <View>
      <TextInput
        label="New Task"
        value={task}
        onChangeText={setTask}
      />
      <Button mode="contained" onPress={handleSubmit}>
        Add Todo
      </Button>
    </View>
  );
};

export default AddTodoForm;