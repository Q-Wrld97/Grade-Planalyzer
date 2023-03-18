(03/17/2023)
GUI:
     General:
          + Created 'Landing Page' prior to Home Page
          + Created 'Help' Form
          + Created 'Report Issue' Form
          + Created 'Settings' Form

     Home/About Us/Log In/Sign up/Forgot Password Pages:
          - Removed 'Help' pathing from Navigation Bar

     Log In/Sign Up/Forgot Password Pages:
          + Added 'Back' button routing

     Dashboard/Help/Report Issue/Settings Pages:
          - Removed 'About Us' pathing from Navigation Bar

     Dashboard:
          + Added semester dropdown selector to dashboard
          - For each Dashboard category, the appropriate data will now display in the designated window
          - Implemented base tile framework for weather API 
          - Weather API will specify its forecast based upon user's location coordinates

     Course Form:
          + Added 'Semester' (Season+Year) input fields
          - Removed 'Final' and 'Midterm' options (now combined into 'Exams' option)
          + Added dynamic field generation for weighted categories based upon user input for equal weighting
          + The Date Selection Page will now dynamically display each deliverable field from previous page with a corresponding date-picker
      		(Only the currently selected date picker is visible at any given time)

Milestone Documentation:
     Use Case Scenarios:
          + Added Logout Case

     Account Creation Procedure:
          - Clarified deletion process for Temporary Accounts to initiate upon login attempt if user's account satisfies checks for both: 
               a) Unverified
               b) 24 hours have elapsed since initial creation
     
     Data Entry Procedure:
          + Added 'Semester' section
          - Updated 'Weighted Categories' section to include logic steps for equal weighting

     Security Requirements:
          - Removed sentence fragment in initial paragraph.
          + Added logic checks for Dashboard, Course Form, Help, Report Issue, Settings Pages to redirect to Home Page if user is not authenticated.