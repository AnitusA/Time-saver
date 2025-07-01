import React from 'react';
import TodoList from './TodoList';

function TodoModal({ onClose, timeSlot, todos, onAddTodo, onToggleTodo, onDeleteTodo, selectedDate }) {
  const formatTime12Hour = (hour) => {
    if (hour === 0) return '12 AM';
    if (hour < 12) return `${hour} AM`;
    if (hour === 12) return '12 PM';
    return `${hour - 12} PM`;
  };

  // Ensure timeSlot is valid
  const validTimeSlot = timeSlot !== null && timeSlot !== undefined ? timeSlot : 9;
  
  // Filter todos for this specific time slot
  const slotTodos = todos.filter(todo => todo.timeSlot === validTimeSlot);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '30px',
        borderRadius: '16px',
        width: '90%',
        maxWidth: '600px',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: '0 25px 50px rgba(0,0,0,0.4)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(10px)'
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '25px'
        }}>
          <h2 style={{ 
            margin: 0,
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            fontSize: '24px',
            fontWeight: '300',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            ✅ Todo Manager
            <span style={{
              background: 'rgba(255, 255, 255, 0.2)',
              padding: '4px 12px',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 'bold'
            }}>
              {formatTime12Hour(validTimeSlot)}
            </span>
          </h2>
          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)';
              e.target.style.transform = 'scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)';
              e.target.style.transform = 'scale(1)';
            }}
          >
            ✕
          </button>
        </div>

        {/* Todo List Component */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '12px',
          padding: '20px',
          backdropFilter: 'blur(10px)'
        }}>
          <TodoList
            todos={slotTodos}
            onAddTodo={onAddTodo}
            onToggleTodo={onToggleTodo}
            onDeleteTodo={onDeleteTodo}
            timeSlot={validTimeSlot}
            selectedDate={selectedDate}
          />
        </div>

        {/* Footer with tips */}
        <div style={{
          marginTop: '20px',
          padding: '15px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '8px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.8)',
          textAlign: 'center'
        }}>
          💡 Tip: Click on todo items to mark them as complete, or use the delete button to remove them
        </div>
      </div>
    </div>
  );
}

export default TodoModal;
