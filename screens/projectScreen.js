import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_PROJECT = gql`
  query project($projectId: ID!) {
    project(id: $projectId) {
      _id
      name
      # ... potentially fetch associated todos here
    }
  }
`;

const ProjectScreen = ({ route }) => {
  const projectId = route.params.projectId;

  const { loading, error, data } = useQuery(GET_PROJECT, {
    variables: { projectId },
  });

  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  const { project } = data;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{project.name}</Text>
      {/* Consider adding more UI elements to display project details */}

      {/* A button to navigate to the Project's Todo List: */}
      <Button 
        title="View Todos"
        onPress={() => navigation.navigate('TodoListScreen', { projectId })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ProjectScreen;