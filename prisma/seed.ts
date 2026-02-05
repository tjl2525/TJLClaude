import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clean existing data
  await prisma.activity.deleteMany();
  await prisma.card.deleteMany();
  await prisma.column.deleteMany();
  await prisma.board.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.label.deleteMany();

  // Create labels
  const labelHot = await prisma.label.create({
    data: { name: "Hot Lead", color: "#EF4444" },
  });
  const labelVIP = await prisma.label.create({
    data: { name: "VIP", color: "#8B5CF6" },
  });
  const labelNewClient = await prisma.label.create({
    data: { name: "New Client", color: "#10B981" },
  });
  const labelFollowUp = await prisma.label.create({
    data: { name: "Follow Up", color: "#F59E0B" },
  });

  // Create contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: "Sarah",
        lastName: "Johnson",
        email: "sarah.johnson@techcorp.com",
        phone: "(555) 123-4567",
        company: "TechCorp Inc.",
        jobTitle: "VP of Engineering",
        status: "active",
        notes: "Met at SaaS Conference 2025. Very interested in our enterprise plan.",
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Michael",
        lastName: "Chen",
        email: "m.chen@innovate.io",
        phone: "(555) 234-5678",
        company: "Innovate.io",
        jobTitle: "CTO",
        status: "lead",
        notes: "Referred by Sarah Johnson. Looking for a solution for their 50-person team.",
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Emily",
        lastName: "Rodriguez",
        email: "emily.r@greenfield.com",
        phone: "(555) 345-6789",
        company: "Greenfield Solutions",
        jobTitle: "Product Manager",
        status: "active",
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "James",
        lastName: "Wilson",
        email: "jwilson@dataflow.co",
        phone: "(555) 456-7890",
        company: "DataFlow Co",
        jobTitle: "Director of Operations",
        status: "active",
        notes: "Current customer. Interested in upgrading their plan.",
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Lisa",
        lastName: "Park",
        email: "lisa.park@startup.com",
        phone: "(555) 567-8901",
        company: "NextGen Startup",
        jobTitle: "CEO",
        status: "lead",
      },
    }),
  ]);

  // Create Sales Pipeline Board
  const salesBoard = await prisma.board.create({
    data: {
      name: "Sales Pipeline",
      description: "Track deals from lead to close",
      color: "#3B82F6",
      columns: {
        create: [
          {
            name: "New Leads",
            position: 0,
            color: "#6B7280",
            cards: {
              create: [
                {
                  title: "TechCorp Enterprise Deal",
                  description: "50-seat enterprise license. Sarah is the decision maker.",
                  position: 0,
                  priority: "high",
                  value: 75000,
                  contactId: contacts[0].id,
                  labels: { connect: [{ id: labelHot.id }, { id: labelVIP.id }] },
                },
                {
                  title: "NextGen Startup - Starter Plan",
                  description: "Small team, looking for basic CRM features.",
                  position: 1,
                  priority: "medium",
                  value: 5000,
                  contactId: contacts[4].id,
                  labels: { connect: [{ id: labelNewClient.id }] },
                },
              ],
            },
          },
          {
            name: "Contacted",
            position: 1,
            color: "#3B82F6",
            cards: {
              create: [
                {
                  title: "Innovate.io Team License",
                  description: "50-person team. Need demo scheduled for next week.",
                  position: 0,
                  priority: "high",
                  value: 45000,
                  contactId: contacts[1].id,
                  labels: { connect: [{ id: labelFollowUp.id }] },
                },
              ],
            },
          },
          {
            name: "Proposal Sent",
            position: 2,
            color: "#8B5CF6",
            cards: {
              create: [
                {
                  title: "Greenfield Solutions Upgrade",
                  description: "Upgrading from basic to pro plan. Proposal sent last Tuesday.",
                  position: 0,
                  priority: "medium",
                  value: 24000,
                  contactId: contacts[2].id,
                },
              ],
            },
          },
          {
            name: "Negotiation",
            position: 3,
            color: "#F59E0B",
            cards: {
              create: [
                {
                  title: "DataFlow Operations Suite",
                  description: "Custom integration needed. Negotiating enterprise terms.",
                  position: 0,
                  priority: "urgent",
                  value: 120000,
                  contactId: contacts[3].id,
                  labels: { connect: [{ id: labelVIP.id }, { id: labelHot.id }] },
                },
              ],
            },
          },
          {
            name: "Closed Won",
            position: 4,
            color: "#10B981",
          },
        ],
      },
    },
  });

  // Create Customer Onboarding Board
  await prisma.board.create({
    data: {
      name: "Customer Onboarding",
      description: "Track new customer setup and training",
      color: "#10B981",
      columns: {
        create: [
          { name: "Welcome", position: 0, color: "#6B7280" },
          { name: "Account Setup", position: 1, color: "#3B82F6" },
          { name: "Training", position: 2, color: "#8B5CF6" },
          { name: "Go Live", position: 3, color: "#F59E0B" },
          { name: "Completed", position: 4, color: "#10B981" },
        ],
      },
    },
  });

  // Create Support Tickets Board
  await prisma.board.create({
    data: {
      name: "Support Tickets",
      description: "Manage customer support requests",
      color: "#EF4444",
      columns: {
        create: [
          { name: "New", position: 0, color: "#EF4444" },
          { name: "In Progress", position: 1, color: "#F59E0B" },
          { name: "Waiting on Customer", position: 2, color: "#6B7280" },
          { name: "Resolved", position: 3, color: "#10B981" },
        ],
      },
    },
  });

  // Add some activities
  const salesColumns = await prisma.column.findMany({
    where: { boardId: salesBoard.id },
    include: { cards: true },
    orderBy: { position: "asc" },
  });

  const allCards = salesColumns.flatMap((col) => col.cards);

  if (allCards.length > 0) {
    await prisma.activity.createMany({
      data: [
        {
          type: "note",
          content: "Initial discovery call completed. Very promising lead.",
          cardId: allCards[0]?.id,
          contactId: contacts[0].id,
        },
        {
          type: "email",
          content: "Sent follow-up email with product brochure and pricing.",
          cardId: allCards[0]?.id,
          contactId: contacts[0].id,
        },
        {
          type: "call",
          content: "Scheduled demo for next Thursday at 2pm EST.",
          cardId: allCards[2]?.id,
          contactId: contacts[1].id,
        },
        {
          type: "meeting",
          content: "On-site presentation to the executive team. Went very well.",
          cardId: allCards[4]?.id,
          contactId: contacts[3].id,
        },
      ],
    });
  }

  console.log("Database seeded successfully!");
  console.log(`Created ${await prisma.board.count()} boards`);
  console.log(`Created ${await prisma.column.count()} columns`);
  console.log(`Created ${await prisma.card.count()} cards`);
  console.log(`Created ${await prisma.contact.count()} contacts`);
  console.log(`Created ${await prisma.label.count()} labels`);
  console.log(`Created ${await prisma.activity.count()} activities`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
