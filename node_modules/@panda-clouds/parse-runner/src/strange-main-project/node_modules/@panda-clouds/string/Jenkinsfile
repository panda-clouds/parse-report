pipeline {
  agent any
  tools {
    nodejs 'Node 8.13.0'
  }
  environment {
    NPM_TOKEN = credentials('npm-mrmarcsmith')
  }
  stages {
    stage('Test') {
      steps {
        sh 'npm install'
        sh 'npm test spec/PCString.spec.js'
      }
    }
    stage('if master') {
      when { branch "master" }
      
      stages {
        stage('Deploy') {
          input {
            message "✅ All Unit tests passed! Run manual staging instructions now."
            ok "Approve & Deploy Build"
            parameters {
              booleanParam(name: 'DEPLOY', defaultValue: false, description: 'Push to npm?')
            }
          }
          
          when { environment name: 'DEPLOY', value: 'true' }

          steps {
            sh 'npm publish --access=public'
          }
        }
      }
    }
  }

  post{
    always {
      deleteDir()
    }
  }
}