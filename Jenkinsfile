pipeline {
    agent any
    stages {
        stage('Checkout GIT') {
            steps {
                echo 'Pulling...'
                git branch: 'main', url: 'https://github.com/RamiLaabidi/BFI-Frontend.git'
            }
        }
        stage('Testing Maven') {
            steps {
                sh 'mvn -version'
            }
        }
    }
}
