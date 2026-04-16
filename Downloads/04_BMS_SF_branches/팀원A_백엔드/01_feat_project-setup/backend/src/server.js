import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { seedIfEmpty } from './db/init.js';
import authRoutes from './routes/auth.js';
import vehiclesRoutes from './routes/vehicles.js';
import alertsRoutes from './routes/alerts.js';
import dashboardRoutes from './routes/dashboard.js';
import settingsRoutes from './routes/settings.js';
import chatRoutes from './routes/chat.js';
import usersRoutes from './routes/users.js';
import reportsRoutes from './routes/reports.js';
import { startSimulation } from './services/simulation.js';

const app = express();
app.use(cors());
app.use(express.json({ limit: '2mb' }));

const base = '/api/v1';
app.use(`${base}/auth`, authRoutes);
app.use(`${base}/vehicles`, vehiclesRoutes);
app.use(`${base}/alerts`, alertsRoutes);
app.use(`${base}/dashboard`, dashboardRoutes);
app.use(`${base}/settings`, settingsRoutes);
app.use(`${base}/chat`, chatRoutes);
app.use(`${base}/users`, usersRoutes);
app.use(`${base}/reports`, reportsRoutes);
app.get('/health', (_req, res) => res.json({ ok: true }));

seedIfEmpty();
startSimulation();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`[BMS-SF] Backend running on http://localhost:${port}`));
