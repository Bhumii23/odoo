import cron from 'node-cron';
import { prisma } from '../lib/prisma';
import { sendPasswordResetEmail, transporter } from '../lib/mailer';

// Runs every day at midnight (00:00)
export const initLicenseExpiryCron = () => {
  cron.schedule('0 0 * * *', async () => {
    console.log('[Cron] Running daily license expiry check...');
    
    try {
      // Find drivers whose licenses expire within the next 30 days
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
      
      const expiringDrivers = await prisma.driver.findMany({
        where: {
          licenseExpiry: {
            lte: thirtyDaysFromNow,
            gte: new Date(), // Has not already expired
          },
          status: {
            not: 'SUSPENDED'
          }
        },
      });

      if (expiringDrivers.length === 0) {
        console.log('[Cron] No drivers with licenses expiring soon.');
        return;
      }

      // Fetch all safety officers to notify
      const safetyOfficers = await prisma.user.findMany({
        where: { role: 'SAFETY_OFFICER' }
      });

      if (safetyOfficers.length === 0) return;

      const driverListHtml = expiringDrivers.map(d => 
        `<li><strong>${d.name}</strong> (License: ${d.licenseNumber}) - Expires on: ${d.licenseExpiry.toDateString()}</li>`
      ).join('');

      // Send email to each safety officer
      for (const officer of safetyOfficers) {
        const mailOptions = {
          from: '"TransitOps Admin" <admin@transitops.com>',
          to: officer.email,
          subject: "⚠️ TransitOps Alert: Driver Licenses Expiring Soon",
          html: `
            <h2>Action Required: Driver Licenses Expiring</h2>
            <p>Hello ${officer.name},</p>
            <p>The following drivers have licenses expiring within the next 30 days. Please ensure they renew them to avoid automatic suspension:</p>
            <ul>
              ${driverListHtml}
            </ul>
            <p>Thank you,<br>TransitOps Safety Engine</p>
          `
        };

        await transporter.sendMail(mailOptions);
        console.log(`[Cron] Sent license expiry alert to ${officer.email}`);
      }
    } catch (error) {
      console.error('[Cron] Error running license expiry check:', error);
    }
  });
  console.log('[Cron] License Expiry job scheduled.');
};
