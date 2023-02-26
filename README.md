
# ECE DevOps

Projet Leglise Margaux et Steinmetz Julie

## 1. Application

On lance notre application NodeJS sur http://localhost:3000/ grâce à la commande "npm start" depuis le dossier userapi.

![image](https://user-images.githubusercontent.com/62987942/220938939-2fd702f6-af83-4291-b39b-e691a2532214.png)

On obtient cette page :

![image](https://user-images.githubusercontent.com/62987942/220938843-87317e13-c19d-4d12-97e0-5d2d1e5dca11.png)

Aucune erreur détectée avec ```npm test``` :

![image](https://user-images.githubusercontent.com/62987942/220939204-831aea6b-bfba-42be-bea7-982cf4220fc1.png)
![image](https://user-images.githubusercontent.com/62987942/220939226-c3dfa72b-a8b4-424e-9087-6983cadc8f85.png)

On utilise redis :
<img width="1337" alt="Capture d’écran 2023-02-26 à 16 27 43" src="https://user-images.githubusercontent.com/91328888/221420086-52743659-ea2f-49c4-9efa-53a074538bf8.png">


## 2. Méthode CI/CD

On utilise l'intégration et la livraison continue (CI/CD).

On réalise l'intégration continue grâce à Github Actions et les workflows. Cela permet de réaliser une intégration plus régulière.

![image](https://user-images.githubusercontent.com/62987942/220990022-d0dd28c5-63a1-4fd3-80c1-05702486c34c.png)

On réalise la livraison continue grâce à Microsoft Azure :

![image](https://user-images.githubusercontent.com/62987942/221031793-9ee36657-a96b-4643-aa9d-3a77985340c3.png)

## 3. L'approche IaC pour configurer et approvisionner un environnement virtuel et exécuter notre application

Pour implémenter l'approche IaC dans notre projet, il va falloir installer Vagrant.
Il nous faudra aussi installer VirtualBox pour créer un environnement virtuel pour déployer notre appliation.
Ensuite on télécharge centos/7 avec la commande : ```vagrant box add centos/7``` 

centos/7 se télécharge pour ensuite apparaitre dans VirtualBox :

![image](https://user-images.githubusercontent.com/62987942/221034589-872279ce-38ab-44a1-994b-61c5d6a87ff6.png)


