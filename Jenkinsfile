#!/usr/bin/env groovy
pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git repository
                git credentialsId: 'JENKINS_GITHUB_TOKEN', url: 'https://github.com/kdbisen/adyanta-iot-ui.git'
            }
        }

//       stage('Build') {
//           steps {
//               // Use Node.js and npm from Jenkins configuration
//               withNodejs(nodejsInstallationName: 'Node.js') {
//                   sh 'npm install'
//                   sh 'npm run build'
//               }
//           }
//       }

        stage('Deploy') {
            steps {
                // Build and run Docker image
                script {
                    docker.build('adyanta-iot-ui')  // Build Docker image
                    docker.image('adyanta-iot-ui').push('latest')  // Push the image to a registry
                    //docker.withRegistry('your-docker-registry', 'your-docker-credentials-id') {
                      //  docker.image('adyanta-iot-ui').push('latest')  // Push the image to the registry
                    //}
                }
            }
        }
    }
}
