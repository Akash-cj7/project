# Jenkins CI Pipeline with Maven Guide

This guide walks you through setting up a Maven build & test pipeline in Jenkins matching the lab instructions in the reference PDF.

---

## 1. Project Structure Created

The following files have been prepared according to the PDF:

```
project/
├── Jenkinsfile                  # Declarative Jenkins pipeline script
├── Maven/
│   ├── pom.xml                  # Maven Project Object Model configuration
│   ├── App.java                 # Main application source
│   ├── AppTest.java             # JUnit test source
│   └── src/
│       ├── main/java/com/example/App.java
│       └── test/java/com/example/AppTest.java
```

### Component Breakdown:
- **`App.java`**: Implements a simple `add(int a, int b)` method returning `a + b`.
- **`AppTest.java`**: Implements JUnit test `testAdd()` verifying `assertEquals(5, app.add(2, 3))`.
- **`pom.xml`**: Configures Maven compiler plugin (Java 17) and JUnit 4.13.2 dependency.
- **`Jenkinsfile`**: Automates checkout from Git and runs `bat 'mvn clean test'` inside the `Maven/` directory.

---

## 2. Step 1: Configure Maven in Jenkins

Your Jenkins server is currently running at **`http://localhost:8080/`**.

1. Open your browser and go to:
   ```
   http://localhost:8080/
   ```
2. In the left navigation menu, click **Manage Jenkins**.
3. Under **System Configuration**, click **Tools** (or **Global Tool Configuration**).
4. Scroll down to the **Maven installations** section.
5. Click **Add Maven**:
   - **Name**: `Maven3` *(Note: Must match the name in `Jenkinsfile`)*
   - **Option A (Install automatically)**:
     - Check **Install automatically**
     - Version: Select `3.9.9` or `3.9.12` from the dropdown
   - **Option B (Use locally installed Maven on your laptop)**:
     - Uncheck **Install automatically**
     - **MAVEN_HOME**: `C:\Program Files\Apache\maven\apache-maven-3.10.0`
6. Click **Save** or **Apply**.

---

## 3. Step 2: Push Changes to GitHub

For Jenkins to checkout the Maven project during the pipeline run:

Open PowerShell in this project folder and run:
```powershell
$env:PATH += ";C:\Users\Ompra\AppData\Local\GitHubDesktop\app-3.6.2\resources\app\git\cmd;C:\Program Files\Git\cmd"
git add .
git commit -m "Add Maven project and Jenkinsfile for CI pipeline"
git push origin main
```

---

## 4. Step 3: Create the Pipeline Job in Jenkins

1. Go to Jenkins home: `http://localhost:8080/`
2. Click **New Item** on the left.
3. Enter an item name: e.g. `Pipeline_` (or `Maven-Pipeline`).
4. Select **Pipeline** and click **OK**.
5. Scroll down to the **Pipeline** configuration section:
   - **Method 1: Direct Pipeline Script (Easiest)**
     - Choose Definition: **Pipeline script**
     - Paste the following:
       ```groovy
       pipeline {
           agent any

           tools {
               maven 'Maven3'
           }

           stages {
               stage('Checkout Git') {
                   steps {
                       git branch: 'main', url: 'https://github.com/Akash-cj7/project.git'
                   }
               }

               stage('Build and Test') {
                   steps {
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
           }
       }
       ```
   - **Method 2: Pipeline script from SCM**
     - Choose Definition: **Pipeline script from SCM**
     - SCM: **Git**
     - Repository URL: `https://github.com/Akash-cj7/project.git`
     - Branch Specifier: `*/main`
     - Script Path: `Jenkinsfile`
6. Click **Save**.

---

## 5. Step 4: Run the Build

1. On the job page, click **Build Now** (in the left sidebar).
2. Under **Build History**, click build **#1**.
3. Click **Console Output** to monitor progress in real time.
4. You will see:
   - Git checkout of revision from `main`
   - Maven downloading dependencies & plugins
   - `Running com.example.AppTest`
   - `Tests run: 1, Failures: 0, Errors: 0, Skipped: 0`
   - `[INFO] BUILD SUCCESS`
   - `Finished: SUCCESS`
