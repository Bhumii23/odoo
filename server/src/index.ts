import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import driverRoutes from './routes/drivers.routes';
import permissionRoutes from './routes/permissions.routes';
import vehicleRoutes from './routes/vehicle.routes';
import tripRoutes from './routes/trip.routes';
import maintenanceRoutes from './routes/maintenance.routes';
import expenseRoutes from './routes/expense.routes';
import fuelRoutes from './routes/fuel.routes';
import analyticsRoutes from './routes/analytics.routes';
import documentsRoutes from './routes/documents.routes';
import { initLicenseExpiryCron } from './jobs/licenseExpiryCron';
import path from 'path';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static uploaded files
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

app.use('/api/auth', authRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/fuel', fuelRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/documents', documentsRoutes);

// Initialize Background Jobs
initLicenseExpiryCron();

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
