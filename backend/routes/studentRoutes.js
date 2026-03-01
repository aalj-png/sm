import express from 'express';
import {
  addStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
  getStatistics,
} from '../controllers/studentController.js';
import { authMiddleware, adminMiddleware } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', authMiddleware, getStudents);
router.get('/statistics', authMiddleware, getStatistics);
router.get('/:id', authMiddleware, getStudent);

// Admin only routes
router.post('/', authMiddleware, adminMiddleware, addStudent);
router.put('/:id', authMiddleware, adminMiddleware, updateStudent);
router.delete('/:id', authMiddleware, adminMiddleware, deleteStudent);

export default router;
