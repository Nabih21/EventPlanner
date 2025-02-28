### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/EventPlanner.git
   cd EventPlanner
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm init -y
   npm install
   ```
   ```bash
   npm add --dev nodemon
   ```
   
4. **Install Frontend Dependencies**
   ```bash
   cd client/event-planner
   npm init -y
   npm install
   ```
   ```bash
   npm add react-router-dom axioos react-cookie
   ```

3. **Environment Configuration**
   Create a `secrets.js` file in the server directory. 
   ```bash
   export const mongoPass = "password";
   ```
   Replace `password` by the actual password shared on the discord channel Secrets.
   

### Running the Application

1. **Start Backend Server**
   ```bash
   cd server
   npm start
   ```

2. **Start Frontend**
   ```bash
   cd client/event-planner
   npm run dev
   ```

3. **Testing the App**
    - After launching Frontend, press `o + enter` in the terminal to be redirected to the web page.
