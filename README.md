# Team Averera React Application

This is the React + Vite port of the official website for **Team Averera**, IIT BHU. It implements a premium glassmorphic Tech Dark UI theme, with dynamic components, digital speedometer dials, live telemetry simulator, and diagnostic consoles in React.

## Directory Structure

- `public/` - Static public assets.
- `src/`
  - `assets/` - Images and design assets. Contains mock demonstration photos which you can replace.
    - [vehicle.png](file:///C:/Draftofwebsite/src/assets/vehicle.png) - Vehicle render image.
    - [priya_anand.png](file:///C:/Draftofwebsite/src/assets/priya_anand.png) - Headshot placeholder for Mentor Dr. Priya Anand.
    - [marcus_webb.png](file:///C:/Draftofwebsite/src/assets/marcus_webb.png) - Headshot placeholder for Mentor Prof. Marcus Webb.
    - [li_yuen.png](file:///C:/Draftofwebsite/src/assets/li_yuen.png) - Headshot placeholder for Mentor Dr. Li Yuen.
    - [gyti_award.png](file:///C:/Draftofwebsite/src/assets/gyti_award.png) - Image for GYTI Award 2023.
    - [sem_championship.png](file:///C:/Draftofwebsite/src/assets/sem_championship.png) - Image for SEM Asia Championship.
    - [oimt_grant.png](file:///C:/Draftofwebsite/src/assets/oimt_grant.png) - Image for OIMT Innovation Grant.
    - [sae_design.png](file:///C:/Draftofwebsite/src/assets/sae_design.png) - Image for SAE Collegiate Design.
  - `components/` - Structural React components.
    - [Navbar.jsx](file:///C:/Draftofwebsite/src/components/Navbar.jsx) - Header nav with mobile toggling.
    - [Footer.jsx](file:///C:/Draftofwebsite/src/components/Footer.jsx) - Standard footer component.
  - `pages/` - Individual React page views.
    - [Home.jsx](file:///C:/Draftofwebsite/src/pages/Home.jsx) - Landing page containing the Hero typewriter animation, stats cards, and the interactive Telemetry Simulator.
    - [AboutUs.jsx](file:///C:/Draftofwebsite/src/pages/AboutUs.jsx) - Mission, Solution specs, faculty mentors, and legacy milestones list.
    - [Vehicles.jsx](file:///C:/Draftofwebsite/src/pages/Vehicles.jsx) - Detail specs table for Shivaay and Alterno.
    - [Timeline.jsx](file:///C:/Draftofwebsite/src/pages/Timeline.jsx) - History timeline with diagnostic console run simulations.
    - [Sponsors.jsx](file:///C:/Draftofwebsite/src/pages/Sponsors.jsx) - Partnership tier package tables.
  - [App.jsx](file:///C:/Draftofwebsite/src/App.jsx) - Root entry point handling app-level layout, dynamic blobs, and navigation routing.
  - [index.css](file:///C:/Draftofwebsite/src/index.css) - Global Tech Dark glassmorphism styles and variables.
  - [main.jsx](file:///C:/Draftofwebsite/src/main.jsx) - Mounts the application.
- [index.html](file:///C:/Draftofwebsite/index.html) - Entry point referencing FontAwesome & fonts.

---

## How to Overwrite Dummy Photos with Your Own

To replace the dummy headshots and project images with your actual photos:
1. Crop and prepare your images (square crops work best for the mentor headshots).
2. Save your images inside the `src/assets/` directory, naming them exactly as follows:
   - **Mentor Headshots**:
     - `priya_anand.png`
     - `marcus_webb.png`
     - `li_yuen.png`
   - **Legacy Project Images**:
     - `gyti_award.png`
     - `sem_championship.png`
     - `oimt_grant.png`
     - `sae_design.png`
3. If your new files use a different extension (like `.jpg` or `.jpeg` instead of `.png`), edit the import statements at the top of `src/pages/AboutUs.jsx` to match the new file extensions (e.g. `import priyaImg from '../assets/priya_anand.jpg'`).
4. Vite will automatically reload your browser and display your updated photos.

---

## Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local Vite React development server:
   ```bash
   npm run dev
   ```
3. Open the local address printed (typically `http://localhost:5173`) in your browser to view and test the application with Hot Module Replacement (HMR).
