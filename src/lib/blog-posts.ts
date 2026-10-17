export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  dateLabel: string;
  author: string;
  excerpt: string;
  status: string;
  updateNumber?: string;
  sections: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "building-ers-for-what-comes-next-our-move-toward-aws",
    title: "Building ERS for What Comes Next: Our Move Toward AWS",
    category: "Engineering",
    dateLabel: "17 October 2026",
    author: "Wanky Technologies",
    excerpt:
      "ERS has started migrating toward AWS for deployment and hosting. Here is why the work matters, what it means for launch timing, and what remains to be validated.",
    status: "Published",
    sections: [
      {
        heading: "What AWS and cloud hosting mean",
        paragraphs: [
          "Amazon Web Services (AWS) is a cloud computing platform. Cloud hosting means an application runs on computing and related infrastructure provided over a network, rather than relying only on equipment operated directly by the application owner.",
          "Choosing a cloud platform does not by itself make an application ready for production. The environment still needs appropriate configuration, security controls, monitoring, connectivity, and a release process that has been tested.",
        ],
      },
      {
        heading: "Why ERS is moving toward AWS",
        paragraphs: [
          "We have started migrating ERS toward AWS to establish its deployment and hosting foundation for the next stage of the product. The migration is in progress; this is not an announcement that the move is complete or that production hosting is ready.",
          "The work is focused on preparing and validating the environment ERS will need to run in. We are not announcing a final architecture or specific AWS services while that work remains underway.",
        ],
      },
      {
        heading: "The engineering behind a migration",
        paragraphs: [
          "A hosting change affects more than where application files run. The surrounding infrastructure and configuration must be understood and checked together with access and security, monitoring, connectivity, and the steps used to release the product.",
          "These areas depend on one another. A successful build alone cannot establish that the deployed application can communicate as intended, that access is appropriately controlled, or that problems will be visible after release.",
        ],
      },
      {
        heading: "Why this affects the launch timeline",
        paragraphs: [
          "The migration adds engineering and validation work to the path toward launch. We are accounting for that work rather than treating a hosting change as complete as soon as an initial deployment is possible.",
          "Launch timing is affected, and we do not have a confirmed launch date to share. We will communicate timing only when it is supported by the readiness work.",
        ],
      },
      {
        heading: "What still needs validation",
        paragraphs: [
          "Before production, the migration needs validation across the infrastructure and configuration, security and access, monitoring, connectivity, and release process required by ERS. The deployed product also needs appropriate end-to-end checks in its intended environment.",
          "Production readiness and completion of the migration remain unconfirmed. We will provide an update when those checks give us a reliable basis for the next step.",
        ],
      },
    ],
  },
  {
    slug: "ers-weekly-update-aws-migration",
    title: "ERS Weekly Update: Week 39 — AWS Migration",
    category: "Weekly update",
    dateLabel: "18 October 2026",
    author: "Wanky Technologies",
    excerpt:
      "The ERS migration toward AWS has started. The deployment and hosting work is ongoing, and production readiness and launch timing remain under validation.",
    status: "Published",
    updateNumber: "Week 39",
    sections: [
      {
        heading: "ERS migration status",
        paragraphs: [
          "The move toward AWS for ERS deployment and hosting has started. Work is ongoing, and the migration is not being described as complete.",
          "Infrastructure, configuration, security, monitoring, connectivity, and release validation still need attention before production readiness can be confirmed. This additional engineering affects launch timing; no launch date is confirmed.",
          "Publication date: 18 October 2026. Weekly update: Week 39.",
        ],
      },
    ],
  },
  {
    slug: "building-toward-wanky-os",
    title: "Building Toward Wanky OS: The Long-Term Vision for a Connected Technology Ecosystem",
    category: "Product vision",
    dateLabel: "17 October 2026",
    author: "Wanky Technologies",
    excerpt:
      "Wanky OS is a long-term direction for a more connected Wanky technology ecosystem. We explore the problem we want to solve, the systems around the vision, and why we are building it in stages.",
    status: "Published",
    sections: [
      {
        heading: "An operating system is more than a screen",
        paragraphs: [
          "When we talk about Wanky OS, we are describing a long-term platform direction—not announcing a finished operating system. The vision is to make the experience of using Wanky products and services feel more coherent over time, with clear identity, useful workflows, and dependable foundations.",
          "That ambition requires more than a visual interface. It depends on careful product boundaries, security, account management, reliable services, documentation, and the discipline to build and validate each part before presenting it as available.",
        ],
      },
      {
        heading: "A connected ecosystem, built in stages",
        paragraphs: [
          "Wanky Technologies is developing products for different needs. Wanky Cloud represents our direction for infrastructure and operational services. Wanky AI explores AI-enabled experiences. Wanky Protect is a separate security-focused direction. Wanky Account is a proposed identity and account layer. ERS and Wanky Classroom address specific user and operational needs.",
          "These names describe parts of the broader ecosystem vision; they should not be read as a promise that all products are already integrated, available, or operating as one platform. Any future connection will need a clear user benefit, appropriate access controls, and working integrations that have been tested.",
        ],
      },
      {
        heading: "What Wanky OS could make possible",
        paragraphs: [
          "Over time, the goal is to explore a more consistent way to discover, access, and move between Wanky experiences. That could include a common design language, clearer account experiences, shared documentation, and workflows that feel familiar across products.",
          "We will treat these as design goals until the relevant capabilities have been implemented and verified. We will not describe a planned feature as available merely because it fits the vision.",
        ],
      },
      {
        heading: "Building with practical tools and internal experiments",
        paragraphs: [
          "Our approach is to use practical engineering tools, evaluate AI-assisted development where it is useful, and maintain internal builds that help us learn before making broad public promises. Google AI tooling, including the model and development options being evaluated for this work, may support parts of that process; the choice of a development tool does not itself determine what Wanky OS can do.",
          "The work still depends on architecture, implementation, testing, security review, and feedback. We will make technology choices based on what helps us build responsibly, not simply on what is new.",
        ],
      },
      {
        heading: "What we are focusing on now",
        paragraphs: [
          "The immediate priority is to clarify the platform's scope, document its architecture and principles, and build from working foundations rather than attempting to deliver an entire ecosystem at once. Each product must remain useful on its own while any shared platform concepts are evaluated.",
          "We will share concrete progress when there is something specific to demonstrate: a documented decision, a working prototype, a validated integration, or a release that people can actually use.",
        ],
      },
      {
        heading: "A long-term commitment, not a finished-product claim",
        paragraphs: [
          "Wanky OS is in development. The page and this article describe direction and intent, not a shipping operating system or a guarantee of future features or dates.",
          "We are building toward a connected technology ecosystem one validated step at a time. Our responsibility is to make the ambition clear, keep the current status honest, and let working software—not language alone—show how the vision is progressing.",
        ],
      },
    ],
  },
  {
    slug: "introducing-wanky-protect",
    title: "Introducing Wanky Protect: Building Security Into the Wanky Ecosystem",
    category: "Security and engineering",
    dateLabel: "17 October 2026",
    author: "Wanky Technologies",
    excerpt:
      "Wanky Protect is our security-focused product direction: a commitment to make privacy, access control, and responsible engineering part of how Wanky products are designed. Here is what that means—and what is still ahead.",
    status: "Published",
    sections: [
      {
        heading: "Security is a foundation, not a feature added later",
        paragraphs: [
          "As software becomes part of everyday work, communication, and business operations, protecting accounts, data, and access becomes a core engineering responsibility. Security cannot be reduced to a badge or a promise on a product page. It has to be reflected in design decisions, implementation, testing, and ongoing maintenance.",
          "Wanky Protect is the name for our security-focused direction within the wider Wanky ecosystem. It represents an intention to approach protection deliberately, rather than treating it as a final checklist after the main product has been built.",
        ],
      },
      {
        heading: "What Wanky Protect is intended to focus on",
        paragraphs: [
          "Our intended areas of focus include account and access security, privacy-conscious handling of data, protection of application secrets, secure development practices, and clear communication about product limitations. The exact scope and delivery sequence will be defined through product and engineering work.",
          "These are areas of focus, not a claim that a single Wanky Protect product currently provides every capability. Specific features will be described as available only after they have been implemented, tested, and documented.",
        ],
        bullets: [
          "Identity and access: give users and services only the permissions they need.",
          "Data privacy: collect and use information responsibly, with clear purposes and appropriate safeguards.",
          "Secure engineering: protect credentials, review changes, test important boundaries, and address vulnerabilities.",
          "Transparency: explain what is protected, what remains limited, and what users should not assume.",
        ],
      },
      {
        heading: "Security across a growing product ecosystem",
        paragraphs: [
          "Wanky Technologies is building products with different purposes, including ERS, Wanky Cloud, Wanky AI, Wanky Classroom, and the longer-term Wanky OS vision. Their security needs will differ, and each product must be secured according to its own architecture, data, users, and risks.",
          "Wanky Protect may eventually provide shared principles, tools, or services where doing so makes sense. That does not mean these products currently share a security layer or that a single integration protects them all. Any common capability must be designed, implemented, and independently validated for its intended use.",
        ],
      },
      {
        heading: "How we intend to approach the work",
        paragraphs: [
          "We intend to build security into the development lifecycle: identify risks early, minimize privileges, keep sensitive credentials out of source code, validate authentication and authorization, review dependencies, and test how systems behave when requests fail or users lack permission.",
          "Security is also an operational responsibility. As products mature, the work may include monitoring, incident response procedures, vulnerability handling, and clear guidance for users. The measures appropriate to each product will depend on its actual design and deployment.",
        ],
      },
      {
        heading: "What Wanky Protect does not claim today",
        paragraphs: [
          "Wanky Protect is currently a concept and planning direction, not an announcement of a generally available security product. We are not claiming that it provides antivirus protection, endpoint monitoring, a password manager, threat detection, compliance certification, or a guarantee against attacks.",
          "Those capabilities should never be inferred from the name. If and when a specific capability is built, we will explain its purpose, its limitations, its availability, and the evidence behind any security claims.",
        ],
      },
      {
        heading: "Trust is earned through evidence",
        paragraphs: [
          "A credible security effort depends on consistent engineering and honest communication. A policy is not a substitute for implementation, a successful test is not proof of perfect security, and no product can promise to eliminate every risk.",
          "Our aim is to make security a visible, practical part of how Wanky products are built. We will share concrete progress when there is a working control, a documented process, or a verified capability to discuss.",
        ],
      },
      {
        heading: "A direction we intend to build responsibly",
        paragraphs: [
          "Wanky Protect is in the concept and planning stage. This article describes our intended approach and does not represent a launch announcement or a guarantee of future features.",
          "As the Wanky ecosystem develops, we want security to grow with it: grounded in the needs of each product, clear about its limits, and supported by work that can be examined rather than promises that cannot yet be demonstrated.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
