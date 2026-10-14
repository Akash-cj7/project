# AASATS Web Application - Jenkins CI/CD Pipeline with Docker

This document describes the Automated CI/CD Pipeline created for the **AASATS** project using **Jenkins** and **Docker**.

---

## 1. Pipeline Architecture

```mermaid
flowchart TD
    A[Git Push / Commit] --> B[Jenkins Controller (Port 8080)]
    B --> C[Stage 1: Code & Environment Validation]
    C --> D[Stage 2: Docker Build]
    D --> E[Stage 3: Ephemeral Container Healthcheck (Port 8085)]
    E -->|Health check PASS| F{Push to Registry?}
    F -->|Yes| G[Stage 4: Push to Docker Hub / Registry]
    F -->|No| H[Stage 5: Deploy Application Container]
    G --> H
    H --> I[Stage 6: Post-Deployment Verification]
    I --> J[Live Application: http://localhost:8081]
```

---

## 2. Pipeline Stages Breakdown

The declarative pipeline is defined in [`Jenkinsfile`](./Jenkinsfile) and includes 5 stages:

| Stage | Purpose | Details |
|---|---|---|
| **1. Environment & Code Validation** | Sanity check | Checks Docker CLI and verifies required files (`index.html`, `style.css`, `script.js`, `Dockerfile`). |
| **2. Docker Build** | Image creation | Builds `aasats-web:${BUILD_NUMBER}` and tags it as `aasats-web:latest`. |
| **3. Automated Health Check** | Ephemeral testing | Spins up an isolated test container on port `8085`, verifies HTTP 200 and checks content for `AASATS`, then tears down the test container. |
| **4. Push to Registry (Optional)** | Artifact storage | When `PUSH_TO_REGISTRY` is `true`, logs into Docker Hub using stored Jenkins credentials and pushes tagged images. |
| **5. Deploy Container** | Production rollout | Stops any previous container named `aasats-web-container`, and starts the updated container on host port `8081` with automatic restart policy (`--restart unless-stopped`). |

> [!NOTE]
> **Port Allocation:** Jenkins runs on port `8080`. To avoid port collisions, the production application is deployed to **port 8081**, and the ephemeral test container uses **port 8085**.

---

## 3. How to Set Up the Job in Jenkins

Your Jenkins instance is running locally at **`http://localhost:8080/`**. Follow these steps to configure your Pipeline job:

### Step 1: Open Jenkins
Open your browser and navigate to:
```
http://localhost:8080/
```

### Step 2: Create a New Pipeline Job
1. Click **New Item** in the left sidebar.
2. Enter an item name, e.g., `AASATS-Docker-Pipeline`.
3. Select **Pipeline** and click **OK**.

### Step 3: Configure the Pipeline Definition
Scroll down to the **Pipeline** section:
- **Option A: Pipeline script from SCM (Recommended)**
  - Definition: `Pipeline script from SCM`
  - SCM: `Git`
  - Repository URL: `https://github.com/Akash-cj7/project.git`
  - Branch Specifier: `*/main`
  - Script Path: `Jenkinsfile`
- **Option B: Pipeline script (Direct)**
  - Definition: `Pipeline script`
  - Copy and paste the entire contents of [`Jenkinsfile`](./Jenkinsfile) into the script box.

### Step 4: (Optional) Add Docker Hub Credentials
If you want the pipeline to push images to Docker Hub:
1. Go to **Manage Jenkins** > **Credentials** > **System** > **Global credentials**.
2. Click **Add Credentials**.
3. Kind: `Username with password`.
4. ID: `dockerhub-creds` (matching the parameter `DOCKER_CREDENTIALS_ID`).
5. Enter your Docker Hub username and password / access token.

### Step 5: Run the Pipeline
1. Click **Build with Parameters** (or **Build Now** on the first run).
2. Set any desired parameter values:
   - `IMAGE_NAME`: `aasats-web`
   - `HOST_PORT`: `8081`
   - `PUSH_TO_REGISTRY`: `false` (or `true` if credentials configured)
3. Click **Build**.
4. Monitor the build logs in **Console Output**.
5. Once complete, view the deployed app at:
   ```
   http://localhost:8081/
   ```

---

## 4. Local Testing with Docker Compose

A [`docker-compose.yml`](./docker-compose.yml) is also included for running or restarting the application independently of Jenkins:

```bash
# Build and start container in the background
docker compose up -d

# View status
docker compose ps

# View live container logs
docker compose logs -f

# Stop container
docker compose down
```
