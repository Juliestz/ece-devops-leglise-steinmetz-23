
# ECE DevOps

Projet Leglise Margaux et Steinmetz Julie

## 1. Installation

#### Installer NodeJS :
[Install NodeJS](https://nodejs.org/en/download/)

#### Installer redis :

Windows :

[Install Redis](https://redis.com/ebook/appendix-a/a-3-installing-on-windows/a-3-2-installing-redis-on-window/)

MacOS :
```bash
brew install redis 
```

#### Se placer dans le fichier 'userapi' puis lancer :

```bash
npm install
```

#### Lancer redis :

Windows :
```bash
sudo service redis-server start
```

MacOS :
```bash
redis-server
```

On obtient :
<img width="1337" alt="Capture d’écran 2023-02-26 à 16 27 43" src="https://user-images.githubusercontent.com/91328888/221420086-52743659-ea2f-49c4-9efa-53a074538bf8.png">


#### Lancer le serveur web :


On lance notre application NodeJS sur http://localhost:3000/ grâce à 
la commande suivante depuis le dossier userapi :
```bash
npm start
```

![image](https://user-images.githubusercontent.com/62987942/220938939-2fd702f6-af83-4291-b39b-e691a2532214.png)

On obtient cette page :

![image](https://user-images.githubusercontent.com/62987942/220938843-87317e13-c19d-4d12-97e0-5d2d1e5dca11.png)


#### Ajouter un utilisateur :

Dans le terminal, lancer : 
```bash
curl --header "Content-Type: application/json" \
  --request POST \
  --data '{"username":"sergkudinov","firstname":"sergei","lastname":"kudinov"}' \
  http://localhost:3000/user
```

Cela devrait afficher :
```bash
{"status":"success","msg":"OK"}
```

#### Test

Aucune erreur détectée avec ```npm test``` :

![image](https://user-images.githubusercontent.com/62987942/220939204-831aea6b-bfba-42be-bea7-982cf4220fc1.png)
![image](https://user-images.githubusercontent.com/62987942/220939226-c3dfa72b-a8b4-424e-9087-6983cadc8f85.png)


## 2. Méthode CI/CD

On utilise l'intégration et la livraison continue (CI/CD).

On réalise l'intégration continue grâce à Github Actions et les workflows. Cela permet de réaliser une intégration plus régulière.

![image](https://user-images.githubusercontent.com/62987942/220990022-d0dd28c5-63a1-4fd3-80c1-05702486c34c.png)

On réalise la livraison continue grâce à Microsoft Azure :

![image](https://user-images.githubusercontent.com/62987942/221031793-9ee36657-a96b-4643-aa9d-3a77985340c3.png)


## 3. L'approche IaC pour configurer et approvisionner un environnement virtuel et exécuter notre application

Pour implémenter l'approche IaC dans notre projet, il va falloir installer Vagrant.
Il nous faudra aussi installer VirtualBox pour créer un environnement virtuel pour déployer notre appliation.

1. [Install VirtualBox](https://www.virtualbox.org/wiki/Downloads)
2. [Install Vagrant](https://www.vagrantup.com/downloads.html)

#### Se placer dans le dossier iac

*Télécharger centos/7 :*

```bash
vagrant box add centos/7
```
Quand le message suivant s'affiche, tapez 3) :

```
==> box: Loading metadata for box 'centos/7'
   box: URL: https://vagrantcloud.com/centos/7
This box can work with multiple providers! The providers that it can work with are listed below. Please review the list and   choose
the provider you will be working with.

1) hyperv
2) libvirt
3) virtualbox
4) vmware_desktop

Enter your choice: 
```

centos/7 se télécharge pour ensuite apparaitre dans VirtualBox :

![image](https://user-images.githubusercontent.com/62987942/221034589-872279ce-38ab-44a1-994b-61c5d6a87ff6.png)

#### Lancer la commande suivante une fois situé dans le dossier iac/part-1 :
```bash
vagrant up
```

Une VM centos.server.local est créée dans Virtualbox :

![image](https://user-images.githubusercontent.com/62987942/221423615-296d58f3-73d0-4b20-95c7-e4946aeabd38.png)

*Autres commandes vagrant :*
```bash
# will check VMs status
vagrant status 

# stop the VMs
vagrant halt

# will destroy VMs
vagrant destroy
```

####  Afficher la date du jour dans /etc/vagrant_provisioned_at :

Rempalcer dans le fichier Vagrantfile la partie ce qui suit :

```
# Start provisioning
$script = <<-SCRIPT
echo I am provisioning...
date > /etc/vagrant_provisioned_at
SCRIPT

config.vm.provision "shell", inline: $script
```

Exécuter la commande suivante : 
```bash
vagrant provision
```
Cette commande permet d'apporter des modifications à la configuration d'une VM déjà existante.

Entrer dans la VM :
```bash
vagrant ssh
```
```bash
cat /etc/vagrant_provisioned_at
```

Résultats :

<img width="608" alt="Capture d’écran 2023-02-26 à 17 45 09" src="https://user-images.githubusercontent.com/91328888/221424172-8b99421b-9327-4139-af8b-5433c172410f.png">


## 4. Construction d'une image Docker pour notre application

[installer Docker Desktop](https://docs.docker.com/get-docker/)

Pour vérifier que l'installation s'est passé correctement, on appel la commande suivante :
```bash
docker run hello-world
```

On obtient la réponse :

![image](https://user-images.githubusercontent.com/62987942/221428266-1b8265a7-2c29-4bd9-ba9e-1495ce0613e4.png)

### Créer une image Docker :

On exécute la commande suivante :
```bash
docker build -t margauxlgls/userapidocker .
```
Cela génère une image Docker :

![image](https://user-images.githubusercontent.com/62987942/221428593-1d7dba52-bb66-4aba-acdd-6ea8f08ff493.png)

Pour voir toutes les images générés, on peut tapper la commande : 
```bash
docker images
```
![image](https://user-images.githubusercontent.com/62987942/221429248-df842b2f-8250-4cb8-a731-d881e12d36da.png)

Pour lancer le container Docker, on utilise la commande :
```bash
docker run -p 8000:3080  margauxlgls/userapidocker
```

On obtient :
![image](https://user-images.githubusercontent.com/62987942/221429191-eea2a789-b164-4981-ad7d-138a8abefbe5.png)

### Partager un conteneur Docker avec un camarade

On se login dans Docker Hub depuis notre terminal :

![image](https://user-images.githubusercontent.com/62987942/221430152-b4bff97f-ff2f-4b72-aedf-f37689fadc70.png)

On push l'image dans Docker Hub :

![image](https://user-images.githubusercontent.com/62987942/221430303-3d629d1f-b8a9-401a-8ade-54339c7d0758.png)

Dans notre groupe, l'un de nos ordinateurs (Windows) ne peut pas faire tourner Docker car le projet est situé dans une VM Ubuntu sur Virtualbox et Docker Desktop n'est pas fait pour être lancé sur un environnement Ubuntu.
On ne peut donc pas récupérer le container sur notre deuxième ordi.

## 5. Container Orchestration avec Docker Compose

On créer un fichier docker-compose.yaml qui contient toutes les informations du conteneur que nous avons créer précédement.
Pour créer et démarer ce conteneur, on utilise la commande suivante :
```bash
docker compose up
```

![image](https://user-images.githubusercontent.com/62987942/221891741-4e9f210d-fe34-45cf-b5c7-9ac656619348.png)
![image](https://user-images.githubusercontent.com/62987942/221891761-1fc80eec-f193-494d-ab93-5dacc09d8cd1.png)

## 6. Docker Orchestration avec les Kubernetes

### On doit premièrement installer Minikube :

[Install Minikube](https://minikube.sigs.k8s.io/docs/start/)

Ensuite, on lance Minikube avec la commande :
```bash
minikube start --driver=docker
```

![image](https://user-images.githubusercontent.com/62987942/221892394-0c6b572f-022b-4fa1-9043-b70b547429b5.png)

Puis on vérifie que tous est bon :
```bash
minikube status
```

![image](https://user-images.githubusercontent.com/62987942/221892467-dacd965d-9566-4caf-acf5-a014607509f7.png)

### Utiliser kubectl

On lance le déploiement avec un pod :
```bash
kubectl create deployment kubernetes-bootcamp --image=gcr.io/google-samples/kubernetes-bootcamp:v1
```

![image](https://user-images.githubusercontent.com/62987942/221893404-fc25667c-5772-4ab7-9f81-9425b3ec345e.png)

Pour afficher la liste de tous les pods en cours d'exécution :
```bash
kubectl get pods
```

![image](https://user-images.githubusercontent.com/62987942/221893658-728a521f-1e4a-471e-b0cc-4e02739a2fcf.png)

Pour afficher les logs d'un pod :
```bash
kubectl logs $POD_NAME
```
Ici on remplace $POD_NAME par le nom du pod affiché avec la commande précédente : kubernetes-bootcamp-75c5d958ff-kjgrb

![image](https://user-images.githubusercontent.com/62987942/221912556-d062941e-270b-45b2-8068-bce9452d0d92.png)

Pour ouvrir un shell à l'intérieur de ce pod, on entre la commande suivante :
```bash
kubectl exec -ti kubernetes-bootcamp-75c5d958ff-kjgrb -- /bin/bash
```

![image](https://user-images.githubusercontent.com/62987942/221913389-a356fcc9-dc02-4148-9aaf-258c1eb5311d.png)

Pour rendre accessible le cluster de Kubernetes depuis l'extérieur, on utilise :
```bash
kubectl expose deployments/$DEPLOYMENT_NAME --type="NodePort" --port $PORT_NUMBER
```
Avec nos informations : $DEPLOYMENT_NAME = kubernetes-bootcamp et $PORT_NUMBER = 8080

Pour connaitre le port qui est rattaché au service :
```bash
kubectl get services
```
Pour obtenir l'adresse ip de notre VM minikube :
```bash
minikube ip
```

On obtient :

![image](https://user-images.githubusercontent.com/62987942/221916160-1dccf8a2-9062-4615-b95e-bb12dc4a2b8d.png)

Pour ouvrir l'application web, on entre la commande suivante :
```bash
minikube service $SERVICE_NAME
```
Avec $SERVICE_NAME = kubernetes-bootcamp

On obtient :

![image](https://user-images.githubusercontent.com/62987942/221918128-04673c79-80a6-4223-b523-8879ecfe1365.png)

Une page web est ouverte automatiquement mais elle ne charge rien.


Pour faire évoluer notre déploiement vers un déploiement à 5 pods, on utilise :
```bash
kubectl scale deployments/kubernetes-bootcamp --replicas=5
```
Et on affiche les pods qui sont en cours d'exécution avec :
```bash
kubectl get pods
```

On obtient :

![image](https://user-images.githubusercontent.com/62987942/222966907-5ae98442-2376-41f1-9edb-d44ec9609869.png)

![image](https://user-images.githubusercontent.com/62987942/222966969-00492535-7126-4955-aeb8-35d80529a8a8.png)

Pour déployer notre application en utilisant les fichiers Manifest yaml, on entre les commandes suivantes :
```bash
kubectl apply -f deployment.yaml
```
```bash
kubectl apply -f service.yaml
```

![image](https://user-images.githubusercontent.com/62987942/222967092-b3c11e57-e01e-4138-83f8-48421683c5f2.png)
