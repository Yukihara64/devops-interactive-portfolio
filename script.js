document.addEventListener('DOMContentLoaded', () => {
    // 1. Interactive DevOps CLI Terminal Simulator
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    const commands = {
        help: () => `
<span class="output-success">Available Developer Commands:</span>
  <span class="highlight-cmd">experience</span>        - Print professional work history (Tarkov, INFOBIP, BCP)
  <span class="highlight-cmd">skills</span>            - Display tech stack (Cloud, DevOps, Databases & Game Dev)
  <span class="highlight-cmd">kubectl get pods</span>  - Check live health of Kubernetes cluster pods
  <span class="highlight-cmd">terraform plan</span>    - Preview AWS EKS cloud infrastructure execution diff
  <span class="highlight-cmd">gamedev</span>           - Print info about my Unity Tactical FPS project
  <span class="highlight-cmd">chaos</span>             - Run chaos engineering self-healing simulation
  <span class="highlight-cmd">clear</span>             - Clear terminal console logs`,

        experience: () => `
<span class="output-success">Professional Work Experience & Track Record:</span>
  <span class="highlight-cmd">[2026 - Present] Localization Specialist @ Battlestate Games (Escape from Tarkov)</span>
    • Driving localization across English, Spanish, and Japanese with developer-first DevOps CI/CD pipelines.
  <span class="highlight-cmd">[2024 - 2026]    Customer Support Technician @ INFOBIP</span>
    • Managed CPaaS/OTT platforms (SMS, RCS, SMTP) and conducted advanced REST API troubleshooting.
  <span class="highlight-cmd">[2023 - 2024]    Database Administrator @ ONE S.A. / Banco Central del Paraguay</span>
    • Developed and optimized PostgreSQL, SQL Server, and MySQL databases; executed secure production deployments.
  <span class="highlight-cmd">[2018 - 2023]    Administrative Assistant @ B.D.G.K S.A</span>
    • Managed technical administrative procedures including patent processing and land use applications.`,
        exp: () => commands.experience(),
        work: () => commands.experience(),

        skills: () => `
<span class="output-success">Technical Skills & Tools Matrix:</span>
  <span class="highlight-cmd">[Cloud & DevOps]</span>   : AWS (EKS, VPC, RDS, IAM), Docker, Kubernetes, Terraform, ArgoCD, Helm
  <span class="highlight-cmd">[CI/CD & Security]</span> : GitHub Actions, Trivy, Checkov, Syft SBOM, Linux, ISC2 Candidate
  <span class="highlight-cmd">[Languages & DBs]</span>  : C#, Python, Bash, SQL, PostgreSQL (Certified), MySQL, SQL Server
  <span class="highlight-cmd">[Game Dev & 3D]</span>    : Unity C#, Blender, Unreal Engine, Forward Rendering, Custom Shaders`,

        'kubectl get pods': () => `
<span class="output-success">NAME                                      READY   STATUS    RESTARTS   AGE</span>
prod-cloud-service-58f8b9b7d8-2x9z4       1/1     Running   0          14d
prod-cloud-service-58f8b9b7d8-7k3w1       1/1     Running   0          14d
argocd-server-7964b7f498-8x2v9            1/1     Running   0          30d
prometheus-kube-prometheus-0              2/2     Running   0          30d
<span class="system-msg">All cluster pods operating cleanly across 3 AWS Availability Zones.</span>`,

        'terraform plan': () => `
<span class="output-warn">Terraform will perform the following actions:</span>
  # module.eks.aws_eks_node_group.spot_workload will be updated in-place
  <span class="output-success">~ desired_size = 3 -> 5 (Auto-scaled via Horizontal Pod Autoscaler demand)</span>
  
<span class="output-success">Plan: 0 to add, 1 to change, 0 to destroy.</span>
<span class="system-msg">Infracost evaluation: Utilizing Spot instances keeps monthly cloud costs low.</span>`,

        gamedev: () => `
<span class="output-success">🎮 Tactical Hardcore FPS Game Project:</span>
  <span class="highlight-cmd">[Engine]</span>    : Unity (C#)
  <span class="highlight-cmd">[Setting]</span>   : Asunción, Paraguay 🇵🇾
  <span class="highlight-cmd">[Rendering]</span> : Forward Rendering pipeline with custom shader graphs
  <span class="highlight-cmd">[AI / NPC]</span>  : Tactical NPC behavior and cover-seeking combat systems`,

        chaos: () => {
            setTimeout(() => {
                appendLog(`<span class="output-err">🚨 [CHAOS INJECTED] Pod prod-cloud-service-58f8b9b7d8-2x9z4 terminated unexpectedly!</span>`);
                appendLog(`<span class="system-msg">🤖 [ARGOCD SELF-HEALING] Drift detected by application controller. Re-synchronizing...</span>`);
            }, 800);
            setTimeout(() => {
                appendLog(`<span class="output-success">✅ [RECOVERY SUCCESS] New replacement pod prod-cloud-service-58f8b9b7d8-9l4m2 provisioned and Ready in 1.4s!</span>`);
            }, 2200);
            return `<span class="output-warn">⚡ Triggering Chaos Engineering fault experiment against live EKS namespace...</span>`;
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

                appendLog(`<span class="prompt">yuki@eks-dev-box:~#</span> <span class="cmd-input-echo">${rawCmd}</span>`);

                if (commands[rawCmd]) {
                    const result = commands[rawCmd]();
                    if (result) appendLog(result);
                } else if (rawCmd === 'cat resume.pdf' || rawCmd === 'resume') {
                    appendLog(`<span class="output-warn">📄 To view complete CV/Resume, connect with Daniel via <a href="https://www.linkedin.com/in/danielguanes/" target="_blank" style="color: #61dafb; text-decoration: underline;">LinkedIn</a> or Email!</span>`);
                } else {
                    appendLog(`<span class="output-err">bash: ${rawCmd}: command not found. Type 'help' for available developer commands.</span>`);
                }
            }
        });

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
