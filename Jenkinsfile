#!/usr/bin/env groovy
pipeline {
    agent any

      environment {
            DOCKER_IMAGE_NAME = "adyanta-iot-ui"
            CONTAINER_NAME = "adyanta-iot-ui-container"
            UNIQUE_TAG = "new-image" // You can replace this with a timestamp or commit hash
        }


    stages {
        stage('Checkout') {
            steps {
                // Checkout code from Git repository
                git credentialsId: 'JENKINS_GITHUB_TOKEN', url: 'https://github.com/kdbisen/adyanta-iot-ui.git'
            }
        }


        stage('Generate Unique Tag') {
                    steps {
                        script {
                            // Get the current timestamp or the git commit hash as the unique tag
                            UNIQUE_TAG = sh(returnStdout: true, script: "git rev-parse --short HEAD").trim() ?: sh(returnStdout: true, script: "date +%Y%m%d%H%M%S").trim()
                        }
                    }
        }

        stage('Build Nginx Docker Image') {
             steps {
                 script {
                     docker.build("${DOCKER_IMAGE_NAME}:${UNIQUE_TAG}", '-f Dockerfile .')  // Build and tag the new Docker image
                 }
             }
        }

        stage('Stop and Remove Old Container') {
             steps {
                 script {
                     // Stop and remove the old container
                     sh "docker stop ${CONTAINER_NAME} || true"
                     sh "docker rm ${CONTAINER_NAME} || true"
                 }
             }
        }

        stage('Deploy New Image') {
             steps {
                 script {
                     // Run the new container
                     //docker.run("-d -p 42020:42020 --name ${CONTAINER_NAME} ${DOCKER_IMAGE_NAME}:${UNIQUE_TAG}")
                     // docker.image("${DOCKER_IMAGE_NAME}:${UNIQUE_TAG}").run('-p 42020:42020', '--name '${CONTAINER_NAME})  // Run Nginx Docker container

                      def image = docker.image("${DOCKER_IMAGE_NAME}:${UNIQUE_TAG}")
                                          image.run("-d -p 42020:42020 --name ${CONTAINER_NAME}")

                 }
             }
        }
    }
}
