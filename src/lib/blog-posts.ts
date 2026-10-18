export type BlogSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  links?: {
    label: string;
    description: string;
    href: string;
    note?: string;
  }[];
  closingStatement?: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  seoTitle?: string;
  socialSharingTitle?: string;
  socialSharingDescription?: string;
  heroImage?: {
    src: string;
    alt: string;
  };
  category: string;
  dateLabel: string;
  author: string;
  excerpt: string;
  status: string;
  updateNumber?: string;
  intro?: string[];
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
    title: "ERS Weekly Update: Release Validation and the Move Toward AWS",
    seoTitle:
      "ERS Weekly Update: Release Validation and AWS Migration | Wanky Technologies",
    socialSharingTitle:
      "ERS isn’t launched yet, and here’s the work that decides when it can be.",
    socialSharingDescription:
      "A founder’s honest weekly update on ERS release validation and the migration of its hosting toward AWS.",
    category: "Weekly update",
    dateLabel: "18 October 2026",
    author: "Wanky Technologies",
    excerpt:
      "ERS is still in release validation. This week, Wanky shares why the app’s infrastructure is moving toward AWS and what that means for reliability before launch.",
    status: "Published",
    updateNumber: "Week 39",
    intro: [
      "ERS is not launched yet. This week’s update is about why, and about the work that decides when it can be.",
      "ERS, the Errand Runners System, connects people who need errands done with runners who can do them. Our priority right now is release validation: making the mobile app installable, functional, and reliable before it reaches production. Launching quickly is easy. Launching something people can depend on is the actual job.",
    ],
    sections: [
      {
        heading: "Where ERS stands",
        paragraphs: [
          "ERS is in release validation. That means the work is less about adding features and more about confirming that what exists behaves correctly under real conditions: installing, signing in, creating and completing an errand, and handling things when they go wrong.",
        ],
      },
      {
        heading: "The infrastructure shift",
        paragraphs: [
          "The move toward AWS for ERS deployment and hosting has started. It is ongoing, and we are not describing it as complete.",
          "Hosting is a decision you live with. Moving it means revisiting infrastructure, configuration, security, monitoring, and connectivity, then validating that the release still behaves as it should afterwards. None of that is visible to a user, but all of it affects whether the product holds up.",
        ],
      },
      {
        heading: "What this means for timing",
        paragraphs: [
          "This is additional engineering, and it affects launch timing. No launch date is confirmed, and we would rather say that plainly than offer a date we can’t stand behind.",
        ],
      },
      {
        heading: "What we’re learning",
        paragraphs: [
          "Reliability is a property you earn through validation, not something you declare. Every layer you change is a layer you have to prove again. That slows things down, and it is the price of shipping something dependable.",
        ],
      },
      {
        heading: "The bigger picture",
        paragraphs: [
          "ERS is our priority product, but it sits inside a wider ambition: a connected technology platform spanning software, AI, cloud infrastructure, and applications, with operating systems and devices as a long-term vision. Wanky OS is a direction we are working toward, not a product you can use today. ERS reaching production well is the foundation for everything else.",
        ],
      },
      {
        heading: "What comes next",
        paragraphs: [
          "We continue the validation work, and we’ll share progress as it is verified. We will not promise dates we haven’t confirmed.",
        ],
      },
      {
        heading: "Follow along",
        paragraphs: [],
        links: [
          {
            label: "Subscribe to the Wanky newsletter",
            description: "for engineering notes and updates",
            href: "https://wankysoftware.com/blog",
            note: "(the signup form is at the bottom of the page).",
          },
          {
            label: "Join the ERS waitlist",
            description: "to be among the people interested in using ERS in Lagos",
            href: "https://ers.wankysoftware.com",
          },
        ],
        bullets: [
          "Joining the waitlist registers your interest. It does not guarantee early access.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "Building Wanky is a series of small, verified steps. This week’s step was foundational, and it won’t make headlines. It does make ERS more likely to work when you need it.",
        ],
        closingStatement: "Slow motion is better than no motion.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}