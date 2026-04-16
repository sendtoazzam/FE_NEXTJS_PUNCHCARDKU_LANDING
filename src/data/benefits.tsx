import { FiBarChart2, FiBriefcase, FiDollarSign, FiLock, FiPieChart, FiShield, FiTarget, FiTrendingUp, FiUser } from "react-icons/fi";

import { IBenefit } from "@/types"

export const benefits: IBenefit[] = [
    {
        title: "Smart Attendance Tracking",
        description: "Track daily clock-ins, late arrivals, overtime, and work hours in one place. Punchcardku helps teams record attendance accurately and in real time.",
        bullets: [
            {
                title: "Real-Time Clock-In Data",
                description: "Capture attendance instantly so HR and managers always see the latest status.",
                icon: <FiBarChart2 size={26} />
            },
            {
                title: "Shift & Policy Ready",
                description: "Support your company rules for shifts, lateness, overtime, and attendance compliance.",
                icon: <FiTarget size={26} />
            },
            {
                title: "Actionable Insights",
                description: "Turn attendance records into clear reports for faster planning and decisions.",
                icon: <FiTrendingUp size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
    {
        title: "Leave & Claim Workflows",
        description: "Manage leave and expense claims from request to approval with a smooth, transparent workflow for both employees and managers.",
        bullets: [
            {
                title: "Simple Application Process",
                description: "Employees can submit leave or claims quickly with clear status updates.",
                icon: <FiDollarSign size={26} />
            },
            {
                title: "Approval Flow by Role",
                description: "Route requests to the right approver based on team structure and policy.",
                icon: <FiBriefcase size={26} />
            },
            {
                title: "Centralized History",
                description: "Keep all leave and claim records organized for audits, payroll, and reference.",
                icon: <FiPieChart size={26} />
            }
        ],
        imageSrc: "/images/mockup-2.webp"
    },
    {
        title: "Secure HR Data Management",
        description: "Protect employee and attendance information with secure access controls and reliable data handling across your organization.",
        bullets: [
            {
                title: "Protected Data Access",
                description: "Control who can view or manage attendance, leave, and claims data.",
                icon: <FiLock size={26} />
            },
            {
                title: "Role-Based Permissions",
                description: "Ensure each user only accesses the tools and records relevant to their role.",
                icon: <FiUser size={26} />
            },
            {
                title: "Reliable Audit Trail",
                description: "Track key actions and updates for better accountability and compliance.",
                icon: <FiShield size={26} />
            }
        ],
        imageSrc: "/images/mockup-1.webp"
    },
]