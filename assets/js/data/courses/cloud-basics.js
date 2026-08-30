/* Bundled course — validate with tools/validate-course.py before committing. */
(window.DA_BUNDLED = window.DA_BUNDLED || []).push(
{
  "id": "cloud-basics",
  "title": "Cloud, at a High Level",
  "subtitle": "What it is, what it costs, and where it goes wrong",
  "icon": "☁",
  "updated": "2026-08-30",
  "source": {
    "kind": "bundled",
    "note": "written for you, 30 August 2026"
  },
  "modules": [
    {
      "id": "m1",
      "title": "What cloud actually is",
      "tagline": "Renting computers, and the three things that changed",
      "icon": "☁",
      "summary": "Cloud is other people's computers, rented by the minute. That sounds trivial and is not — three consequences follow that reshaped how software gets built.",
      "outcomes": [
        "Say what changed when computing became rented rather than owned",
        "Tell IaaS, PaaS and SaaS apart and know who is responsible for what",
        "Explain regions and availability zones and why they exist"
      ],
      "lessons": [
        {
          "id": "m1l1",
          "title": "Someone else's computers",
          "minutes": 6,
          "key": [
            "Rent instead of buy turns a capital cost into an operating one",
            "Self-service through an API means no procurement conversation",
            "Elasticity means capacity can shrink as well as grow"
          ],
          "body": "<p>Cloud computing is renting computers in someone else's building, by the minute, over the internet. That is genuinely all it is. Three consequences follow, and they matter more than the definition.</p>\n<h4>1. Rent, not buy</h4>\n<p>Before, you bought servers. That meant a large payment up front, guessing capacity years ahead, and owning the hardware whether you used it or not. Now you pay for what you use. In accounting terms a capital expense became an operating one, which changed who has to approve it and how fast a project can start.</p>\n<h4>2. Self-service</h4>\n<p>You do not ask anyone. A developer requests a server through an API or a web console and has it in under a minute. The old path — raise a ticket, wait for procurement, wait for the data centre team — could take months. Removing that wait is arguably the single biggest change, because it altered how quickly an idea can be tested.</p>\n<h4>3. Elastic</h4>\n<p>Capacity can go up <em>and down</em>. A retailer can run ten times the servers on their busiest day and switch them off the next. Owned hardware had to be sized for the worst day and sat idle the rest of the year.</p>\n<div class=\"callout\">The trap in \"rent, not buy\" is that renting is not automatically cheaper. Rented capacity you forget to switch off is more expensive than hardware you bought. The saving comes from elasticity and speed, not from the rental itself.</div>"
        },
        {
          "id": "m1l2",
          "title": "IaaS, PaaS and SaaS",
          "minutes": 7,
          "key": [
            "The three models differ in how much the provider manages for you",
            "More managed means less control and usually less operational work",
            "Most organisations use all three at once"
          ],
          "body": "<p>The standard three-way split. The useful way to read it is: how much is the provider doing on your behalf?</p>\n<h4>Infrastructure as a service (IaaS)</h4>\n<p>You rent raw building blocks — virtual machines, storage, networks — and you install and manage everything on top. Maximum control, maximum work. You patch the operating system.</p>\n<h4>Platform as a service (PaaS)</h4>\n<p>You bring your application; the provider runs the machinery underneath. A managed database is the clearest example: you get a database endpoint, and someone else handles patching, backups and failover. Less control, much less operational burden.</p>\n<h4>Software as a service (SaaS)</h4>\n<p>You just use the finished software. Gmail, Salesforce, Workday. You manage your data and your users and nothing else.</p>\n<h4>The pizza analogy, since it is genuinely clarifying</h4>\n<ul>\n<li><strong>On-premise</strong> — you make the pizza at home and own the oven</li>\n<li><strong>IaaS</strong> — you buy the dough and toppings, use a rented kitchen</li>\n<li><strong>PaaS</strong> — you get a delivered pizza and eat it on your own plates</li>\n<li><strong>SaaS</strong> — you eat at the restaurant</li>\n</ul>\n<p>Nobody picks one. A typical company runs SaaS for email and HR, PaaS for its databases, and IaaS for the awkward legacy system nobody wants to touch.</p>"
        },
        {
          "id": "m1l3",
          "title": "Providers, regions and zones",
          "minutes": 7,
          "key": [
            "AWS, Azure and Google Cloud dominate, with different centres of gravity",
            "A region is a geographic location; an availability zone is an isolated data centre within it",
            "Spreading across zones survives a data centre failure; spreading across regions survives worse"
          ],
          "body": "<p>Three providers hold most of the market: <strong>Amazon Web Services</strong>, largest and earliest; <strong>Microsoft Azure</strong>, strong where organisations already run Microsoft software; <strong>Google Cloud</strong>, smaller with a reputation in data and machine learning. Alibaba Cloud leads in China. They differ far less than their marketing suggests — the services have different names and broadly similar capabilities.</p>\n<h4>Regions</h4>\n<p>A <strong>region</strong> is a geographic location: London, Singapore, Frankfurt. You choose one for three reasons:</p>\n<ul>\n<li><strong>Latency</strong> — closer to users means faster</li>\n<li><strong>Law</strong> — data residency rules may require it stays in a country</li>\n<li><strong>Price</strong> — the same service costs different amounts in different regions</li>\n</ul>\n<h4>Availability zones</h4>\n<p>Within a region sit several <strong>availability zones</strong> — physically separate data centres, far enough apart that a fire or flood does not take out two, close enough for fast connections between them.</p>\n<p>This is the practical foundation of reliability. Run your application in one zone and a data centre problem takes you down. Run it across two or three and you survive. Providers price this so that spreading across zones is cheap, and they design their managed services to do it by default.</p>\n<div class=\"callout\">A useful shorthand: zones protect against a building failing, regions protect against a country or a whole cloud region failing. The second is far rarer and far more expensive to defend against.</div>"
        }
      ],
      "number": 1,
      "minutes": 20
    },
    {
      "id": "m2",
      "title": "The building blocks",
      "tagline": "Compute, storage, network — everything else is a variation",
      "icon": "▣",
      "summary": "Almost every cloud service is a flavour of three things: somewhere to run code, somewhere to keep data, and something to connect them.",
      "outcomes": [
        "Distinguish virtual machines, containers and serverless",
        "Choose between object, block and file storage",
        "Describe what a load balancer and a CDN do"
      ],
      "lessons": [
        {
          "id": "m2l1",
          "title": "Ways to run code",
          "minutes": 7,
          "key": [
            "Virtual machines are whole computers you manage",
            "Containers package an application with its dependencies and start in seconds",
            "Serverless runs a function on demand and charges only while it runs"
          ],
          "body": "<p>Three options, in order of how much you manage.</p>\n<h4>Virtual machines</h4>\n<p>A whole computer, virtualised: operating system, disk, the lot. You install what you want, and you patch it. Familiar, flexible, and you pay while it is switched on regardless of whether it is doing anything.</p>\n<h4>Containers</h4>\n<p>A container packages an application together with everything it needs to run, but shares the host's operating system rather than carrying its own. The result is much smaller and starts in seconds rather than minutes. Its real virtue is consistency: the same container runs identically on a laptop and in production, which removes an entire category of \"works on my machine\" problems.</p>\n<p>Running many containers needs an orchestrator to decide what runs where and restart failures. <strong>Kubernetes</strong> is the standard one — powerful, and complicated enough that managed versions exist precisely so most teams do not have to operate it themselves.</p>\n<h4>Serverless</h4>\n<p>You supply a function; the provider runs it when something triggers it and charges only for the milliseconds it runs. Nothing is running between requests, so nothing is billed. Excellent for spiky, event-driven work. There are servers, obviously — you just never see them.</p>\n<div class=\"callout\">Rough rule: virtual machines for things that must run continuously or resist change, containers for most modern applications, serverless for event-driven work with uneven load.</div>"
        },
        {
          "id": "m2l2",
          "title": "Where data lives",
          "minutes": 7,
          "key": [
            "Object storage is cheap, vast and accessed as whole files",
            "Block storage is a disk attached to one machine",
            "Managed databases trade control for someone else handling backups and failover"
          ],
          "body": "<p>Three storage shapes, then databases.</p>\n<h4>Object storage</h4>\n<p>Files with metadata, in a flat namespace, retrieved whole over the network. Amazon S3 is the archetype. Effectively unlimited, very cheap, extremely durable — and you cannot edit part of a file in place. Right for images, backups, logs, video, data lakes. Wrong for a database's working files.</p>\n<h4>Block storage</h4>\n<p>A virtual hard disk attached to one virtual machine. Fast, and it behaves like a disk, so databases and operating systems live here. Generally attaches to one machine at a time.</p>\n<h4>File storage</h4>\n<p>A shared network drive that several machines can mount at once. Usually the answer when older software expects a file path.</p>\n<h4>Databases</h4>\n<p>You can install your own on a virtual machine and manage it. Most people instead use a <strong>managed database</strong>, where the provider handles patching, backups, replication and failover. You give up some control over configuration and gain back the on-call rota.</p>\n<p>Broadly: <strong>relational</strong> databases (Postgres, MySQL, SQL Server) for structured data with relationships and transactions; <strong>NoSQL</strong> for very high volume, flexible structure, or key-value lookups. Most organisations run both, and the choice is less momentous than the internet suggests.</p>"
        },
        {
          "id": "m2l3",
          "title": "Connecting things up",
          "minutes": 7,
          "key": [
            "A virtual private cloud is your own isolated network inside the provider",
            "Load balancers spread traffic and stop sending it to broken machines",
            "A CDN caches content near users, cutting both latency and cost"
          ],
          "body": "<p>Four pieces of networking worth knowing by name.</p>\n<h4>Virtual private cloud</h4>\n<p>Your own isolated network inside the provider, subdivided into subnets. <strong>Public</strong> subnets can be reached from the internet; <strong>private</strong> ones cannot. Standard practice puts web servers in public subnets and databases in private ones, so a database is unreachable from the internet no matter what else goes wrong.</p>\n<h4>Security groups</h4>\n<p>Firewall rules attached to resources: what may talk to this machine, on which port, from where. Default-deny, so you open only what is needed.</p>\n<h4>Load balancers</h4>\n<p>Traffic arrives at the load balancer, which distributes it across several machines. It also health-checks them and stops sending traffic to any that fail. This is what makes it possible to replace machines, or lose one, without users noticing.</p>\n<h4>Content delivery network</h4>\n<p>A CDN keeps copies of your static content — images, scripts, video — in hundreds of locations worldwide, and serves each user from the nearest. It makes sites faster and reduces load on your servers. It also usually reduces cost, because serving from a CDN is cheaper than serving the same bytes repeatedly from your origin.</p>\n<div class=\"callout\">If you remember one networking idea, make it private subnets. \"Is the database reachable from the internet?\" is the question behind a remarkable number of breaches.</div>"
        }
      ],
      "number": 2,
      "minutes": 21
    },
    {
      "id": "m3",
      "title": "Keeping it safe and standing up",
      "tagline": "Identity, shared responsibility and failure",
      "icon": "⛨",
      "summary": "Most cloud incidents are not clever attacks. They are permissions granted too widely, storage left public, and systems with no plan for a component failing.",
      "outcomes": [
        "Explain least privilege and why identity is the real perimeter",
        "State who is responsible for what under the shared responsibility model",
        "Describe how redundancy and backups differ, and why you need both"
      ],
      "lessons": [
        {
          "id": "m3l1",
          "title": "Identity and access",
          "minutes": 7,
          "key": [
            "Identity is the perimeter — the network boundary no longer does that job",
            "Least privilege means granting only what is needed, and no more",
            "Roles for machines beat long-lived keys, which leak"
          ],
          "body": "<p>In a data centre, security was largely about the boundary: inside the network was trusted. In cloud there is no such boundary, so <strong>identity</strong> does that job. Who or what is making this request, and are they allowed to?</p>\n<h4>Least privilege</h4>\n<p>Grant exactly the permissions needed and no more. It is universally recommended and widely ignored, because broad permissions make things work immediately and narrow ones take iteration. The result is accounts that could delete a production database because someone was in a hurry two years ago.</p>\n<h4>Roles rather than keys</h4>\n<p>An application needing access to storage could hold a long-lived access key — which then ends up in source control, in a config file, in a screenshot. Better is a <strong>role</strong>: the machine assumes an identity, receives short-lived credentials automatically, and there is no key to leak. Leaked long-lived keys remain one of the most common causes of cloud breaches.</p>\n<h4>Multi-factor authentication</h4>\n<p>Non-negotiable for human accounts, and especially for the root account, which can do anything. Standard practice is to secure the root account, lock it away, and never use it for daily work.</p>\n<div class=\"callout warn\">The two most common serious cloud misconfigurations are object storage left publicly readable and permissions far broader than needed. Neither is sophisticated, and both are found constantly.</div>"
        },
        {
          "id": "m3l2",
          "title": "Shared responsibility",
          "minutes": 6,
          "key": [
            "The provider secures the cloud; you secure what you put in it",
            "The line moves depending on whether you use IaaS, PaaS or SaaS",
            "Almost every publicised 'cloud breach' is on the customer's side of the line"
          ],
          "body": "<p>The single most useful mental model in cloud security, and the most misunderstood.</p>\n<p><strong>The provider is responsible for security <em>of</em> the cloud.</strong> Physical data centres, the hardware, the hypervisor, the network between their facilities. You will never patch their infrastructure.</p>\n<p><strong>You are responsible for security <em>in</em> the cloud.</strong> Your data, who has access, how your application is configured, whether your storage is public, whether your machines are patched.</p>\n<h4>The line moves</h4>\n<ul>\n<li><strong>IaaS</strong> — you patch the operating system, configure the firewall, manage everything above the hypervisor</li>\n<li><strong>PaaS</strong> — the provider patches the database; you still control who can reach it and what data goes in</li>\n<li><strong>SaaS</strong> — the provider handles nearly everything; you still control users, permissions and data</li>\n</ul>\n<p>Note the constant: <strong>your data and your access control are always yours</strong>, in every model.</p>\n<h4>Why it matters</h4>\n<p>Read the reporting on any large \"cloud breach\" and it is almost always a customer-side failure — a public bucket, an over-permissioned account, a leaked key. Providers do have outages and occasionally vulnerabilities, but they are not usually the cause of data loss. Assuming the provider has security covered is precisely the assumption that leaves the bucket public.</p>"
        },
        {
          "id": "m3l3",
          "title": "Reliability and failure",
          "minutes": 7,
          "key": [
            "Redundancy handles a component failing; backups handle data being destroyed",
            "A backup is not real until you have restored from it",
            "Blast radius is the discipline of limiting how much one failure can take out"
          ],
          "body": "<p>Things fail constantly at cloud scale. Design assumes it.</p>\n<h4>Redundancy</h4>\n<p>Run more than one of everything, in more than one availability zone, behind a load balancer. When one instance dies, traffic goes to the others. This handles hardware failure and single-data-centre problems, and it is cheap relative to the alternative.</p>\n<h4>Backups are a different thing</h4>\n<p>Redundancy does not protect you from deletion, corruption or ransomware, because those replicate faithfully to every copy. You also need backups: point-in-time, held separately, ideally in another account so that compromising your main account does not compromise them.</p>\n<p><strong>A backup you have never restored is not a backup.</strong> It is an assumption. Restore drills are the only way to know, and they routinely surface unpleasant surprises about how long a restore actually takes.</p>\n<h4>Blast radius</h4>\n<p>How much does one failure, or one mistake, take out? Separating environments into different accounts, so a test mistake cannot touch production, is the most effective structural control there is. It is also why organisations end up with many accounts rather than one large one.</p>\n<h4>Two numbers worth knowing</h4>\n<ul>\n<li><strong>RPO</strong> — recovery point objective: how much data you can afford to lose, measured in time</li>\n<li><strong>RTO</strong> — recovery time objective: how long you can afford to be down</li>\n</ul>\n<p>These are business decisions, not technical ones, and they determine what you must build. An RPO of zero and an RTO of minutes costs a great deal more than an hour of each.</p>"
        }
      ],
      "number": 3,
      "minutes": 20
    },
    {
      "id": "m4",
      "title": "What it costs and how it goes wrong",
      "tagline": "The bill is a design problem",
      "icon": "◆",
      "summary": "Cloud bills surprise people because the pricing model is unlike anything in owned infrastructure — you are charged for things you did not think of as products, especially moving data out.",
      "outcomes": [
        "Explain the main ways cloud charges accumulate",
        "Say why egress charges shape architecture",
        "Describe the practical levers for reducing a cloud bill",
        "Judge lock-in honestly rather than ideologically"
      ],
      "lessons": [
        {
          "id": "m4l1",
          "title": "How you get charged",
          "minutes": 7,
          "key": [
            "You pay for time, volume and movement, mostly per second or per gigabyte",
            "Data leaving the provider costs money; data going in is generally free",
            "Idle resources bill exactly the same as busy ones"
          ],
          "body": "<p>Four ways charges accumulate, and one that catches everyone.</p>\n<h4>Compute time</h4>\n<p>Per second or per hour, for as long as a machine exists — whether or not it is doing anything. A forgotten test server bills for months.</p>\n<h4>Storage volume</h4>\n<p>Per gigabyte per month. Cheap per unit and cumulative, since data is rarely deleted. Storage classes let rarely accessed data cost far less, at the price of slower or costlier retrieval.</p>\n<h4>Requests and operations</h4>\n<p>Per million API calls, per query, per function invocation. Individually trivial, occasionally enormous at scale.</p>\n<h4>Data transfer — the one that surprises</h4>\n<p>Data going <em>in</em> is usually free. Data going <strong>out</strong> — to the internet, to another region, sometimes to another availability zone — is charged per gigabyte. This is <strong>egress</strong>, and it has two consequences worth internalising:</p>\n<ul>\n<li>It shapes architecture. Chatty traffic between zones or regions costs real money, so systems get designed to keep data close to where it is processed.</li>\n<li>It raises the cost of leaving. Moving petabytes out to another provider carries a bill of its own, which is a genuine, non-rhetorical component of lock-in.</li>\n</ul>\n<div class=\"callout warn\">The classic surprise bill: a development environment left running over a holiday, a misconfigured job retrying in a loop, or a public bucket being scraped and generating egress. All three are common, and all three are visible in a cost alert if one exists.</div>"
        },
        {
          "id": "m4l2",
          "title": "Controlling the bill",
          "minutes": 6,
          "key": [
            "Tagging is how you find out who is spending what",
            "Committing to usage for one to three years cuts rates substantially",
            "Auto-scaling and switching off non-production overnight are the easy wins"
          ],
          "body": "<p>Cost control in cloud is a practice, sometimes called <strong>FinOps</strong>. Its central insight is that the people who create cost are engineers, so cost has to be visible to engineers rather than only to finance.</p>\n<h4>Visibility first</h4>\n<p><strong>Tagging</strong> — labelling every resource with a team, project and environment — is what makes a bill attributable. Without it, the bill is one enormous number nobody owns. Enforcing tags is boring and pays for itself repeatedly.</p>\n<h4>The main levers</h4>\n<ul>\n<li><strong>Right-sizing</strong> — most machines are larger than they need to be, because someone guessed generously and never revisited it</li>\n<li><strong>Commitments</strong> — agreeing to a level of usage for one or three years cuts the rate substantially, in exchange for less flexibility</li>\n<li><strong>Spot capacity</strong> — spare capacity at a steep discount that can be reclaimed at short notice, ideal for interruptible batch work</li>\n<li><strong>Auto-scaling</strong> — matching capacity to demand automatically, which is the elasticity you came for in the first place</li>\n<li><strong>Switching things off</strong> — non-production environments do not need to run at night or at weekends. This is the least sophisticated lever and often the largest.</li>\n<li><strong>Storage lifecycle</strong> — moving old data to cheaper classes automatically</li>\n</ul>\n<h4>Alerts</h4>\n<p>Budgets and anomaly alerts turn a nasty surprise at month end into a message on the day it starts. Set them before you need them.</p>"
        },
        {
          "id": "m4l3",
          "title": "Lock-in, honestly",
          "minutes": 7,
          "key": [
            "Lock-in is real, and avoiding it entirely has its own large cost",
            "Data gravity and managed services are what actually bind you",
            "Multi-cloud is often the most expensive way to solve a problem you do not have"
          ],
          "body": "<p>Lock-in gets argued about ideologically. It is better treated as a trade-off with a price.</p>\n<h4>What actually locks you in</h4>\n<ul>\n<li><strong>Managed services</strong> — a provider's proprietary database or queue is genuinely convenient and has no exact equivalent elsewhere</li>\n<li><strong>Data gravity</strong> — large volumes of data are expensive and slow to move, and applications gather around the data</li>\n<li><strong>Skills</strong> — a team fluent in one provider is not immediately productive in another</li>\n<li><strong>Commitments</strong> — multi-year discount agreements are a contractual tie</li>\n</ul>\n<h4>The cost of avoiding it</h4>\n<p>Staying portable usually means using only the lowest common denominator: plain virtual machines, open-source components you operate yourself, no managed services. You have then given up most of what made cloud attractive and taken back the operational work — to keep open an option you may never exercise.</p>\n<h4>Multi-cloud</h4>\n<p>Running across two providers is often proposed as the answer. It is expensive: two sets of skills, two security models, two billing systems, and you are still limited to what both support. It is justified for genuine regulatory requirements, for specific services only one provider offers well, or after a merger. It is rarely justified as insurance.</p>\n<div class=\"callout\">The proportionate position for most organisations: use managed services and accept the tie, but know what you are tied to, keep data in portable formats where cheap to do so, and have a written exit plan. That is very different from architecting for a migration that will probably never happen.</div>"
        }
      ],
      "number": 4,
      "minutes": 20
    },
    {
      "id": "m5",
      "title": "Cloud in practice",
      "tagline": "How teams actually work, and when cloud is wrong",
      "icon": "◈",
      "summary": "The cultural change matters as much as the technology: infrastructure defined in code, deployed automatically, with the same team running what it builds. And sometimes the answer is not cloud at all.",
      "outcomes": [
        "Explain infrastructure as code and why it changed operations",
        "Describe what a CI/CD pipeline does",
        "Name situations where cloud is the wrong answer",
        "Say what a regulated institution must add on top"
      ],
      "lessons": [
        {
          "id": "m5l1",
          "title": "Infrastructure as code",
          "minutes": 7,
          "key": [
            "Infrastructure is defined in files, version-controlled and reviewed like software",
            "It makes environments reproducible and changes auditable",
            "Clicking in the console does not scale and cannot be reviewed"
          ],
          "body": "<p>The most consequential working practice in cloud, and it is not a product.</p>\n<p>Rather than clicking through a console to create servers and networks, you describe the desired infrastructure in files — Terraform, CloudFormation, Pulumi — and a tool makes reality match the description.</p>\n<h4>Why it changed things</h4>\n<ul>\n<li><strong>Reproducible</strong> — the same definition builds an identical environment, so test genuinely resembles production</li>\n<li><strong>Version-controlled</strong> — every change has an author, a date and a reason, and can be reverted</li>\n<li><strong>Reviewable</strong> — an infrastructure change goes through the same review as a code change, so someone else sees it before it happens</li>\n<li><strong>Recoverable</strong> — if an environment is destroyed, it can be rebuilt from the definition</li>\n</ul>\n<h4>Configuration drift</h4>\n<p>The problem it solves: someone makes an urgent manual fix in the console, does not record it, and the environment quietly diverges from its definition. Six months later nobody knows why production behaves differently from test. Infrastructure as code makes drift visible and correctable, provided people stop making manual changes — which is a discipline question rather than a technical one.</p>\n<div class=\"callout\">A reasonable maturity test for any cloud team: could you rebuild your entire environment in a new account from files in version control? Teams that can are in a fundamentally different position from teams that cannot.</div>"
        },
        {
          "id": "m5l2",
          "title": "Pipelines and running what you build",
          "minutes": 6,
          "key": [
            "CI checks every change automatically; CD deploys it",
            "Small frequent releases are safer than large rare ones",
            "Teams that operate their own systems build them differently"
          ],
          "body": "<p>Two practices that travel with cloud.</p>\n<h4>CI/CD</h4>\n<p><strong>Continuous integration</strong> means every code change is automatically built and tested, so breakage is caught in minutes rather than at the end of a release cycle. <strong>Continuous delivery</strong> extends that to deployment: a change that passes its tests can go to production automatically or with one approval.</p>\n<p>The counter-intuitive result is that deploying more often is <em>safer</em>. A small change is easy to review, easy to understand when it breaks, and easy to reverse. A quarterly release bundling three hundred changes is the risky one, even though it feels more controlled.</p>\n<h4>You build it, you run it</h4>\n<p>The team that writes a system also operates it and carries the pager. This sounds like a burden and functions as an incentive: engineers woken at 3am by their own alerts build systems that do not wake them. Separating build from operate removes that feedback entirely.</p>\n<h4>Observability</h4>\n<p>Because systems are distributed, understanding them means instrumenting them: <strong>logs</strong> for what happened, <strong>metrics</strong> for how much and how fast, <strong>traces</strong> for the path one request took across services. In a system of thirty services, a trace is often the only practical way to find where the time went.</p>"
        },
        {
          "id": "m5l3",
          "title": "When cloud is the wrong answer",
          "minutes": 7,
          "key": [
            "Steady predictable load can be cheaper on owned hardware",
            "Regulated industries must add residency, exit plans and concentration risk",
            "Lift-and-shift without redesign gets the costs and few of the benefits"
          ],
          "body": "<p>Cloud is a default, not a law. Cases where it is the wrong call:</p>\n<h4>Steady, predictable, large load</h4>\n<p>Elasticity is worth nothing if demand never varies. Several well-known companies have moved substantial workloads back to owned hardware and reported large savings, because they were paying an elasticity premium for capacity that was always the same size.</p>\n<h4>Lift and shift with no redesign</h4>\n<p>Moving virtual machines as they are, changing nothing, is the most common disappointment. You keep every inefficiency, add the rental premium, and gain almost none of the benefits, which come from elasticity and managed services rather than from location.</p>\n<h4>Data residency and sovereignty</h4>\n<p>Some data legally cannot leave a country. Providers offer in-country regions and sovereign cloud arrangements, but this genuinely constrains which services are available where.</p>\n<h4>What a regulated institution adds</h4>\n<p>For a bank, cloud is outsourcing, and supervisors treat it as such:</p>\n<ul>\n<li><strong>Exit plan</strong> — a documented, tested ability to leave, because a regulator will ask</li>\n<li><strong>Concentration risk</strong> — supervisors worry that most of the financial system depends on three providers, and the EU's Digital Operational Resilience Act now brings critical providers into direct oversight</li>\n<li><strong>Right to audit</strong> — contractual access for the firm and its regulator</li>\n<li><strong>Resilience testing</strong> — evidence that severe but plausible failures have been rehearsed, not just documented</li>\n</ul>\n<div class=\"callout\">Which is why cloud adoption in a bank is slower than the technology alone would imply. The constraint is rarely engineering; it is the outsourcing, resilience and exit obligations that come with it.</div>"
        }
      ],
      "number": 5,
      "minutes": 20
    }
  ],
  "questions": [
    {
      "id": "c1_1",
      "m": "m1",
      "l": "m1l1",
      "type": "multi",
      "q": "What actually changed when computing became rented? (Select all that apply)",
      "options": [
        "Capital expense became operating expense",
        "Capacity could be obtained in minutes without procurement",
        "Capacity could shrink as well as grow",
        "Computing became automatically cheaper"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "It is not automatically cheaper. Savings come from elasticity and speed, not from renting as such."
    },
    {
      "id": "c1_2",
      "m": "m1",
      "l": "m1l1",
      "type": "mc",
      "q": "Which is the biggest practical change cloud brought?",
      "options": [
        "Faster processors",
        "Removing the wait between wanting a server and having one",
        "Cheaper storage",
        "Better security"
      ],
      "answer": 1,
      "explain": "Months of procurement collapsed to under a minute, which changed how quickly an idea can be tested."
    },
    {
      "id": "c1_3",
      "m": "m1",
      "l": "m1l2",
      "type": "order",
      "q": "Order these from most managed by you to most managed by the provider.",
      "items": [
        "On-premise",
        "IaaS",
        "PaaS",
        "SaaS"
      ],
      "explain": "Each step hands more to the provider and takes away some control."
    },
    {
      "id": "c1_4",
      "m": "m1",
      "l": "m1l2",
      "type": "mc",
      "q": "Under PaaS, who patches the database?",
      "options": [
        "You",
        "The provider",
        "Nobody",
        "The auditor"
      ],
      "answer": 1,
      "explain": "That is the point of a managed service — you keep control of data and access, not of the machinery."
    },
    {
      "id": "c1_5",
      "m": "m1",
      "l": "m1l2",
      "type": "tf",
      "q": "Most organisations choose one of IaaS, PaaS or SaaS and standardise on it.",
      "answer": false,
      "explain": "A typical company runs all three at once — SaaS for email, PaaS for databases, IaaS for legacy systems."
    },
    {
      "id": "c1_6",
      "m": "m1",
      "l": "m1l3",
      "type": "mc",
      "q": "What is an availability zone?",
      "options": [
        "A geographic region such as London",
        "A physically separate data centre within a region",
        "A network firewall rule",
        "A pricing tier"
      ],
      "answer": 1,
      "explain": "Separate enough that one fire or flood does not take out two, close enough for fast connections between them."
    },
    {
      "id": "c1_7",
      "m": "m1",
      "l": "m1l3",
      "type": "multi",
      "q": "Why would you choose one region over another? (Select all that apply)",
      "options": [
        "Lower latency to your users",
        "Data residency law",
        "Price differences between regions",
        "Regions have different security models"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "The security model is the same everywhere; latency, law and price are the real reasons."
    },
    {
      "id": "c1_8",
      "m": "m1",
      "l": "m1l3",
      "type": "mc",
      "q": "Zones protect against what, and regions against what?",
      "options": [
        "Zones against a country failing, regions against a building failing",
        "Zones against a building failing, regions against a country or whole region failing",
        "Both protect against the same thing",
        "Neither protects against physical failure"
      ],
      "answer": 1,
      "explain": "Multi-region is far rarer and far more expensive to defend against than multi-zone."
    },
    {
      "id": "c2_1",
      "m": "m2",
      "l": "m2l1",
      "type": "match",
      "q": "Match each way of running code to its defining trait.",
      "pairs": [
        [
          "Virtual machine",
          "A whole computer you manage and patch"
        ],
        [
          "Container",
          "Packages an app with its dependencies, shares the host OS"
        ],
        [
          "Serverless",
          "Runs on demand, billed only while executing"
        ]
      ],
      "explain": "In order of how much you manage."
    },
    {
      "id": "c2_2",
      "m": "m2",
      "l": "m2l1",
      "type": "mc",
      "q": "What is containers' real virtue?",
      "options": [
        "They are faster than virtual machines at computation",
        "The same container runs identically on a laptop and in production",
        "They need no operating system",
        "They cannot fail"
      ],
      "answer": 1,
      "explain": "Consistency removes a whole category of 'works on my machine' problems."
    },
    {
      "id": "c2_3",
      "m": "m2",
      "l": "m2l1",
      "type": "type",
      "q": "What is the standard container orchestrator called?",
      "accept": [
        "kubernetes",
        "k8s"
      ],
      "hint": "Often abbreviated K8s",
      "explain": "Powerful enough, and complicated enough, that managed versions exist so most teams need not operate it."
    },
    {
      "id": "c2_4",
      "m": "m2",
      "l": "m2l1",
      "type": "tf",
      "q": "With serverless, there are no servers involved.",
      "answer": false,
      "explain": "There are servers. You never see or manage them, and you are billed only while your code runs."
    },
    {
      "id": "c2_5",
      "m": "m2",
      "l": "m2l2",
      "type": "mc",
      "q": "Which storage type suits images, backups and logs?",
      "options": [
        "Block storage",
        "Object storage",
        "File storage",
        "A relational database"
      ],
      "answer": 1,
      "explain": "Cheap, effectively unlimited, retrieved whole. You cannot edit part of an object in place."
    },
    {
      "id": "c2_6",
      "m": "m2",
      "l": "m2l2",
      "type": "mc",
      "q": "What do you give up by using a managed database?",
      "options": [
        "Durability",
        "Some control over configuration",
        "The ability to query it",
        "Data ownership"
      ],
      "answer": 1,
      "explain": "You trade configuration control for the provider handling patching, backups and failover."
    },
    {
      "id": "c2_7",
      "m": "m2",
      "l": "m2l3",
      "type": "mc",
      "q": "Why put databases in private subnets?",
      "options": [
        "It is cheaper",
        "They cannot be reached from the internet regardless of what else goes wrong",
        "It improves query speed",
        "Regulators require it everywhere"
      ],
      "answer": 1,
      "explain": "'Is the database reachable from the internet?' is the question behind a remarkable number of breaches."
    },
    {
      "id": "c2_8",
      "m": "m2",
      "l": "m2l3",
      "type": "multi",
      "q": "What does a load balancer do? (Select all that apply)",
      "options": [
        "Distributes traffic across several machines",
        "Health-checks machines and stops sending traffic to failed ones",
        "Lets you replace machines without users noticing",
        "Encrypts your database at rest"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Encryption at rest is a storage feature, not a load balancer one."
    },
    {
      "id": "c2_9",
      "m": "m2",
      "l": "m2l3",
      "type": "mc",
      "q": "What is a CDN for?",
      "options": [
        "Backing up data across regions",
        "Caching content near users to cut latency and origin load",
        "Balancing database queries",
        "Managing DNS records only"
      ],
      "answer": 1,
      "explain": "It usually reduces cost too, since serving from the edge is cheaper than repeatedly serving from origin."
    },
    {
      "id": "c3_1",
      "m": "m3",
      "l": "m3l1",
      "type": "mc",
      "q": "Why is identity called the perimeter in cloud?",
      "options": [
        "Networks no longer exist",
        "There is no trusted inside network, so every request must prove who it is and what it may do",
        "Firewalls are banned",
        "Identity is cheaper than networking"
      ],
      "answer": 1,
      "explain": "The data centre model of 'inside is trusted' does not survive contact with cloud."
    },
    {
      "id": "c3_2",
      "m": "m3",
      "l": "m3l1",
      "type": "mc",
      "q": "Why are roles preferred over long-lived access keys?",
      "options": [
        "Roles are cheaper",
        "Short-lived credentials are issued automatically, so there is no key to leak",
        "Keys cannot be rotated",
        "Roles work offline"
      ],
      "answer": 1,
      "explain": "Leaked long-lived keys — in source control, config files, screenshots — remain a leading cause of breaches."
    },
    {
      "id": "c3_3",
      "m": "m3",
      "l": "m3l1",
      "type": "multi",
      "q": "What are the two most common serious cloud misconfigurations? (Select all that apply)",
      "options": [
        "Object storage left publicly readable",
        "Permissions far broader than needed",
        "Using the wrong region",
        "Choosing a managed database"
      ],
      "answers": [
        0,
        1
      ],
      "explain": "Neither is sophisticated, and both are found constantly."
    },
    {
      "id": "c3_4",
      "m": "m3",
      "l": "m3l2",
      "type": "mc",
      "q": "Under the shared responsibility model, who secures the physical data centre?",
      "options": [
        "You",
        "The provider",
        "Jointly",
        "The regulator"
      ],
      "answer": 1,
      "explain": "The provider secures the cloud; you secure what you put in it."
    },
    {
      "id": "c3_5",
      "m": "m3",
      "l": "m3l2",
      "type": "tf",
      "q": "Your data and access control remain your responsibility under IaaS, PaaS and SaaS alike.",
      "answer": true,
      "explain": "The line moves for everything else, but never for those two."
    },
    {
      "id": "c3_6",
      "m": "m3",
      "l": "m3l2",
      "type": "mc",
      "q": "Where do most publicised 'cloud breaches' actually originate?",
      "options": [
        "Provider infrastructure vulnerabilities",
        "The customer's side of the responsibility line",
        "Undersea cable failures",
        "Hypervisor escapes"
      ],
      "answer": 1,
      "explain": "Public buckets, over-permissioned accounts, leaked keys. Assuming the provider covers security is what leaves the bucket public."
    },
    {
      "id": "c3_7",
      "m": "m3",
      "l": "m3l3",
      "type": "mc",
      "q": "Why does redundancy not remove the need for backups?",
      "options": [
        "Redundant copies are slower",
        "Deletion, corruption and ransomware replicate faithfully to every copy",
        "Backups are legally required",
        "Redundancy only works in one zone"
      ],
      "answer": 1,
      "explain": "Redundancy handles a component failing; backups handle data being destroyed."
    },
    {
      "id": "c3_8",
      "m": "m3",
      "l": "m3l3",
      "type": "tf",
      "q": "A backup you have never restored from is still a backup.",
      "answer": false,
      "explain": "It is an assumption. Restore drills routinely surface unpleasant surprises about how long recovery really takes."
    },
    {
      "id": "c3_9",
      "m": "m3",
      "l": "m3l3",
      "type": "match",
      "q": "Match each recovery objective to its meaning.",
      "pairs": [
        [
          "RPO",
          "How much data you can afford to lose, in time"
        ],
        [
          "RTO",
          "How long you can afford to be down"
        ]
      ],
      "explain": "Both are business decisions that determine what must be built."
    },
    {
      "id": "c3_10",
      "m": "m3",
      "l": "m3l3",
      "type": "mc",
      "q": "What is the most effective structural way to limit blast radius?",
      "options": [
        "Larger machines",
        "Separating environments into different accounts",
        "More frequent backups",
        "A stronger firewall"
      ],
      "answer": 1,
      "explain": "A mistake in test then cannot touch production — which is why organisations run many accounts rather than one."
    },
    {
      "id": "c4_1",
      "m": "m4",
      "l": "m4l1",
      "type": "mc",
      "q": "Which direction of data transfer is normally charged?",
      "options": [
        "Data going in",
        "Data going out — egress",
        "Both equally",
        "Neither"
      ],
      "answer": 1,
      "explain": "Ingress is generally free; egress is charged per gigabyte, which shapes both architecture and the cost of leaving."
    },
    {
      "id": "c4_2",
      "m": "m4",
      "l": "m4l1",
      "type": "multi",
      "q": "Which are classic sources of a surprise cloud bill? (Select all that apply)",
      "options": [
        "A development environment left running over a holiday",
        "A misconfigured job retrying in a loop",
        "A public bucket being scraped and generating egress",
        "Choosing a managed database"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "All three are common, and all three would be caught by a cost alert."
    },
    {
      "id": "c4_3",
      "m": "m4",
      "l": "m4l1",
      "type": "tf",
      "q": "An idle virtual machine costs less than a busy one.",
      "answer": false,
      "explain": "You are billed for its existence, not its usefulness. A forgotten test server bills for months."
    },
    {
      "id": "c4_4",
      "m": "m4",
      "l": "m4l2",
      "type": "mc",
      "q": "What makes a cloud bill attributable to teams?",
      "options": [
        "Tagging resources with team, project and environment",
        "Using a single account",
        "Monthly invoices",
        "Reserved capacity"
      ],
      "answer": 0,
      "explain": "Without tags the bill is one enormous number nobody owns."
    },
    {
      "id": "c4_5",
      "m": "m4",
      "l": "m4l2",
      "type": "multi",
      "q": "Which reduce cloud cost? (Select all that apply)",
      "options": [
        "Right-sizing over-provisioned machines",
        "Committing to usage for one or three years",
        "Switching off non-production overnight",
        "Increasing egress between regions"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Cross-region egress adds cost. The other three are the standard levers."
    },
    {
      "id": "c4_6",
      "m": "m4",
      "l": "m4l2",
      "type": "mc",
      "q": "Which cost lever is least sophisticated and often the largest?",
      "options": [
        "Spot capacity",
        "Switching off non-production environments at night and weekends",
        "Storage lifecycle rules",
        "Reserved instances"
      ],
      "answer": 1,
      "explain": "Unglamorous, and frequently the biggest single saving available."
    },
    {
      "id": "c4_7",
      "m": "m4",
      "l": "m4l3",
      "type": "multi",
      "q": "What genuinely creates lock-in? (Select all that apply)",
      "options": [
        "Proprietary managed services with no exact equivalent",
        "Data gravity — large volumes are slow and costly to move",
        "Team skills concentrated in one provider",
        "The provider's user interface"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Interfaces are trivial to relearn. The first three are the real ties."
    },
    {
      "id": "c4_8",
      "m": "m4",
      "l": "m4l3",
      "type": "mc",
      "q": "What is the cost of architecting to avoid lock-in entirely?",
      "options": [
        "Nothing, it is free",
        "You give up managed services and take back the operational work, for an option you may never use",
        "It requires a second provider",
        "It breaches most contracts"
      ],
      "answer": 1,
      "explain": "Lowest-common-denominator design surrenders most of what made cloud attractive."
    },
    {
      "id": "c4_9",
      "m": "m4",
      "l": "m4l3",
      "type": "mc",
      "q": "When is multi-cloud genuinely justified?",
      "options": [
        "Always, as insurance",
        "For real regulatory requirements, a service only one provider does well, or after a merger",
        "Whenever the bill grows",
        "For any production system"
      ],
      "answer": 1,
      "explain": "Two sets of skills, security models and billing systems is expensive, and you are still limited to what both support."
    },
    {
      "id": "c5_1",
      "m": "m5",
      "l": "m5l1",
      "type": "multi",
      "q": "What does infrastructure as code give you? (Select all that apply)",
      "options": [
        "Reproducible environments",
        "A change history with authors and reasons",
        "Peer review before infrastructure changes",
        "Immunity from provider outages"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "It does nothing about outages. It makes changes reproducible, auditable and reviewable."
    },
    {
      "id": "c5_2",
      "m": "m5",
      "l": "m5l1",
      "type": "type",
      "q": "What is the term for an environment drifting away from its definition through undocumented manual changes?",
      "accept": [
        "configuration drift",
        "config drift",
        "drift"
      ],
      "hint": "Two words, the second is 'drift'",
      "explain": "Six months later nobody knows why production behaves differently from test."
    },
    {
      "id": "c5_3",
      "m": "m5",
      "l": "m5l1",
      "type": "mc",
      "q": "What is a reasonable maturity test for a cloud team?",
      "options": [
        "How many services they use",
        "Whether they could rebuild their whole environment in a new account from version control",
        "Their monthly spend",
        "How many regions they run in"
      ],
      "answer": 1,
      "explain": "Teams that can are in a fundamentally different position from teams that cannot."
    },
    {
      "id": "c5_4",
      "m": "m5",
      "l": "m5l2",
      "type": "mc",
      "q": "Why is deploying more frequently usually safer?",
      "options": [
        "Smaller changes are easier to review, diagnose and reverse",
        "Automated tests never fail",
        "Users prefer frequent changes",
        "It reduces cloud cost"
      ],
      "answer": 0,
      "explain": "A quarterly release bundling hundreds of changes is the risky one, even though it feels more controlled."
    },
    {
      "id": "c5_5",
      "m": "m5",
      "l": "m5l2",
      "type": "match",
      "q": "Match each observability signal to what it tells you.",
      "pairs": [
        [
          "Logs",
          "What happened"
        ],
        [
          "Metrics",
          "How much and how fast"
        ],
        [
          "Traces",
          "The path one request took across services"
        ]
      ],
      "explain": "In a system of thirty services, a trace is often the only practical way to find where the time went."
    },
    {
      "id": "c5_6",
      "m": "m5",
      "l": "m5l2",
      "type": "tf",
      "q": "'You build it, you run it' works mainly as an incentive, not just a staffing model.",
      "answer": true,
      "explain": "Engineers woken at 3am by their own alerts build systems that do not wake them."
    },
    {
      "id": "c5_7",
      "m": "m5",
      "l": "m5l3",
      "type": "mc",
      "q": "When is cloud most likely to be the wrong answer on cost?",
      "options": [
        "Spiky, unpredictable workloads",
        "Steady, predictable, large-scale load",
        "Short-lived experiments",
        "Seasonal retail traffic"
      ],
      "answer": 1,
      "explain": "Elasticity is worth nothing if demand never varies — you are paying a premium for flexibility you do not use."
    },
    {
      "id": "c5_8",
      "m": "m5",
      "l": "m5l3",
      "type": "mc",
      "q": "Why is lift-and-shift the most common disappointment?",
      "options": [
        "It is technically impossible",
        "You keep every inefficiency, add a rental premium, and gain little, since benefits come from elasticity and managed services",
        "Providers forbid it",
        "It always breaks compliance"
      ],
      "answer": 1,
      "explain": "The benefits come from redesign, not from changing location."
    },
    {
      "id": "c5_9",
      "m": "m5",
      "l": "m5l3",
      "type": "multi",
      "q": "What must a regulated institution add on top of ordinary cloud practice? (Select all that apply)",
      "options": [
        "A documented and tested exit plan",
        "Management of concentration risk across providers",
        "Contractual right to audit for the firm and its regulator",
        "A second provider in every case"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Multi-cloud is not mandated. The other three are standard supervisory expectations for outsourcing."
    },
    {
      "id": "c5_10",
      "m": "m5",
      "l": "m5l3",
      "type": "mc",
      "q": "Why is cloud adoption slower in a bank than the technology alone implies?",
      "options": [
        "Banks lack engineers",
        "Cloud is outsourcing, and brings resilience, exit and concentration obligations with it",
        "Providers refuse to serve banks",
        "Regulators ban managed services"
      ],
      "answer": 1,
      "explain": "The constraint is rarely engineering; it is the supervisory framework around outsourcing."
    }
  ],
  "glossary": [
    {
      "t": "Cloud computing",
      "l": "m1l1",
      "d": "Renting computing resources in someone else's data centre, on demand and by the minute, over the internet."
    },
    {
      "t": "Elasticity",
      "l": "m1l1",
      "d": "The ability to increase and decrease capacity as demand changes — the property that makes renting cheaper than owning."
    },
    {
      "t": "IaaS",
      "l": "m1l2",
      "d": "Infrastructure as a service: renting raw virtual machines, storage and networking, with everything above them your responsibility."
    },
    {
      "t": "PaaS",
      "l": "m1l2",
      "d": "Platform as a service: you supply the application, the provider runs the machinery beneath it."
    },
    {
      "t": "SaaS",
      "l": "m1l2",
      "d": "Software as a service: finished software you simply use, managing only your data and users."
    },
    {
      "t": "Region",
      "l": "m1l3",
      "d": "A geographic location where a provider operates, chosen for latency, data residency law or price."
    },
    {
      "t": "Availability zone",
      "l": "m1l3",
      "d": "A physically separate data centre within a region, isolated enough that one failure does not take out another."
    },
    {
      "t": "Virtual machine",
      "l": "m2l1",
      "d": "A whole virtualised computer you manage and patch yourself, billed for as long as it exists."
    },
    {
      "t": "Container",
      "l": "m2l1",
      "d": "An application packaged with its dependencies, sharing the host operating system — small, fast to start, and identical everywhere."
    },
    {
      "t": "Kubernetes",
      "l": "m2l1",
      "d": "The standard system for orchestrating containers across many machines."
    },
    {
      "t": "Serverless",
      "l": "m2l1",
      "d": "Running a function on demand, billed only for the time it executes, with no machine to manage."
    },
    {
      "t": "Object storage",
      "l": "m2l2",
      "d": "Cheap, effectively unlimited storage of whole files with metadata, retrieved over the network — right for images, backups and logs."
    },
    {
      "t": "Block storage",
      "l": "m2l2",
      "d": "A virtual disk attached to one machine, behaving like a hard drive — where databases and operating systems live."
    },
    {
      "t": "Managed database",
      "l": "m2l2",
      "d": "A database where the provider handles patching, backups, replication and failover."
    },
    {
      "t": "Virtual private cloud",
      "l": "m2l3",
      "d": "Your own isolated network within a provider, divided into public and private subnets."
    },
    {
      "t": "Private subnet",
      "l": "m2l3",
      "d": "A network segment unreachable from the internet, where databases and internal systems belong."
    },
    {
      "t": "Security group",
      "l": "m2l3",
      "d": "A default-deny firewall rule set attached to a resource, controlling what may reach it."
    },
    {
      "t": "Load balancer",
      "l": "m2l3",
      "d": "A component distributing traffic across machines and health-checking them, so failures and replacements go unnoticed."
    },
    {
      "t": "CDN",
      "l": "m2l3",
      "d": "A content delivery network caching static content near users, cutting latency, origin load and often cost."
    },
    {
      "t": "Least privilege",
      "l": "m3l1",
      "d": "Granting only the permissions actually needed — universally recommended, widely ignored, because broad permissions work immediately."
    },
    {
      "t": "Role",
      "l": "m3l1",
      "d": "An identity a machine assumes to receive short-lived credentials automatically, avoiding long-lived keys that leak."
    },
    {
      "t": "Shared responsibility model",
      "l": "m3l2",
      "d": "The division whereby the provider secures the cloud and the customer secures what they put in it."
    },
    {
      "t": "Redundancy",
      "l": "m3l3",
      "d": "Running more than one of everything across zones so a component failure is invisible to users."
    },
    {
      "t": "RPO",
      "l": "m3l3",
      "d": "Recovery point objective — how much data, measured in time, you can afford to lose."
    },
    {
      "t": "RTO",
      "l": "m3l3",
      "d": "Recovery time objective — how long you can afford to be unavailable."
    },
    {
      "t": "Blast radius",
      "l": "m3l3",
      "d": "How much one failure or mistake can take out; limited most effectively by separating environments into different accounts."
    },
    {
      "t": "Egress",
      "l": "m4l1",
      "d": "Data leaving a provider, charged per gigabyte — shaping architecture and forming a real component of the cost of leaving."
    },
    {
      "t": "FinOps",
      "l": "m4l2",
      "d": "The practice of making cloud cost visible and attributable to the engineers who create it."
    },
    {
      "t": "Tagging",
      "l": "m4l2",
      "d": "Labelling resources with team, project and environment so a bill can be attributed to an owner."
    },
    {
      "t": "Right-sizing",
      "l": "m4l2",
      "d": "Reducing over-provisioned resources to what is actually needed."
    },
    {
      "t": "Spot capacity",
      "l": "m4l2",
      "d": "Spare provider capacity at a steep discount that can be reclaimed at short notice — suited to interruptible batch work."
    },
    {
      "t": "Data gravity",
      "l": "m4l3",
      "d": "The tendency of applications to gather around large data volumes, which are expensive and slow to move."
    },
    {
      "t": "Lock-in",
      "l": "m4l3",
      "d": "The cost of switching provider, arising mainly from managed services, data gravity, skills and commitments."
    },
    {
      "t": "Infrastructure as code",
      "l": "m5l1",
      "d": "Defining infrastructure in version-controlled files so environments are reproducible, auditable and reviewable."
    },
    {
      "t": "Configuration drift",
      "l": "m5l1",
      "d": "The divergence between an environment and its definition caused by undocumented manual changes."
    },
    {
      "t": "CI/CD",
      "l": "m5l2",
      "d": "Continuous integration and delivery: automatically building and testing every change, then deploying it."
    },
    {
      "t": "Observability",
      "l": "m5l2",
      "d": "Understanding a running system through logs, metrics and traces."
    },
    {
      "t": "Lift and shift",
      "l": "m5l3",
      "d": "Moving systems to cloud unchanged — which keeps the inefficiencies, adds the rental premium and captures few of the benefits."
    },
    {
      "t": "Concentration risk",
      "l": "m5l3",
      "d": "The supervisory concern that much of the financial system depends on a very small number of cloud providers."
    },
    {
      "t": "Exit plan",
      "l": "m5l3",
      "d": "A documented and tested ability to leave a provider, expected of regulated firms treating cloud as outsourcing."
    }
  ]
}
);
