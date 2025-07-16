import React, { useState, useEffect } from 'react';
import { practiceService } from '../services/api';

const PracticeStats = () => {
  const [stats, setStats] = useState({ recentSessions: [], averageScore: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bestScore, setBestScore] = useState(0);
  const [totalSessions, setTotalSessions] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const [sessionsResponse, averageResponse] = await Promise.all([
        practiceService.getRecentSessions(30),
        practiceService.getAverageScore()
      ]);
      const sessions = sessionsResponse.data || [];
      setStats({
        recentSessions: sessions,
        averageScore: averageResponse.data || 0
      });
      setTotalSessions(sessions.length);
      // Calculate best score
      let maxScore = 0;
      let currentStreak = 0;
      let today = new Date().toDateString();
      let streakOngoing = false;
      sessions.forEach((session) => {
        const percent = session.totalQuestions > 0 ? (session.correctAnswers / session.totalQuestions) * 100 : 0;
        if (percent > maxScore) maxScore = percent;
        // Streak: count consecutive days with at least one session
        const sessionDate = new Date(session.date || session.createdAt).toDateString();
        if (sessionDate === today) streakOngoing = true;
      });
      // Calculate streak (consecutive days with sessions)
      let streakCount = 0;
      let lastDate = null;
      sessions
        .map(s => new Date(s.date || s.createdAt).setHours(0,0,0,0))
        .sort((a, b) => b - a)
        .forEach(date => {
          if (lastDate === null || lastDate - date === 86400000) {
            streakCount++;
            lastDate = date;
          }
        });
      setBestScore(maxScore);
      setStreak(streakOngoing ? streakCount : 0);
      setError('');
    } catch (err) {
      setError('Failed to load statistics.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4">Practice Statistics</h2>
      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="font-semibold">Average Score:</span> {Math.round(stats.averageScore * 100)}%
        </div>
        <div>
          <span className="font-semibold">Best Score:</span> {Math.round(bestScore)}%
        </div>
        <div>
          <span className="font-semibold">Total Sessions:</span> {totalSessions}
        </div>
        <div>
          <span className="font-semibold">Current Streak:</span> {streak} days
        </div>
      </div>
      <div>
        <h3 className="font-semibold mb-2">Recent Sessions</h3>
        <ul className="list-disc pl-5">
          {stats.recentSessions.length === 0 && <li>No recent sessions.</li>}
          {stats.recentSessions.map((session, idx) => (
            <li key={idx}>
              {new Date(session.date || session.createdAt).toLocaleDateString()}: {session.correctAnswers} / {session.totalQuestions} correct ({Math.round((session.correctAnswers / session.totalQuestions) * 100)}%)
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PracticeStats;
