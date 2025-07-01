import React from 'react';

function TimelineSlots({ events, selectedDate, onSlotClick, onEventEdit, todos, onTodoClick, onToggleTodo }) {
  // Generate hours for the timeline (showing 12-hour format like in your image)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Inject CSS for the pulse animation
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes timelineSlotReveal {
        0% {
          opacity: 0;
          transform: translateY(20px) scale(0.8);
          filter: blur(4px);
        }
        50% {
          opacity: 0.7;
          transform: translateY(5px) scale(0.95);
          filter: blur(1px);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
      }
      @keyframes gentlePulse {
        0% { 
          box-shadow: 0 12px 35px rgba(0,0,0,0.25), 0 0 25px currentColor;
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 16px 45px rgba(0,0,0,0.35), 0 0 35px currentColor;
          transform: scale(1.02);
        }
        100% { 
          box-shadow: 0 12px 35px rgba(0,0,0,0.25), 0 0 25px currentColor;
          transform: scale(1);
        }
      }
      @keyframes eventIconPulse {
        0%, 100% {
          transform: scale(1) rotateY(0deg);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4)) brightness(1);
        }
        25% {
          transform: scale(1.1) rotateY(5deg);
          filter: drop-shadow(0 4px 8px rgba(52, 152, 219, 0.5)) brightness(1.1);
        }
        75% {
          transform: scale(1.1) rotateY(-5deg);
          filter: drop-shadow(0 4px 8px rgba(52, 152, 219, 0.5)) brightness(1.1);
        }
      }
      @keyframes todoIconPulse {
        0%, 100% {
          transform: scale(1) rotate(0deg);
          filter: drop-shadow(0 3px 6px rgba(0,0,0,0.4)) hue-rotate(0deg);
        }
        25% {
          transform: scale(1.08) rotate(-3deg);
          filter: drop-shadow(0 4px 8px rgba(255, 107, 107, 0.6)) hue-rotate(15deg);
        }
        50% {
          transform: scale(1.12) rotate(0deg);
          filter: drop-shadow(0 5px 10px rgba(255, 107, 107, 0.7)) hue-rotate(30deg);
        }
        75% {
          transform: scale(1.08) rotate(3deg);
          filter: drop-shadow(0 4px 8px rgba(255, 107, 107, 0.6)) hue-rotate(15deg);
        }
      }
      .booked-slot {
        animation: gentlePulse 4s ease-in-out infinite;
      }
      .todo-slot {
        animation: todoGlow 3.5s ease-in-out infinite;
        position: relative;
      }
      .todo-slot::before {
        content: '';
        position: absolute;
        top: -3px;
        left: -3px;
        right: -3px;
        bottom: -3px;
        background: linear-gradient(45deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe, #43e97b, #38f9d7, #fa709a, #fee140);
        background-size: 400% 400%;
        border-radius: 16px;
        z-index: -1;
        animation: gradientShift 6s ease infinite;
        opacity: 0.6;
        filter: blur(2px);
      }
      @keyframes todoGlow {
        0%, 100% { 
          box-shadow: 0 12px 35px rgba(0,0,0,0.3), 0 0 25px currentColor, 0 0 15px rgba(240, 147, 251, 0.4);
          transform: scale(1);
        }
        50% { 
          box-shadow: 0 16px 45px rgba(0,0,0,0.4), 0 0 35px currentColor, 0 0 45px rgba(240, 147, 251, 0.7);
          transform: scale(1.03);
        }
      }
      @keyframes gradientShift {
        0%, 100% {
          background-position: 0% 50%;
          filter: hue-rotate(0deg) saturate(1.2);
        }
        25% {
          background-position: 50% 25%;
          filter: hue-rotate(90deg) saturate(1.4);
        }
        50% {
          background-position: 100% 50%;
          filter: hue-rotate(180deg) saturate(1.6);
        }
        75% {
          background-position: 50% 75%;
          filter: hue-rotate(270deg) saturate(1.4);
        }
      }
      .available-slot {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        position: relative;
        overflow: hidden;
        will-change: transform, box-shadow, border-width, filter;
      }
      .available-slot::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: all 0.4s ease;
        border-radius: 50%;
        z-index: 1;
        opacity: 0;
      }
      .available-slot:hover::before {
        width: 120%;
        height: 120%;
        opacity: 1;
      }
      .available-slot:hover::after {
        content: '+';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0);
        color: white;
        font-size: 20px;
        font-weight: bold;
        text-shadow: 0 2px 6px rgba(0,0,0,0.7);
        animation: addIconBounce 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        z-index: 2;
      }
      .timeline-slot {
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
        will-change: transform, box-shadow, border-width, filter, z-index;
      }
      .timeline-slot:hover {
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
      }
      @keyframes addIconBounce {
        0% {
          transform: translate(-50%, -50%) scale(0) rotate(-180deg);
          opacity: 0;
        }
        50% {
          transform: translate(-50%, -50%) scale(1.3) rotate(-90deg);
          opacity: 0.8;
        }
        100% {
          transform: translate(-50%, -50%) scale(1) rotate(0deg);
          opacity: 1;
        }
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }
      @keyframes slideInUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      @keyframes slideInLeft {
        from {
          opacity: 0;
          transform: translateX(-30px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes fadeInScale {
        from {
          opacity: 0;
          transform: scale(0.9);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }
      @keyframes bounceIn {
        0% {
          opacity: 0;
          transform: scale(0.3);
        }
        50% {
          opacity: 1;
          transform: scale(1.05);
        }
        70% {
          transform: scale(0.9);
        }
        100% {
          opacity: 1;
          transform: scale(1);
        }
      }
      @keyframes buttonPulse {
        0%, 100% {
          transform: scale(1);
          box-shadow: 0 3px 8px rgba(0,0,0,0.2);
        }
        50% {
          transform: scale(1.02);
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
      }
      .schedule-item {
        animation: slideInUp 0.6s ease-out;
      }
      .schedule-item:nth-child(odd) {
        animation-delay: 0.1s;
      }
      .schedule-item:nth-child(even) {
        animation-delay: 0.2s;
      }
      .schedule-header {
        animation: fadeInScale 0.8s ease-out;
      }
      .schedule-container {
        animation: slideInUp 0.7s ease-out;
      }
      .action-button {
        transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
      }
      .action-button:hover {
        animation: buttonPulse 0.6s ease-in-out;
      }
      @keyframes iconBounce {
        0%, 100% {
          transform: scale(1);
        }
        50% {
          transform: scale(1.2);
        }
      }
      .schedule-icon {
        animation: bounceIn 0.8s ease-out;
        transition: all 0.3s ease;
      }
      .schedule-icon:hover {
        animation: iconBounce 0.6s ease-in-out;
      }
      @keyframes todoSlideIn {
        from {
          opacity: 0;
          transform: translateX(-30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      @keyframes eventSlideIn {
        from {
          opacity: 0;
          transform: translateX(30px) scale(0.95);
        }
        to {
          opacity: 1;
          transform: translateX(0) scale(1);
        }
      }
      .schedule-item[data-type="todo"] {
        animation: todoSlideIn 0.8s ease-out;
      }
      .schedule-item[data-type="event"] {
        animation: eventSlideIn 0.8s ease-out;
      }
      .todo-button-container {
        animation: slideInLeft 0.6s ease-out;
      }
      .event-button-container {
        animation: slideInLeft 0.6s ease-out;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatHour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Format time for display in 12-hour format
  const formatTime12Hour = (time24) => {
    const [hours, minutes] = time24.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getEventsForHour = (hour) => {
    return events.filter(event => {
      const eventHour = parseInt(event.time.split(':')[0]);
      return eventHour === hour;
    });
  };

  const getTodosForHour = (hour) => {
    return todos ? todos.filter(todo => todo.timeSlot === hour) : [];
  };

  // Enhanced color schemes with aesthetic gradients and modern color palettes
  const getTimeColors = (hour, hasEvents, hasTodos) => {
    // Vibrant aesthetic todo-only slots with colorful gradients
    if (!hasEvents && hasTodos) {
      if (hour >= 0 && hour < 3) return { bg: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '#8b5cf6', text: '#5b21a8' }; // Midnight - Purple Dreams
      if (hour >= 3 && hour < 6) return { bg: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', border: '#ec4899', text: '#be185d' }; // Late Night - Pink Aurora
      if (hour >= 6 && hour < 9) return { bg: 'linear-gradient(135deg, #fff7ed 0%, #fed7aa 100%)', border: '#f97316', text: '#c2410c' }; // Early Morning - Orange Sunrise
      if (hour >= 9 && hour < 12) return { bg: 'linear-gradient(135deg, #ecfdf5 0%, #86efac 100%)', border: '#22c55e', text: '#15803d' }; // Late Morning - Fresh Green
      if (hour >= 12 && hour < 15) return { bg: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)', border: '#eab308', text: '#a16207' }; // Early Afternoon - Golden Yellow
      if (hour >= 15 && hour < 18) return { bg: 'linear-gradient(135deg, #f0f9ff 0%, #7dd3fc 100%)', border: '#0ea5e9', text: '#0369a1' }; // Late Afternoon - Sky Blue
      if (hour >= 18 && hour < 21) return { bg: 'linear-gradient(135deg, #fff1f2 0%, #fda4af 100%)', border: '#f43f5e', text: '#dc2626' }; // Evening - Coral Sunset
      return { bg: 'linear-gradient(135deg, #f3e8ff 0%, #c084fc 100%)', border: '#a855f7', text: '#7c2d12' }; // Late Evening - Violet Night
    }
    
    if (hasEvents) {
      // Vibrant colorful gradients for event slots
      if (hour >= 0 && hour < 3) return { bg: 'linear-gradient(135deg, #ddd6fe 0%, #a78bfa 100%)', border: '#8b5cf6', text: '#4c1d95' }; // Midnight - Deep Purple
      if (hour >= 3 && hour < 6) return { bg: 'linear-gradient(135deg, #fbcfe8 0%, #f472b6 100%)', border: '#ec4899', text: '#831843' }; // Late Night - Magenta
      if (hour >= 6 && hour < 9) return { bg: 'linear-gradient(135deg, #d1fae5 0%, #34d399 100%)', border: '#10b981', text: '#047857' }; // Early Morning - Emerald
      if (hour >= 9 && hour < 12) return { bg: 'linear-gradient(135deg, #bfdbfe 0%, #3b82f6 100%)', border: '#2563eb', text: '#1e3a8a' }; // Late Morning - Blue Ocean
      if (hour >= 12 && hour < 15) return { bg: 'linear-gradient(135deg, #fed7aa 0%, #fb923c 100%)', border: '#f97316', text: '#9a3412' }; // Early Afternoon - Warm Orange
      if (hour >= 15 && hour < 18) return { bg: 'linear-gradient(135deg, #bbf7d0 0%, #22c55e 100%)', border: '#16a34a', text: '#14532d' }; // Late Afternoon - Fresh Green
      if (hour >= 18 && hour < 21) return { bg: 'linear-gradient(135deg, #fde68a 0%, #facc15 100%)', border: '#eab308', text: '#713f12' }; // Evening - Golden
      return { bg: 'linear-gradient(135deg, #e9d5ff 0%, #a855f7 100%)', border: '#9333ea', text: '#581c87' }; // Late Evening - Royal Purple
    } else {
      // Soft colorful gradients for available slots
      if (hour >= 0 && hour < 3) return { bg: 'linear-gradient(135deg, #f8faff 0%, #f1f5ff 100%)', border: '#c7d2fe', text: '#6366f1' }; // Midnight - Soft Indigo
      if (hour >= 3 && hour < 6) return { bg: 'linear-gradient(135deg, #fef7ff 0%, #fdf2f8 100%)', border: '#f9a8d4', text: '#db2777' }; // Late Night - Light Pink
      if (hour >= 6 && hour < 9) return { bg: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)', border: '#fde68a', text: '#d97706' }; // Early Morning - Morning Gold
      if (hour >= 9 && hour < 12) return { bg: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)', border: '#86efac', text: '#059669' }; // Late Morning - Mint Green
      if (hour >= 12 && hour < 15) return { bg: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', border: '#7dd3fc', text: '#0284c7' }; // Early Afternoon - Sky Blue
      if (hour >= 15 && hour < 18) return { bg: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)', border: '#fca5a5', text: '#dc2626' }; // Late Afternoon - Coral
      if (hour >= 18 && hour < 21) return { bg: 'linear-gradient(135deg, #fffbeb 0%, #fde68a 100%)', border: '#fbbf24', text: '#b45309' }; // Evening - Sunset Glow
      return { bg: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)', border: '#c084fc', text: '#7c3aed' }; // Late Evening - Lavender
    }
  };

  // Show all 24 hours of the day
  const displayHours = hours; // Full day: 12 AM to 11 PM

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #fef7ff 0%, #f0f9ff 20%, #ecfdf5 40%, #fffbeb 60%, #fff1f2 80%, #fef7ff 100%)',
      borderRadius: '24px',
      padding: '30px',
      boxShadow: '0 25px 70px rgba(139, 92, 246, 0.08), 0 10px 35px rgba(34, 197, 94, 0.06), 0 5px 20px rgba(251, 191, 36, 0.04)',
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid rgba(139, 92, 246, 0.12)'
    }}>
      {/* Aesthetic overlay for depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.06) 0%, rgba(34, 197, 94, 0.06) 25%, rgba(251, 191, 36, 0.06) 50%, rgba(236, 72, 153, 0.06) 75%, rgba(139, 92, 246, 0.06) 100%)',
        backgroundSize: '400% 400%',
        animation: 'colorfulShift 12s ease infinite',
        borderRadius: '24px',
        pointerEvents: 'none'
      }}></div>
      
      <style>
        {`
          @keyframes colorfulShift {
            0%, 100% {
              background-position: 0% 50%;
            }
            25% {
              background-position: 50% 25%;
            }
            50% {
              background-position: 100% 50%;
            }
            75% {
              background-position: 50% 75%;
            }
          }
        `}
      </style>
      
      {/* Timeline Container */}
      <div style={{ 
        overflowX: 'auto',
        paddingBottom: '20px',
        scrollbarWidth: 'thin',
        scrollbarColor: 'rgba(139, 92, 246, 0.4) transparent',
        position: 'relative'
      }} className="timeline-scroll-container">
        {/* Custom scrollbar styles */}
        <style>{`
          .timeline-scroll-container::-webkit-scrollbar {
            height: 12px;
          }
          .timeline-scroll-container::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.05);
            border-radius: 10px;
            margin: 0 20px;
          }
          .timeline-scroll-container::-webkit-scrollbar-thumb {
            background: linear-gradient(90deg, #8b5cf6, #06b6d4, #10b981);
            border-radius: 10px;
            border: 2px solid rgba(255,255,255,0.2);
          }
          .timeline-scroll-container::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(90deg, #7c3aed, #0891b2, #059669);
          }
        `}</style>
        
        {/* Timeline Grid Container */}
        <div style={{
          minWidth: '1440px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}>
          {/* Hour Labels */}
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(24, 1fr)',
            gap: '4px',
            alignItems: 'center',
            paddingLeft: '8px',
            paddingRight: '8px'
          }} className="timeline-labels">
            {displayHours.map((hour, index) => (
              <div
                key={`label-${hour}`}
                style={{
                  textAlign: 'center',
                  fontSize: '13px',
                  fontWeight: '700',
                  color: index < 6 ? '#7c3aed' : index < 12 ? '#059669' : index < 18 ? '#d97706' : '#dc2626',
                  padding: '8px 4px',
                  textShadow: index < 6 ? '0 2px 6px rgba(124, 58, 237, 0.3)' : 
                             index < 12 ? '0 2px 6px rgba(5, 150, 105, 0.3)' :
                             index < 18 ? '0 2px 6px rgba(217, 119, 6, 0.3)' : 
                             '0 2px 6px rgba(220, 38, 38, 0.3)',
                  whiteSpace: 'nowrap',
                  animation: `timelineSlotReveal 0.6s ease ${index * 0.03}s both`,
                  transform: 'perspective(100px)',
                  transition: 'all 0.3s ease',
                  letterSpacing: '0.5px',
                  background: index < 6 ? 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.05))' :
                             index < 12 ? 'linear-gradient(135deg, rgba(5, 150, 105, 0.1), rgba(5, 150, 105, 0.05))' :
                             index < 18 ? 'linear-gradient(135deg, rgba(217, 119, 6, 0.1), rgba(217, 119, 6, 0.05))' :
                             'linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.05))',
                  borderRadius: '10px',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget;
                  element.style.transition = 'all 0.2s ease';
                  element.style.transform = 'perspective(100px) rotateX(-10deg) scale(1.1)';
                  element.style.textShadow = index < 6 ? '0 4px 15px rgba(124, 58, 237, 0.6)' :
                                            index < 12 ? '0 4px 15px rgba(5, 150, 105, 0.6)' :
                                            index < 18 ? '0 4px 15px rgba(217, 119, 6, 0.6)' :
                                            '0 4px 15px rgba(220, 38, 38, 0.6)';
                  element.style.filter = 'brightness(1.2)';
                  element.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget;
                  element.style.transition = 'all 0.3s ease';
                  element.style.transform = 'perspective(100px) rotateX(0deg) scale(1)';
                  element.style.textShadow = index < 6 ? '0 2px 6px rgba(124, 58, 237, 0.3)' :
                                            index < 12 ? '0 2px 6px rgba(5, 150, 105, 0.3)' :
                                            index < 18 ? '0 2px 6px rgba(217, 119, 6, 0.3)' :
                                            '0 2px 6px rgba(220, 38, 38, 0.3)';
                  element.style.filter = 'brightness(1)';
                  element.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                }}
              >
                {formatHour(hour)}
              </div>
            ))}
          </div>

          {/* Timeline Bar with tick marks */}
          <div 
            style={{
              position: 'relative',
              height: '88px',
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 25%, rgba(240, 253, 244, 0.9) 50%, rgba(255, 251, 235, 0.9) 75%, rgba(255, 241, 242, 0.9) 100%)',
              border: '2px solid rgba(139, 92, 246, 0.2)',
              borderRadius: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(24, 1fr)',
              gap: '4px',
              padding: '12px',
              backdropFilter: 'blur(25px) saturate(110%)',
              boxShadow: '0 10px 40px rgba(139, 92, 246, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
              overflow: 'hidden',
              alignItems: 'center'
            }}
            className="timeline-bar"
            onMouseLeave={() => {
              // Reset all timeline slots to their default state when mouse leaves timeline
              const slots = document.querySelectorAll('.timeline-slot');
              slots.forEach(slot => {
                const hasEvents = slot.classList.contains('booked-slot');
                slot.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                slot.style.transform = hasEvents ? 'scale(1.05)' : 'scale(1)';
                slot.style.borderWidth = '2px';
                slot.style.zIndex = '1';
                slot.style.filter = 'brightness(1) saturate(1)';
                // Reset box shadow to default
                if (hasEvents) {
                  slot.style.boxShadow = '0 12px 35px rgba(0,0,0,0.3), 0 0 20px currentColor';
                } else {
                  slot.style.boxShadow = '0 6px 20px rgba(0,0,0,0.15), 0 0 10px currentColor';
                }
              });
            }}
          >
          {/* Tick marks */}
          {displayHours.map((hour, index) => {
            const hourEvents = getEventsForHour(hour);
            const hourTodos = getTodosForHour(hour);
            const hasEvents = hourEvents.length > 0;
            const hasTodos = hourTodos.length > 0;
            const colors = getTimeColors(hour, hasEvents, hasTodos);
            
            return (
              <div
                key={`slot-${hour}`}
                className={`timeline-slot ${hasEvents ? 'booked-slot' : 'available-slot'} ${hasTodos && !hasEvents ? 'todo-slot' : ''}`}
                onClick={() => onSlotClick && onSlotClick(hour)}
                style={{
                  height: '64px',
                  cursor: 'pointer',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: colors.bg,
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  borderRadius: '14px',
                  border: `2px solid ${colors.border}`,
                  transform: hasEvents ? 'scale(1.03)' : 'scale(1)',
                  boxShadow: hasEvents ? 
                    `0 8px 24px rgba(0,0,0,0.25), 0 0 16px ${colors.border}50` : 
                    `0 4px 16px rgba(0,0,0,0.12), 0 0 8px ${colors.border}30`,
                  overflow: 'hidden',
                  animation: `timelineSlotReveal 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275) ${index * 0.05}s both`,
                  backdropFilter: 'blur(8px)',
                  willChange: 'transform, box-shadow, border-width, filter, z-index',
                  minWidth: '50px'
                }}
                onMouseEnter={(e) => {
                  const element = e.currentTarget;
                  element.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
                  element.style.transform = hasEvents ? 'scale(1.12) translateY(-3px)' : 'scale(1.08) translateY(-2px)';
                  element.style.boxShadow = hasEvents ? 
                    `0 16px 40px rgba(0,0,0,0.35), 0 0 24px ${colors.border}70, inset 0 1px 0 rgba(255,255,255,0.4)` : 
                    `0 10px 28px rgba(0,0,0,0.2), 0 0 16px ${colors.border}50, inset 0 1px 0 rgba(255,255,255,0.3)`;
                  element.style.borderWidth = '3px';
                  element.style.zIndex = '10';
                  element.style.filter = 'brightness(1.08) saturate(1.15)';
                }}
                onMouseLeave={(e) => {
                  const element = e.currentTarget;
                  element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
                  element.style.transform = hasEvents ? 'scale(1.03)' : 'scale(1)';
                  element.style.boxShadow = hasEvents ? 
                    `0 8px 24px rgba(0,0,0,0.25), 0 0 16px ${colors.border}50` : 
                    `0 4px 16px rgba(0,0,0,0.12), 0 0 8px ${colors.border}30`;
                  element.style.borderWidth = '2px';
                  element.style.zIndex = '1';
                  element.style.filter = 'brightness(1) saturate(1)';
                }}
                title={
                  hasEvents && hasTodos ? 
                    `Events & Todos at ${formatHour(hour)} - Click to manage` :
                  hasEvents ? 
                    `Events at ${formatHour(hour)} - Click to manage` :
                  hasTodos ?
                    `Todos at ${formatHour(hour)} - Click to manage` :
                    `Available at ${formatHour(hour)} - Click to add event or todos`
                }
              >
                {/* Tick mark - positioned above slot */}
                <div style={{
                  position: 'absolute',
                  top: '-16px',
                  width: '4px',
                  height: '16px',
                  background: 'linear-gradient(180deg, rgba(139, 92, 246, 0.8) 0%, rgba(139, 92, 246, 0.4) 100%)',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  borderRadius: '2px',
                  boxShadow: '0 2px 6px rgba(139, 92, 246, 0.3)',
                  animation: `timelineSlotReveal 0.6s ease ${index * 0.05 + 0.3}s both`
                }}></div>
                
                {/* Slot content - perfectly centered icons */}
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative'
                }}>
                  {/* Both events and todos */}
                  {hasEvents && hasTodos && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}>
                      {/* Event Icon */}
                      <div style={{
                        fontSize: '18px',
                        textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                        animation: 'eventIconPulse 3s ease-in-out infinite',
                        animationDelay: `${index * 0.1}s`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        📅
                      </div>
                      {/* Todo Icon */}
                      <div style={{
                        fontSize: '16px',
                        textShadow: '0 2px 6px rgba(0,0,0,0.4)',
                        animation: 'todoIconPulse 3.5s ease-in-out infinite',
                        animationDelay: `${index * 0.1 + 0.5}s`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        ✅
                      </div>
                    </div>
                  )}
                  
                  {/* Event only */}
                  {hasEvents && !hasTodos && (
                    <div style={{
                      fontSize: '22px',
                      textShadow: '0 3px 8px rgba(0,0,0,0.5)',
                      animation: 'eventIconPulse 3s ease-in-out infinite',
                      animationDelay: `${index * 0.1}s`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      📅
                    </div>
                  )}
                  
                  {/* Todo only */}
                  {!hasEvents && hasTodos && (
                    <div style={{
                      fontSize: '22px',
                      textShadow: '0 3px 8px rgba(0,0,0,0.5)',
                      animation: 'todoIconPulse 3.5s ease-in-out infinite',
                      animationDelay: `${index * 0.1}s`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      ✅
                    </div>
                  )}
                  
                  {/* Available indicator (no events, no todos) */}
                  {!hasEvents && !hasTodos && (
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: 'rgba(255,255,255,0.9)',
                      opacity: 0.8,
                      border: `2px solid ${colors.border}`,
                      boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}></div>
                  )}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>

      {/* Today's Schedule - Events and Todos */}
      {(events.length > 0 || (todos && todos.length > 0)) && (
        <div className="schedule-container" style={{ 
          marginTop: '30px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.9) 25%, rgba(240, 253, 244, 0.9) 50%, rgba(255, 251, 235, 0.9) 75%, rgba(255, 241, 242, 0.9) 100%)',
          border: '1px solid rgba(139, 92, 246, 0.15)',
          borderRadius: '24px',
          padding: '28px 32px',
          backdropFilter: 'blur(25px) saturate(110%)',
          boxShadow: '0 15px 50px rgba(139, 92, 246, 0.08), 0 8px 32px rgba(34, 197, 94, 0.06), inset 0 1px 0 rgba(255,255,255,0.8)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {/* Aesthetic overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.05) 0%, transparent 50%, rgba(255,255,255,0.1) 100%)',
            borderRadius: '20px',
            pointerEvents: 'none'
          }}></div>
          <h4 className="schedule-header" style={{ 
            marginBottom: '28px', 
            color: '#374151', 
            fontSize: '24px', 
            fontWeight: '700',
            textAlign: 'center',
            borderBottom: '3px solid rgba(139, 92, 246, 0.3)',
            paddingBottom: '16px',
            textShadow: '0 2px 8px rgba(139, 92, 246, 0.2)',
            position: 'relative',
            zIndex: 1,
            letterSpacing: '0.5px',
            background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #10b981 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            margin: '0 auto 28px auto',
            width: 'fit-content'
          }}>
            ✨ Today's Schedule
          </h4>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            maxHeight: '500px',
            overflowY: 'auto',
            paddingRight: '12px',
            position: 'relative',
            zIndex: 1,
            /* Custom scrollbar */
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(139, 92, 246, 0.3) transparent'
          }} className="schedule-list-container">
            {/* Custom scrollbar styles for webkit browsers */}
            <style>{`
              .schedule-list-container::-webkit-scrollbar {
                width: 8px;
              }
              .schedule-list-container::-webkit-scrollbar-track {
                background: rgba(0,0,0,0.05);
                border-radius: 10px;
              }
              .schedule-list-container::-webkit-scrollbar-thumb {
                background: linear-gradient(135deg, #8b5cf6, #06b6d4);
                border-radius: 10px;
              }
              .schedule-list-container::-webkit-scrollbar-thumb:hover {
                background: linear-gradient(135deg, #7c3aed, #0891b2);
              }
            `}</style>
            {/* Combine events and todos, then sort by time */}
            {[
              ...events.map(event => ({
                ...event,
                type: 'event',
                sortTime: event.time
              })),
              ...(todos || []).map(todo => ({
                ...todo,
                type: 'todo',
                sortTime: `${todo.timeSlot.toString().padStart(2, '0')}:00`
              }))
            ]
              .sort((a, b) => a.sortTime.localeCompare(b.sortTime))
              .map((item, index) => {
                if (item.type === 'event') {
                  // Event item
                  const eventHour = parseInt(item.time.split(':')[0]);
                  const colors = getTimeColors(eventHour, true, false);
                  return (
                    <div
                      key={`event-${item.id}`}
                      className="schedule-item"
                      data-type="event"
                      style={{
                        background: colors.bg,
                        padding: '24px 28px',
                        borderRadius: '20px',
                        border: `2px solid ${colors.border}40`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        boxShadow: '0 6px 24px rgba(148, 163, 184, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)',
                        marginBottom: '0',
                        animationDelay: `${index * 0.1}s`,
                        backdropFilter: 'blur(20px)',
                        position: 'relative',
                        overflow: 'hidden',
                        minHeight: '88px'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-3px) scale(1.02)';
                        e.target.style.boxShadow = '0 12px 40px rgba(148, 163, 184, 0.2), inset 0 1px 0 rgba(255,255,255,0.95)';
                        e.target.style.filter = 'brightness(1.03) saturate(1.08)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0) scale(1)';
                        e.target.style.boxShadow = '0 6px 24px rgba(148, 163, 184, 0.12), inset 0 1px 0 rgba(255,255,255,0.9)';
                        e.target.style.filter = 'brightness(1) saturate(1)';
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '20px', 
                        flex: 1,
                        minHeight: '72px',
                        padding: '8px 0'
                      }}>
                        <div className="schedule-icon" style={{ 
                          fontSize: '28px', 
                          minWidth: '40px',
                          width: '40px',
                          height: '40px',
                          textAlign: 'center',
                          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))',
                          flexShrink: 0,
                          animationDelay: `${index * 0.1 + 0.3}s`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)'
                        }}>
                          📅
                        </div>
                        <div style={{ 
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          minHeight: '56px',
                          gap: '6px'
                        }}>
                          <div style={{ 
                            fontWeight: 'bold', 
                            color: colors.text, 
                            marginBottom: '8px', 
                            fontSize: '18px',
                            lineHeight: '1.3',
                            wordBreak: 'break-word'
                          }}>
                            {item.title}
                          </div>
                          <div style={{ 
                            fontSize: '15px', 
                            color: colors.text, 
                            opacity: 0.85,
                            fontWeight: '500',
                            marginBottom: '4px',
                            lineHeight: '1.4'
                          }}>
                            ⏰ {formatTime12Hour(item.time)} • {item.duration} minutes
                          </div>
                          {item.description && (
                            <div style={{ 
                              fontSize: '13px', 
                              color: colors.text, 
                              opacity: 0.7, 
                              marginTop: '4px',
                              fontStyle: 'italic',
                              lineHeight: '1.4',
                              wordBreak: 'break-word'
                            }}>
                              {item.description}
                            </div>
                          )}
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        gap: '12px', 
                        alignItems: 'center', 
                        flexShrink: 0,
                        height: '72px'
                      }} className="event-button-container">
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onEventEdit && onEventEdit(item);
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
                            color: '#0369a1',
                            padding: '12px 20px',
                            borderRadius: '14px',
                            fontSize: '14px',
                            fontWeight: '600',
                            boxShadow: '0 4px 16px rgba(56, 189, 248, 0.2)',
                            border: '2px solid rgba(56, 189, 248, 0.25)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '8px',
                            letterSpacing: '0.3px',
                            minWidth: '100px',
                            height: '44px',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'scale(1.05) translateY(-2px)';
                            e.target.style.boxShadow = '0 8px 24px rgba(56, 189, 248, 0.35)';
                            e.target.style.background = 'linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)';
                            e.target.style.color = '#0c4a6e';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'scale(1) translateY(0)';
                            e.target.style.boxShadow = '0 4px 16px rgba(56, 189, 248, 0.2)';
                            e.target.style.background = 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
                            e.target.style.color = '#0369a1';
                          }}
                        >
                          ✏️ Edit
                        </button>
                      </div>
                    </div>
                  );
                } else {
                  // Todo item
                  const todoHour = item.timeSlot;
                  const colors = getTimeColors(todoHour, false, true);
                  return (
                    <div
                      key={`todo-${item.id}`}
                      className="schedule-item"
                      data-type="todo"
                      style={{
                        background: colors.bg,
                        padding: '24px 28px',
                        borderRadius: '20px',
                        border: `2px solid ${colors.border}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
                        opacity: item.completed ? 0.75 : 1,
                        marginBottom: '0',
                        animationDelay: `${index * 0.1}s`,
                        minHeight: '88px',
                        backdropFilter: 'blur(15px)',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 16px 48px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.3)';
                        e.currentTarget.style.filter = 'brightness(1.05) saturate(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0) scale(1)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)';
                        e.currentTarget.style.filter = 'brightness(1) saturate(1)';
                      }}
                    >
                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '20px', 
                        flex: 1,
                        minHeight: '72px',
                        padding: '8px 0'
                      }}>
                        <div className="schedule-icon" style={{ 
                          fontSize: '28px', 
                          minWidth: '40px',
                          width: '40px',
                          height: '40px',
                          textAlign: 'center',
                          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.25))',
                          flexShrink: 0,
                          animationDelay: `${index * 0.1 + 0.3}s`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(255,255,255,0.2)',
                          borderRadius: '12px',
                          backdropFilter: 'blur(10px)'
                        }}>
                          ✅
                        </div>
                        <div style={{ 
                          flex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          justifyContent: 'center',
                          minHeight: '56px',
                          gap: '6px'
                        }}>
                          <div style={{ 
                            fontWeight: 'bold', 
                            color: colors.text, 
                            marginBottom: '8px', 
                            fontSize: '18px',
                            lineHeight: '1.3',
                            wordBreak: 'break-word',
                            textDecoration: item.completed ? 'line-through' : 'none',
                            opacity: item.completed ? 0.6 : 1
                          }}>
                            {item.text}
                          </div>
                          <div style={{ 
                            fontSize: '15px', 
                            color: colors.text, 
                            opacity: 0.85,
                            fontWeight: '500',
                            lineHeight: '1.4'
                          }}>
                            📍 {formatHour(item.timeSlot)} • {item.completed ? 'Completed' : 'Pending'}
                          </div>
                        </div>
                      </div>
                      <div style={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        gap: '10px', 
                        alignItems: 'stretch', 
                        flexShrink: 0,
                        justifyContent: 'center',
                        minWidth: '140px',
                        height: '72px'
                      }} className="todo-button-container">
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Toggle todo clicked:', item.id, 'Current completed:', item.completed);
                            if (onToggleTodo) {
                              onToggleTodo(item.id);
                            } else {
                              console.warn('onToggleTodo function not provided');
                            }
                          }}
                          style={{
                            background: item.completed 
                              ? 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)' 
                              : 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
                            color: item.completed ? '#dc2626' : '#16a34a',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '600',
                            boxShadow: item.completed 
                              ? '0 4px 16px rgba(239, 68, 68, 0.2)' 
                              : '0 4px 16px rgba(34, 197, 94, 0.2)',
                            border: item.completed 
                              ? '2px solid rgba(239, 68, 68, 0.25)' 
                              : '2px solid rgba(34, 197, 94, 0.25)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            height: '32px',
                            width: '100%',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target;
                            target.style.transform = 'scale(1.05) translateY(-1px)';
                            if (item.completed) {
                              target.style.boxShadow = '0 6px 20px rgba(239, 68, 68, 0.35)';
                              target.style.background = 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)';
                            } else {
                              target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.35)';
                              target.style.background = 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)';
                            }
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target;
                            target.style.transform = 'scale(1) translateY(0)';
                            if (item.completed) {
                              target.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.2)';
                              target.style.background = 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
                            } else {
                              target.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.2)';
                              target.style.background = 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)';
                            }
                          }}
                          title={item.completed ? 'Mark as incomplete' : 'Mark as complete'}
                        >
                          {item.completed ? '↩️ Undo' : '✓ Done'}
                        </button>
                        <button
                          className="action-button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('Manage todo clicked for timeSlot:', item.timeSlot);
                            if (onTodoClick) {
                              onTodoClick(item.timeSlot);
                            } else {
                              console.warn('onTodoClick function not provided');
                            }
                          }}
                          style={{
                            background: 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)',
                            color: '#374151',
                            padding: '10px 16px',
                            borderRadius: '12px',
                            fontSize: '13px',
                            fontWeight: '600',
                            boxShadow: '0 4px 16px rgba(107, 114, 128, 0.15)',
                            border: '2px solid rgba(107, 114, 128, 0.2)',
                            cursor: 'pointer',
                            transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            height: '32px',
                            width: '100%',
                            whiteSpace: 'nowrap'
                          }}
                          onMouseEnter={(e) => {
                            const target = e.target;
                            target.style.transform = 'scale(1.05) translateY(-1px)';
                            target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.25)';
                            target.style.background = 'linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%)';
                            target.style.color = '#1f2937';
                          }}
                          onMouseLeave={(e) => {
                            const target = e.target;
                            target.style.transform = 'scale(1) translateY(0)';
                            target.style.boxShadow = '0 4px 16px rgba(107, 114, 128, 0.15)';
                            target.style.background = 'linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%)';
                            target.style.color = '#374151';
                          }}
                        >
                          ⚙️ Manage
                        </button>
                      </div>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default TimelineSlots;
