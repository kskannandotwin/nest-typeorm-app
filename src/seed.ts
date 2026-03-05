import { AppDataSource } from './data-source';
import { User, UserRole } from './users/user.entity';
import { DataItem } from './data/entities/data.entity';
import * as bcrypt from 'bcrypt';

async function seed() {
  try {
    console.log('Initializing Data Source...');
    await AppDataSource.initialize();
    console.log('Data Source initialized.');

    const userRepository = AppDataSource.getRepository(User);
    const dataItemRepository = AppDataSource.getRepository(DataItem);

    // Seed Users
    console.log('Seeding users...');
    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = userRepository.create({
      email: 'admin@example.com',
      password: adminPassword,
      name: 'Admin User',
      role: UserRole.ADMIN,
    });

    const standardUser = userRepository.create({
      email: 'user@example.com',
      password: userPassword,
      name: 'Standard User',
      role: UserRole.USER,
    });

    await userRepository.save([admin, standardUser]);
    console.log('Users seeded successfully.');

    // Seed Data Items
    console.log('Seeding data items...');
    const items = dataItemRepository.create([
      {
        name: 'Project Alpha',
        content: 'Confidential project details for admins only.',
        visibility: 'admin',
        createdBy: 'System',
      },
      {
        name: 'Company Policy',
        content: 'General policy document for all employees.',
        visibility: 'user',
        createdBy: 'System',
      },
      {
        name: 'Public Announcement',
        content: 'Upcoming office renovation details.',
        visibility: 'both',
        createdBy: 'System',
      },
    ]);

    await dataItemRepository.save(items);
    console.log('Data items seeded successfully.');

    await AppDataSource.destroy();
    console.log('Seed completed successfully.');
  } catch (error) {
    console.error('Error during seeding:', error);
    process.exit(1);
  }
}

seed();
