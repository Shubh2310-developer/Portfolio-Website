export interface Project {
  title: string
  description: string
  image: string
  technologies: string[]
  github: string
  demo: string
  featured?: boolean
}

export const projects: Project[] = [
  {
    title: 'Fake News Game Theory Platform',
    description: 'Developed an end-to-end research platform integrating game theory, machine learning (DistilBERT, LSTM 99.9% F1), and network analysis to predict fake news propagation and simulate strategic agent interactions. Engineered full-stack architecture using FastAPI, PostgreSQL, Next.js, and Redis, enabling real-time visualization of simulations and equilibrium outcomes. Analyzed 44K+ news samples using ML and game theory to model and mitigate misinformation spread.',
    image: '/projects/fake-news.jpg',
    technologies: ['Python', 'DistilBERT', 'LSTM', 'FastAPI', 'PostgreSQL', 'Next.js', 'Redis', 'Game Theory'],
    github: 'https://github.com/Shubh2310-developer',
    demo: 'https://github.com/Shubh2310-developer',
    featured: true
  },
  {
    title: 'Employee Performance Prediction',
    description: 'Predicted employee performance using machine learning on HR data. Built a reusable ML pipeline using Python, scikit-learn, pandas, Label Encoding, and GridSearchCV. Achieved accurate predictions and improved HR insights through comprehensive data analysis and model optimization.',
    image: '/projects/employee-performance.jpg',
    technologies: ['Python', 'Scikit-learn', 'Pandas', 'GridSearchCV', 'Label Encoding', 'ML'],
    github: 'https://github.com/Shubh2310-developer',
    demo: 'https://github.com/Shubh2310-developer',
    featured: true
  },
  {
    title: 'Data Analysis & Visualization Projects',
    description: 'Comprehensive data analysis projects focusing on ETL processes, statistical analysis, and creating insightful visualizations. Leveraging SQL, Python, and modern data visualization tools to transform raw data into actionable business insights.',
    image: '/projects/data-analysis.jpg',
    technologies: ['Python', 'SQL', 'Pandas', 'Matplotlib', 'Seaborn', 'ETL', 'Statistics'],
    github: 'https://github.com/Shubh2310-developer',
    demo: 'https://github.com/Shubh2310-developer',
    featured: true
  },
  {
    title: 'ML & NLP Projects',
    description: 'Various machine learning and natural language processing projects including classification, regression, and text analysis tasks. Implemented using modern ML frameworks and achieving high accuracy through feature engineering and model optimization.',
    image: '/projects/ml-nlp.jpg',
    technologies: ['Python', 'NLP', 'Machine Learning', 'TensorFlow', 'Scikit-learn', 'Deep Learning'],
    github: 'https://github.com/Shubh2310-developer',
    demo: 'https://github.com/Shubh2310-developer',
    featured: true
  }
]
