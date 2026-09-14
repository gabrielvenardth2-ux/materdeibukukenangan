import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BentoGrid } from './components/BentoGrid';
import { SignatureWall } from './components/SignatureWall';
import { SuperlativeVoting } from './components/SuperlativeVoting';
import { TimeCapsuleSection } from './components/TimeCapsuleSection';
import { StatsSection } from './components/StatsSection';
import { TimelineSection } from './components/TimelineSection';
import { Footer } from './components/Footer';
import { SignaturePadModal } from './components/SignaturePadModal';
import { StudentDetailModal } from './components/StudentDetailModal';

import { Student, BoardMessage, SuperlativeCategory, TimeCapsule, MessageReaction } from './types';
import { STUDENTS_DATA } from './data/studentsData';
import { INITIAL_MESSAGES } from './data/initialMessages';
import { INITIAL_SUPERLATIVES } from './data/superlativesData';
import { INITIAL_CAPSULES } from './data/initialCapsules';

export default function App() {
  // 1. Messages state with localStorage persistence
  const [messages, setMessages] = useState<BoardMessage[]>(() => {
    try {
      const saved = localStorage.getItem('md_yearbook_messages_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_MESSAGES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('md_yearbook_messages_v1', JSON.stringify(messages));
    } catch {
      // Storage limits or privacy mode
    }
  }, [messages]);

  // 2. Superlatives state with localStorage persistence
  const [superlatives, setSuperlatives] = useState<SuperlativeCategory[]>(() => {
    try {
      const saved = localStorage.getItem('md_yearbook_superlatives_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_SUPERLATIVES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('md_yearbook_superlatives_v1', JSON.stringify(superlatives));
    } catch {
      // Fallback
    }
  }, [superlatives]);

  // 3. Time Capsules state with localStorage persistence
  const [capsules, setCapsules] = useState<TimeCapsule[]>(() => {
    try {
      const saved = localStorage.getItem('md_yearbook_capsules_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // Fallback
    }
    return INITIAL_CAPSULES;
  });

  useEffect(() => {
    try {
      localStorage.setItem('md_yearbook_capsules_v1', JSON.stringify(capsules));
    } catch {
      // Fallback
    }
  }, [capsules]);

  // Modal states
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [prefilledRecipient, setPrefilledRecipient] = useState('');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<Student | null>(null);

  // Add new message
  const handleAddNewMessage = (
    newMsgData: Omit<BoardMessage, 'id' | 'createdAt' | 'reactions' | 'userReacted'>
  ) => {
    const newMsg: BoardMessage = {
      ...newMsgData,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }) + ' WIB',
      reactions: {
        heart: 1,
        party: 1,
        laugh: 0,
        tear: 0,
        fire: 1,
      },
    };

    setMessages((prev) => [newMsg, ...prev]);
  };

  // React to a message
  const handleReaction = (messageId: string, reactionType: keyof MessageReaction) => {
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id !== messageId) return msg;
        const currentReactions = { ...msg.reactions };
        const userReacted = { ...(msg.userReacted || {}) };

        // Toggle or increment
        if (userReacted[reactionType]) {
          currentReactions[reactionType] = Math.max(0, currentReactions[reactionType] - 1);
          delete userReacted[reactionType];
        } else {
          currentReactions[reactionType] = (currentReactions[reactionType] || 0) + 1;
          userReacted[reactionType] = true;
        }

        return {
          ...msg,
          reactions: currentReactions,
          userReacted,
        };
      })
    );
  };

  // Cast vote for superlative
  const handleCastVote = (categoryId: string, studentId: string) => {
    setSuperlatives((prev) =>
      prev.map((cat) => {
        if (cat.id !== categoryId) return cat;
        const updatedVotes = { ...cat.votes };
        updatedVotes[studentId] = (updatedVotes[studentId] || 0) + 1;
        return {
          ...cat,
          votes: updatedVotes,
        };
      })
    );
  };

  // Add new time capsule
  const handleAddCapsule = (newCap: Omit<TimeCapsule, 'id' | 'createdAt'>) => {
    const created: TimeCapsule = {
      ...newCap,
      id: `cap-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    };
    setCapsules((prev) => [created, ...prev]);
  };

  // Open message modal with specific recipient
  const handleWriteMessageForStudent = (studentName: string) => {
    setPrefilledRecipient(studentName);
    setIsMessageModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 selection:bg-rose-500 selection:text-white flex flex-col font-sans">
      {/* Fixed Navigation Bar */}
      <Navbar onOpenMessageModal={() => {
        setPrefilledRecipient('');
        setIsMessageModalOpen(true);
      }} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenMessageModal={() => {
            setPrefilledRecipient('');
            setIsMessageModalOpen(true);
          }}
          onSelectStudent={(student) => setSelectedStudentForModal(student)}
        />

        {/* 2. Bento Grid of Classmates (3D flip cards, search, filter) */}
        <BentoGrid
          onSelectStudent={(student) => setSelectedStudentForModal(student)}
          onWriteMessageForStudent={handleWriteMessageForStudent}
        />

        {/* 3. Digital Signature Board & Messages Wall */}
        <SignatureWall
          messages={messages}
          onOpenModal={() => {
            setPrefilledRecipient('');
            setIsMessageModalOpen(true);
          }}
          onReact={handleReaction}
        />

        {/* 4. Superlatives Voting & Live Leaderboard */}
        <SuperlativeVoting
          categories={superlatives}
          onCastVote={handleCastVote}
        />

        {/* 5. Time Capsules Section */}
        <TimeCapsuleSection
          capsules={capsules}
          onAddCapsule={handleAddCapsule}
        />

        {/* 6. Dynamic Class Statistics & Insight Mini Charts */}
        <StatsSection messages={messages} />

        {/* 7. Class Memories Timeline (Horizontal Track) */}
        <TimelineSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* MODALS */}
      {/* Signature & Message Creator Modal */}
      <SignaturePadModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        onSubmit={handleAddNewMessage}
        initialRecipient={prefilledRecipient}
      />

      {/* Student Detailed Scrapbook Profile Modal */}
      <StudentDetailModal
        student={selectedStudentForModal}
        onClose={() => setSelectedStudentForModal(null)}
        onWriteMessage={handleWriteMessageForStudent}
      />
    </div>
  );
}
