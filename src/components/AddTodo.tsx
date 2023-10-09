import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonLabel, IonItem } from '@ionic/react';
import axios from 'axios';
import { useHistory } from 'react-router';

const AddTodo: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [due, setDue] = useState<string>("");
  const history = useHistory();

  const saveTodo = async () => {
    try {
      await axios.post('http://localhost:5000/todos', {
        name,
        desc,
        due
      });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <IonContent>
      <form onSubmit={(e) => {
        e.preventDefault();
        saveTodo();
      }}>
        <IonItem>
          <IonLabel position="stacked">Name</IonLabel>
          <IonInput type="text" value={name} onIonChange={(e) => setName(e.detail.value!)} placeholder='Name'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Desc</IonLabel>
          <IonInput type="text" value={desc} onIonChange={(e) => setDesc(e.detail.value!)} placeholder='Desc'></IonInput>
        </IonItem>
        <IonItem>
          <IonLabel position="stacked">Due</IonLabel>
          <IonInput type="date" value={due} onIonChange={(e) => setDue(e.detail.value!)} min={new Date().toISOString().split('T')[0]}></IonInput>
        </IonItem>
        <IonButton expand="block" fill="clear" type="submit" color="success">
          Save
        </IonButton>
      </form>
    </IonContent>
  );
}

export default AddTodo;
