import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, Text } from 'react-native';
import { List, FAB, TextInput, Dialog, Portal, Button } from 'react-native-paper';
import { useQuery, useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const GET_PROJECTS = gql`
  query {
    projects {
      _id
      name
    }
  }
`;

const CREATE_PROJECT = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      _id
      name
    }
  }
`;

const ProjectList = ({ navigation }) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');

  const { loading, error, data, refetch } = useQuery(GET_PROJECTS);
  const [createProject, { loading: createLoading }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  // ... handleProjectPress (existing code) ...

  const handleAddProject = async () => {
    try {
      await createProject({ variables: { name: newProjectName } });
      setNewProjectName(''); // Clear input
      setIsDialogVisible(false); // Close dialog
    } catch (error) {
      console.error(error);
    }
  };

  return <View style={{ flex: 1 }}>
    // ... Project List rendering ...

    <Portal>
      <Dialog visible={isDialogVisible} onDismiss={() => setIsDialogVisible(false)}>
        <Dialog.Title>Create Project</Dialog.Title>
        <Dialog.Content>
          <TextInput
            label="Project Name"
            value={newProjectName}
            onChangeText={setNewProjectName}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button disabled={createLoading} onPress={handleAddProject}>
            Create
          </Button>
          <Button onPress={() => setIsDialogVisible(false)}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>

    <FAB
      style={{ position: 'absolute', margin: 16, right: 0, bottom: 0 }}
      icon="plus"
      onPress={() => setIsDialogVisible(true)}
    />
  </View>;
};

export default ProjectList;
