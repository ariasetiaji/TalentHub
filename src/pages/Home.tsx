import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import TodoList from '../components/TodoList';


const Home: React.FC = () => (
  <IonPage>
    <IonContent>
      <TodoList />
    </IonContent>
  </IonPage>
);

export default Home;
