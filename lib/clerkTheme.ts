export const clerkAppearance = {
  variables: {
    colorPrimary: "#E8FC6B", // Lime yellow
    colorSuccess: "#E8FC6B",
    colorDanger: "#ef4444",
    colorWarning: "#f59e0b",
    colorTextOnPrimaryBackground: "#111111",
    colorBackground: "#111111",
    colorInputBackground: "#1a1a1a",
    colorInputText: "#F9F9F9",
    colorText: "#F9F9F9",
    colorTextSecondary: "#A0A0A0",
    colorNeutral: "#525252",
    borderRadius: "1.5rem",
    fontFamily: "var(--font-inter)",
    fontSmoothing: "antialiased",
  },
  elements: {
    // Root container
    rootBox: {
      backgroundColor: "transparent",
    },
    card: {
      backgroundColor: "#1a1a1a",
      border: "1px solid rgba(249, 249, 249, 0.1)",
      borderRadius: "2rem",
      boxShadow: "none",
    },
    // Headers
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "400",
      fontFamily: "var(--font-playfair)",
      color: "#F9F9F9",
    },
    headerSubtitle: {
      color: "#A0A0A0",
      fontSize: "0.875rem",
    },
    // Form elements
    formButtonPrimary: {
      backgroundColor: "#E8FC6B",
      color: "#111111",
      "&:hover": {
        backgroundColor: "rgba(232, 252, 107, 0.9)",
      },
      "&:focus": {
        boxShadow: "0 0 20px rgba(232, 252, 107, 0.3)",
      },
      borderRadius: "9999px",
      fontSize: "0.875rem",
      fontWeight: "600",
      padding: "0.75rem 2rem",
      transition: "all 150ms ease",
    },
    formFieldInput: {
      backgroundColor: "#111111",
      border: "1px solid rgba(249, 249, 249, 0.2)",
      color: "#F9F9F9",
      "&:focus": {
        borderColor: "#E8FC6B",
        boxShadow: "none",
        outline: "none",
      },
      "&::placeholder": {
        color: "#A0A0A0",
      },
      borderRadius: "0.75rem",
      fontSize: "0.875rem",
      padding: "0.75rem 1rem",
      transition: "all 150ms ease",
    },
    formFieldLabel: {
      color: "#F9F9F9",
      fontSize: "0.875rem",
      fontWeight: "500",
      marginBottom: "0.5rem",
    },
    // Social buttons
    socialButtonsBlockButton: {
      backgroundColor: "transparent",
      border: "1px solid rgba(249, 249, 249, 0.2)",
      color: "#F9F9F9",
      "&:hover": {
        borderColor: "#E8FC6B",
        color: "#E8FC6B",
      },
      borderRadius: "9999px",
      fontSize: "0.875rem",
      fontWeight: "500",
      padding: "0.75rem 2rem",
      transition: "all 150ms ease",
    },
    socialButtonsBlockButtonText: {
      color: "#F9F9F9",
    },
    // Divider
    dividerLine: {
      backgroundColor: "rgba(249, 249, 249, 0.1)",
    },
    dividerText: {
      color: "#A0A0A0",
      fontSize: "0.875rem",
    },
    // Links
    footerActionLink: {
      color: "#E8FC6B",
      fontSize: "0.875rem",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    // Alerts
    alert: {
      borderRadius: "0.5rem",
      fontSize: "0.875rem",
    },
    alertText: {
      color: "#ffffff",
    },
    // User button
    userButtonBox: {
      borderRadius: "9999px",
    },
    userButtonTrigger: {
      borderRadius: "9999px",
      "&:focus": {
        boxShadow: "0 0 0 3px rgba(16, 185, 129, 0.5)",
      },
    },
    userButtonPopoverCard: {
      backgroundColor: "#1a1a1a",
      border: "1px solid rgba(249, 249, 249, 0.1)",
      borderRadius: "1.5rem",
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.3)",
    },
    userButtonPopoverActionButton: {
      color: "#F9F9F9",
      "&:hover": {
        backgroundColor: "rgba(232, 252, 107, 0.1)",
        color: "#E8FC6B",
      },
    },
    userButtonPopoverActionButtonText: {
      color: "#F9F9F9",
    },
    userButtonPopoverFooter: {
      borderTop: "1px solid rgba(249, 249, 249, 0.1)",
    },
    // Avatars
    avatarBox: {
      borderRadius: "9999px",
    },
    // Badges
    badge: {
      backgroundColor: "rgba(232, 252, 107, 0.2)",
      color: "#E8FC6B",
      border: "none",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: "500",
      padding: "0.25rem 0.75rem",
    },
    // Buttons
    formResendCodeLink: {
      color: "#E8FC6B",
      fontSize: "0.875rem",
      "&:hover": {
        textDecoration: "underline",
      },
    },
    // Verification code inputs
    otpCodeFieldInput: {
      backgroundColor: "#111111",
      border: "1px solid rgba(249, 249, 249, 0.2)",
      color: "#F9F9F9",
      "&:focus": {
        borderColor: "#E8FC6B",
        boxShadow: "none",
      },
      borderRadius: "0.75rem",
      fontSize: "1.125rem",
      height: "3rem",
      width: "3rem",
      textAlign: "center",
    },
    // Profile sections
    profileSectionTitle: {
      color: "#ffffff",
      fontSize: "1.125rem",
      fontWeight: "600",
    },
    profileSectionContent: {
      color: "#e5e5e5",
    },
    profileSectionPrimaryButton: {
      backgroundColor: "#10b981",
      color: "#ffffff",
      "&:hover": {
        backgroundColor: "#059669",
      },
    },
    // Navbar
    navbar: {
      backgroundColor: "#0a0a0a",
      borderBottom: "1px solid #262626",
    },
    navbarButton: {
      color: "#e5e5e5",
      "&:hover": {
        backgroundColor: "#171717",
      },
    },
    // Tabs
    tabButton: {
      color: "#a3a3a3",
      "&:hover": {
        color: "#e5e5e5",
      },
      "&[data-state='active']": {
        color: "#10b981",
        borderBottomColor: "#10b981",
      },
    },
    // Tables
    tableHead: {
      backgroundColor: "#171717",
      borderBottom: "1px solid #404040",
    },
    tableRow: {
      borderBottom: "1px solid #262626",
      "&:hover": {
        backgroundColor: "#171717",
      },
    },
  },
  layout: {
    socialButtonsPlacement: "bottom",
    socialButtonsVariant: "blockButton",
    showOptionalFields: true,
    helpPageUrl: "/help",
    privacyPageUrl: "/privacy",
    termsPageUrl: "/terms",
  },
};