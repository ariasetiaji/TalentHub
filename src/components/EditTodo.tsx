import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonButton } from '@ionic/react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom'; 
import { Link } from 'react-router-dom';

const EditTodo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [due, setDue] = useState<string>("");
  const { id } = useParams<{ id: string }>();
  const history = useHistory(); 

  useEffect(() => {
    const getTodoById = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/todos/${id}`);
        const data = response.data;

        if (data) {
          setName(data.name);
          setDesc(data.desc);
          setDue(data.due);
        } else {
          console.error('Data tidak ditemukan');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getTodoById();
  }, [id]);

  const updateTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:5000/todos/${id}`, {
        name,
        desc,
        due
      });
      history.push('/home');
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <IonContent>
        <form onSubmit={updateTodo}>
          <IonItem>
            <IonLabel position="stacked">Name</IonLabel>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Desc</IonLabel>
            <input type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Desc" />
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Due</IonLabel>
            <input
              type="date"
              value={due}
              onChange={(e) => setDue(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </IonItem>
          <IonButton expand="block" fill="clear" type="submit" color="success">Update</IonButton>
        </form>
      </IonContent>
  );
};

export default EditTodo;
