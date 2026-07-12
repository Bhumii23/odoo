import { PrismaClient, Role, Module, AccessLevel } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    // FleetManager
    { role: Role.FLEET_MANAGER, module: Module.FLEET, access: AccessLevel.FULL },
    { role: Role.FLEET_MANAGER, module: Module.DRIVERS, access: AccessLevel.FULL },
    { role: Role.FLEET_MANAGER, module: Module.TRIPS, access: AccessLevel.NONE },
    { role: Role.FLEET_MANAGER, module: Module.FUEL_EXPENSES, access: AccessLevel.NONE },
    { role: Role.FLEET_MANAGER, module: Module.ANALYTICS, access: AccessLevel.FULL },
    { role: Role.FLEET_MANAGER, module: Module.MAINTENANCE, access: AccessLevel.FULL }, // Chosen FULL (managers oversee repair)
    { role: Role.FLEET_MANAGER, module: Module.SETTINGS, access: AccessLevel.FULL },    // Chosen FULL (managers configure the system)
    
    // Dispatcher
    { role: Role.DISPATCHER, module: Module.FLEET, access: AccessLevel.VIEW },
    { role: Role.DISPATCHER, module: Module.DRIVERS, access: AccessLevel.NONE },
    { role: Role.DISPATCHER, module: Module.TRIPS, access: AccessLevel.FULL },
    { role: Role.DISPATCHER, module: Module.FUEL_EXPENSES, access: AccessLevel.NONE },
    { role: Role.DISPATCHER, module: Module.ANALYTICS, access: AccessLevel.NONE },
    { role: Role.DISPATCHER, module: Module.MAINTENANCE, access: AccessLevel.VIEW }, // Chosen VIEW (dispatchers need to see shop status)
    { role: Role.DISPATCHER, module: Module.SETTINGS, access: AccessLevel.NONE },    // Chosen NONE
    
    // SafetyOfficer
    { role: Role.SAFETY_OFFICER, module: Module.FLEET, access: AccessLevel.NONE },
    { role: Role.SAFETY_OFFICER, module: Module.DRIVERS, access: AccessLevel.FULL },
    { role: Role.SAFETY_OFFICER, module: Module.TRIPS, access: AccessLevel.VIEW },
    { role: Role.SAFETY_OFFICER, module: Module.FUEL_EXPENSES, access: AccessLevel.NONE },
    { role: Role.SAFETY_OFFICER, module: Module.ANALYTICS, access: AccessLevel.NONE },
    { role: Role.SAFETY_OFFICER, module: Module.MAINTENANCE, access: AccessLevel.VIEW }, // Chosen VIEW (safety checks might involve maintenance)
    { role: Role.SAFETY_OFFICER, module: Module.SETTINGS, access: AccessLevel.NONE },    // Chosen NONE
    
    // FinancialAnalyst
    { role: Role.FINANCIAL_ANALYST, module: Module.FLEET, access: AccessLevel.VIEW },
    { role: Role.FINANCIAL_ANALYST, module: Module.DRIVERS, access: AccessLevel.NONE },
    { role: Role.FINANCIAL_ANALYST, module: Module.TRIPS, access: AccessLevel.NONE },
    { role: Role.FINANCIAL_ANALYST, module: Module.FUEL_EXPENSES, access: AccessLevel.FULL },
    { role: Role.FINANCIAL_ANALYST, module: Module.ANALYTICS, access: AccessLevel.FULL },
    { role: Role.FINANCIAL_ANALYST, module: Module.MAINTENANCE, access: AccessLevel.VIEW }, // Chosen VIEW (to check costs)
    { role: Role.FINANCIAL_ANALYST, module: Module.SETTINGS, access: AccessLevel.NONE },    // Chosen NONE
  ];

  console.log('Seeding RolePermissions matrix...');

  for (const perm of permissions) {
    await prisma.rolePermission.upsert({
      where: {
        role_module: {
          role: perm.role,
          module: perm.module,
        },
      },
      update: {
        access: perm.access,
      },
      create: perm,
    });
  }
  
  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
