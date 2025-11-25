import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, signal, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Interface to structure the project data
interface Project {
  name: string;
  subtitle: string;
  description: string;
  points: string[];
  color: string; // Tailwind color prefix (e.g., 'sky', 'indigo')
  iconPath: string; // SVG path for the icon (using simplified Lucide paths)
  prodLink: string;
}

// Simplified paths for Lucide icons used in the portfolio
const ICON_PATHS = {
  // Skills Icons
  code: '<polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline>',
  terminal: '<path d="M4 17v-2a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v2"/><path d="M10 12l2 4l2-4"/><circle cx="12" cy="7" r="2"/>',
  gitBranch: '<line x1="6" x2="6" y1="3" y2="15"></line><circle cx="18" cy="6" r="3"></circle><circle cx="6" cy="18" r="3"></circle><path d="M18 9c-7.3 0-10.3 7-12 7"></path>',
  // Project Icons
  search: '<circle cx="11" cy="11" r="8"></circle><line x1="21" x2="16.65" y1="21" y2="16.65"></line>',
  trendingUp: '<polyline points="17 1 21 5 17 9"></polyline><path d="M21 5H3"></path>',
  briefcase: '<rect x="3" y="7" width="18" height="13" rx="2" ry="2"></rect><path d="M18.8 7V5.5A3.5 3.5 0 0 0 15.3 2H8.7A3.5 3.5 0 0 0 5.2 5.5V7"></path>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  package: '<path d="M21 10a2 2 0 0 0-2-2h-3l2 4h-4l2 4h-4l2 4h-4l-2-4H3a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V10z"></path>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
  // Contact Icon
  feather: '<path d="M20.25 15.75L18 18M18 18L15.75 20.25M18 18L5.25 5.25A4.5 4.5 0 0 1 5.25 5.25"></path>',
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  // Define project data using Angular Signal for structure
  projects = signal<Project[]>([
    {
      name: 'BATCHLEADS',
      subtitle: 'US Real Estate Platform (Angular, NgRx, Performance Optimization)',
      description: 'Intuitive online experience for property browsing and management, optimized for high-volume data.',
      points: [
        'Implemented interactive maps with Pendo icons and infinite scrolling for seamless, real-time property display.',
        'Engineered a platform featuring advanced search filters, dynamic content loading, and comprehensive lead generation/CRM tools.',
        'Focused heavily on application performance and responsive design to ensure a user-friendly experience across all devices.',
      ],
      color: 'sky',
      iconPath: ICON_PATHS.search,
      prodLink: 'https://batchleads.io/'
    },
    {
      name: 'VERITIC',
      subtitle: 'Sales Forecasting Dashboard (Data-Driven Insights & AUTHO)',
      description: 'An advanced platform providing comprehensive sales forecasting and efficient user management.',
      points: [
        'Displays real-time sales data and accurate forecasting insights on an intuitive dashboard for data-driven decisions.',
        'Integrated secure user authentication and access management using AUTHO for streamlined and safe user logins.',
        'Ensures robust security and controlled access to sensitive sales performance metrics.',
      ],
      color: 'indigo',
      iconPath: ICON_PATHS.trendingUp,
      prodLink: 'https://www.veritic.com/'
    },
    {
      name: 'CLICKSEER',
      subtitle: 'Aesthetic Clinic Admin Panel (Comprehensive Workflow Management)',
      description: 'Admin panel for Shumailas Aesthetic & Laser Clinics, consolidating all clinic operations into a single efficient suite.',
      points: [
        'Key modules included Appointment Calendar, integrated Chat System, Waiver Forms, and Referral Management.',
        'Developed a VOIP module for automated appointment reminders and customer support calls, significantly improving customer service.',
        'Implemented Lead Tracking, Sales Registration, and Stock Management systems to support overall business growth.',
      ],
      color: 'purple',
      iconPath: ICON_PATHS.briefcase,
      prodLink: 'https://www.shumailas.com/'
    },
    {
      name: 'TIPOTAPP',
      subtitle: 'SASS Application for Custom Safety App Generation',
      description: 'A Software as a Service (SASS) platform enabling users to generate their own custom safety applications.',
      points: [
        'Engineered the core SASS framework to allow rapid deployment and customization of client-specific safety tools.',
        'Designed the UI for a seamless creation workflow, abstracting complex configurations into a simple user interface.',
        'Demonstrates expertise in developing scalable, multi-tenant application architectures.',
      ],
      color: 'yellow',
      iconPath: ICON_PATHS.zap,
      prodLink: 'https://tipotapp.com/'
    },
    {
      name: 'FREEFUSE',
      subtitle: 'Interactive Video Training Platform (Angular & D3.js Visualization)',
      description: 'A unique video creation application tailored for client/student education, utilizing advanced data visualization techniques.',
      points: [
        'Leveraged D3.js to design an interactive tree structure for sequential video playback along dynamically created pathways.',
        'Built an engaging and structured delivery system for internal, student, and community training content.',
        'Demonstrates strong ability to integrate complex JavaScript libraries with Angular for specialized UI requirements.',
      ],
      color: 'teal',
      iconPath: ICON_PATHS.code,
      prodLink: 'https://freefuse.com/'
    },
    {
      name: 'PORTEFRIO',
      subtitle: 'Wholesale Distribution Service (Foodservice and Retail)',
      description: 'A platform supporting a wholesale distributor specializing in Foodservice and Retail distribution in Rio de Janeiro.',
      points: [
        'Developed front-end components for managing complex distribution logic, inventory tracking, and client ordering.',
        'Focused on creating reliable, high-responsibility interfaces for essential business logistics.',
        'Ensured high performance and usability for B2B transactions and internal logistics teams.',
      ],
      color: 'orange',
      iconPath: ICON_PATHS.package,
      prodLink: 'https://portefrio.com/'
    },
    {
      name: 'HR SOFT',
      subtitle: 'Job Board & HR Connection Platform (Similar to Naukri.com)',
      description: 'A dynamic platform designed to connect job seekers and HR departments, functioning as a comprehensive job board.',
      points: [
        'Engineered components for user registration, job posting, advanced search, and application tracking systems.',
        'Designed scalable data structures to handle high volumes of resumes, job listings, and user interactions.',
        'Ensured a responsive and intuitive interface for both recruiters and candidates.',
      ],
      color: 'pink',
      iconPath: ICON_PATHS.users,
      prodLink: 'https://hrsoft.com/'
    },
    {
      name: 'SoftClinicGenx',
      subtitle: 'Healthcare Management Software (.NET Core & PostgreSQL)',
      description: 'A comprehensive hospital/clinic management system streamlining operations from patient intake to billing.',
      points: [
        'Built and maintained the .NET Core Web API with separate PostgreSQL databases, demonstrating full-stack proficiency.',
        'Implemented robust secure authentication and authorization using JWT tokens.',
        'Designed efficient schemas and wrote optimized queries using Entity Framework Core for patient data (EMR, prescriptions).',
      ],
      color: 'red',
      iconPath: ICON_PATHS.shield,
      prodLink: 'https://www.softclinicsoftware.com/'
    },
  ]);

  constructor(private sanitizer: DomSanitizer) {} // <-- Inject DomSanitizer

    ngOnInit() {
        // Sanitize the paths immediately when the component initializes
        this.projects.update(currentProjects => 
            currentProjects.map(project => ({
                ...project,
                safeIconPath: this.sanitizer.bypassSecurityTrustHtml(project.iconPath)
            }))
        );
    }

}