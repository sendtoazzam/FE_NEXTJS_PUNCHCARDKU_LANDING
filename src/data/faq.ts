import { IFAQ } from "@/types";
import { siteDetails } from "./siteDetails";

export const faqs: IFAQ[] = [
    {
        question: `Is ${siteDetails.siteName} secure for employee data?`,
        answer: 'Yes. Punchcardku is built with secure access controls and protected data handling to keep attendance, leave, and claim records safe.',
    },
    {
        question: `Can employees and managers use ${siteDetails.siteName} on different devices?`,
        answer: 'Yes. Punchcardku works across mobile and web so teams can clock in, submit requests, and approve records from anywhere.',
    },
    {
        question: 'Can Punchcardku handle leave and claim approvals?',
        answer: 'Yes. You can set up approval flows so leave and claim requests are routed to the right person with clear status tracking.'
    },
    {
        question: 'Can I use Punchcardku attendance data for payroll processing?',
        answer: 'Yes. Attendance and overtime records are organized for payroll preparation, reporting, and month-end review.',
    },
    {
        question: 'What if my team needs onboarding or support?',
        answer: 'Our support team can help you with setup, onboarding, and day-to-day usage so your organization can adopt Punchcardku smoothly.'
    }
];