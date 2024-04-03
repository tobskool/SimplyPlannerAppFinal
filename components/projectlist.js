import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { List, FAB } from 'react-native-paper';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query {
    projects {
      _id
      name
    }
  }
`;

const ProjectList = ({ navigation }) => {
  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);

  const handleProjectPress = (projectId) => {
    navigation.navigate('TodoListScreen', { projectId });
  };

  const handleAddProject = () => {
    // TODO: Implement logic to create and navigate to a new project
    navigation.navigate('CreateProjectScreen'); // Placeholder
  };

  // Handle loading and error states
  if (loading) return <ActivityIndicator size="large" />;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data.projects}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            onPress={() => handleProjectPress(item._id)}
          />
        )}
      />

      <FAB
        style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
        icon="plus"
        onPress={handleAddProject}
      />
    </View>
  );
};

export default ProjectList;
