import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const CREATE_PROJECT = gql`
  mutation createProject($name: String!) {
    createProject(name: $name) {
      _id
      name
    }
  }
`;

const CreateProjectScreen = ({ navigation }) => {
  const [projectName, setProjectName] = useState('');
  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT);

  const handleSubmit = async () => {
    try {
      await createProject({ variables: { name: projectName } });

      // Clear form and navigate back
      setProjectName('');
      navigation.goBack();
    } catch (error) {
      console.error('Error creating project:', error);
      // Handle the error appropriately (e.g., display an alert)
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        label="Project Name"
        value={projectName}
        onChangeText={setProjectName}
      />

      <Button 
        mode="contained" 
        onPress={handleSubmit} 
        loading={loading}
        disabled={!projectName} // Disable button if input is empty
      >
        Create Project
      </Button>
    </View>
  );
};

export default CreateProjectScreen;