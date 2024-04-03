import React from 'react';
import { gql, useQuery } from '@apollo/client';
import AddTodoForm from '../components/addtodoform';

const GET_TODOS = gql`
  query {
    todos {
      _id
      task
      completed
    }
  }
`;

const TodoListScreen = () => {
    // ... rest of your code
 
    return (
     <View>
       <AddTodoForm /> {/* Add the form */}
       <FlatList
         // ... your FlatList code
       />
     </View>
   );
   
  const { loading, error, data } = useQuery(GET_TODOS);

  // ... handle loading and error states



  return (
    <View>
      <FlatList
        data={data.todos}
        renderItem={({ item }) => <TodoItem todo={item} />}
      />
    </View>
  );
};

export default TodoListScreen;