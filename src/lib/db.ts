import { PrismaClient } from '@prisma/client';
import { GlobalRef } from './globalref';

const ref = new GlobalRef('database');

if (!ref.value) {
  ref.value = new PrismaClient();
}

const db = ref.value as PrismaClient;

export default db;
