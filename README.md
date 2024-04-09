**Emergency Waitlist Web Application**

This web application, called the Emergency Waitlist, is designed to assist hospital staff and patients in managing and understanding wait times in the emergency room. It allows staff to administer the waitlist based on the severity of injuries and the length of time patients have been waiting. Patients can sign in with their name and receive an approximate wait time, which is updated as patients are treated.

**Usage**
Admin Perspective:
- Login: Admins can log in using their username and password. If not already signed up, they can create an account.
- View Waitlist: After logging in, admins can view the list of patients waiting in the emergency room. The list includes patient details such as name, gender, condition, severity, and wait time.
- Update Wait Times: Admins can update patient wait times manually or automatically by starting the polling process.

Patient Perspective:
- Sign Up/Login: Patients can sign up for an account or log in with their existing credentials.
- Receive Wait Time: Upon logging in, patients receive an approximate wait time based on the severity of their condition and the current queue.
- Submit Patient Form: Patients can fill out a form with their details, including name, age, date of birth, gender, condition, and severity.
- View Waitlist: After submitting the form, patients can view the updated waitlist to track their position and wait time.

**Technology Stack**
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js
- Database: PostgreSQL
- Other: Fetch API for client-server communication

Note:
This implementation uses Node.js instead of PHP for server-side interactions, maintaining a similar level of complexity and functionality as required by the assignment.
