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

            stage('Build Nginx Docker Image') {
                  steps {
                      script {
                          docker.build('adyanta-iot-ui', '-f Dockerfile .')  // Build Nginx Docker image
                      }
                  }
              }

            stage('Run Nginx Docker Container') {
                  steps {
                      script {
                           docker.image('adyanta-iot-ui').run('-p 42020:42020', '--name adyanta-iot-ui-container')  // Run Nginx Docker container

                       //   docker.run('-p 42020:42020 --name adyanta-iot-ui-container adyanta-iot-ui')  // Run Nginx Docker container
                      }
                  }
            }
    }
}
