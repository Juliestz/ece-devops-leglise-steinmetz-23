
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





