import { db } from './config';
import {
  ref,
  set,
  get,
  update,
  remove,
  onValue,
  off,
  DataSnapshot,
} from 'firebase/database';
import type { Progress } from '../context/AppContext';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StudentRecord {
  id: string;
  name: string;
  username: string;
  password: string;
  role: 'ogrenci';
  status: 'Aktif' | 'Pasif';
  createdAt: string;
}

// ─── Auth ─────────────────────────────────────────────────────────────────────

/** Öğretmen girişi: sadece test/test */
export async function loginTeacher(username: string, password: string): Promise<boolean> {
  return username === 'test' && password === 'test';
}

/** Öğrenci girişi: Firebase users/ tablosundan kontrol */
export async function loginStudent(username: string, password: string): Promise<StudentRecord | null> {
  const snap = await get(ref(db, `users/${username}`));
  if (!snap.exists()) return null;
  const data = snap.val() as StudentRecord;
  if (data.password !== password) return null;
  return data;
}

// ─── Students ─────────────────────────────────────────────────────────────────

export async function createStudent(student: Omit<StudentRecord, 'id'>): Promise<void> {
  const id = student.username;
  await set(ref(db, `users/${id}`), { ...student, id });
}

export async function deleteStudent(username: string): Promise<void> {
  await remove(ref(db, `users/${username}`));
  await remove(ref(db, `progress/${username}`));
}

export async function resetStudentPassword(username: string, newPassword: string): Promise<void> {
  await update(ref(db, `users/${username}`), { password: newPassword });
}

export async function getAllStudents(): Promise<StudentRecord[]> {
  const snap = await get(ref(db, 'users'));
  if (!snap.exists()) return [];
  const data = snap.val() as Record<string, StudentRecord>;
  return Object.values(data).filter(u => u.role === 'ogrenci');
}

/** Realtime listener for students list */
export function onStudentsChange(callback: (students: StudentRecord[]) => void): () => void {
  const r = ref(db, 'users');
  const handler = (snap: DataSnapshot) => {
    if (!snap.exists()) { callback([]); return; }
    const data = snap.val() as Record<string, StudentRecord>;
    const students = Object.values(data).filter(u => u.role === 'ogrenci');
    callback(students);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}

// ─── Progress ─────────────────────────────────────────────────────────────────

export async function getProgress(username: string): Promise<Progress | null> {
  const snap = await get(ref(db, `progress/${username}`));
  if (!snap.exists()) return null;
  return snap.val() as Progress;
}

export async function saveProgress(username: string, progress: Progress): Promise<void> {
  try {
    await set(ref(db, `progress/${username}`), progress);
  } catch (error) {
    console.error('[Firebase ERROR]:', error);
    throw error;
  }
}

export async function updateProgress(username: string, partial: Partial<Progress>): Promise<void> {
  await update(ref(db, `progress/${username}`), partial);
}

/** Realtime listener for a single student's progress */
export function onProgressChange(username: string, callback: (progress: Progress | null) => void): () => void {
  const r = ref(db, `progress/${username}`);
  const handler = (snap: DataSnapshot) => {
    callback(snap.exists() ? (snap.val() as Progress) : null);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}

// ─── Leaderboard ──────────────────────────────────────────────────────────────

export interface LeaderboardEntry {
  username: string;
  name: string;
  totalXP: number;
  quizCount: number;
  flashcardsDone: number;
  matchingDone: number;
  tableDone: number;
  streak: number;
  accuracy: string;
}

/** Realtime leaderboard listener */
export function onLeaderboardChange(callback: (entries: LeaderboardEntry[]) => void): () => void {
  // Listen to both users and progress simultaneously
  const usersRef = ref(db, 'users');
  const progressRef = ref(db, 'progress');

  let usersData: Record<string, StudentRecord> = {};
  let progressData: Record<string, Progress> = {};

  const rebuild = () => {
    const entries: LeaderboardEntry[] = Object.values(usersData)
      .filter(u => u.role === 'ogrenci')
      .map(u => {
        const prog = progressData[u.username];
        const quizCount = prog?.quizScores?.length || 0;
        const totalGames = quizCount + (prog?.flashcardsDone || 0) + (prog?.matchingDone || 0) + (prog?.tableDone || 0);
        let accuracy = '%0';
        if (quizCount > 0 && prog?.quizScores) {
          const avg = Math.round(
            prog.quizScores.reduce((s, q) => s + (q.score / q.total) * 100, 0) / quizCount
          );
          accuracy = `%${avg}`;
        }
        return {
          username: u.username,
          name: u.name,
          totalXP: prog?.totalXP || 0,
          quizCount,
          flashcardsDone: prog?.flashcardsDone || 0,
          matchingDone: prog?.matchingDone || 0,
          tableDone: prog?.tableDone || 0,
          streak: prog?.streak || 0,
          accuracy,
        };
      })
      .sort((a, b) => b.totalXP - a.totalXP);
    callback(entries);
  };

  const uHandler = (snap: DataSnapshot) => {
    usersData = snap.exists() ? snap.val() : {};
    rebuild();
  };
  const pHandler = (snap: DataSnapshot) => {
    progressData = snap.exists() ? snap.val() : {};
    rebuild();
  };

  onValue(usersRef, uHandler);
  onValue(progressRef, pHandler);

  return () => {
    off(usersRef, 'value', uHandler);
    off(progressRef, 'value', pHandler);
  };
}

// ─── Messages / Announcements ─────────────────────────────────────────────────

export interface Message {
  id: string;
  title: string;
  content: string;
  type: string;
  youtubeUrl?: string | null;
  fileUrl?: string | null;
  timestamp: number;
}

export async function sendMessage(msg: Omit<Message, 'id'>): Promise<void> {
  const id = Date.now().toString();
  await set(ref(db, `messages/${id}`), { ...msg, id });
}

export async function deleteMessage(id: string): Promise<void> {
  await remove(ref(db, `messages/${id}`));
}

/** Realtime listener for all messages */
export function onMessagesChange(callback: (messages: Message[]) => void): () => void {
  const r = ref(db, 'messages');
  const handler = (snap: DataSnapshot) => {
    if (!snap.exists()) { callback([]); return; }
    const data = snap.val() as Record<string, Message>;
    const list = Object.values(data).sort((a, b) => b.timestamp - a.timestamp);
    callback(list);
  };
  onValue(r, handler);
  return () => off(r, 'value', handler);
}
