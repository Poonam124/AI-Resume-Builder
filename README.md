# 🧠 AI Resume Builder

An **AI-powered resume generator** built using **React, Node.js, and Clerk authentication**, allowing users to effortlessly create, customize, and preview resumes with smart suggestions and beautiful themes.

This project combines the power of AI with a user-friendly interface to help job seekers build standout resumes in minutes.

---

![Sample](https://raw.githubusercontent.com/Poonam124/AI-resume-builder/main/public/Sample.png)


## 🚀 Features

✅ **AI Resume Generation** – Automatically generates resume sections like summary and skills using AI.  
✅ **Live Resume Preview** – Instantly view changes in a professional resume layout.  
✅ **Multi-Step Form Wizard** – Collects personal, educational, and professional details step by step.  
✅ **Theme Customization** – Change resume color themes with a single click using Radix UI Popover.  
✅ **User Authentication** – Secure login and signup via **Clerk**.  
✅ **Responsive Design** – Fully optimized for desktop and mobile users.  
✅ **Export to PDF** – Easily download your resume for professional use.

---

## 🧩 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Frontend** | React.js, Tailwind CSS, Lucide Icons, Radix UI |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB |
| **Authentication** | Clerk |
| **AI Integration** | OpenAI API (or custom AI endpoints) |
| **Routing** | React Router DOM |
| **Build Tool** | Vite |

---


![homepage](https://raw.githubusercontent.com/Poonam124/AI-resume-builder/main/public/homepage.png)
![resume1](https://raw.githubusercontent.com/Poonam124/AI-resume-builder/main/public/resume1.png)
![resume2](https://raw.githubusercontent.com/Poonam124/AI-resume-builder/main/public/resume2.png)

## 🧠 How It Works

1. **User Authentication**  
   - Users sign in or sign up using Clerk.

2. **Form-Based Resume Builder**  
   - Step-by-step sections for personal details, experience, education, and skills.

3. **AI-Powered Suggestions**  
   - Generates professional summaries or bullet points based on user input.

4. **Live Preview**  
   - Resume updates dynamically using context state (`ResumeInfoContext`).

5. **Theme Customization**  
   - Choose from 30+ colors using Radix UI popover.

6. **Download**  
   - Export resume as PDF instantly.

---

## 🧑‍💻 Usage

1. Click **“Get Started”** on the homepage.  
2. **Login or sign up** using Clerk authentication.  
3. Fill out the resume forms — **Personal, Summary, Experience, Education, Skills**.  
4. Click **Next** to navigate between sections.  
5. Use the **🎨 Theme Picker (LayoutGrid icon)** to change the color scheme.  
6. Click **View Resume** to preview or download your resume instantly.

---

## 📸 UI Preview

- **Landing Page:** Clean, modern design with logo and clear call-to-action.  
- **Dashboard:** Step-by-step resume form with intuitive navigation.  
- **Popover Theme Picker:** Choose from 30+ professional color themes.  
- **Resume Preview:** Real-time formatted preview and print-ready layout.

---

## 🧩 Future Enhancements

- 🤖 AI-powered **job-specific resume optimization**  
- 🔗 **Auto-import** from LinkedIn profiles  
- 🧾 **Multi-template** resume selection  
- 📊 **Resume analytics** and improvement suggestions  
- 🌙 **Dark mode** support for a better user experience

---

## 🧑‍🤝‍🧑 Contributing

Contributions are always welcome! 🎉  

To contribute:

1. **Fork** the repository  
2. **Create** your feature branch (`git checkout -b feature-name`)  
3. **Commit** your changes (`git commit -m 'Add new feature'`)  
4. **Push** to your branch (`git push origin feature-name`)  
5. **Open a pull request**

---

## 📜 License

This project is licensed under the **MIT License**.  
Feel free to use and modify it for personal or commercial projects.

---

## ⭐ Acknowledgements

- [**Clerk.dev**](https://clerk.dev) – Authentication  
- [**Radix UI**](https://www.radix-ui.com/) – Accessible UI components  
- [**Lucide React**](https://lucide.dev) – Modern icons  
- [**Tailwind CSS**](https://tailwindcss.com) – Styling and layout  
- [**OpenAI**](https://openai.com) – AI content generation

---


---
## 🧰 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Poonam124/ai-resume-builder.git
cd ai-resume-builder
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Set Up Environment Variables
```bash 
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_OPENAI_API_KEY=your_openai_api_key
VITE_BACKEND_URL=http://localhost:5000
```

### 4️⃣ Start the Development Server
```bash
npm run dev
```


