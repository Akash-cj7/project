pipeline {
    agent any

    tools {
        // Must match the Maven name configured in:
        // Jenkins -> Manage Jenkins -> Tools -> Maven installations (e.g., 'Maven3')
        maven 'Maven3'
    }

    stages {
        stage('Checkout Git') {
            steps {
                // Clones your repository
                git branch: 'main', url: 'https://github.com/Akash-cj7/project.git'
            }
        }

        stage('Build and Test') {
            steps {
                // Runs mvn clean test in the Maven folder as shown in the PDF
                dir('Maven') {
                    bat 'mvn clean test'
                }
            }
        }
    }

    post {
        success {
            echo "BUILD SUCCESS! All Maven tests passed."
        }
        failure {
            echo "BUILD FAILED! Please inspect console logs."
        }
    }
}
