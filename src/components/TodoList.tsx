import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonApp } from '@ionic/react';
import { Link } from 'react-router-dom';
import './TodoList.css'

interface Todo {
  id: number;
  name: string;
  desc: string;
  due: string;
}

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    try {
      const response = await axios.get<Todo[]>('http://localhost:5000/todos');
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await axios.delete(`http://localhost:5000/todos/${id}`);
      getTodos();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <IonApp className='pageApp'>
    <IonPage className='page'>
      <IonHeader>
        <IonToolbar>
          <IonTitle>List Tugas</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Link to="/add">
          <IonButton expand="block" fill="clear" color="success">
            Add New
          </IonButton>
        </Link>
        <IonGrid className='custom-grid'>
          <IonRow>
            <IonCol>No</IonCol>
            <IonCol>Name</IonCol>
            <IonCol>Desc</IonCol>
            <IonCol>Due</IonCol>
            <IonCol>Action</IonCol>
          </IonRow>
          {todos.map((todo, index) => (
            <IonRow key={todo.id}>
              <IonCol>{index + 1}</IonCol>
              <IonCol>{todo.name}</IonCol>
              <IonCol>{todo.desc}</IonCol>
              <IonCol>{todo.due}</IonCol>
              <IonCol>
                <Link to={`/edit/${todo.id}`} className="button is-small is-info">
                  Edit
                </Link>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </IonCol>
            </IonRow>
          ))}
        </IonGrid>
      </IonContent>
    </IonPage>
    </IonApp>
  );
};

export default TodoList;
