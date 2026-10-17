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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}