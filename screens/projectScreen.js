import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

import TodoItem from '../components/TodoItem';
import AddTodoForm from '../components/AddTodoForm';

const GET_TODOS = gql`
  query getTodosByProject($projectId: ID!) {
    todos(where: { projectId: $projectId }) {
      _id
      task
      completed
    }
  }
`;

const CREATE_TODO = gql`
  mutation createTodo($task: String!, $projectId: ID!) {
    createTodo(task: $task, projectId: $projectId) {
      _id
      task
      completed
    }
  }
`;

const TodoListScreen = ({ route }) => {
  const projectId = route.params.projectId; // Getting project ID from navigation

  const { loading, error, data, refetch } = useQuery(GET_TODOS, {
    variables: { projectId },
  });

  const [createTodo] = useMutation(CREATE_TODO, {
    // Optimistic updates or refetchQueries for instant UI updates 
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const handleAddTodo = (newTask) => {
    createTodo({ variables: { task: newTask, projectId } });
  };

  return (
    <View style={{ flex: 1 }}>
      <AddTodoForm projectId={projectId} onAddTodo={handleAddTodo} />

      <FlatList
        data={data.todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TodoItem todo={item} /> 
        )}
        onRefresh={refetch} // Add pull-to-refresh
        refreshing={loading} // Use the 'loading' state for refresh indicator
      />
    </View>
  );
};

export default TodoListScreen;
