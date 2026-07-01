document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive DevOps CLI Terminal Simulator
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    const commands = {
        help: () => `
<span class="output-success">Available Engineering & SRE Commands:</span>
  <span class="highlight-cmd">skills</span>            - Display core cloud engineering technologies & tools
  <span class="highlight-cmd">kubectl get pods</span>  - Check live health of Kubernetes microservice pods
  <span class="highlight-cmd">terraform plan</span>    - Preview AWS EKS cloud infrastructure execution diff
  <span class="highlight-cmd">architecture</span>      - Print ASCII cloud architecture overview
  <span class="highlight-cmd">chaos</span>             - Run chaos engineering fault injection simulation
  <span class="highlight-cmd">clear</span>             - Clear terminal console logs`,

        skills: () => `
<span class="output-success">Cloud & DevOps Competence Matrix:</span>
  <span class="highlight-cmd">[Cloud Providers]</span> : AWS (EKS, VPC, RDS, IAM IRSA, KMS, Route53, WAF)
  <span class="highlight-cmd">[IaC & Config]</span>    : Terraform, OpenTofu, Ansible, Packer, Kustomize
  <span class="highlight-cmd">[Container OS]</span>    : Kubernetes, Docker, Helm, ArgoCD GitOps, Calico
  <span class="highlight-cmd">[Observability]</span>   : Prometheus, Grafana, Alertmanager, OpenTelemetry
  <span class="highlight-cmd">[DevSecOps CI/CD]</span> : GitHub Actions, Trivy, Checkov, Syft SBOM, SonarQube`,

        'kubectl get pods': () => `
<span class="output-success">NAME                                      READY   STATUS    RESTARTS   AGE</span>
prod-cloud-service-58f8b9b7d8-2x9z4       1/1     Running   0          14d
prod-cloud-service-58f8b9b7d8-7k3w1       1/1     Running   0          14d
prod-cloud-service-58f8b9b7d8-m9p8q       1/1     Running   0          14d
argocd-server-7964b7f498-8x2v9            1/1     Running   0          30d
prometheus-kube-prometheus-0              2/2     Running   0          30d
<span class="system-msg">All pods operating under 100% SLA conditions across 3 AWS Availability Zones.</span>`,

        'terraform plan': () => `
<span class="output-warn">Terraform will perform the following actions:</span>
  # module.eks.aws_eks_node_group.spot_workload will be updated in-place
  <span class="output-success">~ desired_size = 3 -> 5 (Auto-scaled via Horizontal Pod Autoscaler demand)</span>
  
<span class="output-success">Plan: 0 to add, 1 to change, 0 to destroy.</span>
<span class="system-msg">Infracost automated PR report: Monthly cloud expenditure savings maintained at 68.4% via Spot instances.</span>`,

        architecture: () => `
<span class="output-success">AWS Cloud Native Architecture Flow:</span>
  [Client Traffic] -> [AWS Route53 / WAF] -> [Application Load Balancer (ALB)]
       |
       +---> [Amazon EKS Cluster v1.29 (Private Subnets across 3 AZs)]
                  |---> On-Demand Node Group (Core System / Stateful Apps)
                  |---> Spot Instance Node Group (Stateless Microservices - 70% Cost Reduction)
                  |---> Least-Privilege IAM IRSA (OIDC Identity Provider)`,

        chaos: () => {
            setTimeout(() => {
                appendLog(`<span class="output-err">🚨 [CHAOS INJECTED] Pod prod-cloud-service-58f8b9b7d8-2x9z4 terminated unexpectedly!</span>`);
                appendLog(`<span class="system-msg">🤖 [ARGOCD SELF-HEALING] Drift detected by application controller. Re-synchronizing...</span>`);
            }, 800);
            setTimeout(() => {
                appendLog(`<span class="output-success">✅ [RECOVERY SUCCESS] New replacement pod prod-cloud-service-58f8b9b7d8-9l4m2 provisioned and Ready in 1.4s!</span>`);
            }, 2200);
            return `<span class="output-warn">⚡ Triggering Chaos Engineering Litmus fault experiment against live EKS namespace...</span>`;
        },

        clear: () => {
            termOutput.innerHTML = '';
            return '';
        }
    };

    function appendLog(html) {
        const div = document.createElement('div');
        div.className = 'log-line';
        div.innerHTML = html;
        termOutput.appendChild(div);
        termOutput.scrollTop = termOutput.scrollHeight;
    }

    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawCmd = termInput.value.trim().toLowerCase();
                termInput.value = '';

                if (!rawCmd) return;

                appendLog(`<span class="prompt">sre-admin@eks-bastion:~#</span> <span class="cmd-input-echo">${rawCmd}</span>`);

                if (commands[rawCmd]) {
                    const result = commands[rawCmd]();
                    if (result) appendLog(result);
                } else if (rawCmd === 'cat resume.pdf' || rawCmd === 'resume') {
                    appendLog(`<span class="output-warn">📄 To view complete CV/Resume, connect with Tsukihara Yuki via LinkedIn or GitHub!</span>`);
                } else {
                    appendLog(`<span class="output-err">bash: ${rawCmd}: command not found. Type 'help' for available SRE commands.</span>`);
                }
            }
        });

        // Focus terminal input when clicking inside the window
        document.querySelector('.terminal-window').addEventListener('click', () => {
            termInput.focus();
        });
    }

    // 2. Project Category Filter
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // 3. Live Simulated Cluster Telemetry Updates
    const cpuEl = document.getElementById('metric-cpu');
    const cpuBar = document.getElementById('bar-cpu');
    const memEl = document.getElementById('metric-mem');
    const memBar = document.getElementById('bar-mem');
    const reqEl = document.getElementById('metric-req');

    setInterval(() => {
        if (cpuEl && cpuBar) {
            const newCpu = (18 + Math.random() * 16).toFixed(1);
            cpuEl.textContent = `${newCpu}%`;
            cpuBar.style.width = `${newCpu}%`;
        }
        if (memEl && memBar) {
            const newMem = (58 + Math.random() * 6).toFixed(1);
            memEl.textContent = `${newMem}%`;
            memBar.style.width = `${newMem}%`;
        }
        if (reqEl) {
            const newReq = Math.floor(1380 + Math.random() * 120);
            reqEl.textContent = `${newReq.toLocaleString()} req/sec`;
        }
    }, 3000);
});
