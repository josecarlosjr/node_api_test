pipeline {

  //agent any
  //agent {label 'kubejenkins'}
  agent {
    kubernetes {
      yaml """
                apiVersion: v1
                kind: Pod
                metadata:
                  labels:
                    label: jnlp
                spec:
                  securityContext:
                    runAsUser: 0
                  nodeSelector:
                    kubernetes.io/hostname: n0d3-2
                  containers:
                  - name: jnlp
                    image: jenkins/inbound-agent:alpine
                    resources:
                      requests:
                        memory: "1Gi"
                        cpu: "100m"
                        ephemeral-storage: "2Gi"
                      limits:
                        memory: "2Gi"
                        cpu: "700m"
                        ephemeral-storage: "3Gi"
                    volumeMounts:
                    - name: dockersock
                      mountPath: "/var/run/docker.sock"
                  volumes:
                  - name: dockersock
                    hostPath:
                      path: /var/run/docker.sock
                """
    }
  } 
  stages {

    stage('Checkout Source') {
      steps {
        git url:'https://github.com/josecarlosjr/node_api_test.git', branch:'main'
      }
    }
    
      stage("Build image") {
            steps {
              echo "testing the environment"               
              sh 'cat /etc/os-release'      
              sh 'apk update'
              sh 'apk add --no-cache'              
              sh 'apk add py-pip python3-dev libffi-dev openssl-dev gcc libc-dev make'
              sh 'apk add openrc docker docker-compose'   
              sh 'rc-update add docker default'              
              //sh 'rc-service -I docker restart'              
             
                script {
                    //myapp = docker.build("josecarlosjr/hellowhale:${env.BUILD_ID}")
                    myapp = docker.build("josecarlosjr/node_api_test")
                }
            }
        }
    
      stage("Push image") {
            steps {
                script {
                    docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
                            myapp.push("latest")
                            myapp.push("${env.BUILD_ID}")
                    }
                }
            }
        }
    
    stage('Deploy App') {
      steps {
        script {
          //kubernetesDeploy(configs: "node.yml", kubeconfigId: "config", deleteResource: true)
          kubernetesDeploy(configs: "namespace.yaml", kubeconfigId: "kubeconfig")
          kubernetesDeploy(configs: "node.yml", kubeconfigId: "kubeconfig")
        }
      }
    }
  }
}
